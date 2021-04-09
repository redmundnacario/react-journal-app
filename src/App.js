import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'

import Navbar from './components/layout/navbar/navbar.component'
import Home from './components/pages/home.component'
import About from './components/pages/about.component'
import NotFound from './components/pages/notfound.component'
import SignUp from './components/pages/signup/signup.component'
import SignIn from './components/pages/signin/signin.component'
import AlertContainer from './components/shared/alert/alert-container.component'
import Modal from './components/shared/modal/modal.component'

import JournalsPage from './components/pages/journals/journals.page.component'
import TasksPage from './components/pages/tasks/tasks.page.component'
// state
import AlertState from './context/alert/AlertState'
import ModalState from './context/modal/ModalState'
import JournalState from './context/journal/JournalState'

function App() {
  

  return (
    <JournalState>
      <AlertState>
        <ModalState>
          <Router>
            <div className="App">
              <Navbar />
              <AlertContainer/>
              <Modal/>
              <Switch>
                <Route exact path="/" component={Home}/>
                <Route exact path="/about" component={About}/>
                <Route exact path="/signup" component={SignUp}/>
                <Route exact path="/signin" component={SignIn}/>

                <Route exact path="/journals" component={JournalsPage}/>
                <Route exact path="/journal/:id/tasks" component={TasksPage}/>

                <Route exact path="/tasks_today" component={TasksPage}/>

                <Route component={NotFound}/>
              </Switch>
            </div>
          </Router>
        </ModalState>
      </AlertState>
    </JournalState>
  );
}

export default App;
