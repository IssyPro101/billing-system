import Navigation from './Navigation';
import { Routes, Route, BrowserRouter as Router } from 'react-router-dom';
import './App.css';
import Home from './Home';
import Profile from './Profile';
import NotFound from './NotFound';
import { useEffect, useState } from 'react';

function App() {

  const [user, setUser] = useState(null);

  useEffect(() => {
    const userObject = localStorage.getItem('items');
    if (userObject) {
      setUser(userObject)
    }
  }, [])

  return (
    <div>
      <Navigation user={user}/>
      <Router>
        <Routes>
          <Route exact path='/' element={<Home user={user}/>} />
          <Route exact path='/profile' element={<Profile user={user}/>} />
          <Route path='*' element={<NotFound />} />
        </Routes>
      </Router>
    </div>

  );
}

export default App;
