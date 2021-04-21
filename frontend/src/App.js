import './App.css';
import Home from './components/Home.js';
import Profile from './components/Profile.js';
import {BrowserRouter as Router, Switch, Route, Link} from 'react-router-dom';

function App() {
  return (
      <div className='App'>
          <Router className='router'>
              <div className='flex-container'>
                  <section className='flex-header'>
                      <nav className='sidebar'>
                          <ul className='nav-list'>
                              <li>
                                  <Link to={"/"}>Home</Link>
                              </li>
                              <li>
                                  <Link to={"/profile"}>Profile</Link>
                              </li>
                          </ul>
                      </nav>
                  </section>

                  <section className='flex-body'>
                      <Switch>
                          <Route exact path={"/"}><Home/></Route>
                          <Route path={"/profile"}><Profile/></Route>
                      </Switch>
                  </section>
              </div>
          </Router>
      </div>
  );
}

export default App;
