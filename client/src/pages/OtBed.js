import React from 'react';
import { Form, Input, Select, Button, Row, Col, DatePicker } from "antd";
import { MedicineBoxOutlined, UserOutlined, PhoneOutlined } from '@ant-design/icons';
import Header from '../components/Header';
import "../styles/otBed.css";

const { Option } = Select;

const OtBed = () => {
    const [form] = Form.useForm();

    const onFinish = (values) => {
        console.log('Request submitted:', values);
    };

    return (
        <>
            <Header />
            <div className="ot-bed-container">
                <div className="form-section">
                    <h1><MedicineBoxOutlined /> Hospital Room Request</h1>
                    <Form
                        form={form}
                        layout="vertical"
                        onFinish={onFinish}
                        className="request-form"
                    >
                        {/* Patient Details Section */}
                        <div className="section-title">Patient Details</div>
                        <Row gutter={16}>
                            <Col span={12}>
                                <Form.Item
                                    name="patientName"
                                    label="Patient Name"
                                    rules={[{ required: true, message: 'Please enter patient name' }]}
                                >
                                    <Input 
                                        prefix={<UserOutlined />} 
                                        placeholder="Enter full name" 
                                    />
                                </Form.Item>
                            </Col>
                            <Col span={12}>
                                <Form.Item
                                    name="sex"
                                    label="Sex"
                                    rules={[{ required: true, message: 'Please select sex' }]}
                                >
                                    <Select placeholder="Select sex">
                                        <Option value="male">Male</Option>
                                        <Option value="female">Female</Option>
                                        <Option value="other">Other</Option>
                                    </Select>
                                </Form.Item>
                            </Col>
                        </Row>

                        <Row gutter={16}>
                            <Col span={12}>
                                <Form.Item
                                    name="mobile"
                                    label="Mobile Number"
                                    rules={[
                                        { required: true, message: 'Please enter mobile number' },
                                        { pattern: /^[0-9]{10}$/, message: 'Please enter valid 10-digit number' }
                                    ]}
                                >
                                    <Input 
                                        prefix={<PhoneOutlined />}
                                        placeholder="Enter mobile number" 
                                    />
                                </Form.Item>
                            </Col>
                            <Col span={12}>
                                <Form.Item
                                    name="age"
                                    label="Age"
                                    rules={[{ required: true, message: 'Please enter age' }]}
                                >
                                    <Input type="number" placeholder="Enter age" />
                                </Form.Item>
                            </Col>
                        </Row>

                        {/* Room Request Section */}
                        <div className="section-title">Room Requirements</div>
                        <Row gutter={16}>
                            <Col span={12}>
                                <Form.Item
                                    name="roomType"
                                    label="Room Type"
                                    rules={[{ required: true, message: 'Please select room type' }]}
                                >
                                    <Select placeholder="Select room type">
                                        <Option value="general">General Ward</Option>
                                        <Option value="private">Private Room</Option>
                                        <Option value="icu">ICU</Option>
                                        <Option value="emergency">Emergency Ward</Option>
                                    </Select>
                                </Form.Item>
                            </Col>
                            <Col span={12}>
                                <Form.Item
                                    name="admissionDate"
                                    label="Required From"
                                    rules={[{ required: true, message: 'Please select date' }]}
                                >
                                    <DatePicker className="full-width" />
                                </Form.Item>
                            </Col>
                        </Row>

                        <Form.Item
                            name="medicalCondition"
                            label="Medical Condition/Reason"
                            rules={[{ required: true, message: 'Please provide medical condition' }]}
                        >
                            <Input.TextArea 
                                rows={4} 
                                placeholder="Briefly describe the medical condition" 
                            />
                        </Form.Item>

                        <Form.Item>
                            <Button 
                                type="primary" 
                                htmlType="submit" 
                                className="request-button"
                                size="large"
                            >
                                Request Room
                            </Button>
                        </Form.Item>
                    </Form>
                </div>

                {/* Status Section */}
                <div className="visual-section">
                    <div className="room-status-card">
                        <h2>Room Availability</h2>
                        <div className="status-grid">
                            <div className="status-item">
                                <div className="status-label">General Ward</div>
                                <div className="status-value available">Available</div>
                            </div>
                            <div className="status-item">
                                <div className="status-label">Private Room</div>
                                <div className="status-value limited">Limited</div>
                            </div>
                            <div className="status-item">
                                <div className="status-label">ICU</div>
                                <div className="status-value occupied">Full</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default OtBed;