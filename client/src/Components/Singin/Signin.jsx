import React, { useEffect, useState } from 'react';
import './Signin.css';
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

  const { loginUserStatus, errorOccurred, errMsg, currentUser } = useSelector(state => state.userAuthorLogin);

  useEffect(() => {
    if (loginUserStatus) {
      if (currentUser.userType === 'author')
        navigate('/author-profile');
      else{
        console.log(currentUser)
        navigate('/user-profile');
      }
    }
  }, [loginUserStatus, navigate, currentUser]);

  return (
    <div className="loginsignup d-flex justify-content-center align-items-center">
      <div className="loginsignup-container container d-flex flex-column bg-light p-4">
        <h1 className="text-center">Sign In</h1>
        <div className='d-flex gap-3 mt-1 justify-content-center'>
          <input className="form-check-input" type="radio" name="userType" id="author" value="author" onChange={onChangeHandler} />
          <label className="form-check-label" htmlFor="author">Author</label>
          <input className="form-check-input" type="radio" name="userType" id="user" value="user" onChange={onChangeHandler} />
          <label className="form-check-label" htmlFor="user">User</label>
          <input className="form-check-input" type="radio" name="userType" id="admin" value="admin" onChange={onChangeHandler} />
          <label className="form-check-label" htmlFor="admin">Admin</label>
        </div>
        <div className="loginsignup-fields gap-4 mt-5 d-flex flex-column">
          <input type="text" name="username" placeholder="Your Name" onChange={onChangeHandler} />
          <input type="password" name="password" placeholder="Password" onChange={onChangeHandler} />
        </div>
        <button className='btn btn-danger m-3' onClick={onClickHandler}>Login</button>
        {errorOccurred && <p className="text-danger d-flex justify-content-center">{errMsg}</p>}
      </div>
    </div>
  );
}

export default Signin;
