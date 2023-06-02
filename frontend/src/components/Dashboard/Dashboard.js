import React, { useEffect, useState } from 'react';
import jwt_decode from "jwt-decode";
import { useNavigate } from 'react-router-dom';
import './Dashboard.css';

const Dashboard = () => {
  const [changeQuote, setChangeQuote] = useState("");
  const [readQuote, setReadQuote] = useState("");
  const navigate = useNavigate();

  const updateQuote = async (e) => {
    e.preventDefault();

    const response = await fetch('http://localhost:5000/api/updateQuote', {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "authorization": localStorage.getItem('token')
      },
      body: JSON.stringify({
        quote: changeQuote
      })
    });

    const result = await response.json();
    if (result.status === 'ok') {
      alert("Quote updated successfully!");
      window.location.reload();
    }
    else {
      alert("Quote not updated successfully!");
    }
  }

  const populateQuote = async () => {
    const response = await fetch('http://localhost:5000/api/readQuote', {
      headers: {
        "authorization": localStorage.getItem('token')
      }
    });

    const result = await response.json();
    if (result.status === 'ok') {
      setReadQuote(result.quote);
    }
  }

  useEffect(() => {
    const token = localStorage.getItem('token');
    const decoded = jwt_decode(token);
    if (!decoded) {
      localStorage.removeItem('token');
      navigate('/login');
    }
    else {
      populateQuote();
    }
  });

  return (
    <div className='dashboard-container'>
      <h2 style={{ marginBottom: '15px' }}>Quote: {readQuote || "No Quote Found"}</h2>
      <form onSubmit={updateQuote}>
        <div>
          <label htmlFor="quote">Enter Your New Quote:</label>
          <input type="text" id='quote' onChange={(e) => setChangeQuote(e.target.value)} />
        </div>
        <input type="submit" value="Update Quote" id='update-quote-btn' />
      </form>
    </div>
  )
}

export default Dashboard;