import {BrowserRouter as Router, Routes, Route, Navigate} from 'react-router-dom'  
import WelcomePage from "./pages/WelcomePage"
import LoginPage from "./pages/LoginPage"
import RegisterPage from "./pages/RegisterPage"

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' exact Component={WelcomePage}></Route>
        <Route path='/login' Component={LoginPage}></Route>
        <Route path='/register' Component={RegisterPage}></Route>
      </Routes>
    </Router>
  );
}

export default App;
