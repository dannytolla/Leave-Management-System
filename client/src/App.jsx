import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Login from "./pages/Login";
import PrivateRoute from "./components/PrivateRouting";
import Employee from "./pages/Employee";
import LeaveForm from "./components/LeaveForm";
import HR from "./pages/HR";
import LeaveDetail from "./pages/LeaveDetail";
import Navbar from "./components/Navbar";
import LeaveResponseList from "./pages/LeaveResponseList";

function App() {
  return (
    <>
      <Router>
        <Navbar />
        <Routes>
          <Route>
            <Route path="/" element={<PrivateRoute component={Employee} />} />
            <Route path="/hr/" element={<PrivateRoute component={HR} />} />
            <Route
              path="/employee/request-list"
              element={<PrivateRoute component={LeaveResponseList} />}
            />
            <Route
              path="/hr/:id"
              element={<PrivateRoute component={LeaveDetail} />}
            />
            <Route
              path="/employee/leave-request"
              element={<PrivateRoute component={LeaveForm} />}
            />
            <Route path="/login/" element={<Login />} />
            {/* <Route path="/register/" element={<Register />} /> */}

            {/* Admin */}
            {/* <Route
              path="/admin"
              element={<PrivateRoute component={EventList} />}
            />
            <Route
              path="/dashboard"
              element={<PrivateRoute component={Dashboard} />}
            />
            <Route
              path="/admin/event/:id"
              element={<PrivateRoute component={Admin} />}
            /> */}
            {/* <Route path="*" element={<NotFound />} /> */}
          </Route>
        </Routes>
      </Router>
      <ToastContainer />
    </>
  );
}

export default App;
