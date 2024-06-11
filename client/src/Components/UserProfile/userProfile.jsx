import React, { useState } from 'react';
import { Link , Outlet} from 'react-router-dom';
import { useSelector } from 'react-redux';


const UserProfile = () => {
  const [menu, setMenu] = useState("home");
  let { currentUser } = useSelector(state => state.userAuthorLogin);


  return (
    <div>
      <div className="navbar-box navbar-expand-sm">
        <nav className="navbar navbar-expand-md navbar-light shadow-sm p-1 mb-1 bg-white rounded">
          <div className="container-fluid px-5">
            <div className="collapse navbar-collapse justify-content-center">
              <ul className="navbar-nav">
                <li className="nav-item">
                  {currentUser && (
                    <Link to="articles" className="nav-link" onClick={() => setMenu("Articles")}>
                      Articles {menu === "Articles" && <hr />}
                    </Link>
                  )}
                </li>
              </ul>
            </div>
          </div>
        </nav>
      </div>
      <Outlet/>
    </div>
  );
}

export default UserProfile;
