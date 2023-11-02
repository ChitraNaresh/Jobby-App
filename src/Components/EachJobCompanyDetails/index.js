import {Link} from 'react-router-dom'
import {FaLocationArrow} from 'react-icons/fa'
import {BsBagFill, BsFillStarFill} from 'react-icons/bs'
import "./index.css"

const EachJobCompanyDetails=(props)=>{
    const {eachJobObj}=props
    const {
    id,
    companyLogoUrl,
    employmentType,
    jobDescription,
    packagePerAnnum,
    location,
    rating,
    title,
  } = eachJobObj

  return (
      <li className="each-job-card-list">
        <div className="image-card">
          <img src={companyLogoUrl} alt="company" className="company-img" />
          <div className="job-name-card">
            <p className="title">{title}</p>
            <div className="rating-card">
              <BsFillStarFill className="rating-img" />
              <p className="rating">{rating}</p>
            </div>
          </div>
        </div>
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
          <p className="package">{packagePerAnnum}</p>
        </div>
        <hr className="des-under-line" />
        <p className="description-head">Description</p>
        <p className="description">{jobDescription}</p>
      </li>
  )
}

}

export default EachJobCompanyDetails