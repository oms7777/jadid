import L from 'leaflet';
import { MapContainer, Marker, TileLayer, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { useEffect } from 'react';

// Marker icons
import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png';
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';

// @ts-ignore
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
    iconUrl: markerIcon.src,
    iconRetinaUrl: markerIcon2x.src,
    shadowUrl: markerShadow.src,
});

interface MapProps {
    center?: number[];
}

const url = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
const attribution = '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors';

// Empty neighborhoods array (no coordinates)
const neighborhoods = [];

const MapUpdater: React.FC<{ center: L.LatLngExpression }> = ({ center }) => {
    const map = useMap();

    useEffect(() => {
        if (center) {
            map.setView(center, 14, { animate: true });
        }
    }, [center, map]);

    return null;
};

const Map: React.FC<MapProps> = ({ center }) => {
    const defaultCenter: L.LatLngExpression = [33.589886, -7.603869]; // Casablanca Center

    return (
        <MapContainer
            center={center ? (center as L.LatLngExpression) : defaultCenter}
            zoom={center ? 14 : 12}
            scrollWheelZoom={false}
            className="h-[50vh] rounded-lg"
        >
            <TileLayer url={url} attribution={attribution} />
            {center && <Marker position={center as L.LatLngExpression} />}
            {center && <MapUpdater center={center as L.LatLngExpression} />}

            {/* No Neighborhood Borders */}
            {/* Since `neighborhoods` is now empty, no polygons will be rendered */}
        </MapContainer>
    );
};

export default Map;
