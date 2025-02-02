
import './App.css'
import Blogs from './components/Blogs';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Signup from './components/Signup';
import Login from './components/Login';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';

function App() {

  return (
    <Router>
      <Routes>
        <Route path="/Signup" element={<Signup />} />
        <Route path="/" element={<Blogs />} />
        <Route path="/Login" element={<Login />} />
      </Routes>
    </Router>
  )
}

export default App
