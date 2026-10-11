"""
Food-101 Deep Learning Classifier & Calorie Estimation System
Complete end-to-end runnable Python script for TensorFlow / Keras
"""

import os
import sys
import json
import random
import pathlib
import numpy as np
import pandas as pd
import matplotlib.pyplot as plt
import seaborn as sns
from PIL import Image

import tensorflow as tf
from tensorflow import keras
from tensorflow.keras import layers
from tensorflow.keras.applications import MobileNetV2, EfficientNetB0
from tensorflow.keras.callbacks import EarlyStopping, ReduceLROnPlateau, ModelCheckpoint

# Confirm GPU acceleration
print(f"TensorFlow Version: {tf.__version__}")
gpus = tf.config.list_physical_devices('GPU')
if gpus:
    print(f"Accelerated GPU Detected: {gpus[0].name}")
    try:
        tf.keras.mixed_precision.set_global_policy('mixed_float16')
        print("Mixed precision policy 'mixed_float16' enabled.")
    except Exception as e:
        print(f"Could not set mixed precision: {e}")
else:
    print("Running on CPU. Consider enabling a GPU accelerator in Colab/Kaggle settings.")

SEED = 42
tf.random.set_seed(SEED)
np.random.seed(SEED)
random.seed(SEED)

# Hyperparameters
IMG_SIZE = (224, 224)
BATCH_SIZE = 32
AUTOTUNE = tf.data.AUTOTUNE

# Set SUBSET_EXPERIMENT = True for quick testing on 20 classes / 300 imgs
SUBSET_EXPERIMENT = False
SUBSET_CLASSES_COUNT = 20

# Search paths for Food-101
KAGGLE_DATA_DIR = pathlib.Path('/kaggle/input/food-101/food-101/food-101')
ALT_KAGGLE_DIR = pathlib.Path('/kaggle/input/food-101')
COLAB_LOCAL_DIR = pathlib.Path('./food-101')

def resolve_data_paths():
    candidates = [
        KAGGLE_DATA_DIR,
        ALT_KAGGLE_DIR,
        COLAB_LOCAL_DIR,
        pathlib.Path('./food-101/food-101')
    ]
    for p in candidates:
        if (p / 'meta' / 'train.txt').exists() and (p / 'images').exists():
            print(f"Found Food-101 directory at: {p}")
            return p
    return None

data_root = resolve_data_paths()

if data_root is not None:
    print("Loading official Food-101 train/test splits...")
    meta_dir = data_root / 'meta'
    images_dir = data_root / 'images'
    
    with open(meta_dir / 'classes.txt', 'r') as f:
        all_classes = sorted([line.strip() for line in f.readlines() if line.strip()])
    
    with open(meta_dir / 'train.txt', 'r') as f:
        train_lines = [line.strip() for line in f.readlines() if line.strip()]
        
    with open(meta_dir / 'test.txt', 'r') as f:
        test_lines = [line.strip() for line in f.readlines() if line.strip()]
        
    if SUBSET_EXPERIMENT:
        selected_classes = all_classes[:SUBSET_CLASSES_COUNT]
        train_lines = [x for x in train_lines if x.split('/')[0] in selected_classes]
        test_lines = [x for x in test_lines if x.split('/')[0] in selected_classes]
    else:
        selected_classes = all_classes

    class_to_idx = {cls_name: idx for idx, cls_name in enumerate(selected_classes)}
    
    train_paths = [str(images_dir / f"{x}.jpg") for x in train_lines]
    train_labels = [class_to_idx[x.split('/')[0]] for x in train_lines]
    
    test_paths = [str(images_dir / f"{x}.jpg") for x in test_lines]
    test_labels = [class_to_idx[x.split('/')[0]] for x in test_lines]

    print(f"Loaded {len(train_paths)} training samples and {len(test_paths)} test samples.")
    print(f"Total categories: {len(selected_classes)}")
else:
    print("Local Kaggle path not found; using tensorflow_datasets ('food101')...")
    import tensorflow_datasets as tfds
    (ds_train, ds_test), ds_info = tfds.load(
        'food101',
        split=['train', 'validation'],
        as_supervised=True,
        with_info=True
    )
    selected_classes = ds_info.features['label'].names
    class_to_idx = {name: i for i, name in enumerate(selected_classes)}

def parse_image_and_label(path, label):
    img_bytes = tf.io.read_file(path)
    img = tf.io.decode_jpeg(img_bytes, channels=3)
    img = tf.image.resize(img, IMG_SIZE)
    img = tf.cast(img, tf.float32)
    return img, label

def create_dataset(paths, labels, is_training=True):
    ds = tf.data.Dataset.from_tensor_slices((paths, labels))
    if is_training:
        ds = ds.shuffle(buffer_size=min(len(paths), 10000), seed=SEED)
    ds = ds.map(parse_image_and_label, num_parallel_calls=AUTOTUNE)
    ds = ds.batch(BATCH_SIZE)
    ds = ds.prefetch(buffer_size=AUTOTUNE)
    return ds

if 'train_paths' in locals():
    train_dataset = create_dataset(train_paths, train_labels, is_training=True)
    val_dataset = create_dataset(test_paths, test_labels, is_training=False)

