import { useState, useMemo } from 'react';

export const useResumeEditorListLogic = (editors) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [showFilters, setShowFilters] = useState(false);
    const [filters, setFilters] = useState({
        minRating: 0, maxPrice: 1000000, deliveryTime: 'all', specialization: 'all', sortBy: 'rating'
    });

    const specializations = useMemo(() => ['all', ...new Set(editors.map(e => e.specialization))], [editors]);

    const filteredEditors = useMemo(() => {
        if (!editors || !Array.isArray(editors)) return [];
        let filtered = editors.filter(e => {
            const matchesSearch = e.name?.toLowerCase().includes(searchTerm.toLowerCase()) || e.specialization?.toLowerCase().includes(searchTerm.toLowerCase()) || e.expertise?.some(s => s.toLowerCase().includes(searchTerm.toLowerCase()));
            const matchesRating = e.rating >= filters.minRating;
            const matchesPrice = e.price <= filters.maxPrice;
            const matchesSpec = filters.specialization === 'all' || e.specialization === filters.specialization;
            let matchesDelivery = true;
            if (filters.deliveryTime !== 'all') matchesDelivery = e.deliveryTime?.includes(filters.deliveryTime.replace('h', ''));
            return matchesSearch && matchesRating && matchesPrice && matchesSpec && matchesDelivery;
        });
        filtered.sort((a, b) => {
            if (filters.sortBy === 'rating') return b.rating - a.rating;
            if (filters.sortBy === 'price_low') return a.price - b.price;
            if (filters.sortBy === 'price_high') return b.price - a.price;
            if (filters.sortBy === 'experience') return (b.completedJobs || 0) - (a.completedJobs || 0);
            if (filters.sortBy === 'delivery') return (parseInt(a.deliveryTime) || 0) - (parseInt(b.deliveryTime) || 0);
            return 0;
        });
        return filtered;
    }, [editors, searchTerm, filters]);

    const clearFilters = () => setFilters({ minRating: 0, maxPrice: 1000000, deliveryTime: 'all', specialization: 'all', sortBy: 'rating' });

    return {
        searchTerm, setSearchTerm, filters, setFilters, showFilters, setShowFilters,
        specializations, filteredEditors, clearFilters,
        activeFilterCount: Object.values(filters).filter(v => v !== 0 && v !== 'all' && v !== 'rating').length
    };
};
