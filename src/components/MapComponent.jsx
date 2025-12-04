import React from 'react';
import { MapContainer, TileLayer, Marker, Popup, Circle } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Fix for default marker icons in React-Leaflet
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
    iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
    iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

// Custom marker icons
const createCustomIcon = (color) => {
    return L.divIcon({
        className: 'custom-marker',
        html: `<div style="background-color: ${color}; width: 30px; height: 30px; border-radius: 50%; border: 3px solid white; box-shadow: 0 2px 8px rgba(0,0,0,0.3);"></div>`,
        iconSize: [30, 30],
        iconAnchor: [15, 15],
    });
};

const MapComponent = ({ center = [7.8731, 80.7718], zoom = 8, markers = [], dangerZones = [], safeZones = [] }) => {
    return (
        <div style={{ height: '500px', width: '100%', borderRadius: 'var(--radius-lg)', overflow: 'hidden' }}>
            <MapContainer center={center} zoom={zoom} style={{ height: '100%', width: '100%' }}>
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />

                {/* Danger Zones */}
                {dangerZones.map((zone) => (
                    <React.Fragment key={`danger-${zone.id}`}>
                        <Circle
                            center={zone.coordinates}
                            radius={2000}
                            pathOptions={{ color: 'red', fillColor: 'red', fillOpacity: 0.2 }}
                        />
                        <Marker position={zone.coordinates} icon={createCustomIcon('#dc2626')}>
                            <Popup>
                                <strong>{zone.name}</strong>
                                <br />
                                Type: {zone.type}
                                <br />
                                <span style={{ color: '#dc2626', fontWeight: 'bold' }}>⚠️ DANGER ZONE</span>
                            </Popup>
                        </Marker>
                    </React.Fragment>
                ))}

                {/* Safe Zones */}
                {safeZones.map((zone) => (
                    <React.Fragment key={`safe-${zone.id}`}>
                        <Circle
                            center={zone.coordinates}
                            radius={1000}
                            pathOptions={{ color: 'green', fillColor: 'green', fillOpacity: 0.2 }}
                        />
                        <Marker position={zone.coordinates} icon={createCustomIcon('#10b981')}>
                            <Popup>
                                <strong>{zone.name}</strong>
                                <br />
                                Capacity: {zone.capacity}
                                <br />
                                <span style={{ color: '#10b981', fontWeight: 'bold' }}>✓ SAFE ZONE</span>
                            </Popup>
                        </Marker>
                    </React.Fragment>
                ))}

                {/* Custom Markers */}
                {markers.map((marker) => (
                    <Marker key={marker.id} position={marker.coordinates} icon={createCustomIcon(marker.color || '#3b82f6')}>
                        <Popup>
                            <strong>{marker.name}</strong>
                            {marker.description && (
                                <>
                                    <br />
                                    {marker.description}
                                </>
                            )}
                            {marker.contact && (
                                <>
                                    <br />
                                    Contact: {marker.contact}
                                </>
                            )}
                        </Popup>
                    </Marker>
                ))}
            </MapContainer>
        </div>
    );
};

export default MapComponent;
