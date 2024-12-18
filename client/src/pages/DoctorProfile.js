import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Row, Col, Card, Button, Rate, Divider, Tag } from 'antd';
import { ArrowLeftOutlined, ClockCircleOutlined, CalendarOutlined, CloseOutlined } from '@ant-design/icons';
import Header from '../components/Header';
import doctorsData from '../data/doctors.json';
import '../styles/doctorProfile.css';
import { useSelector } from 'react-redux';
import { Modal } from 'antd';

const calculateRecommendation = (rating) => {
    // Convert rating out of 5 to a percentage
    return Math.round((rating / 5) * 100);
};

const mockReviews = [
    {
        id: 1,
        patientName: "John D.",
        rating: 5,
        date: "2024-02-15",
        comment: "Excellent doctor! Very thorough and patient in explaining everything."
    },
    {
        id: 2,
        patientName: "Sarah M.",
        rating: 4,
        date: "2024-02-10",
        comment: "Professional and knowledgeable. Wait time was a bit long though."
    },
    {
        id: 3,
        patientName: "Michael R.",
        rating: 5,
        date: "2024-02-05",
        comment: "Great experience! The doctor was very attentive to my concerns."
    }
];

const DoctorProfile = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { user } = useSelector(state => state.user) || { user: null };
    
    // Find the doctor with the matching ID
    const doctor = doctorsData.find(doc => doc._id === id);

    if (!doctor) {
        return (
            <>
                <Header />
                <div className="doctor-profile-container">
                    <div className="doctor-not-found">
                        <h2>Doctor not found</h2>
                        <Button type="primary" onClick={() => navigate('/find-doctor')}>
                            Back to Doctors List
                        </Button>
                    </div>
                </div>
            </>
        );
    }

    const recommendationPercentage = calculateRecommendation(doctor.rating);

    // Function to handle appointment button click
    const handleScheduleAppointment = () => {
        if (!user) {
            Modal.confirm({
                title: 'Login Required',
                content: 'Please login to schedule an appointment',
                okText: 'Login',
                cancelButtonProps: { style: { display: 'none' } },
                closable: true,
                closeIcon: <CloseOutlined />,
                onOk: () => {
                    navigate('/login', { 
                        state: { 
                            redirectTo: `/schedule-appointment/${doctor._id}` 
                        } 
                    });
                }
            });
        } else {
            navigate(`/schedule-appointment/${doctor._id}`);
        }
    };

    // Add this style object
    const profileImageStyle = {
        width: '100%',
        height: '350px',
        objectFit: 'contain',
        borderRadius: '20px',
        padding: '20px',
        backgroundColor: '#f5f5f5',
        transition: 'transform 0.3s ease',
        cursor: 'pointer'
    };

    const getDoctorImage = () => {
        try {
            const doctorIndex = doctorsData.findIndex(doc => doc._id === id);
            return process.env.PUBLIC_URL + `/Doctor_Images/doctor${doctorIndex + 1}.jpg`;
        } catch (error) {
            return 'https://via.placeholder.com/300x300.png?text=Doctor';
        }
    };

    // Add this function to your component
    const handleImageClick = (e) => {
        if (e.target.style.objectFit === 'cover') {
            e.target.style.objectFit = 'contain';
        } else {
            e.target.style.objectFit = 'cover';
        }
    };

    return (
        <>
            <Header />
            <div className="doctor-profile-container">
                <Button 
                    className="back-button" 
                    onClick={() => navigate('/find-doctor')}
                    icon={<ArrowLeftOutlined />}
                >
                    Back to Doctors List
                </Button>

                <Row gutter={[24, 24]} className="profile-content">
                    <Col xs={24} md={8}>
                        <Card className="profile-card">
                            <div className="doctor-image-container">
                                <img 
                                    src={getDoctorImage()}
                                    alt={doctor.name}
                                    style={profileImageStyle}
                                    onClick={handleImageClick}
                                    onError={(e) => {
                                        e.target.src = 'https://via.placeholder.com/300x300.png?text=Doctor';
                                    }}
                                />
                            </div>
                            <div className="doctor-basic-info">
                                <h1>{doctor.name}</h1>
                                <Rate disabled defaultValue={doctor.rating} />
                                <p className="rating-text">{doctor.rating} out of 5</p>
                                <Button 
                                    type="primary" 
                                    size="large" 
                                    className="book-appointment-btn"
                                    onClick={handleScheduleAppointment}
                                >
                                    Schedule Appointment
                                </Button>
                            </div>
                        </Card>

                        <Card className="recommendation-card">
                            <div className="recommendation-percentage">
                                <h2>{recommendationPercentage}%</h2>
                                <p>of patients recommend this doctor</p>
                            </div>
                            <div className="total-reviews">
                                <p>Based on {mockReviews.length} reviews</p>
                            </div>
                        </Card>
                    </Col>

                    <Col xs={24} md={16}>
                        <Card className="details-card">
                            <h2>Doctor Information</h2>
                            <Row gutter={[16, 16]}>
                                <Col span={24}>
                                    <div className="info-section">
                                        <div className="info-item">
                                            <h3>Department</h3>
                                            <p>{doctor.department}</p>
                                        </div>
                                        <div className="info-item">
                                            <h3>Speciality</h3>
                                            <p>{doctor.speciality}</p>
                                        </div>
                                        <div className="info-item">
                                            <h3>Expertise</h3>
                                            <p>{doctor.expertise}</p>
                                        </div>
                                        <div className="info-item">
                                            <h3>Qualification</h3>
                                            <p>{doctor.qualification}</p>
                                        </div>
                                        <div className="info-item">
                                            <h3>Experience</h3>
                                            <p>{doctor.experience}</p>
                                        </div>
                                    </div>

                                    <Divider />

                                    <div className="info-section">
                                        <h3>Chamber Schedule</h3>
                                        <p>
                                            <ClockCircleOutlined /> Chamber Time: {doctor.chamberTime}
                                        </p>
                                        <p>
                                            <CalendarOutlined /> Off Day: <Tag color="red">{doctor.offDay}</Tag>
                                        </p>
                                    </div>

                                    <Divider />

                                    <div className="reviews-section">
                                        <h2>Patient Reviews</h2>
                                        <div className="reviews-container">
                                            {mockReviews.map(review => (
                                                <div key={review.id} className="review-item">
                                                    <div className="review-header">
                                                        <div>
                                                            <h4>{review.patientName}</h4>
                                                            <span className="review-date">
                                                                {new Date(review.date).toLocaleDateString()}
                                                            </span>
                                                        </div>
                                                        <Rate disabled defaultValue={review.rating} />
                                                    </div>
                                                    <p className="review-comment">{review.comment}</p>
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    <Divider />

                                    <div className="appointment-section">
                                        <h3>Book Appointment</h3>
                                        <p>Select your preferred date and time to schedule an appointment.</p>
                                        <Button 
                                            type="primary" 
                                            size="large" 
                                            className="book-appointment-btn"
                                            onClick={handleScheduleAppointment}
                                        >
                                            Schedule Appointment
                                        </Button>
                                    </div>
                                </Col>
                            </Row>
                        </Card>
                    </Col>
                </Row>
            </div>
        </>
    );
};

export default DoctorProfile;
