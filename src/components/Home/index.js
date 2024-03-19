import Cookies from 'js-cookie'
import {Component} from 'react'
import {Redirect, Link} from 'react-router-dom'
import {BiHome, BiLogOut} from 'react-icons/bi'
import {GiFreemasonry} from 'react-icons/gi'

import Header from '../Header'
import './index.css'

class Home extends Component {
  render() {
    const jwtToken = Cookies.get('jwt_token')
    if (jwtToken === undefined) {
      return <Redirect to="/login" />
    }
    return (
      <>
        <Header />
        <div className="home-container">
          <ul className="orderd-list">
            <li>
              <Link to="/">
                <BiHome />
              </Link>
            </li>
            <li>
              <Link to="/jobs">
                <GiFreemasonry />
              </Link>
            </li>
            <li>
              <Link to="/login">
                <BiLogOut />
              </Link>
            </li>
          </ul>
          <h1 className="heading">
            Find The Job That
            <br />
            Fits Your Life
          </h1>
          <p className="paragraph">
            Millions of people are searching for jobs,salary
            <br />
            information company reviews.Find the job that fits your abilities
            and potential.
          </p>
          <Link to="/jobs">
            <button className="button" type="button">
              Find Jobs
            </button>
          </Link>
        </div>
      </>
    )
  }
}
export default Home
