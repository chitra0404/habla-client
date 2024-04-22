import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Register from './pages/Register';
import Login from './pages/Login';
import Home from './pages/Home';
import Start from './components/Start';
import Chat from './pages/Chat';
import Profile from './components/Profile';
import Contact from './components/Contact';
import Group from './components/Group';

function App() {
  

  return (
    <Router>
      <Routes>
      <Route exact path="/" element={<Start />} />
      <Route exact path="/login" element={<Login />} />
          <Route exact path="/register" element={<Register />} />
          <Route exact path="/chats" element={<Home />} />
         
      </Routes>
    </Router>

  )
}

export default App
