import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Home from "./components/Home/Home";
import HomeV2 from "./components/Home/HomeV2";
import Signin from "./components/Signin/Signin";
import Signup from "./components/Signup/Signup";
import { AuthProvider, useAuth } from "../src/AuthContext"; // Import AuthProvider and useAuth
import { ThemeProvider } from "@mui/material/styles";
import theme from "./theme";

function App() {
  return (
    <AuthProvider>
      <ThemeProvider theme={theme}>
        <div className="app">
          <Router>
            <Routes>
              <Route path="/" element={<HomeProtected />} />
              <Route path="/home" element={<HomeProtected />} />
              <Route path="/manage-components" element={<HomeProtectedV2 />} />
              <Route path="/signin" element={<Signin />} />
              <Route path="/signup" element={<Signup />} />
            </Routes>
          </Router>
        </div>
      </ThemeProvider>
    </AuthProvider>
  );
}

export default App;

function HomeProtected() {
  const { isAuthenticated } = useAuth();
  if (!isAuthenticated) {
    return <Navigate to="/signin" />;
  }

  return <Home />;
}
function HomeProtectedV2() {
  const { isAuthenticated } = useAuth();
  if (!isAuthenticated) {
    return <Navigate to="/signin" />;
  }

  return <HomeV2 />;
}
