import React from 'react';
import { FaTimes } from 'react-icons/fa';

const ResumeEditorFilters = ({ filters, setFilters, clearFilters, specializations }) => {
    return (
        <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 mb-6">
            <div className="flex justify-between items-center mb-4"><h3 className="font-semibold text-gray-900">Advanced Filters</h3><button onClick={clearFilters} className="text-sm text-green-800 flex gap-1 items-center"><FaTimes /> Clear All</button></div>
            <div className="flex flex-col md:flex-row flex-wrap gap-6">
                <div className="flex-1 min-w-[200px]"><label className="block text-sm font-medium text-gray-700 mb-2">Rating</label>
                    <select value={filters.minRating} onChange={(e) => setFilters(p => ({ ...p, minRating: +e.target.value }))} className="w-full border rounded-lg px-3 py-2"><option value={0}>Any</option><option value={4}>4+</option><option value={4.5}>4.5+</option></select>
                </div>
                <div className="flex-1 min-w-[200px]"><label className="block text-sm font-medium text-gray-700 mb-2">Max Credits: {filters.maxPrice}</label>
                    <input type="range" min="500" max="1000000" step="500" value={filters.maxPrice} onChange={(e) => setFilters(p => ({ ...p, maxPrice: +e.target.value }))} className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer green-slider" />
                </div>
                <div className="flex-1 min-w-[200px]"><label className="block text-sm font-medium text-gray-700 mb-2">Delivery</label>
                    <select value={filters.deliveryTime} onChange={(e) => setFilters(p => ({ ...p, deliveryTime: e.target.value }))} className="w-full border rounded-lg px-3 py-2"><option value="all">Any</option><option value="24h">24h</option><option value="48h">48h</option></select>
                </div>
                <div className="flex-1 min-w-[200px]"><label className="block text-sm font-medium text-gray-700 mb-2">Specialization</label>
                    <select value={filters.specialization} onChange={(e) => setFilters(p => ({ ...p, specialization: e.target.value }))} className="w-full border rounded-lg px-3 py-2">{specializations.map(s => <option key={s} value={s}>{s === 'all' ? 'All' : s}</option>)}</select>
                </div>
            </div>
        </div>
    );
};

export default ResumeEditorFilters;
