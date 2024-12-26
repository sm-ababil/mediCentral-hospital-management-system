import React from 'react';
import { Table, Badge, Button, Card, Row, Col, Statistic } from 'antd';
import { CheckOutlined, CloseOutlined, MedicineBoxOutlined, UserOutlined, HomeOutlined } from '@ant-design/icons';
import Header from '../components/Header';
import "../styles/adminbed.css";

const AdminBedApproval = () => {
    // Sample data for bed requests
    const bedRequests = [
        {
            id: '1',
            doctorName: 'Dr. Sarah Smith',
            patientName: 'John Doe',
            sex: 'Male',
            roomType: 'ICU',
            requestDate: '2024-03-15',
            urgency: 'High',
            status: 'pending',
            patientAge: '45',
            contactNumber: '1234567890'
        },
        // Add more sample requests as needed
    ];

    const columns = [
        {
            title: 'Doctor Name',
            dataIndex: 'doctorName',
            key: 'doctorName',
        },
        {
            title: 'Patient Details',
            dataIndex: 'patientName',
            key: 'patientName',
            sex: 'sex',
            render: (text, record) => (
                <div>
                    <div><strong>{text}</strong></div>
                    <div>Age: {record.patientAge}</div>
                    <div>Contact: {record.contactNumber}</div>
                    <div>Sex: {record.sex}</div>
                </div>
            ),
        },
        {
            title: 'Room Type',
            dataIndex: 'roomType',
            key: 'roomType',
            render: (text) => (
                <Badge 
                    color={text === 'ICU' ? 'red' : text === 'Private' ? 'blue' : 'green'} 
                    text={text} 
                />
            ),
        },
        {
            title: 'Request Date',
            dataIndex: 'requestDate',
            key: 'requestDate',
        },
        {
            title: 'Urgency',
            dataIndex: 'urgency',
            key: 'urgency',
            render: (text) => (
                <Badge 
                    status={text === 'High' ? 'error' : text === 'Medium' ? 'warning' : 'success'} 
                    text={text}
                />
            ),
        },
        {
            title: 'Actions',
            key: 'actions',
            render: (_, record) => (
                <div className="action-buttons">
                    <Button 
                        type="primary" 
                        icon={<CheckOutlined />}
                        className="approve-btn"
                    >
                        Approve
                    </Button>
                    <Button 
                        danger 
                        icon={<CloseOutlined />}
                        className="reject-btn"
                    >
                        Reject
                    </Button>
                </div>
            ),
        },
    ];

    return (
        <>
            <Header />
            <div className="admin-container">
                {/* Dashboard Stats */}
                <div className="stats-section">
                    <Row gutter={16}>
                        <Col span={6}>
                            <Card>
                                <Statistic
                                    title="Total Available Beds"
                                    value={45}
                                    prefix={<HomeOutlined />}
                                    valueStyle={{ color: '#3f8600' }}
                                />
                            </Card>
                        </Col>
                        <Col span={6}>
                            <Card>
                                <Statistic
                                    title="ICU Beds Available"
                                    value={8}
                                    prefix={<MedicineBoxOutlined />}
                                    valueStyle={{ color: '#cf1322' }}
                                />
                            </Card>
                        </Col>
                        <Col span={6}>
                            <Card>
                                <Statistic
                                    title="Pending Requests"
                                    value={12}
                                    prefix={<UserOutlined />}
                                    valueStyle={{ color: '#1890ff' }}
                                />
                            </Card>
                        </Col>
                        <Col span={6}>
                            <Card>
                                <Statistic
                                    title="Today's Approvals"
                                    value={15}
                                    prefix={<CheckOutlined />}
                                    valueStyle={{ color: '#52c41a' }}
                                />
                            </Card>
                        </Col>
                    </Row>
                </div>

                {/* Room Availability Cards */}
                <div className="room-status-section">
                    <h2>Room Availability Status</h2>
                    <Row gutter={16}>
                        <Col span={8}>
                            <Card className="room-card general">
                                <h3>General Ward</h3>
                                <div className="bed-stats">
                                    <div>Total: 30</div>
                                    <div>Available: 15</div>
                                    <div>Occupied: 15</div>
                                </div>
                            </Card>
                        </Col>
                        <Col span={8}>
                            <Card className="room-card private">
                                <h3>Private Rooms</h3>
                                <div className="bed-stats">
                                    <div>Total: 20</div>
                                    <div>Available: 8</div>
                                    <div>Occupied: 12</div>
                                </div>
                            </Card>
                        </Col>
                        <Col span={8}>
                            <Card className="room-card icu">
                                <h3>ICU</h3>
                                <div className="bed-stats">
                                    <div>Total: 10</div>
                                    <div>Available: 3</div>
                                    <div>Occupied: 7</div>
                                </div>
                            </Card>
                        </Col>
                    </Row>
                </div>

                {/* Pending Requests Table */}
                <div className="requests-section">
                    <h2>Pending Bed Requests</h2>
                    <Table 
                        columns={columns} 
                        dataSource={bedRequests}
                        className="requests-table"
                    />
                </div>
            </div>
        </>
    );
};

export default AdminBedApproval;