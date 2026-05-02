import './App.css';
import { Route, Routes } from 'react-router';
import Navbar from './components/layout/Navbar';
import Home from './pages/Home';
import Teams from './pages/Teams';
import Matches from './pages/Matches';
import Login from './pages/Login';
import Register from './pages/Register';

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/teams" element={<Teams />} />
        <Route path="/matches" element={<Matches />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </>
  );
}

export default App;
