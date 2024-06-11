import { Outlet } from "react-router-dom";
import Navbar from "./Components/Navbar/Navbar";
import Footer from "./Components/Footer/Footer";

function RootLayout() {
  return (
    <div>
      <Navbar />
      <div style={{ minHeight: "70vh" }}>
        <div className="container">
          {" "}
          <Outlet />
        </div>
      </div>
      <div style={{ marginTop: "100px" }}>
        <Footer />
      </div>
    </div>
  );
}

export default RootLayout;