import './App.css';
import Home from './components/Home.js';
import Profile from './components/Profile.js';
import {BrowserRouter as Router, Switch, Route, Link} from 'react-router-dom';

function App() {
  return (
      <div className='App'>
          <Home className='home'/>
          <Router>
              <header className='navbar'>
                  <ul className='nav-list'>
                      <li>
                          <Link to={"/"}>Home</Link>
                      </li>
                      <li>
                          <Link to={"/profile"}>Profile</Link>
                      </li>
                  </ul>
              </header>

              <Switch>
                  <Route exact path={"/"}><Home/></Route>
                  <Route path={"/profile"}><Profile/></Route>
              </Switch>
          </Router>
      </div>
  );
}

export default App;
