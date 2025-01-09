import React, {useEffect} from 'react';
import { Form, Input, Select, Button, Row, Col } from "antd";
import { Link } from "react-router-dom";
import Header from '../components/Header';
import "../styles/otrequest.css";
import axios from 'axios';

const dummyOtRequests = [
  {
    id: 1,
    patientName: "John Smith",
    patientId: "P2024001",
    otDate: "2024-03-20",
    otTime: "09:00 AM",
    doctorName: "Dr. Sarah Wilson",
    department: "Orthopedics",
    procedure: "Total Knee Replacement",
    status: "pending",
    requestedOn: "2024-03-15",
  },
  {
    id: 2,
    patientName: "Maria Garcia",
    patientId: "P2024002",
    otDate: "2024-03-21",
    otTime: "11:30 AM",
    doctorName: "Dr. James Chen",
    department: "Cardiology",
    procedure: "Angioplasty",
    status: "pending",
    requestedOn: "2024-03-16",
  },
  {
    id: 3,
    patientName: "Robert Johnson",
    patientId: "P2024003",
    otDate: "2024-03-22",
    otTime: "02:00 PM",
    doctorName: "Dr. Emily Brown",
    department: "General Surgery",
    procedure: "Appendectomy",
    status: "pending",
    requestedOn: "2024-03-16",
  },
];

const OtRequest = () => {
  const handleApprove = (id) => {
    console.log(`Approved request ${id}`);
    // Add your approval logic here
  };

  const handleReject = (id) => {
    console.log(`Rejected request ${id}`);
    // Add your rejection logic here
  };

  return (
    <>
      <Header />
      <div className="container mx-auto p-4">
        <h1 className="text-2xl font-bold mb-4">OT Requests</h1>
        <div className="grid gap-4">
        {dummyOtRequests.map((request) => (
          <div key={request.id} className="border p-4 rounded-lg shadow">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <h2 className="font-bold">{request.patientName}</h2>
                <p>Patient ID: {request.patientId}</p>
                <p>Doctor: {request.doctorName}</p>
                <p>Department: {request.department}</p>
              </div>
              <div>
                <p>Date: {request.otDate}</p>
                <p>Time: {request.otTime}</p>
                <p>Procedure: {request.procedure}</p>
                <div className="mt-4 space-x-2">
                  <button
                    onClick={() => handleApprove(request.id)}
                    className="bg-green-500 text-white px-4 py-2 rounded"
                  >
                    Approve
                  </button>
                  <button
                    onClick={() => handleReject(request.id)}
                    className="bg-red-500 text-white px-4 py-2 rounded"
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

export default OtRequest;
