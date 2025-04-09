import {BrowserRouter as Router, Routes, Route, Navigate} from 'react-router-dom'  
import WelcomePage from "./pages/WelcomePage"
import LoginPage from "./pages/LoginPage"
import DashboardPage from './pages/DashboardPage'
import RegisterPage from "./pages/RegisterPage"
import { useAuthContext } from './hooks/useAuthContext'
import HeaderComponent from './components/HeaderComponent'

function App() {

  const {user} = useAuthContext(); 

  return (
    <Router>
      <HeaderComponent></HeaderComponent>
      <Routes>
        <Route path="/" element={user ? <DashboardPage></DashboardPage> : <Navigate to="/"></Navigate>}></Route>
        <Route path="/login" element={!user ? <LoginPage></LoginPage> : <Navigate to="/"></Navigate>}></Route>
        <Route path="/register" element={!user ? <RegisterPage></RegisterPage> : <Navigate to="/"></Navigate>}></Route>
      </Routes>
    </Router>
  );
}

export default App;
