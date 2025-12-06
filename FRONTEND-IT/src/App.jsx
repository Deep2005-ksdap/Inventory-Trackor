import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegistrationPage";
import Dashboard from "./pages/Dashboard";
import CreateStock from "./pages/CreateStock";
import LandingPage from "./pages/LandingPage";
import NotFoundPage from "./pages/NotFoundPage";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />}>
        <Route index={true} element={<LandingPage />} />
        <Route path="home/dashboard" element={<Dashboard />} />
        <Route path="home/add-item" element={<CreateStock />} />
        <Route path="home/edit-item/:stockId" element={<CreateStock />} />
      </Route>
      <Route path="/user/login" element={<LoginPage />} />
      <Route path="/user/register" element={<RegisterPage />} />
      {/* <Route path="*" element={<NotFoundPage />} /> */}
    </Routes>
  );
}

export default App;
