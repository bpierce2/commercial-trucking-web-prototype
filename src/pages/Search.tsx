import React, { useState, useEffect } from 'react';
import { Search as SearchIcon, Scan } from 'lucide-react';
import { Header } from '../components/layout/Header';
import { BottomNav } from '../components/layout/BottomNav';
import { PageWrapper } from '../components/layout/PageWrapper';
import { EquipmentCard } from '../components/cards/EquipmentCard';
import { Input } from '../components/ui/Input';
import { useData } from '../hooks/useData';
import type { Equipment } from '../types';

export function Search() {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<Equipment[]>([]);
  const { searchEquipment } = useData();
  
  useEffect(() => {
    const results = searchEquipment(searchQuery);
    setSearchResults(results);
  }, [searchQuery, searchEquipment]);
  
  const handleScanClick = () => {
    console.log('Scanner functionality would be implemented here');
    // Placeholder for scanner integration
  };
  
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };
  
  const showEmptyState = searchQuery.trim() === '';
  const showNoResults = searchQuery.trim() !== '' && searchResults.length === 0;
  
  return (
    <>
      <Header title="Search Equipment" />
      
      <PageWrapper>
        <div className="p-4">
          {/* Search Input */}
          <div className="relative mb-6">
            <Input
              type="text"
              placeholder="Search equipment by number or scan..."
              value={searchQuery}
              onChange={handleSearchChange}
              icon={SearchIcon}
              className="pr-12"
            />
            <button
              onClick={handleScanClick}
              className="
                absolute 
                right-3 
                top-1/2 
                transform 
                -translate-y-1/2 
                p-2 
                text-gray-400 
                hover:text-gray-600 
                hover:bg-gray-100 
                rounded-lg 
                transition-colors
              "
              aria-label="Scan barcode"
            >
              <Scan className="w-5 h-5" />
            </button>
          </div>
          
          {/* Empty State */}
          {showEmptyState && (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <div className="mb-4">
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto">
                  <SearchIcon className="w-8 h-8 text-gray-400" />
                </div>
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                Search Equipment
              </h3>
              <p className="text-gray-500 max-w-sm">
                Enter equipment number or scan to search for equipment that needs condition reports.
              </p>
            </div>
          )}
          
          {/* No Results State */}
          {showNoResults && (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <div className="mb-4">
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto">
                  <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 12h6m-6-4h6m2 5.291A7.962 7.962 0 0120 12a8 8 0 10-2.343 5.657l2.343 2.343" />
                  </svg>
                </div>
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                No Results Found
              </h3>
              <p className="text-gray-500 max-w-sm">
                No equipment found matching "{searchQuery}". Try a different equipment number or scan a barcode.
              </p>
            </div>
          )}
          
          {/* Search Results */}
          {searchResults.length > 0 && (
            <div className="space-y-4">
              <p className="text-gray-600 mb-4">
                {searchResults.length} result{searchResults.length !== 1 ? 's' : ''} found
              </p>
              
              {searchResults.map((equipment) => (
                <EquipmentCard
                  key={equipment.id}
                  equipment={equipment}
                  showTypeBadge={true}
                  showCompletionBadge={true}
                />
              ))}
            </div>
          )}
        </div>
      </PageWrapper>
      
      <BottomNav />
    </>
  );
}