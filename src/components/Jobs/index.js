import {Component} from 'react'
import {BsSearch} from 'react-icons/bs'

import Loader from 'react-loader-spinner'
import Cookies from 'js-cookie'
import Header from '../Header'
import EmploymentType from '../EmploymentType'
import SalaryRange from '../SalaryRange'
import SoftwareJob from '../SoftwareJob'
import './index.css'

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
const apiConstantStatus = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}
class Jobs extends Component {
  state = {
    profileData: {},
    searchInput: '',
    employmentId: employmentTypesList[1].employmentTypeId,
    salaryId: salaryRangesList[0].salaryRangeId,
    jobsData: [],
    apiStastus: apiConstantStatus.inProgress,
  }

  componentDidMount() {
    this.getProfileDetails()
  }

  onChangeSearchInput = event => {
    this.setState({searchInput: event.target.value}, this.getProfileDetails)
  }

  onChangeEmployment = id => {
    this.setState({employmentId: id}, this.getProfileDetails)
  }

  onChangeSalary = id => {
    this.setState({salaryId: id}, this.getProfileDetails)
  }

  getProfileDetails = async () => {
    this.setState({apiStastus: apiConstantStatus.inProgress})
    const {employmentId, salaryId, searchInput} = this.state
    const jwtToken = Cookies.get('jwt_token')
    const apiUrl = `https://apis.ccbp.in/jobs?employment_type=${employmentId}&minimum_package=${salaryId}&search=${searchInput}`

    const url = 'https://apis.ccbp.in/profile'
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(url, options)
    if (response.ok === true) {
      const fetchedData = await response.json()
      const updatedData = {
        name: fetchedData.profile_details.name,
        profileImageUrl: fetchedData.profile_details.profile_image_url,
        shortBio: fetchedData.profile_details.short_bio,
      }
      this.setState({
        profileData: updatedData,
        apiStastus: apiConstantStatus.success,
      })
    } else if (response.ok === false) {
      this.setState({apiStastus: apiConstantStatus.failure})
    }
    const secondResponse = await fetch(apiUrl, options)

    if (secondResponse.ok === true) {
      const fetchedData = await secondResponse.json()
      const updatedData = fetchedData.jobs.map(eachData => ({
        companyLogoUrl: eachData.company_logo_url,
        employmentType: eachData.employment_type,
        id: eachData.id,
        jobDescription: eachData.job_description,
        location: eachData.location,
        packagePerAnnum: eachData.package_per_annum,

        rating: eachData.rating,
        title: eachData.title,
      }))
      this.setState({
        jobsData: updatedData,
        apiStastus: apiConstantStatus.success,
      })
    } else if (response.ok === false) {
      this.setState({apiStastus: apiConstantStatus.failure})
    }
  }

  retryFetch = () => {
    this.setState({apiStatus: apiConstantStatus.inProgress}, () => {
      this.componentDidMount()
    })
  }

  loading = () => (
    <>
      <Header />
      <div className="loader-container" data-testid="loader">
        <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
      </div>
    </>
  )

  renderFailure = () => (
    <>
      <Header />
      <div className="failure-container">
        <img
          src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
          alt="failure view"
          className="failure-image"
        />
        <h1>Oops! Something Went Wrong</h1>
        <p>We cannot seem to find the page you are looking for</p>
        <button className="button" type="button" onClick={this.retryFetch()}>
          retry
        </button>
      </div>
    </>
  )

  renderSuccess = () => {
    const {profileData, searchInput, employmentId, salaryId, jobsData} =
      this.state
    const {name, profileImageUrl, shortBio} = profileData
    const searchResults = jobsData.filter(eachjob =>
      eachjob.title.toLowerCase().includes(searchInput.toLowerCase()),
    )
    return (
      <>
        <Header />
        <div className="jobs-container">
          <div className="first-part-container">
            <div className="profile-container">
              <img
                src={profileImageUrl}
                className="profile-image"
                alt="profile"
              />
              <h1 className="title">{name}</h1>
              <p className="description">{shortBio}</p>
            </div>
            <hr />
            <h1 className="heading">Type of Employment</h1>
            <ul className="unordered-list">
              {employmentTypesList.map(eachEmployment => (
                <EmploymentType
                  key={eachEmployment.employmentTypeId}
                  employmentDetails={eachEmployment}
                  onchangeEmployment={this.onChangeEmployment}
                />
              ))}
            </ul>
            <hr />
            <h1 className="heading">Salary Range</h1>
            <ul className="salary-list">
              {salaryRangesList.map(eachSalary => (
                <SalaryRange
                  key={eachSalary.salaryRangeId}
                  salaryDetails={eachSalary}
                  onChangeSalary={this.onChangeSalary}
                />
              ))}
            </ul>
          </div>
          <div className="job-role-container">
            <div className="search-container">
              <input
                type="search"
                className="input-search"
                placeholder="Search"
                onChange={this.onChangeSearchInput}
                value={searchInput}
              />
              <button
                type="button"
                data-testid="searchButton"
                className="search"
              >
                <BsSearch className="search-icon" />
              </button>
              <ul className="engineers">
                {searchResults.map(eachJob => (
                  <SoftwareJob key={eachJob.id} jobDetails={eachJob} />
                ))}
              </ul>
            </div>
          </div>
        </div>
      </>
    )
  }

  render() {
    const {apiStastus} = this.state

    switch (apiStastus) {
      case apiConstantStatus.success:
        return this.renderSuccess()
      case apiConstantStatus.failure:
        return this.renderFailure()
      case apiConstantStatus.inProgress:
        return this.loading()
      default:
        return null
    }
  }
}

export default Jobs
