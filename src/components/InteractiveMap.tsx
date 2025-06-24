import React, { useState } from 'react';

const InteractiveMap = () => {
  const [selectedLocation, setSelectedLocation] = useState<string | null>(null);

  // Campus locations data with relative positions on the map
  const campusLocations = [
    { id: 'tower', name: 'UT Tower', x: 50, y: 45, category: 'landmark', description: 'Iconic UT Austin landmark and symbol' },
    { id: 'library', name: 'Perry-Castañeda Library', x: 48, y: 55, category: 'academic', description: 'Main library with study spaces and resources' },
    { id: 'union', name: 'Texas Union', x: 45, y: 40, category: 'dining', description: 'Student center with dining and activities' },
    { id: 'rec', name: 'Gregory Gym', x: 60, y: 65, category: 'recreation', description: 'Campus recreation and fitness center' },
    { id: 'health', name: 'University Health Services', x: 70, y: 25, category: 'health', description: 'Student health and wellness services' },
    { id: 'registrar', name: 'Office of the Registrar', x: 42, y: 70, category: 'admin', description: 'Student records and enrollment services' }
  ];

  const getLocationById = (id: string) => {
    return campusLocations.find(loc => loc.id === id);
  };

  const getCategoryColor = (category: string) => {
    const colors = {
      landmark: 'bg-purple-100 text-purple-600',
      academic: 'bg-blue-100 text-blue-600',
      dining: 'bg-green-100 text-green-600',
      recreation: 'bg-orange-100 text-orange-600',
      health: 'bg-red-100 text-red-600',
      admin: 'bg-gray-100 text-gray-600'
    };
    return colors[category as keyof typeof colors] || 'bg-gray-100 text-gray-600';
  };

  return (
    <div className="relative w-full h-96 bg-gray-100 rounded-lg overflow-hidden shadow-lg">
      {/* Campus Map Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-green-100 to-green-200">
        {/* Campus paths/roads */}
        <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
          <defs>
            <pattern id="grass" patternUnits="userSpaceOnUse" width="4" height="4">
              <rect width="4" height="4" fill="#dcfce7"/>
              <circle cx="2" cy="2" r="0.5" fill="#bbf7d0" opacity="0.5"/>
            </pattern>
          </defs>
          
          {/* Campus background */}
          <rect width="100" height="100" fill="url(#grass)"/>
          
          {/* Main paths */}
          <path d="M20,50 Q50,45 80,50" stroke="#9ca3af" strokeWidth="2" fill="none" opacity="0.7"/>
          <path d="M50,20 Q45,50 50,80" stroke="#9ca3af" strokeWidth="2" fill="none" opacity="0.7"/>
          <path d="M30,30 Q60,40 70,70" stroke="#9ca3af" strokeWidth="1.5" fill="none" opacity="0.5"/>
          
          {/* Buildings (simplified rectangles) */}
          <rect x="45" y="40" width="10" height="8" fill="#f3f4f6" stroke="#d1d5db" strokeWidth="0.5" rx="1"/>
          <rect x="42" y="65" width="8" height="6" fill="#f3f4f6" stroke="#d1d5db" strokeWidth="0.5" rx="1"/>
          <rect x="55" y="60" width="12" height="10" fill="#f3f4f6" stroke="#d1d5db" strokeWidth="0.5" rx="1"/>
          <rect x="65" y="20" width="10" height="8" fill="#f3f4f6" stroke="#d1d5db" strokeWidth="0.5" rx="1"/>
        </svg>

        {/* Location Markers */}
        {campusLocations.map((location) => (
          <button
            key={location.id}
            className="absolute w-8 h-8 bg-orange-500 rounded-full border-2 border-white shadow-lg cursor-pointer flex items-center justify-center hover:bg-orange-600 transition-all duration-200 transform hover:scale-110 z-10"
            style={{
              left: `${location.x}%`,
              top: `${location.y}%`,
              transform: 'translate(-50%, -50%)'
            }}
            onClick={() => setSelectedLocation(location.id)}
          >
            <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
            </svg>
          </button>
        ))}

        {/* Compass */}
        <div className="absolute top-4 right-4 bg-white/90 rounded-full p-2 shadow-md">
          <div className="w-8 h-8 relative">
            <div className="absolute inset-0 flex items-center justify-center text-xs font-bold text-gray-600">N</div>
            <div className="absolute top-1 left-1/2 w-0 h-0 border-l-2 border-r-2 border-b-4 border-transparent border-b-red-500 transform -translate-x-1/2"></div>
          </div>
        </div>
      </div>

      {/* Location Details Card */}
      {selectedLocation && (
        <div className="absolute top-4 left-4 right-4 z-20">
          <div className="rounded-lg border bg-card text-card-foreground shadow-sm bg-white/95 backdrop-blur-sm">
            <div className="p-4">
              {(() => {
                const location = getLocationById(selectedLocation);
                if (!location) return null;
                
                return (
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-2">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getCategoryColor(location.category)}`}>
                          {location.category}
                        </span>
                      </div>
                      <h4 className="font-semibold text-gray-900 mb-1">{location.name}</h4>
                      <p className="text-sm text-gray-600">{location.description}</p>
                    </div>
                    <button
                      onClick={() => setSelectedLocation(null)}
                      className="ml-2 inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:bg-accent hover:text-accent-foreground h-9 rounded-md px-3"
                    >
                      <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"/>
                      </svg>
                    </button>
                  </div>
                );
              })()}
            </div>
          </div>
        </div>
      )}
      
      {/* Instructions */}
      <div className="absolute bottom-4 left-4 right-4 z-10">
        <div className="rounded-lg border bg-card text-card-foreground shadow-sm bg-white/95 backdrop-blur-sm">
          <div className="p-3">
            <p className="text-xs text-gray-600 text-center">
              Click on the orange markers to explore campus locations
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InteractiveMap;