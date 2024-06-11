import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Outlet } from 'react-router-dom';

const AuthorProfile = () => {
  const [menu, setMenu] = useState("home");
  let { currentUser } = useSelector(state => state.userAuthorLogin);

  return (
    <div>
      <div className="navbar-box navbar-expand-sm">
        <nav className="navbar navbar-expand-md navbar-light shadow-sm p-1 mb-1 bg-white rounded">
          <div className="container-fluid px-5">
            <div className="collapse navbar-collapse">
              <ul className='navbar-nav d-flex justify-content-center align-items-center'>
                <li className='nav-item'>
                  {currentUser && (
                    <Link to={`articles-by-author/${currentUser.username}`} className="nav-link" onClick={() => { setMenu("Articles") }}>
                      Articles {menu === "Articles" ? <hr /> : null}
                    </Link>
                  )}
                </li>
                <li className='nav-item'>
                  <Link to="new-article" className="nav-link" onClick={() => { setMenu("new-article") }}>
                    Add new {menu === "new-article" ? <hr /> : null}
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </nav>
      </div>
      <Outlet />
    </div>
  );
}

export default AuthorProfile;
