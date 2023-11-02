import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import AboutJob from '../AboutJob'
import Header from '../Header'
import './index.css'
import SimilarJob from '../SimilarJob'
import FailureViewWithButton from '../FailureViewWithButton'

const processTypes = {
  isInitial: {},
  isProgress: 'progress',
  isSuccess: 'success',
  isFailure: 'failure',
}

class JobDetails extends Component {
  state = {
    JobDetailsObj: processTypes.isInitial,
    similarJobsObj: processTypes.isInitial,
    isProcess: processTypes.isProgress,
  }

  componentDidMount() {
    this.fetchEachJobItem()
  }

  fetchEachJobItem = async () => {
    const {match} = this.props
    const {params} = match
    const {id} = params
    const url = `https://apis.ccbp.in/jobs/${id}`
    const jwtToken = Cookies.get('jwt_token')
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(url, options)
    if (response.ok === true) {
      const data = await response.json()
      console.log(data)
      const dataKeyValues = Object.entries(data)
      const arrayOfObjectsData = dataKeyValues.map(eachArrayItem => ({
        [eachArrayItem[0]]: eachArrayItem[1],
      }))
      console.log(arrayOfObjectsData)
      const eachObjOfJob = arrayOfObjectsData[0].job_details
      const similarJobsData = arrayOfObjectsData[1].similar_jobs
      const modifiedDataJobDetails = {
        companyLogoUrl: eachObjOfJob.company_logo_url,
        companyWebsiteUrl: eachObjOfJob.company_website_url,
        employmentType: eachObjOfJob.employment_type,
        id: eachObjOfJob.id,
        jobDescription: eachObjOfJob.job_description,
        lifeAtCompany: {
          description: eachObjOfJob.life_at_company.description,
          imageUrl: eachObjOfJob.life_at_company.image_url,
        },
        location: eachObjOfJob.location,
        packagePerAnnum: eachObjOfJob.package_per_annum,
        rating: eachObjOfJob.rating,
        title: eachObjOfJob.title,
        skills: eachObjOfJob.skills.map(eachSkill => ({
          name: eachSkill.name,
          imageUrlTech: eachSkill.image_url,
        })),
      }
      console.log(modifiedDataJobDetails)
      const modifiedSimilarJobs = similarJobsData.map(eachCompanyJob => ({
        companyLogoUrl: eachCompanyJob.company_logo_url,
        employmentType: eachCompanyJob.employment_type,
        id: eachCompanyJob.id,
        jobDescription: eachCompanyJob.job_description,
        location: eachCompanyJob.location,
        rating: eachCompanyJob.rating,
        title: eachCompanyJob.title,
      }))
      console.log(modifiedSimilarJobs)
      this.setState({
        JobDetailsObj: modifiedDataJobDetails,
        similarJobsObj: modifiedSimilarJobs,
        isProcess: processTypes.isSuccess,
      })
    } else {
      this.setState({isProcess: processTypes.isFailure})
    }
  }

  renderLoading = () => (
    <div data-testid="loader" className="loader-card">
      <Loader type="ThreeDots" height={50} width={50} />
    </div>
  )

  renderJobDetails = jobDetails => (
    <div className="about-job">
      <AboutJob jobDetailsVal={jobDetails} />
    </div>
  )

  renderSimilarJobs = similarJobsObj => (
    <div>
      <h1 className="similar-jobs-text">Similar Jobs</h1>
      <ul className="similar-jobs-card">
        {similarJobsObj.map(eachJob => (
          <SimilarJob eachJobVal={eachJob} key={eachJob.id} />
        ))}
      </ul>
    </div>
  )

  renderJobDetailCard = (similarJobsObj, JobDetailsObj) => (
    <div className="each-job-details-card-container">
      {this.renderJobDetails(JobDetailsObj)}
      {this.renderSimilarJobs(similarJobsObj)}
    </div>
  )

  retryButton = () =>
    this.setState({isProcess: processTypes.isProgress}, this.fetchEachJobItem)

  renderCorrectDetails = (similarJobsObj, JobDetailsObj, isProcess) => {
    let validProcess
    switch (isProcess) {
      case processTypes.isProgress:
        validProcess = this.renderLoading()
        break
      case processTypes.isSuccess:
        validProcess = this.renderJobDetailCard(similarJobsObj, JobDetailsObj)
        break
      case processTypes.isFailure:
        validProcess = (
          <div className="failure-card-bg">
            <FailureViewWithButton />
            <button
              className="failure-button"
              type="button"
              onClick={this.retryButton}
            >
              Retry
            </button>
          </div>
        )
        break
      default:
        validProcess = null
    }
    return validProcess
  }

  onChangeProcess = () =>
    this.setState({isProcess: processTypes.isProgress}, this.getJobsList)

  render() {
    const {similarJobsObj, JobDetailsObj, isProcess} = this.state
    return (
      <>
        <Header />
        <div className="each-job-details-card">
          {this.renderCorrectDetails(similarJobsObj, JobDetailsObj, isProcess)}
        </div>
      </>
    )
  }
}

export default JobDetails
