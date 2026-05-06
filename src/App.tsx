import './App.css';
import { Route, Routes } from 'react-router';
import Navbar from './components/layout/Navbar';
import ProtectedRoute from './components/layout/ProtectedRoute';
import Home from './pages/Home';
import Teams from './pages/Teams';
import TeamDetails from './pages/TeamDetails';
import Matches from './pages/Matches';
import MatchDetails from './pages/MatchDetails';
import Login from './pages/Login';
import Register from './pages/Register';
import Create from './pages/Create';
import Profile from './pages/Profile';
import NewsDetails from './pages/NewsDetails';

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/teams" element={<Teams />} />
        <Route path="/teams/:teamId" element={<TeamDetails />} />
        <Route path="/matches" element={<Matches />} />
        <Route path="/matches/:matchId" element={<MatchDetails />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/news/:newsId" element={<NewsDetails />} />
        <Route
          path="/create"
          element={
            <ProtectedRoute>
              <Create />
            </ProtectedRoute>
          }
        />
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />
      </Routes>
    </>
  );
}

export default App;
