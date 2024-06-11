import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';
import { useSelector, useDispatch } from 'react-redux';
import { resetState } from '../../redux/slices/userAuthorSlice';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
  const [menu, setMenu] = useState("home");
  const dispatch = useDispatch(); // Call useDispatch as a function
  const navigate = useNavigate();
  const { loginUserStatus, currentUser } = useSelector(state => state.userAuthorLogin);

  function signOut() {
    localStorage.removeItem('token');
    dispatch(resetState());
    navigate('/'); // Navigate to home after sign out
  }

  return (
    <div>
      <div className="navbar-box navbar-expand-sm">
        <nav className="navbar navbar-expand-md navbar-light shadow-sm p-1 mb-1 bg-white rounded">
          <div className="container-fluid px-5">
            <div className="collapse navbar-collapse" id="main-nav">
              <ul className="navbar-nav ms-auto align-items-center">
                {loginUserStatus === false ? (
                  <>
                    <li className="nav-item">
                      <Link to="/" className="nav-link" onClick={() => { setMenu("home") }}>
                        Home {menu === "home" ? <hr /> : null}
                      </Link>
                    </li>
                    <li className="nav-item">
                      <Link to="/SignUp" className="nav-link" onClick={() => { setMenu("SignUp") }}>
                        SignUp {menu === "SignUp" ? <hr /> : null}
                      </Link>
                    </li>
                    <li className="nav-item">
                      <Link to="/Signin" className="nav-link" onClick={() => { setMenu("Signin") }}>
                        SignIn {menu === "Signin" ? <hr /> : null}
                      </Link>
                    </li>
                  </>
                ) : (
                  <li className="nav-item d-flex">
                    <span className='lead fs-5 me-3 fw-1'>{currentUser.username}</span>
                    <Link to="/" className="nav-link" onClick={signOut}>
                      Signout 
                    </Link>
                  </li>
                )}
              </ul>
            </div>
          </div>
        </nav>
      </div>
    </div>
  );
}

export default Navbar;
