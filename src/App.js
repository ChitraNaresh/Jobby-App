import {BrowserRouter, Route, Switch} from 'react-router-dom'
import LoginComponent from './Components/LoginComponent'
import NotFound from './Components/NotFound'
import JobsComponent from './Components/JobsComponent'
import JobDetails from './Components/JobDetails'
import Home from './Components/Home'
import ProtectedRoute from './Components/ProtectedRoute'
import './App.css'

const App = () => (
  <BrowserRouter>
    <Switch>
      <Route exact path="/login" component={LoginComponent} />
      <ProtectedRoute exact path="/" component={Home} />
      <ProtectedRoute exact path="/jobs" component={JobsComponent} />
      <ProtectedRoute exact path="/jobs/:id" component={JobDetails} />
      <Route component={NotFound} />
    </Switch>
  </BrowserRouter>
)

export default App
