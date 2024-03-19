import {Link, withRouter} from 'react-router-dom'
import Cookies from 'js-cookie'
import './index.css'

const Header = props => {
  const onClickLogout = () => {
    Cookies.remove('jwt_token')
    const {history} = props
    history.replace('/login')
  }
  return (
    <nav className="navbar">
      <nav className="nav-image">
        <Link className="link" to="/">
          <img
            src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
            alt="website logo"
            className="logo"
          />
        </Link>
      </nav>
      <ul className="nav-list">
        <li className="list">
          <Link className="link" to="/">
            Home
          </Link>
        </li>
        <li className="list">
          <Link className="link" to="/jobs">
            Jobs
          </Link>
        </li>
      </ul>
      <Link to="/login">
        <button className="logout-button" type="button" onClick={onClickLogout}>
          Logout
        </button>
      </Link>
    </nav>
  )
}
export default withRouter(Header)
