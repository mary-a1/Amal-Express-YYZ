'use client';
import React, { useState, useEffect, useRef } from 'react';
import { MapPin, Search, Phone, Navigation, X } from 'lucide-react';

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
  const [selectedProvince, setSelectedProvince] = useState('all');
  const [selectedAgent, setSelectedAgent] = useState(null);
  const [userLocation, setUserLocation] = useState(null);
  const [map, setMap] = useState(null);
  const [leaflet, setLeaflet] = useState(null);
  const mapContainerRef = useRef(null);
  const markersRef = useRef([]);

  // Load Leaflet dynamically
  useEffect(() => {
    if (typeof window !== 'undefined' && !window.L) {
      // Load Leaflet CSS
      const link = document.createElement('link');
      link.rel = 'stylesheet';
      link.href = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css';
      document.head.appendChild(link);

      // Load Leaflet JS
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

    const newMap = leaflet.map(mapContainerRef.current).setView([45.5, -75.5], 6);

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

    // Clear existing markers
    markersRef.current.forEach(marker => marker.remove());
    markersRef.current = [];

    // Filter agents
    const filtered = filteredAgents;

    if (filtered.length === 0) return;

    // Create custom icon
    const customIcon = leaflet.divIcon({
      className: 'custom-marker',
      html: `<div style="background-color: #2563eb; width: 32px; height: 32px; border-radius: 50% 50% 50% 0; transform: rotate(-45deg); border: 3px solid white; box-shadow: 0 2px 8px rgba(0,0,0,0.3);"><div style="transform: rotate(45deg); width: 100%; height: 100%; display: flex; align-items: center; justify-content: center; color: white; font-size: 16px;">📍</div></div>`,
      iconSize: [32, 32],
      iconAnchor: [16, 32],
      popupAnchor: [0, -32]
    });

    // Add markers for filtered agents
    filtered.forEach(agent => {
      const marker = leaflet.marker([agent.lat, agent.lng], { icon: customIcon })
        .addTo(map);

      const popupContent = `
        <div style="min-width: 200px;">
          <h3 style="font-weight: bold; margin-bottom: 8px; color: #1f2937;">${agent.name}</h3>
          <p style="font-size: 14px; color: #4b5563; margin-bottom: 4px;">${agent.address}</p>
          <p style="font-size: 14px; color: #4b5563; margin-bottom: 8px;">${agent.city}, ${agent.province} ${agent.postalCode}</p>
          <p style="font-size: 14px; color: #2563eb; margin-bottom: 8px;">📞 ${agent.phone}</p>
          <a href="https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(agent.address + ', ' + agent.city + ', ' + agent.province)}" 
             target="_blank" 
             style="display: inline-block; background-color: #2563eb; color: white; padding: 6px 12px; border-radius: 6px; text-decoration: none; font-size: 14px;">
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

    // Fit bounds to show all markers
    if (filtered.length > 0) {
      const bounds = leaflet.latLngBounds(filtered.map(a => [a.lat, a.lng]));
      map.fitBounds(bounds, { padding: [50, 50] });
    }
  }, [map, leaflet, searchTerm, selectedProvince]);

  // Zoom to selected agent
  useEffect(() => {
    if (selectedAgent && map) {
      map.setView([selectedAgent.lat, selectedAgent.lng], 15);
    }
  }, [selectedAgent, map]);

  // Filter agents based on search and province
  const filteredAgents = agents.filter(agent => {
    const matchesSearch =
      agent.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      agent.city.toLowerCase().includes(searchTerm.toLowerCase()) ||
      agent.address.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesProvince = selectedProvince === 'all' || agent.province === selectedProvince;

    return matchesSearch && matchesProvince;
  });

  // Get user's location
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
            // Add user location marker
            const userIcon = leaflet.divIcon({
              className: 'user-marker',
              html: `<div style="background-color: #10b981; width: 20px; height: 20px; border-radius: 50%; border: 3px solid white; box-shadow: 0 2px 8px rgba(0,0,0,0.3);"></div>`,
              iconSize: [20, 20],
              iconAnchor: [10, 10]
            });

            leaflet.marker([userPos.lat, userPos.lng], { icon: userIcon })
              .addTo(map)
              .bindPopup('You are here')
              .openPopup();

            map.setView([userPos.lat, userPos.lng], 12);
          }
        },
        (error) => {
          console.log('Location access denied');
        }
      );
    }
  };

  // Calculate distance between two points
  const calculateDistance = (lat1, lon1, lat2, lon2) => {
    const R = 6371; // Earth's radius in km
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLon = (lon2 - lon1) * Math.PI / 180;
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
      Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
  };

  // Sort by distance if user location is available
  const sortedAgents = userLocation
    ? [...filteredAgents].sort((a, b) => {
      const distA = calculateDistance(userLocation.lat, userLocation.lng, a.lat, a.lng);
      const distB = calculateDistance(userLocation.lat, userLocation.lng, b.lat, b.lng);
      return distA - distB;
    })
    : filteredAgents;

  const getDirections = (agent) => {
    const address = encodeURIComponent(`${agent.address}, ${agent.city}, ${agent.province} ${agent.postalCode}`);
    window.open(`https://www.google.com/maps/dir/?api=1&destination=${address}`, '_blank');
  };

  return (
    <div id="locations" className="w-full min-h-screen bg-transparent">
      {/* Header */}
      <div className="bg-transparent px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col gap-4">
          <h1 className="text-yellow-400 text-3xl sm:text-4xl lg:text-5xl font-bold text-center">
            Find a Location Near You <br />
            <span className=" w-fit text-center bg-yellow-400 text-black font-bold text-lg px-4 py-1.5 rounded-full tracking-wider">
              In Canada 🇨🇦
            </span>
          </h1>

        </div>
        <div>

        </div>
      </div>

      {/* Main Content */}
      <div className="w-full px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Sidebar - Search & Results */}
          <div className="w-full lg:w-1/3 space-y-4">
            {/* Search Box */}
            <div className="space-y-4">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search by City or Agent Name"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-14 pr-6 py-4 bg-transparent border-2 border-orange-300 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-blue-500 text-lg"
                />
              </div>

              {/* Province Filter */}
              <div>
                <label className="block text-sm font-medium text-white mb-2">
                  Filter by Province
                </label>
                <select
                  value={selectedProvince}
                  onChange={(e) => setSelectedProvince(e.target.value)}
                  className="w-full px-3 py-2 bg-[#0D0C1D] text-white border border-orange-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="all">All Provinces</option>
                  <option value="ON">Ontario</option>
                  <option value="AB">Alberta</option>
                </select>
              </div>

              {/* Use My Location Button */}
              <button
                onClick={getUserLocation}
                className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-yellow-400 text-black font-semibold rounded-lg hover:bg-yellow-500 transition-colors"
              >
                <Navigation className="h-5 w-5" />
                Use My Location
              </button>

              <p className="text-lg text-gray-400">
                {sortedAgents.length} agent{sortedAgents.length !== 1 ? 's' : ''} found
              </p>
            </div>

            {/* Agent List */}
            <div className="space-y-3 max-h-[600px] overflow-y-auto pr-2">
              {sortedAgents.map((agent) => {
                const distance = userLocation
                  ? calculateDistance(userLocation.lat, userLocation.lng, agent.lat, agent.lng)
                  : null;

                return (
                  <div
                    key={agent.agentId}
                    onClick={() => setSelectedAgent(agent)}
                    className={`bg-[#0D0C1D] border-2 border-orange-300 rounded-lg shadow-md p-4 cursor-pointer transition-all hover:shadow-lg ${selectedAgent?.agentId === agent.agentId ? 'ring-2 ring-blue-500' : ''
                      }`}
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex-1">
                        <h3 className="font-semibold text-white text-xl">{agent.name}</h3>
                        <p className="text-lg text-gray-400 mt-1">{agent.address}</p>
                        <p className="text-lg text-gray-400">
                          {agent.city}, {agent.province} {agent.postalCode}
                        </p>
                        <div className="flex items-center gap-2 mt-2">
                          <Phone className="h-4 w-4 text-yellow-400" />
                          <a
                            href={`tel:${agent.phone}`}
                            className="text-sm text-yellow-400 hover:underline"
                            onClick={(e) => e.stopPropagation()}
                          >
                            {agent.phone}
                          </a>
                        </div>
                        {distance && (
                          <p className="text-sm text-green-400 font-medium mt-2">
                            {distance.toFixed(1)} km away
                          </p>
                        )}
                      </div>
                      <MapPin className="h-5 w-5 text-blue-500 flex-shrink-0" />
                    </div>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        getDirections(agent);
                      }}
                      className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-semibold"
                    >
                      Get Directions
                    </button>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Map */}
          <div className="w-full lg:w-2/3">
            <div className="bg-transparent rounded-2xl overflow-hidden h-[500px] lg:h-[700px]">
              <div
                ref={mapContainerRef}
                className="w-full h-full rounded-2xl overflow-hidden"
                style={{ minHeight: '700px' }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};