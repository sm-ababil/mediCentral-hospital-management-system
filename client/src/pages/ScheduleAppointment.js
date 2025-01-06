import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Form, Input, Button, DatePicker, Select, Row, Col, InputNumber } from 'antd';
import { ArrowLeftOutlined } from '@ant-design/icons';
import Header from '../components/Header';
import doctorsData from '../data/doctors.json';
import '../styles/scheduleAppointment.css';

const { TextArea } = Input;
const { Option } = Select;

const ScheduleAppointment = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [form] = Form.useForm();

    // Find doctor data
    const doctor = doctorsData.find(doc => doc._id === id);

    if (!doctor) {
        return navigate('/find-doctor');
    }

    const onFinish = (values) => {
        console.log('Form values:', values);
        // Handle form submission here
    };

    return (
        <>
            <Header />
            <div className="schedule-appointment-container">
                <Button 
                    className="back-button" 
                    onClick={() => navigate(`/doctor-profile/${id}`)}
                    icon={<ArrowLeftOutlined />}
                >
                    Back to Doctor Profile
                </Button>

                <div className="appointment-form-container">
                    <h1>Schedule Appointment</h1>
                    <div className="doctor-info-header">
                        <h2>{doctor.name}</h2>
                        <p>{doctor.department}</p>
                    </div>

                    <Form
                        form={form}
                        layout="vertical"
                        onFinish={onFinish}
                        className="appointment-form"
                        initialValues={{
                            doctor: doctor.name,
                            department: doctor.department
                        }}
                    >
                        <Row gutter={24}>
                            <Col span={12}>
                                <Form.Item
                                    label="Doctor"
                                    name="doctor"
                                >
                                    <Input disabled />
                                </Form.Item>
                            </Col>
                            <Col span={12}>
                                <Form.Item
                                    label="Department"
                                    name="department"
                                >
                                    <Input disabled />
                                </Form.Item>
                            </Col>
                        </Row>

                        <Row gutter={24}>
                            <Col span={12}>
                                <Form.Item
                                    label="Patient Name"
                                    name="patientName"
                                    rules={[{ required: true, message: 'Please enter patient name' }]}
                                >
                                    <Input />
                                </Form.Item>
                            </Col>
                            <Col span={6}>
                                <Form.Item
                                    label="Age"
                                    name="age"
                                    rules={[{ required: true, message: 'Please enter age' }]}
                                >
                                    <InputNumber min={0} max={150} style={{ width: '100%' }} />
                                </Form.Item>
                            </Col>
                            <Col span={6}>
                                <Form.Item
                                    label="Sex"
                                    name="sex"
                                    rules={[{ required: true, message: 'Please select sex' }]}
                                >
                                    <Select>
                                        <Option value="male">Male</Option>
                                        <Option value="female">Female</Option>
                                        <Option value="other">Other</Option>
                                    </Select>
                                </Form.Item>
                            </Col>
                        </Row>

                        <Form.Item
                            label="Appointment Date"
                            name="appointmentDate"
                            rules={[{ required: true, message: 'Please select appointment date' }]}
                        >
                            <DatePicker style={{ width: '100%' }} />
                        </Form.Item>

                        <Form.Item
                            label="What do you want to consult?"
                            name="consultationReason"
                            rules={[{ required: true, message: 'Please enter consultation reason' }]}
                        >
                            <TextArea rows={4} />
                        </Form.Item>

                        <Row gutter={24}>
                            <Col span={12}>
                                <Form.Item
                                    label="Country/Region"
                                    name="country"
                                    rules={[{ required: true, message: 'Please enter country/region' }]}
                                >
                                    <Input />
                                </Form.Item>
                            </Col>
                            <Col span={12}>
                                <Form.Item
                                    label="Phone Number"
                                    name="phone"
                                    rules={[{ required: true, message: 'Please enter phone number' }]}
                                >
                                    <Input />
                                </Form.Item>
                            </Col>
                        </Row>

                        <Form.Item
                            label="Address"
                            name="address"
                            rules={[{ required: true, message: 'Please enter address' }]}
                        >
                            <TextArea rows={3} />
                        </Form.Item>

                        <Form.Item
                            label="Email"
                            name="email"
                            rules={[
                                { required: true, message: 'Please enter email' },
                                { type: 'email', message: 'Please enter a valid email' }
                            ]}
                        >
                            <Input />
                        </Form.Item>

                        <Form.Item>
                            <Button type="primary" htmlType="submit" className="submit-button">
                                Confirm Appointment
                            </Button>
                        </Form.Item>
                    </Form>
                </div>
            </div>
        </>
    );
};

export default ScheduleAppointment;
