// src/Components/Signin/Signin.jsx
import React, { useEffect, useState } from 'react';
import './Signin.css';
import Navbar from '../Navbar/Navbar';
import { useSelector, useDispatch } from "react-redux";
import { userAuthorLoginThunk } from "../../redux/slices/userAuthorSlice";
import { useNavigate } from 'react-router-dom';

const Signin = () => {
  const [formData, setFormData] = useState({
    userType: '',
    username: '',
    password: ''
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onChangeHandler = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value
    });
  };

  const onClickHandler = () => {
    dispatch(userAuthorLoginThunk(formData));
  };

  const { loginUserStatus, errorOccurred, errMsg } = useSelector(state => state.userAuthorLogin);

  useEffect(() => {
    if (loginUserStatus) {
      navigate('/author-profile');
    }
  }, [loginUserStatus, navigate]);

  return (
    <div>
      {/* <Navbar /> */}
      <div className='loginsignup'>
        <div className="loginsignup-container container d-flex flex-column bg-light">
          <h1>Sign In</h1>
          <div className='d-flex gap-3 mt-1 justify-content-center'>
            <input className="form-check-input" type="radio" name="userType" id="author" value="author" onChange={onChangeHandler} />
            <label className="form-check-label" htmlFor="author">Author</label>
            <input className="form-check-input" type="radio" name="userType" id="user" value="user" onChange={onChangeHandler} />
            <label className="form-check-label" htmlFor="user">User</label>
            <input className="form-check-input" type="radio" name="userType" id="admin" onChange={onChangeHandler} value="admin" />
            <label className="form-check-label" htmlFor="admin">Admin</label>
          </div>
          <div className="loginsignup-fields gap-4 mt-5 d-flex flex-column">
            <input type="text" name="username" placeholder="Your Name" onChange={onChangeHandler} />
            <input type="password" name="password" placeholder="Password" onChange={onChangeHandler} />
          </div>
          <button className='btn btn-danger m-3' onClick={onClickHandler}>Login</button>
          {errorOccurred && <p className="text-danger">{errMsg}</p>}
        </div>
      </div>
    </div>
  );
}

export default Signin;
