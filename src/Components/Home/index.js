import {Link} from 'react-router-dom'
import Header from '../Header'
import './index.css'

const Home = () => (
  <>
    <Header />
    <div className="home-container">
      <div className="banner-card">
        <h1 className="page-heading">Find The Job That Fits Your Life</h1>
        <p className="page-des">
          Millions of people are searching for jobs, salary information, company
          reviews. Find the job that fits your abilities and potentials.
        </p>
        <Link to="/jobs">
          <button className="find-btn" type="button">
            Find Jobs
          </button>
        </Link>
      </div>
    </div>
  </>
)

export default Home
