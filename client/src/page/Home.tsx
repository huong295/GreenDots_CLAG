import React, { useEffect, useState } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMap, ZoomControl,
  useMapEvent,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

import { useAuth } from "../auth/AuthContext";
import { useOrgan } from "../contexts/OrganizerContext";
import GreenIcon from "../constant/GreenIcon";

import { DatePicker, Form, Input, Modal, Space, message, Button } from "antd";
import CustomButton from "../component/ui/CustomButton";
import SlideCampaign from "../component/SlideCampaign/SlideCampaign";

import NewCampaignForm from "../component/form/CampaignForm/NewCampaignForm";
import { useCampaign } from "../contexts/CampaignContext";
import OrganizerSignupForm from "../component/form/OrganizerSignupForm/OganizerSignupForm";
import { CloseOutlined } from "@ant-design/icons";
import axios from "axios";
import SearchBar from "../component/ui/SearchBar";
import RedIcon from "../constant/RedIcon";
import OrangeIcon from "../constant/OrangeIcon";

const API_ENDPOINT = import.meta.env.VITE_API_ENDPOINT;

const RecenterAutomatically = ({ lat, lng }) => {
  const map = useMap();
  useEffect(() => {
    map.setView([lat, lng]);
  }, [lat, lng]);
  return null;
};

export default function Home() {
  const positions = [
    {lat: 10.88, long: 107.660172},
    {lat: 11.762622, long: 108.660172},
    {lat: 10.22, long: 108.660172},
  ]
  const auth = useAuth();
  const organizer = useOrgan();
  const [isHidden, setIsHidden] = useState(false);

  const handleClick = () => {
    setIsHidden(true);
  };
  const { campaigns, setCampaigns } = useCampaign();
  const [lat, setLat] = useState(10.8231);
  const [long, setLong] = useState(106.6297);

  function LocationMarker() {
    const [position, setPosition] = useState(null);
    const [bbox, setBbox] = useState([]);
    const map = useMap();

    useEffect(() => {
      map.locate().on("locationfound", function (e) {
        setPosition(e.latlng);
        console.log(e.latlng);
        map.flyTo(e.latlng, map.getZoom());
        const radius = e.accuracy;
        const circle = L.circle(e.latlng, radius);
        const popup = L.popup()
          .setLatLng(e.latlng)
          .setContent("<p>You are here</p>")
          .openOn(map);
        circle.addTo(map);
        popup.addTo(map);
        // setBbox(e.bounds.toBBoxString().split(","));
      });
    }, [/*map*/]);

    return position === null ? null : (
      <div className="div">
        <Marker position={position}></Marker>
      </div>
    );
  }

  const [showComponent, setShowComponent] = useState(false);
  // const [campaigns, setCampaigns] = useState([])
  const handleInputSearch = (location) => {
    setLat(location.lat);
    setLong(location.lon);
    console.log(location.lat, location.lon);
  };
  const handleSearch = () => {
    setShowComponent(!showComponent);
    axios
      .get(`${API_ENDPOINT}/campaigns/all`, {
        headers: {
          "ngrok-skip-browser-warning": true,
        },
      })
      .then((response) => {
        // Assuming the response data is an array of campaigns
        setCampaigns(response.data);
      })
      .catch((error) => {
        // Handle any error that occurred during the request
        console.error("Error fetching campaigns:", error);
      });
  };
  const { setShowNewCampaignForm } = useCampaign();
  const handleCreateCampaign = () => {
    if (organizer.organizerID) {
      setShowNewCampaignForm(true);
    } else {
      // message.warning('Only organizer can create a new campaign')
      showConfirmModal();
    }
  };
  const { RangePicker } = DatePicker;

  // Confirm modal
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);

  const showConfirmModal = () => {
    setIsConfirmModalOpen(true);
  };

  const handleConfirmOk = () => {
    organizer.setShowOrganizerSignupForm(true);
    setIsConfirmModalOpen(false);
  };

  const handleConfirmCancel = () => {
    setIsConfirmModalOpen(false);
  };
  const dayRangeConfig = {
    rules: [
      {
        type: "array" as const,
        required: true,
        message: "Please provide the time frame for your campaign!",
      },
    ],
  };
  return (
    <>
    <div>
      <div className="">
        <MapContainer
          center={[10.8231, 106.6297]}
          zoom={13}
          scrollWheelZoom
          zoomControl={false}
          style={{ height: "100vh" }}
        >
          <TileLayer
            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <ZoomControl position="bottomright" />
          <LocationMarker />
          <div>
              <Marker position={[lat, long]}></Marker>
              <RecenterAutomatically lat={lat} lng={long} />
            </div>
          {positions.map((item, index) => {
            return (
              <Marker position={[item.lat, item.long]} key={index}>
                <Popup>
                  <b>
                  You are here
                  </b>
                </Popup>
              </Marker>
            )
          })}
          <div
            style={{
              position: "absolute",
              // top: 10,
              // left: 10,
              zIndex: 500,
              width: "100%",
              height: "fit-content",
            }}
          >
            <div className="flex flex-col align-center justify-between h-full">
              <div>
              {!isHidden && <div className="flex flex-row align-center justify-between text-3xl font-bold p-4 bg-white bg-opacity-80">
                <div></div>
                <div><span className="flex-auto text-black">WELCOME TO</span> GREENDOTS!</div>
                <Button onClick={handleClick} className="flex-none" style={{border: "none", padding:"0", height:"fit-content"}}>
                  <CloseOutlined style={{display:"block"}}/>
                </Button>
              </div>}
              <div className=" flex justify-center items-center pt-4 pl-4 pr-4 space-x-4 w-full">
                {/* <SearchBar/> */}
               <SearchBar onLocationSearch={(location) => console.log(location)}/>
                
                <Space direction="vertical" size={12}>
                  <RangePicker />
                </Space>
                {/* <Form>

                <Form.Item hasFeedback name="timeFrame" label="Time frame" {...dayRangeConfig}>
                    <RangePicker allowClear/>
                </Form.Item>
                </Form> */}
                <CustomButton title="Search" onClick= {handleSearch} />
                
                {auth.isLoggedIn&&<CustomButton title="Create a new campaign" onClick = {handleCreateCampaign}/>}
              </div>
              </div>
            </div>
          </div>
          <div
            style={{
              position: "absolute",
              zIndex: 500,
              left: "50%",
              transform: "translateX(-50%)",
              bottom: 0,
              width: "60%",
              height: "fit-content",
            }}
          >
            {showComponent&&<SlideCampaign slides={slides}/>}
          </div>
        </MapContainer>
      </div>
    </div>
    {auth.isLoggedIn&&<NewCampaignForm />}
    {organizer.showOrganizerSignupForm && <OrganizerSignupForm />}
    <Modal 
        centered 
        title = "Do you want to register as an organizer?"
        open={isConfirmModalOpen} 
        onOk={handleConfirmOk} onCancel={handleConfirmCancel}
        width={480}
      >
        <p>Only organizer can create a new campaign.</p>
      </Modal>
    </>
  );
}
