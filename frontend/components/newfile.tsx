import React, { useState, useEffect, useRef } from 'react';
import { MapPin, Search, Phone, Navigation } from 'lucide-react';

// Your agents data with coordinates
const agents = [
  {
    agentId: "CA106",
    name: "Hussein Faadumo",
    address: "2086 Lawrence Avenue West, Unit 05",
    city: "Toronto",
    province: "ON",
    postalCode: "M9N 3Z9",
    phone: "647-219-8381",
    lat: 43.7184,
    lng: -79.5176
  },
  {
    agentId: "CA107",
    name: "Jama Khalif Ahmed",
    address: "1987 Kipling Avenue",
    city: "Toronto",
    province: "ON",
    postalCode: "M9W 1P4",
    phone: "416-890-1714",
    lat: 43.7373,
    lng: -79.5568
  },
  {
    agentId: "CA108",
    name: "Abokar Ibrahim",
    address: "6A-2387 Eglington Avenue East",
    city: "Scarborough",
    province: "ON",
    postalCode: "M1K 2M5",
    phone: "416-285-6809",
    lat: 43.7280,
    lng: -79.2644
  },
  {
    agentId: "CA110",
    name: "Mohamed Omar",
    address: "#101-4908, 17th St. SE",
    city: "Calgary",
    province: "AB",
    postalCode: "T2A 0V4",
    phone: "403-464-4376",
    lat: 50.9981,
    lng: -113.9758
  },
  {
    agentId: "CA111",
    name: "Awale Adan",
    address: "262 Parliament St",
    city: "Toronto",
    province: "ON",
    postalCode: "M5A 3A4",
    phone: "416-917-0823",
    lat: 43.6629,
    lng: -79.3676
  },
  {
    agentId: "CA113",
    name: "Mohamoud Osman I.",
    address: "328 7 St E #103",
    city: "Brooks",
    province: "AB",
    postalCode: "T1R 1B5",
    phone: "403-376-1885",
    lat: 50.5644,
    lng: -111.8989
  },
  {
    agentId: "CA116",
    name: "Jama Abdirizak",
    address: "1644 Bank St, Unit 9",
    city: "Ottawa",
    province: "ON",
    postalCode: "K1V 7Y6",
    phone: "613-260-1940",
    lat: 45.3847,
    lng: -75.6672
  },
  {
    agentId: "CA118",
    name: "Osman Fadumo",
    address: "14-9914 Morrison Street",
    city: "Fort McMurray",
    province: "AB",
    postalCode: "T9H 4A4",
    phone: "780-715-2233",
    lat: 56.7267,
    lng: -111.3790
  },
  {
    agentId: "CA122",
    name: "Abdulle Abdihakim Yusuf",
    address: "736 13 St N",
    city: "Lethbridge",
    province: "AB",
    postalCode: "T1H 2T1",
    phone: "403-894-8632",
    lat: 49.6956,
    lng: -112.8328
  },
  {
    agentId: "CA123",
    name: "God Liban Awaleh",
    address: "5-967 St. Laurent Blvd",
    city: "Ottawa",
    province: "ON",
    postalCode: "K1L 6Y3",
    phone: "613-462-1536",
    lat: 45.4215,
    lng: -75.6372
  }
];

