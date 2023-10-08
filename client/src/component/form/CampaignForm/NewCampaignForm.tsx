import { useState, useEffect } from 'react';
import { DatePicker, TimePicker, Form, Input, message, Modal, Select } from 'antd';
import { useCampaign } from '../../../contexts/CampaignContext';
import { useOrgan } from '../../../contexts/OrganizerContext';
import { useAuth } from '../../../auth/AuthContext'
import axios from 'axios';
import './styles.css'

const { Option } = Select;

const formItemLayout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 14 },
};

const { RangePicker } = DatePicker;

const API_ENDPOINT = import.meta.env.VITE_API_ENDPOINT;

const NewCampaignForm = () => {

    const auth = useAuth();
    const organizer = useOrgan();
    // Create campaign modal
    const {showNewCampaignForm, setShowNewCampaignForm} = useCampaign();
    const [currentItems, setCurrentItems] = useState([]);
    
    useEffect(() => {

        const fetchCurrentItems = async () => {
            try {
                // Make API request to fetch current items
                axios.get(`${API_ENDPOINT}/trash/all`, {
                    headers: {
                        'ngrok-skip-browser-warning': true
                    },
                })
                .then(result => {
                    setCurrentItems(result.data);
                });
        
            } catch (error) {
                // Handle error
                console.error(error);
            }
            };
        
        fetchCurrentItems();
    }, [auth.isLoggedIn]);

    const handleOk = () => {
        form.submit()
    };
    
    const handleCancel = () => {
        showConfirmModal();
        form.resetFields();
    };
    

    // Create campaign form
    const [form] = Form.useForm();

    const onFinish = (values: any) => {

        // Time frame
        let date = values.timeFrame[0]
        let offset = date.$d.getTimezoneOffset()
        let customDate = new Date(date.$d.getTime() - (offset*60*1000))
        const startDate = customDate.toISOString().replace('T', ' ').substring(0, 10)

        date = values.timeFrame[1]
        offset = date.$d.getTimezoneOffset()
        customDate = new Date(date.$d.getTime() - (offset*60*1000))
        const endDate = customDate.toISOString().replace('T', ' ').substring(0, 10)

        // Working time
        date = values.workingTime[0]
        offset = date.$d.getTimezoneOffset()
        customDate = new Date(date.$d.getTime() - (offset*60*1000))
        const openHour = customDate.toISOString().replace('T', ' ').substring(11, 19)

        date = values.workingTime[1]
        offset = date.$d.getTimezoneOffset()
        customDate = new Date(date.$d.getTime() - (offset*60*1000))
        const closeHour = customDate.toISOString().replace('T', ' ').substring(11, 19)

        // Description and gifts
        values.description = (values.description ? values.description : '') 
                                + "\n Gifts: " + (values.receiveGifts ? values.receiveGifts : '')

        delete values.timeFrame
        delete values.workingTime
        delete values.receiveGifts
        
        // tam lam cai nay de create campaign
        var lat = window.prompt('Nhap lattitude: ');
        var long = window.prompt('Nhap longtitude: ');

        values = {
            ...values,
            startDate,
            endDate,
            openHour,
            closeHour,
            lat: lat ? parseFloat(lat) : 0.0, 
            long: long ? parseFloat(long) : 0.0,
            organizerID: organizer.organizerID
        }
        // for temporarily use
        // POST to database
        axios.post(`${API_ENDPOINT}/create-campaign`, values)
        setShowNewCampaignForm(false);
        message.success('Create campaign success!');
        form.resetFields();
    };
    
    // Confirm modal
    const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);

    const showConfirmModal = () => {
        setIsConfirmModalOpen(true);
    };

    const handleConfirmOk = () => {
        setShowNewCampaignForm(false);
        setIsConfirmModalOpen(false);
    };

    const handleConfirmCancel = () => {
        setIsConfirmModalOpen(false);
    };

    // Date range picker
    const dayRangeConfig = {
        rules: [{ 
            type: 'array' as const, 
            required: true, 
            message: 'Please provide the time frame for your campaign!' 
        }],
    };

    // Time range picker
    const timeRangeConfig = {
        rules: [{ 
            type: 'array' as const, 
            required: true, 
            message: 'Please select your working time!' 
        }],
    };

    return (
        <>  
        <Modal title="New Campaign" open={showNewCampaignForm} onOk={handleOk} onCancel={handleCancel} centered
            okText="Create"
            cancelText="Cancel"
        >
            <Form
                name="createCampaign"
                {...formItemLayout}
                onFinish={onFinish}
                form={form}
                style={{ maxWidth: 1000 }}
            >
                <Form.Item
                    name="campaignName"
                    label="Name"
                    hasFeedback
                    rules={[{ required: true, message: 'Please input your compaign name!' }]}
                >
                    <Input allowClear placeholder="Please input your compaign name"/>
                </Form.Item>

                <Form.Item hasFeedback name="timeFrame" label="Time frame" {...dayRangeConfig}>
                    <RangePicker allowClear/>
                </Form.Item>

                <Form.Item hasFeedback name="workingTime" label="Working time" {...timeRangeConfig}>
                    <TimePicker.RangePicker allowClear/>
                </Form.Item>

                <Form.Item
                    name="address"
                    label="Address"
                    hasFeedback
                    initialValue={""}
                    rules={[{ required: true, message: 'Please type in your address!' }]}
                >
                    <Input allowClear placeholder="Please input your campaign address"/>
                </Form.Item>

                <Form.Item
                    name="receiveItems"
                    label="Kinds of trash"
                    hasFeedback
                    initialValue={""}
                    rules={[{ required: true, message: 'Please select kinds of trash you are receiving!', type: 'array' }]}
                >
                <Select 
                    allowClear
                    showSearch
                    filterOption={(input, option) => {
                        const children = option?.children ?? '';
                        const value = option?.value ?? '';
                        return String(children).toLowerCase().indexOf(input.toLowerCase()) >= 0
                        || String(value).toLowerCase().indexOf(input.toLowerCase()) >= 0;
                    }}
                    mode="tags" 
                    placeholder="Please select kinds of trash"
                >
                    {currentItems.map((val, idx) => (
                        <Option key={val['ItemID']} value={val['ItemID']}>
                        {val['ItemName']}
                        </Option>
                    ))}
                </Select>
                </Form.Item>

                <Form.Item
                name="description"
                label="Description"
                initialValue={""}
                >
                    <Input allowClear placeholder="Please input some description"/>
                </Form.Item>

                <Form.Item
                    name="receiveGifts"
                    label="Gift(s) for trade"
                    initialValue={""}
                >
                    <Input allowClear placeholder="Please input your gift(s)"/>
                </Form.Item>
            </Form>          
        </Modal>
        <Modal 
            centered 
            title = "Do you want to stop the process and close the form?"
            open={isConfirmModalOpen} 
            onOk={handleConfirmOk} onCancel={handleConfirmCancel}
            width={480}
        >
            <p>All information will be discarded.</p>
        </Modal>
        </>
    );
};

export default NewCampaignForm;