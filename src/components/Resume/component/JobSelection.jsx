import React from 'react';
import { FaBriefcase, FaTimes } from 'react-icons/fa';
import { useJobSelectionLogic } from '../../../hooks/useJobSelectionLogic';
import JobSelectionFilters from './JobSelectionFilters';
import JobSelectionCard from './JobSelectionCard';

const JobSelection = ({ selectedJob, onJobSelect, initialSingleView = false, jobs = [] }) => {
  const {
    searchTerm, setSearchTerm, filters, setFilters, showAIRecommendations, setShowAIRecommendations,
    isExpanded, setIsExpanded, favoriteJobs, toggleFavorite, clearFilters, filteredJobs
  } = useJobSelectionLogic(jobs, onJobSelect, initialSingleView);

  const locations = ['all', ...new Set(jobs.map(j => j.location.city || j.location))];
  const experiences = ['all', '0-2 years', '2-5 years', '5-8 years', '8+ years'];
  const jobTypes = ['all', 'Full-time', 'Part-time', 'Contract', 'Internship', 'Remote'];
  const jobCategories = ['All Categories', 'Software Development', 'Data Science', 'Product Management', 'Design', 'Sales', 'Marketing'];

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 font-['Outfit']">
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-6 gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">{!isExpanded ? 'Target Job' : 'Select Target Job'}</h2>
          <p className="text-gray-600 mt-1">{!isExpanded ? 'Tailoring specifically for this position' : 'Choose the job you want to tailor for'}</p>
        </div>
        <div className="text-sm text-gray-500">{filteredJobs.length} jobs found</div>
      </div>

      {isExpanded && (
        <JobSelectionFilters
          searchTerm={searchTerm} setSearchTerm={setSearchTerm}
          filters={filters} setFilters={setFilters} clearFilters={clearFilters}
          showAIRecommendations={showAIRecommendations} setShowAIRecommendations={setShowAIRecommendations}
          locations={locations} jobTypes={jobTypes} experiences={experiences} jobCategories={jobCategories}
        />
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-h-96 overflow-y-auto custom-scrollbar p-2">
        {(isExpanded ? filteredJobs : (selectedJob ? [selectedJob] : [filteredJobs[0]])).map(job => (
          <JobSelectionCard
            key={job.id || job._id} job={job} isSelected={selectedJob?.id === job.id || selectedJob?._id === job._id}
            onClick={onJobSelect} toggleFavorite={toggleFavorite} showAI={showAIRecommendations}
            isFavorite={favoriteJobs.has(job.id || job._id)}
          />
        ))}
      </div>

      {!isExpanded && (
        <div className="text-center mt-6">
          <button onClick={() => setIsExpanded(true)} className="border border-gray-300 text-gray-700 font-semibold py-2 px-6 rounded-lg hover:bg-gray-50">Show Other Jobs</button>
        </div>
      )}

      {filteredJobs.length === 0 && (
        <div className="text-center py-12">
          <FaBriefcase className="text-gray-400 text-4xl mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-gray-900 mb-2">No jobs found</h3>
          <button onClick={clearFilters} className="bg-green-800 text-white px-6 py-3 rounded-lg hover:bg-green-700 mt-4">Clear All Filters</button>
        </div>
      )}
    </div>
  );
};

export default JobSelection;