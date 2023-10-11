import L from "leaflet";
import { createControlComponent } from "@react-leaflet/core";
import "leaflet-routing-machine";
import OriginalRed from "../../constant/OriginalRed";
import "./styles.css"
import OriginalGreen from "../../constant/OriginalGreen";
import { useMapItems } from "../../contexts/MapItemsContext";

const createRoutineMachineLayer = (props) => {
  const { startPoint, endPoint } = useMapItems();
  const instance = L.Routing.control({
    waypoints: [
      L.latLng(startPoint.lat, startPoint.lng),
      L.latLng(endPoint.lat, endPoint.lng)
    ],
    lineOptions: {
      styles: [{ color: "#33BBC5", weight: 4 }]
    },
    show: false,
    addWaypoints: false,
    routeWhileDragging: true,
    draggableWaypoints: true,
    fitSelectedRoutes: true,
    showAlternatives: false,
    // createMarker: function () {
    //   return null;
    // }
    createMarker: function (i, waypoint, n) {
      const markerOptions = {
        draggable: true,
        icon: i === 0 ? OriginalGreen : OriginalRed // Sử dụng icon khác nhau cho các marker
      };
      return L.marker(waypoint.latLng, markerOptions);
    }
  });

  return instance;
};

const RoutingMachine = createControlComponent(createRoutineMachineLayer);

export default RoutingMachine;