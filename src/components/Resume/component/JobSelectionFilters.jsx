import React from 'react';
import { FaSearch, FaFilter, FaTimes, FaLightbulb } from 'react-icons/fa';

const JobSelectionFilters = ({ searchTerm, setSearchTerm, filters, setFilters, clearFilters, showAIRecommendations, setShowAIRecommendations, locations, jobTypes, experiences, jobCategories }) => {
    return (
        <div className="space-y-4">
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 mb-6">
                <div className="lg:col-span-2 relative">
                    <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input type="text" placeholder="Search title, company, or skills..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-800" />
                </div>
                <div className="relative">
                    <FaFilter className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                    <select value={filters.category} onChange={(e) => setFilters(prev => ({ ...prev, category: e.target.value }))} className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg appearance-none">
                        {jobCategories.map(cat => <option key={cat} value={cat === 'All Categories' ? 'all' : cat}>{cat}</option>)}
                    </select>
                </div>
                <div className="flex gap-2">
                    <button onClick={clearFilters} className="flex-1 border border-gray-300 rounded-lg px-4 py-3 flex gap-2 items-center justify-center hover:bg-gray-50"><FaTimes /> Clear</button>
                    <button onClick={() => setShowAIRecommendations(!showAIRecommendations)} className={`flex-1 rounded-lg px-4 py-3 flex gap-2 items-center justify-center ${showAIRecommendations ? 'bg-green-800 text-white' : 'bg-gray-100 text-gray-700'}`}><FaLightbulb /> AI</button>
                </div>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                <select value={filters.location} onChange={(e) => setFilters(prev => ({ ...prev, location: e.target.value }))} className="border border-gray-300 rounded-lg px-3 py-2">
                    <option value="all">All Locations</option>
                    {locations.filter(l => l !== 'all').map(loc => <option key={loc} value={loc}>{loc}</option>)}
                </select>
                <select value={filters.jobType} onChange={(e) => setFilters(prev => ({ ...prev, jobType: e.target.value }))} className="border border-gray-300 rounded-lg px-3 py-2">
                    <option value="all">All Types</option>
                    {jobTypes.filter(t => t !== 'all').map(t => <option key={t} value={t}>{t}</option>)}
                </select>
                <select value={filters.experience} onChange={(e) => setFilters(prev => ({ ...prev, experience: e.target.value }))} className="border border-gray-300 rounded-lg px-3 py-2">
                    <option value="all">All Experience</option>
                    {experiences.filter(exp => exp !== 'all').map(exp => <option key={exp} value={exp}>{exp}</option>)}
                </select>
                <select value={filters.salary} onChange={(e) => setFilters(prev => ({ ...prev, salary: e.target.value }))} className="border border-gray-300 rounded-lg px-3 py-2">
                    <option value="all">Any Salary</option>
                    <option value="0-5">Up to ₹5 LPA</option><option value="5-10">₹5-10 LPA</option><option value="10-15">₹10-15 LPA</option><option value="15+">₹15+ LPA</option>
                </select>
            </div>
        </div>
    );
};

export default JobSelectionFilters;

