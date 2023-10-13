import React, { useState } from "react";
import { Button } from "./Button";
import { ElementTrashTag } from "./ElementTrashTag";
import { Form, Modal } from "antd";
import { useNavigate } from "react-router-dom";
import { useMapItems } from "../../contexts/MapItemsContext";
import SearchBar from "../ui/SearchBar";

const API_ENDPOINT = import.meta.env.VITE_API_ENDPOINT

const formItemLayout = {
    labelCol: { span: 6 },
    wrapperCol: { span: 14 },
  };

export const PreviewCampaign = ({ data }) => {
  const {myPosition, startPoint, setStartPoint, endPoint, setEndPoint, 
    setShowDirection} = useMapItems();
    const navigate = useNavigate();
    // Handle find direction
  const handleFindDirection = ({ lat, lon }) => {
    setEndPoint({lat: lat, lng: lon});
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
      navigate('/');
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
    form.resetFields(); 
    setShowDirection(true);
    setShowFindDirectionModal(false); 
    navigate('/');
};
    return (
        <>
        <div className="preview-campaign">
            <div className="preview-campaign-component">
                <div className="header">
                    <div className="div">
                        <div className="text-wrapper">{data['CampaignName'] ? data['CampaignName'] : 'Campaign name'}</div>
                    </div>
                    <div className="buttons">
                        <Button
                            className="button-primary-instance"
                            labelClassName="design-preview-campaign-component-instance-node"
                            text="↳"
                            onClick = {() => handleFindDirection({lat: data.lat, lon: data.long})}
                        />
                    </div>
                </div>
                <div className="frame">
                    <p className="p">
                        <span className="span">Address: </span>
                        <span className="text-wrapper-3">
                            {
                                data['Address'] 
                                ? data['Address'] 
                                : 'Street, Ward, District, Province, Country'
                            }
                        </span>
                    </p>
                </div>
                <div className="frame">
                    <p className="time">
                        <span className="span">Time: </span>
                        <span className="text-wrapper-3">
                            from {
                                data['StartDate'] 
                                ? data['StartDate'] 
                                : '17/6/2023'
                            } to {
                                data['EndDate'] 
                                ? data['EndDate'] 
                                : '17/10/2023'
                            }                            
                        </span>
                    </p>
                </div>
                <div className="frame">
                    <p className="p">
                        <span className="span">Working hour: </span>
                        <span className="text-wrapper-3">
                            {
                                data['WorkingHour'] 
                                ? data['WorkingHour'] 
                                : '13:00 - 15:00'
                            }
                        </span>
                    </p>
                </div>
                <div className="frame">
                    <p className="gift-s">
                        <span className="span">Gift(s): </span>
                        <span className="text-wrapper-3"> 
                            {
                                data['Description'] 
                                ? data['Description'].split('\n Gifts: ')[1]
                                : 'Notebooks and pen'
                            }
                        </span>
                    </p>
                </div>
            </div>
        </div>
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
                    <SearchBar onLocationSearch={(location) => setStartPoint({lat: location.lat, lng:location.lon})}/>
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
