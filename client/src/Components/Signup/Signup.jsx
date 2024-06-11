import React, { useState } from 'react';
import './Signup.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Signup = () => {
  const [htmlFormData, setHtmlFormData] = useState({
    userType: '',
    username: '',
    email: '',
    password: ''
  });

  const [err, setErr] = useState('');
  let navigate = useNavigate();

  const onChangeHandler = (event) => {
    setHtmlFormData({
      ...htmlFormData,
      [event.target.name]: event.target.value
    });
  };

  const onClickHandler = async () => {
    if (!htmlFormData.userType) {
      setErr('Please select a user type');
      return;
    }

    try {
      let res;
      if (htmlFormData.userType === 'user') {
        res = await axios.post('http://localhost:4000/user-api/user', htmlFormData);
        // console.log(res)
      } else if (htmlFormData.userType === 'author') {
        res = await axios.post('http://localhost:4000/author-api/author', htmlFormData);
        // console.log(res)
      }

      if (res && (res.data.message === 'user is created' || res.data.message === 'author is created')) {
        // Navigate to login
        navigate('/Signin');
      } else {
        setErr(res.data.message);
      }
    } catch (error) {
      setErr('An error occurred. Please try again.');
      console.error(error);
    }
  };

  return (
    <div className='loginsignup'>
      <div className="container d-flex justify-content-center align-items-center min-vh-100">
        <div className="row w-100">
          <div className="col-lg-4 col-md-6 col-sm-6 col-10 mx-auto">
            <div className="card p-4">
              <h1 className="text-center mb-4">Sign Up</h1>
              <div className="mb-3 text-center">
                {/* Display user signup error message */}
                {err.length !== 0 && <p className='text-danger fs-5'>{err}</p>}
                <div className="form-check form-check-inline">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="userType"
                    id="author"
                    value="author"
                    onChange={onChangeHandler}
                  />
                  <label className="form-check-label" htmlFor="author">
                    Author
                  </label>
                </div>
                <div className="form-check form-check-inline">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="userType"
                    id="user"
                    value="user"
                    onChange={onChangeHandler}
                  />
                  <label className="form-check-label" htmlFor="user">
                    User
                  </label>
                </div>
              </div>
              <div className="mb-3">
                <input
                  type="text"
                  className="form-control"
                  name="username"
                  placeholder="Your Name"
                  onChange={onChangeHandler}
                />
              </div>
              <div className="mb-3">
                <input
                  type="email"
                  className="form-control"
                  name="email"
                  placeholder="Email Address"
                  onChange={onChangeHandler}
                />
              </div>
              <div className="mb-3">
                <input
                  type="password"
                  className="form-control"
                  name="password"
                  placeholder="Password"
                  onChange={onChangeHandler}
                />
              </div>
              <button
                className="btn btn-danger w-100"
                onClick={onClickHandler}
              >
                Register
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
