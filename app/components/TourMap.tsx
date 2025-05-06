'use client';

import { MapContainer, TileLayer, Polyline, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import './MapStyles.css';

// Fix for default marker icons in Next.js
import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png';
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';

// @ts-expect-error
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIcon2x.src,
  iconUrl: markerIcon.src,
  shadowUrl: markerShadow.src,
});

// Create a custom icon
const createCustomIcon = (index: number, tourId?: string) => {
  // If it's the first point and we have a tourId, use the custom marker image
  if (index === 0 && tourId) {
    // Map tour IDs to their corresponding marker images
    const markerImages: Record<string, string> = {
      'historic-first-district': '/markers/first-district_marker.jpg',
      'schonbrunn-gardens': '/markers/schonbrunn-marker.jpg',
      'prater-adventure': '/markers/prater_marker.jpg',
      'murales-1070': '/markers/murales-1070_marker.jpg',
    };

    const iconUrl = markerImages[tourId] || '';
    
    if (iconUrl) {
      return L.divIcon({
        className: 'custom-image-marker',
        html: `
          <div class="relative transition-transform duration-300 hover:scale-[5]" style="transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);">
            <img 
              src="${iconUrl}" 
              class="w-10 h-10 rounded-full border-2 border-white shadow-lg"
            />
          </div>
        `,
        iconSize: [40, 40],
        iconAnchor: [20, 40],
        popupAnchor: [0, -40]
      });
    }
  }
  
  // Default circle marker for waypoints or if no custom image found
  return L.divIcon({
    className: 'custom-marker',
    html: `
      <div 
        class="rounded-full border-2 border-white shadow-lg transition-transform duration-300 hover:scale-[5]"
        style="background-color: ${index === 0 ? '#3b82f6' : '#10b981'}; width: 24px; height: 24px; transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);"
      ></div>
    `,
    iconSize: [24, 24],
    iconAnchor: [12, 12],
    popupAnchor: [0, -12]
  });
};

interface TourMapProps {
  route: [number, number][];
  meetingPoint: string;
  tourId?: string;
  waypointNames?: Record<number, string>;
}

export default function TourMap({ route, meetingPoint, tourId, waypointNames = {} }: TourMapProps) {
  if (!route || route.length === 0) {
    return <div className="h-64 bg-gray-100 flex items-center justify-center">
      <p>Map loading...</p>
    </div>;
  }

  return (
    <MapContainer
      center={route[0]}
      zoom={14}
      className="h-full w-full"
      style={{ minHeight: '256px' }}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      <Polyline 
        positions={route} 
        color="#3b82f6" 
        weight={4}
        opacity={0.7}
      />
      {route.map((position, index) => (
        <Marker 
          key={`marker-${index}`} 
          position={position}
          icon={createCustomIcon(index, tourId)}
        >
          <Popup>
            {index === 0 
              ? `Start: ${meetingPoint}`
              : waypointNames[index] || `Waypoint ${index}`}
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}
