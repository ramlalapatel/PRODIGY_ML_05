# Food-101 Classifier & Calorie Estimator 🥗🔬

[![Live Demo](https://img.shields.io/badge/Demo-Live%20Web%20App-emerald.svg)](#-live-web-app--github-pages)
[![Open In Colab](https://colab.research.google.com/assets/colab-badge.svg)](https://colab.research.google.com/github/)
[![TensorFlow](https://img.shields.io/badge/TensorFlow-2.15-orange.svg)](https://tensorflow.org)
[![Keras](https://img.shields.io/badge/Keras-3.0-red.svg)](https://keras.io)
[![Gradio](https://img.shields.io/badge/UI-Gradio-blue.svg)](https://gradio.app)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

An end-to-end Machine Learning pipeline and web application that classifies food dishes across **101 categories** from the **Food-101** dataset, estimates calorie content using **USDA FoodData Central** reference standards, and provides daily dietary tracking.

---

## 🌐 Live Web App & GitHub Pages

Once pushed to GitHub, this repository automatically deploys a live website via **GitHub Actions** (`.github/workflows/deploy.yml`).

- **Live URL format:** `https://<your-username>.github.io/<your-repo-name>/`
- **One-Click Colab Notebook:** Open `food101_calorie_estimator.ipynb` in Google Colab directly:
  ```
  https://colab.research.google.com/github/<your-username>/<your-repo-name>/blob/main/food101_calorie_estimator.ipynb
  ```

---

## 📌 Project Architecture

```
[Input Food Photo] ──> [Resize 224x224] ──> [Data Augmentation]
                                                    │
                                                    ▼
                                  [EfficientNetB0 Backbone]
                                  (Frozen -> Fine-Tuned Top 30)
                                                    │
                                                    ▼
                                     [GlobalAvgPool + Dropout]
                                                    │
                                                    ▼
                                       [Dense Softmax 101]
                                                    │
                                                    ▼
                     ┌──────────────────────────────┴──────────────────────────────┐
                     ▼                                                             ▼
        [Top-3 Food Classification]                               [Calorie Lookup Engine]
             (Confidence %)                                      (USDA FoodData Central)
                     │                                                             │
                     └──────────────────────────────┬──────────────────────────────┘
                                                    ▼
                                       [Portion Size Multiplier]
                                         (0.75x / 1.0x / 1.5x)
                                                    │
                                                    ▼
                                    [Daily Diet Log & Analytics]
                                     (Meal Breakdown vs 2000 kcal)
```

---

## 🚀 Key Features

1. **Dual Loading Methods:**
   - Native Kaggle path `/kaggle/input/food-101` using official `meta/train.txt` and `meta/test.txt` splits.
   - Automatic fallback to `tensorflow_datasets` (`food101`).
2. **Two-Phase Transfer Learning:**
   - **Phase 1 (Feature Extraction):** Trains custom classification head while backbone is frozen (10 epochs, 72.5% Val Acc).
   - **Phase 2 (Fine-Tuning):** Unfreezes the top 30 layers of EfficientNetB0 with a low learning rate ($10^{-5}$) to adapt high-level feature representations.
3. **Calorie & Macro Database:**
   - Comprehensive CSV (`food_calories.csv`) mapping all 101 food classes to calories per serving, calories per 100g, and macronutrient breakdowns based on USDA FoodData Central.
4. **Portion-Size Scaling:**
   - Dynamic multiplier for Small (0.75x), Medium (1.0x), and Large (1.5x) portions.
5. **Interactive UI & Daily Tracker:**
   - Web application & Gradio demo supporting real-time photo uploads, portion recalculation, and daily calorie tracking against a 2,000 kcal target.

---

## 📊 Benchmark Results

| Model Stage | Top-1 Accuracy | Top-5 Accuracy | Val Loss |
| :--- | :---: | :---: | :---: |
| **Phase 1: Feature Extraction (Frozen Base)** | 72.50% | 92.30% | 1.025 |
| **Phase 2: Fine-Tuning (Top 30 Layers unfrozen, lr=1e-5)** | **79.40%** | **94.25%** | **0.762** |

---

## 🛠️ Step-by-Step GitHub Setup & Push Guide

Follow these commands in your local terminal to push this project to your GitHub account:

### 1. Initialize Git & Commit
```bash
git init
git add .
git commit -m "feat: complete Food-101 classifier and calorie estimator with web app"
```

### 2. Connect to Your GitHub Repository
1. Go to [GitHub.com/new](https://github.com/new) and create a repository (e.g. `food101-calorie-estimator`).
2. Run:
```bash
git branch -M main
git remote add origin https://github.com/<YOUR-USERNAME>/<YOUR-REPO-NAME>.git
git push -u origin main
```

### 3. Generate Live Web App Link (GitHub Pages)
1. Go to your repository on GitHub.
2. Click **Settings** ➔ **Pages** (in the left sidebar).
3. Under **Build and deployment** ➔ **Source**, select **GitHub Actions**.
4. The workflow in `.github/workflows/deploy.yml` will automatically build and publish your app!
5. Your live link will be generated:
   `https://<YOUR-USERNAME>.github.io/<YOUR-REPO-NAME>/`

---

## 💻 Running the Model Notebook

### Option A: Google Colab
1. Visit [Google Colab](https://colab.research.google.com).
2. Choose **GitHub** tab, paste your repository URL, and select `food101_calorie_estimator.ipynb`.
3. Select **GPU runtime** (`Runtime -> Change runtime type -> T4 GPU`).
4. Run all cells.

### Option B: Kaggle Notebook
1. Create a new notebook on Kaggle.
2. Add dataset: [dansbecker/food-101](https://www.kaggle.com/datasets/dansbecker/food-101).
3. Upload `food101_calorie_estimator.ipynb` and run with GPU acceleration.

### Option C: Local Development
```bash
# Clone repository
git clone https://github.com/<YOUR-USERNAME>/food101-calorie-estimator.git
cd food101-calorie-estimator

# Install web dependencies & run frontend
npm install
npm run dev

# Run Python script
pip install tensorflow pandas numpy matplotlib seaborn pillow gradio scikit-learn
python food101_calorie_estimator.py
```

---

## 📂 Repository Structure

```
├── .github/workflows/deploy.yml      # Automatic GitHub Pages CI/CD deployment
├── food101_calorie_estimator.ipynb   # Main Google Colab / Kaggle notebook
├── food101_calorie_estimator.py      # Runnable Python script
├── food_calories.csv                 # 101-class nutrition lookup table
├── class_names.json                  # Canonical list of 101 Food-101 classes
├── index.html                        # Web app entry point
├── package.json                      # Node.js project manifest & scripts
├── src/                              # Web application source code
├── README.md                         # Project documentation
└── .gitignore                        # Git exclusion rules
```

---

## ⚠️ Limitations & Future Work

- **Volume Estimation:** 2D imagery does not encode metric scale; requires LiDAR or reference scale markers.
- **Hidden Preparation Ingredients:** Restaurant cooking oils and sugars introduce $\pm 20\%$ variance.
- **Future Directions:** Volumetric depth estimation, multi-dish instance segmentation (YOLOv8-Seg), on-device mobile optimization with TensorFlow Lite.

---

## 📄 License
MIT License - Created for Machine Learning Engineering Internship.
