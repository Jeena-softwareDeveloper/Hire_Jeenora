import React from 'react';
import { FaSearch, FaFilter, FaSortAmountDown } from 'react-icons/fa';
import ResumeEditor from './ResumeEditor';
import { useGetAllEditors } from '../../../hooks/useResumeEditor';
import { useResumeEditorListLogic } from '../../../hooks/useResumeEditorListLogic';
import ResumeEditorFilters from './ResumeEditorFilters';

const ResumeEditorList = ({ onSelectEditor, selectedEditor, onViewProfile }) => {
  const { data: editorsData } = useGetAllEditors();
  const editors = editorsData || [];

  const {
    searchTerm, setSearchTerm, filters, setFilters, showFilters, setShowFilters,
    specializations, filteredEditors, clearFilters, activeFilterCount
  } = useResumeEditorListLogic(editors);

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 font-['Outfit']">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Professional Resume Editors</h2>

      <div className="flex flex-col lg:flex-row gap-4 mb-6">
        <div className="flex-1 relative">
          <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input type="text" placeholder="Search editors..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-green-800" />
        </div>
        <div className="flex gap-4">
          <div className="relative w-48">
            <FaSortAmountDown className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <select value={filters.sortBy} onChange={(e) => setFilters(p => ({ ...p, sortBy: e.target.value }))} className="w-full pl-10 pr-4 py-3 border rounded-lg appearance-none">
              <option value="rating">Rating</option><option value="price_low">Credits: Low to High</option><option value="experience">Experience</option>
            </select>
          </div>
          <button onClick={() => setShowFilters(!showFilters)} className="flex items-center gap-2 border rounded-lg px-4 py-3 hover:bg-gray-50 relative">
            <FaFilter /> Filters {activeFilterCount > 0 && <span className="absolute -top-2 -right-2 bg-green-800 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">{activeFilterCount}</span>}
          </button>
        </div>
      </div>

      {showFilters && <ResumeEditorFilters filters={filters} setFilters={setFilters} clearFilters={clearFilters} specializations={specializations} />}

      <div className="space-y-4">
        {filteredEditors.map(editor => <ResumeEditor key={editor._id} editor={editor} isSelected={selectedEditor?.id === editor.id} onSelect={onSelectEditor} onViewProfile={onViewProfile} />)}
      </div>

      {filteredEditors.length === 0 && (
        <div className="text-center py-16">
          <FaSearch className="text-gray-400 text-4xl mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-gray-900">No editors found</h3>
          <button onClick={clearFilters} className="bg-green-800 text-white px-6 py-2 rounded-lg mt-4">Clear All</button>
        </div>
      )}
    </div>
  );
};

export default ResumeEditorList;