export default function StoreLocator() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedProvince, setSelectedProvince] = useState('');
  const [selectedAgent, setSelectedAgent] = useState(null);
  const [userLocation, setUserLocation] = useState(null);
  const [map, setMap] = useState(null);
  const [leaflet, setLeaflet] = useState(null);
  const mapContainerRef = useRef(null);
  const markersRef = useRef([]);

  // Geocode search term to get coordinates
  const [searchCoords, setSearchCoords] = useState(null);

  // Simple postal code to coordinates matching (for MVP - matches agent postal codes)
  useEffect(() => {
    const trimmed = searchTerm.trim().toUpperCase();
    if (!trimmed || trimmed.length < 3) {
      setSearchCoords(null);
      return;
    }

    // First check if it matches any agent's postal code exactly or partially
    const matchedAgent = agents.find(a => 
      a.postalCode.toUpperCase().startsWith(trimmed) ||
      a.postalCode.toUpperCase().replace(/\s/g, '').startsWith(trimmed.replace(/\s/g, ''))
    );

    if (matchedAgent) {
      setSearchCoords({
        lat: matchedAgent.lat,
        lng: matchedAgent.lng
      });
      return;
    }

    // Check if it matches a city
    const cityMatch = agents.find(a => 
      a.city.toLowerCase().includes(trimmed.toLowerCase())
    );
    
    if (cityMatch) {
      setSearchCoords({
        lat: cityMatch.lat,
        lng: cityMatch.lng
      });
    } else {
      setSearchCoords(null);
    }
  }, [searchTerm]);

  // Load Leaflet dynamically
  useEffect(() => {
    if (typeof window !== 'undefined' && !window.L) {
      const link = document.createElement('link');
      link.rel = 'stylesheet';
      link.href = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css';
      document.head.appendChild(link);

      const script = document.createElement('script');
      script.src = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.js';
      script.onload = () => {
        setLeaflet(window.L);
      };
      document.head.appendChild(script);
    } else if (window.L) {
      setLeaflet(window.L);
    }
  }, []);

  // Initialize map
  useEffect(() => {
    if (!leaflet || !mapContainerRef.current || map) return;

    const newMap = leaflet.map(mapContainerRef.current, {
      zoomControl: true
    }).setView([56.1304, -106.3468], 4);

    leaflet.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap contributors',
      maxZoom: 19
    }).addTo(newMap);

    setMap(newMap);

    return () => {
      if (newMap) {
        newMap.remove();
      }
    };
  }, [leaflet]);

  // Add markers to map
  useEffect(() => {
    if (!map || !leaflet) return;

    markersRef.current.forEach(marker => marker.remove());
    markersRef.current = [];

    const filtered = sortedAgents;

    if (filtered.length === 0) return;

    const customIcon = leaflet.divIcon({
      className: 'custom-marker',
      html: `<div style="background-color: #2563eb; width: 40px; height: 40px; border-radius: 50% 50% 50% 0; transform: rotate(-45deg); border: 4px solid white; box-shadow: 0 4px 12px rgba(37, 99, 235, 0.4); display: flex; align-items: center; justify-content: center;"><svg style="transform: rotate(45deg); width: 20px; height: 20px; fill: white;" viewBox="0 0 24 24"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/></svg></div>`,
      iconSize: [40, 40],
      iconAnchor: [20, 40],
      popupAnchor: [0, -40]
    });

    filtered.forEach(agent => {
      const marker = leaflet.marker([agent.lat, agent.lng], { icon: customIcon })
        .addTo(map);

      const popupContent = `
        <div style="min-width: 220px; padding: 4px;">
          <h3 style="font-weight: 600; margin-bottom: 8px; color: #111827; font-size: 16px;">${agent.name}</h3>
          <p style="font-size: 14px; color: #6b7280; margin-bottom: 4px; line-height: 1.4;">${agent.address}</p>
          <p style="font-size: 14px; color: #6b7280; margin-bottom: 12px; line-height: 1.4;">${agent.city}, ${agent.province} ${agent.postalCode}</p>
          <a href="tel:${agent.phone}" style="display: flex; align-items: center; gap: 6px; font-size: 14px; color: #2563eb; margin-bottom: 12px; text-decoration: none;">
            <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24"><path d="M20.01 15.38c-1.23 0-2.42-.2-3.53-.56-.35-.12-.74-.03-1.01.24l-1.57 1.97c-2.83-1.35-5.48-3.9-6.89-6.83l1.95-1.66c.27-.28.35-.67.24-1.02-.37-1.11-.56-2.3-.56-3.53 0-.54-.45-.99-.99-.99H4.19C3.65 3 3 3.24 3 3.99 3 13.28 10.73 21 20.01 21c.71 0 .99-.63.99-1.18v-3.45c0-.54-.45-.99-.99-.99z"/></svg>
            ${agent.phone}
          </a>
          <a href="https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(agent.address + ', ' + agent.city + ', ' + agent.province)}" 
             target="_blank" 
             style="display: block; background-color: #fbbf24; color: #78350f; padding: 10px 16px; border-radius: 8px; text-decoration: none; font-size: 14px; font-weight: 600; text-align: center;">
            Get Directions
          </a>
        </div>
      `;

      marker.bindPopup(popupContent);
      
      marker.on('click', () => {
        setSelectedAgent(agent);
      });

      markersRef.current.push(marker);
    });

    if (filtered.length > 0) {
      const bounds = leaflet.latLngBounds(filtered.map(a => [a.lat, a.lng]));
      map.fitBounds(bounds, { padding: [50, 50], maxZoom: 12 });
    }
  }, [map, leaflet, sortedAgents]);

  useEffect(() => {
    if (selectedAgent && map) {
      map.setView([selectedAgent.lat, selectedAgent.lng], 13);
      
      const marker = markersRef.current.find(m => 
        m.getLatLng().lat === selectedAgent.lat && 
        m.getLatLng().lng === selectedAgent.lng
      );
      if (marker) {
        marker.openPopup();
      }
    }
  }, [selectedAgent, map]);

  const filteredAgents = agents.filter(agent => {
    const matchesSearch = !searchTerm ||
      agent.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      agent.city.toLowerCase().includes(searchTerm.toLowerCase()) ||
      agent.postalCode.toLowerCase().includes(searchTerm.toLowerCase()) ||
      agent.address.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesProvince = !selectedProvince || agent.province === selectedProvince;
    
    return matchesSearch && matchesProvince;
  });

  const getUserLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const userPos = {
            lat: position.coords.latitude,
            lng: position.coords.longitude
          };
          setUserLocation(userPos);
          
          if (map && leaflet) {
            const userIcon = leaflet.divIcon({
              className: 'user-marker',
              html: `<div style="background-color: #10b981; width: 24px; height: 24px; border-radius: 50%; border: 4px solid white; box-shadow: 0 2px 8px rgba(0,0,0,0.3);"></div>`,
              iconSize: [24, 24],
              iconAnchor: [12, 12]
            });
            
            leaflet.marker([userPos.lat, userPos.lng], { icon: userIcon })
              .addTo(map)
              .bindPopup('You are here')
              .openPopup();
            
            map.setView([userPos.lat, userPos.lng], 10);
          }
        },
        (error) => {
          alert('Unable to access your location. Please enable location services.');
        }
      );
    }
  };

  const calculateDistance = (lat1, lon1, lat2, lon2) => {
    const R = 6371;
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLon = (lon2 - lon1) * Math.PI / 180;
    const a = 
      Math.sin(dLat/2) * Math.sin(dLat/2) +
      Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
      Math.sin(dLon/2) * Math.sin(dLon/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    return R * c;
  };

  // Sort by distance if we have coordinates (from user location OR search)
  const activeCoords = userLocation || searchCoords;
  
  const sortedAgents = activeCoords 
    ? [...filteredAgents].sort((a, b) => {
        const distA = calculateDistance(activeCoords.lat, activeCoords.lng, a.lat, a.lng);
        const distB = calculateDistance(activeCoords.lat, activeCoords.lng, b.lat, b.lng);
        return distA - distB;
      })
    : filteredAgents;

  const getDirections = (agent) => {
    const address = encodeURIComponent(`${agent.address}, ${agent.city}, ${agent.province} ${agent.postalCode}`);
    window.open(`https://www.google.com/maps/dir/?api=1&destination=${address}`, '_blank');
  };

  return (
    <div className="flex h-screen" style={{ backgroundColor: '#0f172a' }}>
      {/* Left Sidebar */}
      <div className="w-full md:w-[480px] lg:w-[520px] overflow-y-auto flex-shrink-0 px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-5xl font-bold mb-3" style={{ color: '#fbbf24' }}>
            Find a Location Near You
          </h1>
          <p className="text-xl text-white">Search by city or postal code</p>
        </div>

        {/* Search Box */}
        <div className="mb-8">
          <div className="relative">
            <Search className="absolute left-5 top-1/2 transform -translate-y-1/2 h-6 w-6 text-gray-400" />
            <input
              type="text"
              placeholder="Search by city or postal code"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-14 pr-6 py-4 bg-transparent border-2 border-gray-600 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-blue-500 text-lg"
            />
          </div>
        </div>

        {/* Filter and Location Button */}
        <div className="space-y-4 mb-8">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Filter by Province
            </label>
            <select
              value={selectedProvince}
              onChange={(e) => setSelectedProvince(e.target.value)}
              className="w-full px-4 py-3 bg-transparent border-2 border-gray-600 rounded-xl text-white focus:outline-none focus:border-blue-500"
            >
              <option value="" className="bg-gray-800">All Provinces</option>
              <option value="ON" className="bg-gray-800">Ontario</option>
              <option value="AB" className="bg-gray-800">Alberta</option>
            </select>
          </div>

          <button
            onClick={getUserLocation}
            className="w-full flex items-center justify-center gap-2 px-6 py-4 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors font-medium text-lg"
          >
            <Navigation className="h-5 w-5" />
            Use My Location
          </button>
        </div>

        <p className="text-lg text-white mb-6">
          {sortedAgents.length} location{sortedAgents.length !== 1 ? 's' : ''} in Canada
        </p>

        {/* Agent List */}
        <div className="space-y-4">
          {sortedAgents.map((agent) => {
            const distance = (userLocation || searchCoords)
              ? calculateDistance((userLocation || searchCoords).lat, (userLocation || searchCoords).lng, agent.lat, agent.lng)
              : null;

            return (
              <div
                key={agent.agentId}
                className="bg-transparent border-2 border-gray-600 rounded-2xl p-6 cursor-pointer transition-all hover:border-blue-500"
                onClick={() => setSelectedAgent(agent)}
              >
                <div className="flex items-start justify-between mb-4">
                  <h3 className="text-2xl font-bold text-white">{agent.name}</h3>
                  <MapPin className="h-6 w-6 text-blue-500 flex-shrink-0 mt-1" />
                </div>
                
                <p className="text-lg text-white mb-2">
                  {agent.address}, {agent.city}, {agent.province} {agent.postalCode}
                </p>

                <a 
                  href={`tel:${agent.phone}`}
                  className="block text-xl text-white mb-4 hover:text-blue-400"
                  onClick={(e) => e.stopPropagation()}
                >
                  {agent.phone}
                </a>

                {distance && (
                  <p className="text-lg text-emerald-400 font-medium mb-4">
                    {distance.toFixed(1)} km away
                  </p>
                )}

                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    getDirections(agent);
                  }}
                  className="px-6 py-3 rounded-xl font-semibold text-lg transition-colors"
                  style={{ backgroundColor: '#fbbf24', color: '#0f172a' }}
                >
                  Get Directions
                </button>
              </div>
            );
          })}
        </div>
      </div>

      {/* Map - Floating with rounded border */}
      <div className="flex-1 relative p-6">
        <div 
          ref={mapContainerRef} 
          className="w-full h-full rounded-3xl overflow-hidden shadow-2xl"
          style={{ minHeight: '500px' }}
        />
      </div>
    </div>
  );
}