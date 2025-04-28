import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from "./pages/LoginPage";
import DashboardPage from './pages/DashboardPage';
import RegisterPage from "./pages/RegisterPage";
import WelcomePage from "./pages/WelcomePage"; 
import { useAuthContext } from './hooks/useAuthContext';
import {Toaster} from 'react-hot-toast'
import StatsPage from './pages/StatsPage';

function App() {
  const { user } = useAuthContext();

  return (
    <Router>
      <Routes>
        <Route 
          path="/" 
          element={!user ? <WelcomePage /> : <Navigate to="/dashboard" />} 
        />
        <Route 
          path="/login" 
          element={!user ? <LoginPage /> : <Navigate to="/dashboard" />} 
        />
        <Route 
          path="/register" 
          element={!user ? <RegisterPage /> : <Navigate to="/dashboard" />} 
        />

        <Route 
          path="/dashboard" 
          element={user ? <DashboardPage /> : <Navigate to="/login" />} 
        />
        <Route
          path='/statsPage' 
          element={user ? <StatsPage></StatsPage> : <Navigate to="/login"/>}
        ></Route>
      </Routes>
      <Toaster position='bottom-center' reverseOrder={false}></Toaster>
    </Router>
  );
}

export default App;
