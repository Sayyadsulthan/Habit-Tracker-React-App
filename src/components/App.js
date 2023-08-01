import {
  BrowserRouter,
  Navigate,
  Outlet,
  Route,
  Routes,
} from "react-router-dom";
import Dashboard from "../pages/Dashboard";
import Home from "../pages/Home";
import Navbar from "./Navbar";
import Login from "../pages/Login";
import Signup from "../pages/Signup";
import { useAuth } from "../hooks";
import Loader from "./Loader";

// import { Navigate } from "react-router-dom";

const ProtectedRoutes = ({ childrens, ...rest }) => {
  const auth = useAuth();
  // if the user authenticated go to that desired routes
  if (auth.user) {
    return <Outlet />;
  }
  return <Navigate to="/login" />;
};

function App() {
  const auth = useAuth();

  if (auth.loading) {
    return <Loader />;
  }
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <Routes>
          
          <Route path="/" element={<ProtectedRoutes />}>
            <Route path="/" Component={Home} />
          </Route>

          {/* <Route path="/dashboard" Component={Dashboard} /> */}
          <Route
            path="/dashboard"
            element={
              <ProtectedRoutes>
                {" "}
                <Dashboard />{" "}
              </ProtectedRoutes>
            }
          />
          <Route path="/login" Component={Login} />
          <Route path="/signup" Component={Signup} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
