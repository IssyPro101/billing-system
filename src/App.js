import Navigation from './Navigation';
import { Routes, Route, BrowserRouter as Router } from 'react-router-dom';
import './App.css';
import Home from './Home';
import Profile from './Profile';
import NotFound from './NotFound';
import ProjectInfo from './ProjectInfo';
import { useEffect, useState } from 'react';

function App() {

  const [user, setUser] = useState(null);

  useEffect(() => {
    // Get user ID from local storage
    const userObject = localStorage.getItem('user');
    console.log(userObject)
    setUser(userObject)
  }, [])

  return (
    <div>
      <Router>
        <Navigation user={user}/>
        <Routes>
          <Route exact path='/' element={<Home user={user}/>} />
          <Route exact path='/profile' element={<Profile user={user} setUser={setUser}/>} />
          <Route exact path='/info' element={<ProjectInfo/>} />
          <Route path='*' element={<NotFound />} />
        </Routes>
      </Router>
    </div>

  );
}

export default App;
