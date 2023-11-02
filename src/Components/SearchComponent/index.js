import React from 'react'
import {BiSearch} from 'react-icons/bi'
import Loader from 'react-loader-spinner'
import Cookies from 'js-cookie'
import './index.css'

const processTypes = {
  isInitial: [],
  isProgress: 'progress',
  isSuccess: 'success',
  isFailure: 'failure',
}

const employmentTypesList = [
  {
    label: 'Full Time',
    employmentTypeId: 'FULLTIME',
  },
  {
    label: 'Part Time',
    employmentTypeId: 'PARTTIME',
  },
  {
    label: 'Freelance',
    employmentTypeId: 'FREELANCE',
  },
  {
    label: 'Internship',
    employmentTypeId: 'INTERNSHIP',
  },
]

const salaryRangesList = [
  {
    salaryRangeId: '1000000',
    label: '10 LPA and above',
  },
  {
    salaryRangeId: '2000000',
    label: '20 LPA and above',
  },
  {
    salaryRangeId: '3000000',
    label: '30 LPA and above',
  },
  {
    salaryRangeId: '4000000',
    label: '40 LPA and above',
  },
]

class SearchComponent extends React.Component {
  state = {
    userDetailsObj: processTypes.isInitial,
    processTrack: processTypes.isProgress,
    searchedValue: processTypes.isInitial,
  }

  componentDidMount() {
    this.userDetails()
  }

  userDetails = async () => {
    const userUrl = 'https://apis.ccbp.in/profile'
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${Cookies.get('jwt_token')}`,
      },
    }
    const userProfile = await fetch(userUrl, options)
    if (userProfile.ok === true) {
      const userData = await userProfile.json()
      const modifiedUserData = {
        name: userData.profile_details.name,
        profileImageUrl: userData.profile_details.profile_image_url,
        shortBio: userData.profile_details.short_bio,
      }
      this.setState({
        userDetailsObj: modifiedUserData,
        processTrack: processTypes.isSuccess,
      })
    } else {
      this.setState({
        processTrack: processTypes.isFailure,
      })
    }
  }

  onChangeTypeJob = event => {
    const {onChangeCheckbox} = this.props
    console.log(event.target.checked)
    onChangeCheckbox(event.target.value, event.target.checked)
  }

  eachItemReturnCheckBoxList = props => {
    const {employmentTypeId, label} = props

    return (
      <li className="each-list-card">
        <input
          type="checkbox"
          className="check-box"
          id={employmentTypeId}
          onChange={this.onChangeTypeJob}
          value={employmentTypeId}
        />
        <label htmlFor={employmentTypeId} className="label-text">
          {label}
        </label>
      </li>
    )
  }

  onChangeSalary = event => {
    const {onChangeSalary} = this.props
    onChangeSalary(event.target.value)
  }

  eachItemReturnRadioList = props => {
    const {salaryRangeId, label} = props
    return (
      <li className="each-list-card">
        <input
          type="radio"
          className="radio-btn"
          id={salaryRangeId}
          name="radio"
          value={salaryRangeId}
          onChange={this.onChangeSalary}
        />
        <label htmlFor={salaryRangeId} className="label-text">
          {label}
        </label>
      </li>
    )
  }

  renderUserDetails = props => {
    const {name, profileImageUrl, shortBio} = props
    return (
      <div className="user-profile">
        <img src={profileImageUrl} className="user-img" alt={name} />
        <h1 className="user-name">{name}</h1>
        <p className="user-des">{shortBio}</p>
      </div>
    )
  }

  renderLoader = () => (
    <div data-testid="loader" className="loader-card">
      <Loader type="ThreeDots" height={50} width={50} />
    </div>
  )

  onSearch = event => {
    console.log(event.target.value)
    this.setState({searchedValue: event.target.value})
  }

  onClickSearch = () => {
    console.log('on click search')
    const {onChangeSearch} = this.props
    const {searchedValue} = this.state
    onChangeSearch(searchedValue)
  }

  onClickRetry = () =>
    this.setState({processTrack: processTypes.isProgress}, this.userDetails)

  renderProcessFailed = () => (
    <div className="user-failure-card">
      <button
        type="button"
        className="retry-button-user"
        onClick={this.onClickRetry}
      >
        Retry
      </button>
    </div>
  )

  validateCondition = (processTrack, userDetailsObj) => {
    let validProcess
    switch (processTrack) {
      case processTypes.isProgress:
        validProcess = this.renderLoader()
        break
      case processTypes.isSuccess:
        validProcess = this.renderUserDetails(userDetailsObj)
        break
      case processTypes.isFailure:
        validProcess = this.renderProcessFailed()
        break
      default:
        validProcess = null
    }
    return validProcess
  }

  render() {
    const {processTrack, userDetailsObj} = this.state
    console.log(processTrack)
    return (
      <div className="search-container">
        <div className="input-container">
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
          >
            <BiSearch className="search-icon" />
          </button>
        </div>
        {this.validateCondition(processTrack, userDetailsObj)}
        <hr />
        <div>
          <h1 className="check-box-type">Type of Employment</h1>
          <ul className="list-of-items">
            {employmentTypesList.map(eachItem =>
              this.eachItemReturnCheckBoxList(eachItem),
            )}
          </ul>
          <hr />
        </div>
        <div>
          <h1 className="check-box-type">Salary Range</h1>
          <ul className="list-of-items">
            {salaryRangesList.map(eachItem =>
              this.eachItemReturnRadioList(eachItem),
            )}
          </ul>
        </div>
      </div>
    )
  }
}

export default SearchComponent
