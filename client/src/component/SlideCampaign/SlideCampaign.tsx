// src/Slider.tsx
import { CloseOutlined, LeftCircleOutlined, RightCircleOutlined } from "@ant-design/icons";
import React, { useState } from "react";
import { Button, Dropdown, Form, Modal, Tag } from "antd";
import type { MenuProps } from 'antd';
import campaignImage from "../../assets/campaign.jpg";
import CustomButton from "../ui/CustomButton";
import WhiteButton from "../ui/WhiteButton";
import TabsPage from "../card/TabsPage/TabsPage";
import EditCampaignForm from "../form/CampaignForm/EditCampaignForm";
import { useCampaign } from "../../contexts/CampaignContext";
import { Link } from "react-router-dom";
import { useMapItems } from "../../contexts/MapItemsContext";
import SearchBar from "../ui/SearchBar";
import "./SlideCampaign.css"

interface Slide {
  campaignName: string,
  receiveItems: string[],
  organizerName: string,
  address: string,
  openHour: string,
  closeHour: string,
  receiveGifts: string,
  organizerID: number,
  campaignID: number,
  lat: number,
  long: number,
  averageRating: number,
  startDate: string, 
  endDate: string, 
  description?: string,
}

interface SliderProps {
  slides: Slide[];
}
const styles = {
  title: "text-black font-bold ",
  detail: "text-[#33BBC5] ",
};

const formItemLayout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 14 },
};