def build_food_model(num_classes=101, base_architecture='EfficientNetB0'):
    data_augmentation = keras.Sequential([
        layers.RandomFlip("horizontal", seed=SEED),
        layers.RandomRotation(0.12, seed=SEED),
        layers.RandomZoom(0.15, seed=SEED),
        layers.RandomContrast(0.1, seed=SEED),
    ], name="data_augmentation")

    inputs = layers.Input(shape=(*IMG_SIZE, 3), name="input_image")
    x = data_augmentation(inputs)
    
    if base_architecture == 'MobileNetV2':
        x = tf.keras.applications.mobilenet_v2.preprocess_input(x)
        base_model = MobileNetV2(weights='imagenet', include_top=False, input_shape=(*IMG_SIZE, 3))
    else:
        base_model = EfficientNetB0(weights='imagenet', include_top=False, input_shape=(*IMG_SIZE, 3))
    
    base_model.trainable = False
    x = base_model(x, training=False)
    x = layers.GlobalAveragePooling2D(name="global_avg_pool")(x)
    x = layers.BatchNormalization(name="batch_norm")(x)
    x = layers.Dropout(0.3, name="dropout_head")(x)
    outputs = layers.Dense(num_classes, activation="softmax", dtype='float32', name="predictions")(x)
    
    model = keras.Model(inputs=inputs, outputs=outputs, name=f"Food101_{base_architecture}")
    return model, base_model

model, base_model = build_food_model(num_classes=len(selected_classes))
model.summary()

# Phase 1: Feature Extraction
EPOCHS_PHASE_1 = 5 if SUBSET_EXPERIMENT else 10
callbacks_phase1 = [
    EarlyStopping(monitor='val_loss', patience=3, restore_best_weights=True, verbose=1),
    ReduceLROnPlateau(monitor='val_loss', factor=0.2, patience=2, min_lr=1e-6, verbose=1),
    ModelCheckpoint('best_food_model_phase1.keras', monitor='val_accuracy', save_best_only=True, verbose=1)
]

model.compile(
    optimizer=keras.optimizers.Adam(learning_rate=1e-3),
    loss='sparse_categorical_crossentropy',
    metrics=['accuracy', keras.metrics.SparseTopKCategoricalAccuracy(k=5, name='top_5_accuracy')]
)

print("Starting Phase 1 Training...")
history_phase1 = model.fit(
    train_dataset,
    epochs=EPOCHS_PHASE_1,
    validation_data=val_dataset,
    callbacks=callbacks_phase1
)

# Phase 2: Fine-Tuning Top 30 layers
base_model.trainable = True
for layer in base_model.layers[:-30]:
    layer.trainable = False

model.compile(
    optimizer=keras.optimizers.Adam(learning_rate=1e-5),
    loss='sparse_categorical_crossentropy',
    metrics=['accuracy', keras.metrics.SparseTopKCategoricalAccuracy(k=5, name='top_5_accuracy')]
)

EPOCHS_PHASE_2 = 5 if SUBSET_EXPERIMENT else 15
INITIAL_EPOCH = len(history_phase1.history['loss'])

callbacks_phase2 = [
    EarlyStopping(monitor='val_loss', patience=4, restore_best_weights=True, verbose=1),
    ReduceLROnPlateau(monitor='val_loss', factor=0.5, patience=2, min_lr=1e-7, verbose=1),
    ModelCheckpoint('food_model.keras', monitor='val_accuracy', save_best_only=True, verbose=1)
]

print("Starting Phase 2 Fine-Tuning...")
history_phase2 = model.fit(
    train_dataset,
    epochs=INITIAL_EPOCH + EPOCHS_PHASE_2,
    initial_epoch=INITIAL_EPOCH,
    validation_data=val_dataset,
    callbacks=callbacks_phase2
)

# Evaluation
test_loss, test_acc, test_top5_acc = model.evaluate(val_dataset, verbose=1)
print(f"Final Top-1 Acc: {test_acc * 100:.2f}%, Top-5 Acc: {test_top5_acc * 100:.2f}%")

# Save artifacts
model.save('food_model.keras')
with open('class_names.json', 'w') as f:
    json.dump(selected_classes, f, indent=2)

# Calorie Prediction
CALORIE_CSV_PATH = 'food_calories.csv'
calorie_df = pd.read_csv(CALORIE_CSV_PATH).set_index('food_class')

PORTION_MULTIPLIERS = {'small': 0.75, 'medium': 1.0, 'large': 1.5}

def predict_food(image_path, portion_size='medium', top_k=3):
    if not os.path.exists(image_path):
        raise FileNotFoundError(f"Image not found at path: {image_path}")
    img = Image.open(image_path).convert('RGB')
    img_resized = img.resize(IMG_SIZE)
    img_array = np.array(img_resized, dtype=np.float32)
    img_batch = np.expand_dims(img_array, axis=0)
    
    preds = model.predict(img_batch, verbose=0)[0]
    top_indices = np.argsort(preds)[::-1][:top_k]
    mult = PORTION_MULTIPLIERS.get(portion_size.lower(), 1.0)
    
    results = []
    for idx in top_indices:
        food_class = selected_classes[idx]
        conf = float(preds[idx])
        cals_serving = calorie_df.loc[food_class, 'calories_per_serving'] if food_class in calorie_df.index else 300
        cals_100g = calorie_df.loc[food_class, 'calories_per_100g'] if food_class in calorie_df.index else 200
        serving_g = calorie_df.loc[food_class, 'serving_size_g'] if food_class in calorie_df.index else 150
        
        results.append({
            'class_id': food_class,
            'name': food_class.replace('_', ' ').title(),
            'confidence': conf,
            'calories': round(cals_serving * mult),
            'calories_per_100g': cals_100g,
            'grams': round(serving_g * mult),
            'portion_size': portion_size
        })
    return results

print("Pipeline and predict_food() initialized successfully.")
