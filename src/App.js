import Navigation from './Navigation';
import { Routes ,Route, BrowserRouter as Router } from 'react-router-dom';
import './App.css';
import Home from './Home';
import Menu from './Menu';
import Profile from './Profile';
import NotFound from './NotFound';
import { useEffect } from 'react';

function App() {

  return (
    <div>
      <Navigation/>
      <Router>
            <Routes>
                <Route exact path='/' element={<Home/>} />
                <Route exact path='/profile' element={<Profile/>} />
                <Route exact path='/menu' element={<Menu/>} />
                <Route path='*' element={<NotFound/>} />
            </Routes>
        </Router>
    </div>

  );
}

export default App;
