import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPhone, faGlobeOceania } from '@fortawesome/free-solid-svg-icons';
import InputMask from 'react-input-mask';
import './LoginSignup.css';
import email from '../assets/email.png';
import password from '../assets/password.png';
import person from '../assets/person.png';

const LoginSignup = () => {
  const [action, setAction] = useState("Sign Up");
  return (
    <div>
      <div className="container">
        <div className="header">
          <div className="text">{action}</div>
          <div className="underline"></div>
        </div>
        <div className="inputs">
          {action === "Sign Up" ? (
            <>
              <div className="input">
                <img src={person} alt="Person Icon" />
                <input type="text" placeholder="Username" />
              </div>
              <div className="input">
                <img src={email} alt="Email Icon" />
                <input type="email" placeholder="Email" />
              </div>
              <div className="input">
                <img src={password} alt="Password Icon" />
                <input type="password" placeholder="Password" />
              </div>
              <div className="input">
                <img src={password} alt="Password Icon" />
                <input type="password" placeholder="Confirm Password" />
              </div>
              <div className="input">
              <FontAwesomeIcon icon={faGlobeOceania}  className='icon'/>
                <InputMask mask="99999-9999999-9" placeholder="CNIC (_____-_______-_)"/>
              </div>
              <div className="input">
              <FontAwesomeIcon icon={faPhone}  className='icon'/>
                <InputMask mask="+\92 999 9999999" placeholder="Phone Number (with country code)" />
              </div>
            </>
          ) : (
            <>
              <div className="input">
                <img src={email} alt="Email Icon" />
                <input type="email" placeholder="Email" />
              </div>
              <div className="input">
                <img src={password} alt="Password Icon" />
                <input type="password" placeholder="Password" />
              </div>
              <div className="forgotpassword"> Lost Password? <span>Click Here</span></div>
            </>
          )}
          <div className="submitcontainer">
            <div className={action === "Login" ? "submit gray" : "submit"} onClick={() => {
              setAction("Sign Up");
            }}>Sign Up</div>
            <div className={action === "Sign Up" ? "submit gray" : "submit"} onClick={() => {
              setAction("Login");
            }}>Login</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginSignup;