import {Link, withRouter} from 'react-router-dom'
import Cookies from 'js-cookie'
import {BiHomeHeart} from 'react-icons/bi'
import {BsBagFill, BsBoxArrowRight} from 'react-icons/bs'
import './index.css'

const Header = props => {
  const onClickLogout = () => {
    Cookies.remove('jwt_token')
    const {history} = props
    history.replace('./login')
  }

  return (
    <nav className="nav-card">
      <div>
        <Link to="/">
          <img
            src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
            className="app-logo"
            alt="website logo"
          />
        </Link>
      </div>
      <div className="icons-card-sm-devices">
        <Link to="/">
          <BiHomeHeart className="nav-icons" />
        </Link>
        <Link to="/jobs">
          <BsBagFill className="nav-icons" />
        </Link>
        <BsBoxArrowRight className="nav-icons" onClick={onClickLogout} />
      </div>
      <div className="icons-card-bg">
        <ul className="icons-card-lg-devices">
          <Link to="/">
            <li className="link">Home</li>
          </Link>
          <Link to="/jobs">
            <li className="link">Jobs</li>
          </Link>
        </ul>
        <button className="logout-btn" type="button" onClick={onClickLogout}>
          Logout
        </button>
      </div>
    </nav>
  )
}

export default withRouter(Header)
