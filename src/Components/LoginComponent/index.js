import {Component} from 'react'
import {Redirect} from 'react-router-dom'
import Cookies from 'js-cookie'
import './index.css'

class LoginComponent extends Component {
  state = {
    username: '',
    password: '',
    isError: false,
    errorMsg: '',
  }

  onChangeUsername = event => {
    this.setState({username: event.target.value})
  }

  onChangePassword = event => {
    this.setState({password: event.target.value})
  }

  onSubmitSuccess = jwtToken => {
    Cookies.set('jwt_token', jwtToken, {
      expires: 30,
    })
    const {history} = this.props
    history.replace('/')
  }

  onSubmitFailure = errMsg => {
    console.log(errMsg)
    console.log(3)
    this.setState({errorMsg: errMsg, isError: true})
  }

  onSubmitLogin = async event => {
    event.preventDefault()
    console.log(1)
    const {username, password} = this.state
    const userData = {username, password}
    const options = {
      method: 'POST',
      body: JSON.stringify(userData),
    }
    const checkingData = await fetch('https://apis.ccbp.in/login', options)
    const jsonData = await checkingData.json()

    if (checkingData.ok === true) {
      this.onSubmitSuccess(jsonData.jwt_token)
    } else {
      this.onSubmitFailure(jsonData.error_msg)
    }
  }

  renderUserName = () => {
    const {username} = this.state
    return (
      <div>
        <label htmlFor="USERNAME" className="user-label">
          USERNAME
        </label>
        <br />
        <input
          type="text"
          value={username}
          className="user-input"
          onChange={this.onChangeUsername}
          placeholder="rahul"
          id="USERNAME"
        />
      </div>
    )
  }

  renderPassword = () => {
    const {password} = this.state
    return (
      <div>
        <label htmlFor="PASSWORD" className="user-label">
          PASSWORD
        </label>
        <br />
        <input
          type="password"
          value={password}
          className="user-input"
          onChange={this.onChangePassword}
          placeholder="rahul@2021"
          id="PASSWORD"
        />
      </div>
    )
  }

  render() {
    const {isError, password, username, errorMsg} = this.state
    console.log(password)
    console.log(username)
    if (Cookies.get('jwt_token') !== undefined) {
      console.log(22)
      return <Redirect to="/" />
    }
    return (
      <div className="login-container">
        <div className="login-card">
          <div className="img-card">
            <img
              src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
              className="website-logo"
              alt="website logo"
            />
          </div>
          <form onSubmit={this.onSubmitLogin} className="form-card">
            {this.renderUserName()}
            {this.renderPassword()}
            <button type="submit" className="login-button">
              Login
            </button>
            {isError && <p className="error-msg">{errorMsg}</p>}
          </form>
        </div>
      </div>
    )
  }
}

export default LoginComponent
