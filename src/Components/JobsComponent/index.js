import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import {BiSearch} from 'react-icons/bi'
import Header from '../Header'
import SearchComponent from '../SearchComponent'
import EachJobComponent from '../EachJobComponent'
import FailureViewWithButton from '../FailureViewWithButton'

import './index.css'

const processTypes = {
  isInitial: [],
  isProgress: 'progress',
  isSuccess: 'success',
  isFailure: 'failure',
}

class JobsComponent extends Component {
  state = {
    jobsData: processTypes.isInitial,
    isProcess: processTypes.isProgress,
    searchedValue: '',
    jobTypeList: [],
    salaryValue: '',
  }

  componentDidMount() {
    this.getJobsList()
    console.log(12)
  }

  getJobsList = async () => {
    const {jobTypeList, searchedValue, salaryValue} = this.state
    const jobsUrl = `https://apis.ccbp.in/jobs?employment_type=${jobTypeList.join(
      ',',
    )}&minimum_package=${salaryValue}&search=${searchedValue}`
    const jwtTokenValue = Cookies.get('jwt_token')
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtTokenValue}`,
      },
    }
    const response = await fetch(jobsUrl, options)
    if (response.ok === true) {
      const data = await response.json()
      const modifiedData = data.jobs.map(eachObj => ({
        companyLogoUrl: eachObj.company_logo_url,
        employmentType: eachObj.employment_type,
        id: eachObj.id,
        jobDescription: eachObj.job_description,
        location: eachObj.location,
        packagePerAnnum: eachObj.package_per_annum,
        rating: eachObj.rating,
        title: eachObj.title,
      }))
      this.setState({jobsData: modifiedData, isProcess: processTypes.isSuccess})
      console.log(data)
    } else {
      this.setState({isProcess: processTypes.isFailure})
    }
  }

  renderLoading = () => (
    <div data-testid="loader" className="loader-card">
      <Loader type="ThreeDots" height={50} width={50} />
    </div>
  )

  renderJobsNoData = () => (
    <div className="no-jobs-card">
      <img
        src="https://assets.ccbp.in/frontend/react-js/no-jobs-img.png"
        className="jobs-no-img"
        alt="no-data"
      />
      <p className="no-jobs-text">No Jobs Found</p>
      <p className="no-jobs-text">
        We could not find any jobs. try other filters
      </p>
    </div>
  )

  onChangeCheckbox = (jobType, isChecked) => {
    let {jobTypeList} = this.state
    if (isChecked !== true) {
      const filteredJobTypes = jobTypeList.filter(
        eachTypeOfJob => eachTypeOfJob !== jobType,
      )
      jobTypeList = filteredJobTypes
      this.setState({jobTypeList: filteredJobTypes}, this.getJobsList)
    } else {
      this.setState(
        prevState => ({
          jobTypeList: [...prevState.jobTypeList, jobType],
        }),
        this.getJobsList,
      )
    }
  }

  onChangeSalary = salaryValue => {
    this.setState({salaryValue}, this.getJobsList)
  }

  onChangeSearch = searchedVal => {
    console.log(searchedVal)
    this.setState({searchedValue: searchedVal}, this.getJobsList)
  }

  renderJobsContainer = jobsData => (
    <div className="all-jobs">
      <ul className="jobs-Card">
        {jobsData.map(eachJob => (
          <EachJobComponent key={eachJob.id} eachJobObj={eachJob} />
        ))}
      </ul>
      )
    </div>
  )

  retryButtonJobs = () =>
    this.setState({isProcess: processTypes.isProgress}, this.getJobsList)

  renderCorrectProcess = (isProcess, jobsData) => {
    let processName = ''
    switch (isProcess) {
      case processTypes.isProgress:
        processName = this.renderLoading()
        break
      case processTypes.isSuccess:
        processName = this.renderJobsContainer(jobsData)
        break
      case processTypes.isFailure:
        processName = (
          <div className="failure-card-bg">
            <FailureViewWithButton />
            <button
              className="failure-button"
              type="button"
              onClick={this.retryButtonJobs}
            >
              Retry
            </button>
          </div>
        )
        console.log(3)
        break
      default:
        processName = null
    }
    return processName
  }

  onChangeProcess = () =>
    this.setState({isProcess: processTypes.isProgress}, this.getJobsList)

  render() {
    const {
      jobsData,
      isProcess,
      searchedValue,
      salaryValue,
      jobTypeList,
    } = this.state
    console.log(searchedValue)
    console.log(salaryValue)
    console.log(jobTypeList)
    return (
      <>
        <Header />
        <div className="all-jobs-card">
          <SearchComponent
            onChangeSearch={this.onChangeSearch}
            onChangeCheckbox={this.onChangeCheckbox}
            onChangeSalary={this.onChangeSalary}
          />
          <div className="search-and-jobs-card">
            <div className="input-card">
              <input
                type="search"
                className="search-input"
                placeholder="Search"
                onChange={this.onSearch}
              />
              <button
                type="button"
                className="search-card"
                onClick={this.onClickSearch}
                data-testid="searchButton"
              >
                <BiSearch className="search-icon" />
              </button>
            </div>
            {this.renderCorrectProcess(isProcess, jobsData)}
          </div>
        </div>
      </>
    )
  }
}

export default JobsComponent
