import React, { useState } from 'react';
import { Input, Select, Checkbox, Button, Row, Col } from "antd";
import Header from '../components/Header';
import "../styles/findDoctor.css";
import doctorsData from '../data/doctors.json';
import { useNavigate } from 'react-router-dom';

const FindDoctor = () => {
    const navigate = useNavigate();
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedSpecialties, setSelectedSpecialties] = useState([]);
    const [selectedTimeSlots, setSelectedTimeSlots] = useState([]);
    const [sortBy, setSortBy] = useState('default');
    const [doctorData] = useState(doctorsData);

    // Get unique specialties
    const specialties = [...new Set(doctorData.map(doctor => doctor.speciality))];
    
    // Get unique time slots
    const timeSlots = [
        { label: "Morning (9AM - 12PM)", value: "9:00 AM - 12:00 PM" },
        { label: "Afternoon (12PM - 4PM)", value: "12:00 PM - 4:00 PM" },
        { label: "Evening (4PM - 8PM)", value: "4:00 PM - 8:00 PM" }
    ];

    // Filter doctors based on all criteria
    const filteredDoctors = doctorData.filter(doctor => {
        // Search term filter
        const matchesSearch = doctor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            doctor.speciality.toLowerCase().includes(searchTerm.toLowerCase());
        
        // Specialty filter
        const matchesSpecialty = selectedSpecialties.length === 0 || 
                                selectedSpecialties.includes(doctor.speciality);
        
        // Time slot filter
        const matchesTimeSlot = selectedTimeSlots.length === 0 || 
            selectedTimeSlots.some(selectedSlot => {
                const timeSlotObj = timeSlots.find(t => t.label === selectedSlot);
                return doctor.chamberTime === timeSlotObj.value;
            });
        
        return matchesSearch && matchesSpecialty && matchesTimeSlot;
    }).sort((a, b) => {
        if (sortBy === 'rating') {
            return b.rating - a.rating;
        } else if (sortBy === 'experience') {
            return parseInt(b.experience) - parseInt(a.experience);
        }
        return 0;
    });

    const doctorImageStyle = {
        width: '100%',
        height: '350px',
        objectFit: 'contain',
        borderRadius: '20px',
        padding: '20px',
        backgroundColor: '#f5f5f5'
    };

    const getDoctorImage = (index) => {
        try {
            return process.env.PUBLIC_URL + `/Doctor_Images/doctor${index + 1}.jpg`;
        } catch (error) {
            return 'https://via.placeholder.com/150x150.png?text=Doctor';
        }
    };

    return (
        <>
            <Header />
            <div className="find-doctor-layout">
                {/* Filter Sidebar */}
                <div className="filter-sidebar">
                    <div className="filter-section">
                        <h3>Specialities</h3>
                        <div className="checkbox-group">
                            {specialties.map(specialty => (
                                <Checkbox
                                    key={specialty}
                                    onChange={(e) => {
                                        if (e.target.checked) {
                                            setSelectedSpecialties([...selectedSpecialties, specialty]);
                                        } else {
                                            setSelectedSpecialties(selectedSpecialties.filter(s => s !== specialty));
                                        }
                                    }}
                                >
                                    {specialty}
                                </Checkbox>
                            ))}
                        </div>
                    </div>

                    <div className="filter-section">
                        <h3>Time Slots</h3>
                        <div className="checkbox-group">
                            {timeSlots.map(slot => (
                                <Checkbox
                                    key={slot.label}
                                    onChange={(e) => {
                                        if (e.target.checked) {
                                            setSelectedTimeSlots([...selectedTimeSlots, slot.label]);
                                        } else {
                                            setSelectedTimeSlots(selectedTimeSlots.filter(s => s !== slot.label));
                                        }
                                    }}
                                    checked={selectedTimeSlots.includes(slot.label)}
                                >
                                    {slot.label}
                                </Checkbox>
                            ))}
                        </div>
                    </div>

                    <div className="filter-section">
                        <h3>Sort By</h3>
                        <Select
                            style={{ width: '100%' }}
                            placeholder="Select sorting criteria"
                            onChange={(value) => setSortBy(value)}
                            defaultValue="default"
                            options={[
                                { value: 'default', label: 'Set to Default' },
                                { value: 'rating', label: 'Rating (High to Low)' },
                                { value: 'experience', label: 'Experience (High to Low)' }
                            ]}
                        />
                    </div>
                </div>

                {/* Main Content */}
                <div className="main-content">
                    <div className="search-container">
                        <Input
                            className="search-input"
                            placeholder="Search doctors by name or specialty..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            size="large"
                        />
                    </div>

                    <div className="doctors-grid">
                        {filteredDoctors.map((doctor, index) => (
                            <div 
                                key={doctor._id} 
                                className="doctor-card"
                                onClick={(e) => {
                                    if (e.target.closest('.book-button')) return;
                                    navigate(`/doctor-profile/${doctor._id}`);
                                }}
                                role="button"
                                tabIndex={0}
                            >
                                <img 
                                    src={getDoctorImage(index)}
                                    alt={doctor.name}
                                    style={doctorImageStyle}
                                    onError={(e) => {
                                        e.target.src = 'https://via.placeholder.com/150x150.png?text=Doctor';
                                    }}
                                />
                                <div className="doctor-name">{doctor.name}</div>
                                <div className="doctor-specialty">{doctor.speciality}</div>
                                <div className="doctor-info">Department: {doctor.department}</div>
                                <div className="doctor-info">Expertise: {doctor.expertise}</div>
                                <div className="doctor-info">Experience: {doctor.experience}</div>
                                <div className="doctor-info">Qualification: {doctor.qualification}</div>
                                <div className="doctor-rating">Rating: {doctor.rating} ⭐</div>
                                
                                <div style={{ marginTop: 15 }}>
                                    <div className="chamber-info">
                                        <div className="info-label">Chamber Time:</div>
                                        <div className="info-value">{doctor.chamberTime}</div>
                                    </div>
                                    <div className="chamber-info">
                                        <div className="info-label">Off Day:</div>
                                        <div className="info-value">{doctor.offDay}</div>
                                    </div>
                                </div>
                                
                                <button 
                                    className="book-button"
                                    onClick={(e) => {
                                        e.stopPropagation();  // Prevent card click
                                        navigate(`/doctor-profile/${doctor._id}`);
                                    }}
                                >
                                    View Profile & Book
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
};

export default FindDoctor;