const SlideCampaign: React.FC<SliderProps> = ({ slides }) => {  
  
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOrganizerID, _] = useState(0);
  const {myPosition, startPoint, setStartPoint, endPoint, setEndPoint, 
    setShowDirection, hiddenClass, setHiddenClass} = useMapItems();

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? slides.length - 1 : prevIndex - 1
    );
  };
  const { showEditCampaignForm } = useCampaign()

  const items: MenuProps['items'] = [
    // {
    //   label: ( isLoggedIn&&
    //     <button 
    //       onClick={ () => {setShowEditCampaignForm(true) }}
    //       style={{width: "100%", textAlign: "start"}}
    //     > Edit
    //     </button>
    //   ),
    //   key: '1',
    // },
    {
      label: (
        <Link to={`/profile/${selectedOrganizerID}`} style={{width: "100%", textAlign: "start"}}>
          Contact organizer
        </Link>
      ),
      key: '2',
    },
  ];
  
  const [showCampaignIndex, setShowCampaignIndex] = useState(-1)
  const handleClick = (index: number) =>{ 
    setShowCampaignIndex(index);
  }

  // Handle find direction
  const handleFindDirection = ({ lat, lon }: { lat: number, lon: number }) => {
    setEndPoint({lat: lat, lng: lon});
    setShowDirection(false);
    if (myPosition === null){
      setShowFindDirectionModal(true);
    }
    else {
      setIsConfirmModalOpen(true);
    }
  }
  // Confirm modal
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);

  const handleConfirmOk = () => {
      setStartPoint({lat: myPosition.lat, lng: myPosition.lng});
      setIsConfirmModalOpen(false);
      setShowDirection(true);
  };

  const handleConfirmCancel = () => {
    setIsConfirmModalOpen(false);
    setShowFindDirectionModal(true);
};

  // Input direction modal
  const [showFindDirectionModal, setShowFindDirectionModal] = useState(false);
  const [form] = Form.useForm();

  const handleOk = () => {
    form.submit()
  };

  const handleCancel = () => {
    setShowFindDirectionModal(false);
  };

  const onFinish = () => {

    // for temporarily use
    // POST to database
    console.log("start end", startPoint, endPoint);
    setShowDirection(true);
    setShowFindDirectionModal(false);
    form.resetFields();  
};

  return (
    <>
    <div className={`flex justify-center border-2 h-64 overflow-hidden bg-gray-200 rounded-lg shadow-md relative ${hiddenClass}`}>
  
        {slides.map((slide, index) => (
          <div
            key={index}
            className={`w-full h-full absolute top-0 left-0 transform transition-transform ease-in-out duration-300 ${
              index === currentIndex ? "translate-x-0" : "translate-x-full"
            }`}
          >
            <div className=" h-full border-2 p-4 bg-white rounded-lg shadow-md flex justify-center gap-x-4">
              <Button 
                className="absolute top-2 right-2 flex-none"
                onClick={() => {setHiddenClass("hidden")}}style={{border: "none", padding:"0", height:"fit-content"}}>
                  <CloseOutlined style={{display:"block"}}/>
                </Button>
              <div className="">
                <img src={campaignImage} alt="image" className="h-60" />
              </div>
              <div className = " flex flex-col h-full items-start flex-start">
                <div className="flex justify-between">
                  <div className="text-2xl text-center font-bold">
                    {" "}
                    {slide.campaignName}
                  </div>
                  <div className="flex items-center">⭐ {slide.averageRating} / 5.0</div>
                </div>
                <div className={styles.title}>
                  Address:{" "}
                  <span className={styles.detail}> {slide.address}</span>{" "}
                </div>
                <div className={styles.title}>
                  Working hour:{" "}
                  <span className={styles.detail}> {slide.openHour} to {slide.closeHour}</span>
                </div>
                <div className={styles.title}>
                  Gifts: <span className={styles.detail}> {slide.receiveGifts}</span>
                </div>
                <div className={styles.title}>Accepted trash</div>
                  <div>
                    {
                      slide.receiveItems.map((item, index) => (
                        <Tag key={index} color="#33BBC5">{item}</Tag>
                      ))
                    }
                  </div>
                <div className="flex justify-between flex-row align-items justify-between">
                    <CustomButton title="↳ Direction " onClick={() => handleFindDirection({lat: slide.lat, lon: slide.long})} />
                  <div>
                    <WhiteButton title="⭐ Ratings" onClick = {() => handleClick(index)} />
                  </div>
                  {
                    showCampaignIndex===index&&<TabsPage 
                                                setShowCampaignIndex={setShowCampaignIndex} 
                                                campaign={slide}/>
                  }
                  <Dropdown menu={{ items }} placement="bottom">
                    <Button style={{backgroundColor:'white', borderRadius:"12px", color:"black", padding:"4px" , margin:"4px"}}> ... </Button>
                  </Dropdown>
                </div>
              </div>
            </div>
          </div>
        ))}
    
      <RightCircleOutlined
        onClick={prevSlide}
        className="absolute top-1/2 right-4 transform -translate-y-1/2 px-4 py-2 bg-gray-800 text-white rounded-full focus:outline-none"
      />
     
      <LeftCircleOutlined
        onClick={nextSlide}
        className="absolute rounded-full top-1/2 left-4 transform -translate-y-1/2 px-4 py-2 bg-gray-800 text-white rounded-full focus:outline-none"
      />
    </div>
    {showEditCampaignForm && <EditCampaignForm 
      startDate="2023-06-09"
      endDate="2023-12-11"
      openHour="06:30:00"
      closeHour="20:00:00"
      description="We are 4 girls."
      campaignName="WhatEVER"
      address="somewhere on Earth"
      receiveItems={[]}  
    />}
    <Modal title="Find direction" open={showFindDirectionModal} onOk={handleOk} onCancel={handleCancel} centered
            okText="Find"
            cancelText="Cancel"
        >
            <Form
                name="findDirection"
                {...formItemLayout}
                onFinish={onFinish}
                form={form}
                style={{ maxWidth: 1000 }}
            >
                <Form.Item
                    name="from"
                    label="From"
                    // rules={[{ required: true, message: 'Please type in your address!' }]}
                >
                    <SearchBar onLocationSearch={(location:any) => setStartPoint({lat: location.lat, lng:location.lon})}/>
                </Form.Item>
            </Form>          
        </Modal>
    <Modal 
            centered 
            title = "Do you want to use your current location for directions?"
            open={isConfirmModalOpen} 
            onOk={handleConfirmOk} onCancel={handleConfirmCancel}
            width={480}
        >
            <p>If not, you need to enter your starting point.</p>
    </Modal>
    </>
  );
};

export default SlideCampaign;
