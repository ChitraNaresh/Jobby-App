import {FaLocationArrow} from 'react-icons/fa'
import {BsBagFill, BsFillStarFill} from 'react-icons/bs'
import './index.css'

const SimilarJob = props => {
  const {eachJobVal} = props
  const {
    companyLogoUrl,
    employmentType,
    jobDescription,
    location,
    rating,
    title,
  } = eachJobVal
  return (
    <li className="each-job-card-list-container">
      <div className="image-card">
        <img
          src={companyLogoUrl}
          alt="similar job company logo"
          className="company-img"
        />
        <div className="job-name-card">
          <h1 className="title">{title}</h1>
          <div className="rating-card">
            <BsFillStarFill className="rating-img" />
            <p className="rating">{rating}</p>
          </div>
        </div>
      </div>
      <h1 className="life-head-text">Description</h1>
      <p className="life-description">{jobDescription}</p>
      <div className="job-location">
        <div className="employment-type">
          <div className="location-card">
            <FaLocationArrow className="location-img" />
            <p className="location">{location}</p>
          </div>
          <div className="location-card">
            <BsBagFill className="location-img" />
            <p className="location">{employmentType}</p>
          </div>
        </div>
      </div>
    </li>
  )
}

export default SimilarJob
