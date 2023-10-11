import L from "leaflet";
import original_green from "../assets/OriginalGreen.png";

const OriginalGreen = new L.Icon({
    iconUrl: original_green,
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
  });

export default OriginalGreen