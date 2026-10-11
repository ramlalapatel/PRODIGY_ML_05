import React, { useState, useMemo } from 'react';
import { Search, Download, Filter, Info, ArrowUpDown } from 'lucide-react';
import {
  FOOD_ITEMS_101,
  FoodItem,
  generateFoodCaloriesCsv,
} from '@/src/data/food101_nutrition.ts';
import { downloadFile } from '@/src/utils/downloadHelpers.ts';

export const NutritionDatabaseTable: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [sortField, setSortField] = useState<keyof FoodItem>('displayName');
  const [sortAsc, setSortAsc] = useState(true);

  // Extract unique categories
  const categories = useMemo(() => {
    const set = new Set(FOOD_ITEMS_101.map((item) => item.category));
    return ['All', ...Array.from(set).sort()];
  }, []);

  // Filter and sort items
  const filteredItems = useMemo(() => {
    return FOOD_ITEMS_101.filter((item) => {
      const matchesSearch =
        item.displayName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.id.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCat = selectedCategory === 'All' || item.category === selectedCategory;
      return matchesSearch && matchesCat;
    }).sort((a, b) => {
      const valA = a[sortField];
      const valB = b[sortField];
      if (typeof valA === 'number' && typeof valB === 'number') {
        return sortAsc ? valA - valB : valB - valA;
      }
      return sortAsc
        ? String(valA).localeCompare(String(valB))
        : String(valB).localeCompare(String(valA));
    });
  }, [searchTerm, selectedCategory, sortField, sortAsc]);

  const handleSort = (field: keyof FoodItem) => {
    if (sortField === field) {
      setSortAsc(!sortAsc);
    } else {
      setSortField(field);
      setSortAsc(true);
    }
  };

  const handleDownloadCsv = () => {
    downloadFile(
      'food_calories.csv',
      generateFoodCaloriesCsv(),
      'text/csv'
    );
  };

  return (
    <div className="space-y-6">
      {/* Top Banner & Info Notice */}
      <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-xs">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-xl font-bold tracking-tight text-slate-900">
              Food-101 Nutrition & Calorie Database (All 101 Classes)
            </h1>
            <p className="mt-1 text-xs text-slate-600">
              Official mapping from Food-101 categories to standard calories per serving, calories per 100g, and macronutrients.
            </p>
          </div>
          <button
            onClick={handleDownloadCsv}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-white bg-slate-900 hover:bg-slate-800 rounded-lg transition-colors cursor-pointer shrink-0 shadow-xs"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Download food_calories.csv</span>
          </button>
        </div>

        {/* USDA Disclaimer Banner */}
        <div className="mt-4 flex items-start gap-2.5 p-3.5 bg-amber-50/70 border border-amber-200/80 rounded-lg text-xs text-amber-900">
          <Info className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
          <div className="leading-relaxed">
            <span className="font-semibold">Nutrition Verification Notice: </span>
            These values are approximate averages compiled from <strong>USDA FoodData Central</strong> and the <strong>Indian Food Composition Tables (IFCT)</strong>. Real dish calories fluctuate with recipe variation, cooking fats/oils, portion sizes, and side condiments. Always verify individual dietary calculations against verified medical nutrition databases.
          </div>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-4">
        {/* Search */}
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 absolute left-3 top-2.5 text-slate-400" />
          <input
            type="text"
            placeholder="Search dish name or class id..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full text-xs pl-9 pr-3 py-2 border border-slate-200 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-slate-900"
          />
        </div>

        {/* Category Filter */}
        <div className="flex items-center gap-2 w-full sm:w-auto">
          <Filter className="w-3.5 h-3.5 text-slate-400 shrink-0" />
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="text-xs py-2 px-3 border border-slate-200 rounded-lg bg-white focus:outline-hidden focus:ring-2 focus:ring-slate-900"
          >
            {categories.map((c) => (
              <option key={c} value={c}>
                {c === 'All' ? 'All Categories (101 Foods)' : c}
              </option>
            ))}
          </select>
          <span className="text-xs text-slate-500 font-mono tabular-nums whitespace-nowrap">
            Showing {filteredItems.length} of {FOOD_ITEMS_101.length}
          </span>
        </div>
      </div>

      {/* High-Density Data Grid */}
      <div className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-slate-600 font-semibold">
                <th
                  onClick={() => handleSort('displayName')}
                  className="py-3 px-4 cursor-pointer hover:text-slate-900 whitespace-nowrap"
                >
                  <div className="flex items-center gap-1">
                    <span>Food Dish</span>
                    <ArrowUpDown className="w-3 h-3 text-slate-400" />
                  </div>
                </th>
                <th className="py-3 px-4 whitespace-nowrap">Class ID</th>
                <th className="py-3 px-4 whitespace-nowrap">Category</th>
                <th
                  onClick={() => handleSort('caloriesPerServing')}
                  className="py-3 px-4 text-right cursor-pointer hover:text-slate-900 whitespace-nowrap"
                >
                  <div className="flex items-center justify-end gap-1">
                    <span>Cal / Serving</span>
                    <ArrowUpDown className="w-3 h-3 text-slate-400" />
                  </div>
                </th>
                <th
                  onClick={() => handleSort('caloriesPer100g')}
                  className="py-3 px-4 text-right cursor-pointer hover:text-slate-900 whitespace-nowrap"
                >
                  <div className="flex items-center justify-end gap-1">
                    <span>Cal / 100g</span>
                    <ArrowUpDown className="w-3 h-3 text-slate-400" />
                  </div>
                </th>
                <th
                  onClick={() => handleSort('servingSizeG')}
                  className="py-3 px-4 text-right cursor-pointer hover:text-slate-900 whitespace-nowrap"
                >
                  <div className="flex items-center justify-end gap-1">
                    <span>Serving (g)</span>
                    <ArrowUpDown className="w-3 h-3 text-slate-400" />
                  </div>
                </th>
                <th className="py-3 px-4 text-right whitespace-nowrap">Protein</th>
                <th className="py-3 px-4 text-right whitespace-nowrap">Carbs</th>
                <th className="py-3 px-4 text-right whitespace-nowrap">Fat</th>
                <th className="py-3 px-4 whitespace-nowrap">USDA FoodData ID</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredItems.map((item) => (
                <tr key={item.id} className="hover:bg-slate-50/80 transition-colors">
                  <td className="py-3 px-4 font-semibold text-slate-800 whitespace-nowrap">
                    {item.displayName}
                  </td>
                  <td className="py-3 px-4 font-mono text-slate-500 text-[11px] whitespace-nowrap">
                    {item.id}
                  </td>
                  <td className="py-3 px-4 text-slate-600 whitespace-nowrap">
                    {item.category}
                  </td>
                  <td className="py-3 px-4 text-right font-mono font-bold text-slate-900 tabular-nums whitespace-nowrap">
                    {item.caloriesPerServing} kcal
                  </td>
                  <td className="py-3 px-4 text-right font-mono text-slate-700 tabular-nums whitespace-nowrap">
                    {item.caloriesPer100g}
                  </td>
                  <td className="py-3 px-4 text-right font-mono text-slate-600 tabular-nums whitespace-nowrap">
                    {item.servingSizeG} g
                  </td>
                  <td className="py-3 px-4 text-right font-mono text-slate-600 tabular-nums whitespace-nowrap">
                    {item.proteinG}g
                  </td>
                  <td className="py-3 px-4 text-right font-mono text-slate-600 tabular-nums whitespace-nowrap">
                    {item.carbsG}g
                  </td>
                  <td className="py-3 px-4 text-right font-mono text-slate-600 tabular-nums whitespace-nowrap">
                    {item.fatG}g
                  </td>
                  <td className="py-3 px-4 text-slate-400 text-[11px] truncate max-w-xs" title={item.usdaReference}>
                    {item.usdaReference.replace('USDA FDC ID: ', '')}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
