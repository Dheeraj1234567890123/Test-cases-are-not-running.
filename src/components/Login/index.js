import {Component} from 'react'
import Cookies from 'js-cookie'
import {Redirect} from 'react-router-dom'
import './index.css'



class Login extends Component {
  state = {username: '', password: '', isError: false, errorMsg: ''}

  onChangeUser = event => {
    this.setState({username: event.target.value})
  }

  onChangePassword = event => {
    this.setState({password: event.target.value})
  }

  onSubmitSuccess = jwtToken => {
    const {history} = this.props
    Cookies.set('jwt_token', jwtToken, {expires: 30})
    history.replace('/')
  }

  onSubmitFailure = errorMsg => {
    this.setState({isError: true, errorMsg})
  }

  onSubmit = async event => {
    event.preventDefault()
    const {username, password} = this.state
    const url = 'https://apis.ccbp.in/login'
    const userDetails = {username, password}
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }
    const response = await fetch(url, options)
    const data = await response.json()
    if (response.ok === true) {
      this.onSubmitSuccess(data.jwt_token)
    } else {
      this.onSubmitFailure(data.error_msg)
    }
  }

  render() {
    const {username, password, isError, errorMsg} = this.state
    const jwtToken = Cookies.get('jwt_token')
    if (jwtToken !== undefined) {
      return <Redirect to="/" />
    }
    return (
      <div className="app-container">
        <div className="jobby-container">
          <div className="card">
            <img
              src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
              alt="website logo"
              className="image"
            />
            <form className="form-container" onSubmit={this.onSubmit}>
              <label className="label" htmlFor="user">
                USERNAME
              </label>
              <input
                type="text"
                className="input-text"
                id="user"
                placeholder="Username"
                value={username}
                onChange={this.onChangeUser}
              />
              <label className="label" htmlFor="word">
                PASSWORD
              </label>
              <input
                type="password"
                className="input-text"
                id="word"
                placeholder="Password"
                value={password}
                onChange={this.onChangePassword}
              />
              <button type="submit" className="button">
                Login
              </button>
              {isError && <p>{errorMsg}</p>}
            </form>
          </div>
        </div>
      </div>
    )
  }
}

export default Login
