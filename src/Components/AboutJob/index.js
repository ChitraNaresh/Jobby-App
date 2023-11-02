import {FaLocationArrow} from 'react-icons/fa'
import {BsBagFill, BsFillStarFill} from 'react-icons/bs'
import {BiLinkExternal} from 'react-icons/bi'
import './index.css'

const AboutJob = props => {
  const {jobDetailsVal} = props
  const {
    companyLogoUrl,
    employmentType,
    jobDescription,
    packagePerAnnum,
    location,
    rating,
    title,
    companyWebsiteUrl,
    lifeAtCompany,
    skills,
  } = jobDetailsVal
  const {description, imageUrl} = lifeAtCompany

  console.log(companyLogoUrl)

  const renderEachSkill = eachSkill => {
    const {name, imageUrlTech} = eachSkill
    return (
      <li className="each-skill">
        <img src={imageUrlTech} className="tech-img" alt={name} />
        <h1 className="tech-name">{name}</h1>
      </li>
    )
  }

  return (
    <>
      <div className="each-job-card-list">
        <div className="image-card">
          <img
            src={companyLogoUrl}
            alt="job details company logo"
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
        <div className="link-container">
          <h1 className="life-head-text">Description</h1>
          <a
            className="link-card"
            href={companyWebsiteUrl}
            target="_blank"
            rel="noreferrer"
          >
            <p className="visit-text">Visit</p>
            <BiLinkExternal className="visit-icon" />
          </a>
        </div>
        <p className="life-description">{jobDescription}</p>
        <h1 className={`life-head-text ${'skill'}`}>Skills</h1>
        <ul className="skills-container">
          {skills.map(eachSkill => renderEachSkill(eachSkill))}
        </ul>
        <h1 className="life-head-text">Life at Company</h1>
        <div className="life-at-company-card">
          <p className="life-description">{description}</p>
          <img
            src={imageUrl}
            className="company-img-show"
            alt="life at company"
          />
        </div>
      </div>
    </>
  )
}

export default AboutJob
