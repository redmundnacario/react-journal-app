import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'

import Navbar from './components/layout/navbar/navbar.component'
import Home from './components/pages/home.component'
import About from './components/pages/about.component'
import NotFound from './components/pages/notfound.component'
import SignUp from './components/pages/signup/signup.component'
import SignIn from './components/pages/signin/signin.component'

import AlertContainer from './components/shared/alert/alert-container.component'

import AlertState from './context/alert/AlertState';

function App() {
  return (
    <AlertState>
      <Router>
        <div className="App">
          <Navbar />
          <AlertContainer/>
          <Switch>
            <Route exact path="/" component={Home}/>
            <Route exact path="/about" component={About}/>
            <Route exact path="/signup" component={SignUp}/>
            <Route exact path="/signin" component={SignIn}/>
            <Route component={NotFound}/>
          </Switch>
        </div>
      </Router>
    </AlertState>
  );
}

export default App;
