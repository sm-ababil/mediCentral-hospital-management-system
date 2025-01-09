import React, { useEffect } from "react";
import { Form, Input, Select, Button, Row, Col } from "antd";
import { Link } from "react-router-dom";
import Header from "../components/Header";
import "../styles/otrequest.css";
import axios from "axios";

const dummyAppointmentRequests = [
  {
    id: 1,
    patientName: "Abdul Rahman",
    patientId: "P2024001",
    appointmentDate: "2024-03-20",
    appointmentTime: "09:00 AM",
    doctorName: "Dr. Farida Begum",
    department: "Orthopedics",
    reason: "Knee Pain Consultation",
    status: "pending",
    requestedOn: "2024-03-15",
  },
  {
    id: 2,
    patientName: "Nasreen Akter",
    patientId: "P2024002",
    appointmentDate: "2024-03-21",
    appointmentTime: "11:30 AM",
    doctorName: "Dr. Kamal Hossain",
    department: "Cardiology",
    reason: "Heart Checkup",
    status: "pending",
    requestedOn: "2024-03-16",
  },
  {
    id: 3,
    patientName: "Mohammad Islam",
    patientId: "P2024003",
    appointmentDate: "2024-03-22",
    appointmentTime: "02:00 PM",
    doctorName: "Dr. Tahmina Rahman",
    department: "General Surgery",
    reason: "Appendectomy",
    status: "pending",
    requestedOn: "2024-03-16",
  },
];

const AppointmentRequest = () => {
  const handleApprove = (id) => {
    console.log(`Approved appointment ${id}`);
    // Add your approval logic here
  };

  const handleReject = (id) => {
    console.log(`Rejected appointment ${id}`);
    // Add your rejection logic here
  };

  return (
    <>
      <Header />
      <div className="container mx-auto p-4">
        <h1 className="text-2xl font-bold mb-4">Appointment Requests</h1>
        <div className="grid gap-4">
          {dummyAppointmentRequests.map((appointment) => (
            <div key={appointment.id} className="border p-4 rounded-lg shadow">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h2 className="font-bold">{appointment.patientName}</h2>
                  <p>Patient ID: {appointment.patientId}</p>
                  <p>Doctor: {appointment.doctorName}</p>
                  <p>Department: {appointment.department}</p>
                </div>
                <div>
                  <p>Date: {appointment.appointmentDate}</p>
                  <p>Time: {appointment.appointmentTime}</p>
                  <p>Reason: {appointment.reason}</p>
                  <p>Requested On: {appointment.requestedOn}</p>
                  <div className="mt-4 space-x-2">
                    <button
                      onClick={() => handleApprove(appointment.id)}
                      className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                    >
                      Accept
                    </button>
                    <button
                      onClick={() => handleReject(appointment.id)}
                      className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
                    >
                      Reject
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default AppointmentRequest;
