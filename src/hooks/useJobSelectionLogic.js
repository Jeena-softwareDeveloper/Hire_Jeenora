import { useState, useMemo } from 'react';

export const useJobSelectionLogic = (jobList, onJobSelect, initialSingleView) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [filters, setFilters] = useState({
        location: 'all', experience: 'all', salary: 'all', jobType: 'all', category: 'all'
    });
    const [showAIRecommendations, setShowAIRecommendations] = useState(true);
    const [isExpanded, setIsExpanded] = useState(!initialSingleView);
    const [favoriteJobs, setFavoriteJobs] = useState(new Set());

    const toggleFavorite = (jobId, e) => {
        e.stopPropagation();
        setFavoriteJobs(prev => {
            const next = new Set(prev);
            if (next.has(jobId)) next.delete(jobId); else next.add(jobId);
            return next;
        });
    };

    const clearFilters = () => {
        setSearchTerm(''); setFilters({ location: 'all', experience: 'all', salary: 'all', jobType: 'all', category: 'all' });
    };

    const filteredJobs = useMemo(() => {
        let filtered = jobList.filter(job => {
            const query = searchTerm.toLowerCase();
            const jobSkills = job.skills || job.requirements?.mustHave || [];
            const matchesSearch = job.title.toLowerCase().includes(query) || (job.company.name || job.company).toLowerCase().includes(query) || jobSkills.some(s => s.toLowerCase().includes(query));
            const matchesLocation = filters.location === 'all' || (job.location.city || job.location) === filters.location;
            return matchesSearch && matchesLocation;
        });
        if (showAIRecommendations) {
            filtered = filtered.map(j => ({ ...j, matchScore: j.matchScore || Math.floor(Math.random() * 20) + 80 }));
            filtered.sort((a, b) => b.matchScore - a.matchScore);
        }
        return filtered;
    }, [searchTerm, filters, showAIRecommendations, jobList]);

    return {
        searchTerm, setSearchTerm, filters, setFilters, showAIRecommendations, setShowAIRecommendations,
        isExpanded, setIsExpanded, favoriteJobs, toggleFavorite, clearFilters, filteredJobs
    };
};
