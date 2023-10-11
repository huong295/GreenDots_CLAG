import L from "leaflet";
import original_red from "../assets/OriginalRed.png";

const OriginalRed = new L.icon({
  iconSize: [25, 41],
  iconAnchor: [10, 41],
  popupAnchor: [2, -40],
  iconUrl: original_red,
  shadowUrl: "https://unpkg.com/leaflet@1.6/dist/images/marker-shadow.png"
});

export default OriginalRed