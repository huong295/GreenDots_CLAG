import L from "leaflet";
import yello_campaign_marker from '../assets/yellow_marker.svg'

const YelloMarker = new L.icon({
    iconSize: [24, 24],
    iconAnchor: null,
    popupAnchor: [0, 0],
    iconUrl: yello_campaign_marker,
    iconRetinaUrl: yello_campaign_marker,
    shadowUrl: null,
    shadowSize: null,
    shadowAnchor: null,
})
  
export default YelloMarker