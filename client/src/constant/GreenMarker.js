import L from "leaflet";
import green_campaign_marker from '../assets/campaign_marker.svg'

const GreenMarker = new L.icon({
    iconSize: [24, 24],
    iconAnchor: null,
    popupAnchor: [0, 0],
    iconUrl: green_campaign_marker,
    iconRetinaUrl: green_campaign_marker,
    shadowUrl: null,
    shadowSize: null,
    shadowAnchor: null,
})
  
export default GreenMarker