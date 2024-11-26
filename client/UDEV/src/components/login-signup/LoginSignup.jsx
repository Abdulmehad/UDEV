import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPhone, faGlobeOceania } from '@fortawesome/free-solid-svg-icons';
import InputMask from 'react-input-mask';
import './LoginSignup.css';
import email from '../assets/email.png';
import password from '../assets/password.png';
import person from '../assets/person.png';

const LoginSignup = () => {
  const [action, setAction] = useState("Sign Up");
  const [employee, setEmployee] = useState([]);
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    cnic: '',
    phone: ''
  });

  useEffect(() => {
    fetchEmployee();
  }, []);

  const fetchEmployee = async () => {
    const response = await fetch('http://localhost:3300/employeeDetail');
    const data = await response.json();
    setEmployee(data);
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (action === "Sign Up" && formData.password !== formData.confirmPassword) {
      alert("Passwords do not match");
      return;
    }
    const endpoint = action === "Sign Up" ? 'http://localhost:3300/employeeDetail' : 'http://localhost:3300/login';
    const response = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formData)
    });
    const data = await response.json();
    if (data.success) {
      alert(`${action} successful`);
      setFormData({
        username: '',
        email: '',
        password: '',
        confirmPassword: '',
        cnic: '',
        phone: ''
      });
      if (action === "Sign Up") {
        fetchEmployee(); // Refresh the employee list
      }
    } else {
      alert(`${action} failed`);
    }
  };

  const handleButtonClick = (e) => {
    e.preventDefault();
    handleSubmit(e);
  };

  return (
    <div>
      <div className="container">
        <div className="header">
          <div className="switch-container">
            <div className="switch" onClick={() => setAction(action === "Sign Up" ? "Login" : "Sign Up")}>
              {action === "Sign Up" ? "Login" : "Sign Up"}
            </div>
          </div>
          <div className="text">{action}</div>
          <div className="underline"></div>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="inputs">
            {action === "Sign Up" ? (
              <>
                <div className="input">
                  <img src={person} alt="Person Icon" />
                  <input type="text" name="username" placeholder="Username" value={formData.username} onChange={handleChange} />
                </div>
                <div className="input">
                  <img src={email} alt="Email Icon" />
                  <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} />
                </div>
                <div className="input">
                  <img src={password} alt="Password Icon" />
                  <input type="password" name="password" placeholder="Password" value={formData.password} onChange={handleChange} />
                </div>
                <div className="input">
                  <img src={password} alt="Password Icon" />
                  <input type="password" name="confirmPassword" placeholder="Confirm Password" value={formData.confirmPassword} onChange={handleChange} />
                </div>
                <div className="input">
                  <FontAwesomeIcon icon={faGlobeOceania} className='icon' />
                  <InputMask mask="99999-9999999-9" name="cnic" placeholder="CNIC (_____-_______-_)"
                    value={formData.cnic} onChange={handleChange} />
                </div>
                <div className="input">
                  <FontAwesomeIcon icon={faPhone} className='icon' />
                  <InputMask mask="+\92 999 9999999" name="phone" placeholder="Phone Number (with country code)"
                    value={formData.phone} onChange={handleChange} />
                </div>
              </>
            ) : (
              <>
                <div className="input">
                  <img src={email} alt="Email Icon" />
                  <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} />
                </div>
                <div className="input">
                  <img src={password} alt="Password Icon" />
                  <input type="password" name="password" placeholder="Password" value={formData.password} onChange={handleChange} />
                </div>
                <div className="forgotpassword"> Lost Password? <span>Click Here</span></div>
              </>
            )}
            <div className="submitcontainer">
              <button type="button" className="submit-button" onClick={handleButtonClick}>{action}</button>
            </div>
          </div>
        </form>
      </div>
      <div className="employee-list">
        <h2>Employee List</h2>
        <ul>
          {employee.map(emp => (
            <li key={emp.employee_id}>
              <p>Name: {emp.name}</p>
              <p>Email: {emp.email}</p>
              <p>Phone: {emp.phone}</p>
              <p>CNIC: {emp.cnic}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default LoginSignup;