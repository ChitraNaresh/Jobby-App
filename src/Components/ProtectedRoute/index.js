import {Redirect, Route} from 'react-router-dom'
import Cookies from 'js-cookie'

const ProtectedRoute = props => {
  const token = Cookies.get('jwt_token')
  if (token === undefined) {
    console.log(34)
    return <Redirect to="/login" />
  }
  return <Route {...props} />
}

export default ProtectedRoute
