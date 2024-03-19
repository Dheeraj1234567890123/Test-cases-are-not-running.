import React, {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import Header from '../Header'

const apiConstantStatus = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class JobDetails extends Component {
  state = {
    jobDetails: null,
    similarJobs: [],
    apiStatus: apiConstantStatus.inProgress,
  }

  componentDidMount() {
    const token = Cookies.get('jwt_token')
    const jobId = this.props.match.params.id

    const url = `https://apis.ccbp.in/jobs/:${jobId}`

    fetch(url, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Failed to fetch job details')
        }
        return response.json()
      })
      .then(data => {
        this.setState({
          jobDetails: data.job_details,
          similarJobs: data.similar_jobs,
          apiStatus: apiConstantStatus.success,
        })
      })
      .catch(error => {
        console.error('Error fetching job details:', error)
        this.setState({apiStatus: apiConstantStatus.failure})
      })
  }

  retryFetch = () => {
    this.setState({apiStatus: apiConstantStatus.inProgress}, () => {
      this.componentDidMount()
    })
  }

  renderFailure = () => (
    <>
      <Header />
      <div>
        <img
          src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
          alt="failure view"
        />

        <h1>Oops! Something Went Wrong</h1>
        <p>We cannot seem to find the page you are looking for</p>
        <button onClick={this.retryFetch}>Retry</button>
      </div>
    </>
  )

  renderSuccess = () => {
    const {jobDetails, similarJobs} = this.state

    return (
      <div>
        <Header />
        <h1>{jobDetails.title}</h1>
        <img src={jobDetails.company_logo_url} alt="website logo" />
        <p>Employment Type: {jobDetails.employment_type}</p>
        <p>Package Per Annum: {jobDetails.package_per_annum}</p>
        <p>Rating: {jobDetails.rating}</p>
        <p>Description: {jobDetails.job_description}</p>
        <p>Life at Company: {jobDetails.life_at_company.description}</p>
        <img src={jobDetails.life_at_company.image_url} alt="Life at Company" />

        <h2>Similar Jobs</h2>
        {similarJobs.map(job => (
          <div key={job.id}>
            <img src={job.company_logo_url} alt="Company Logo" />
            <p>Title: {job.title}</p>
            <p>location: {job.location}</p>
            <p>Employment Type: {job.employment_type}</p>
            <p>Rating: {job.rating}</p>
            <h1>Description: {job.job_description}</h1>
          </div>
        ))}
      </div>
    )
  }

  render() {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiConstantStatus.success:
        return this.renderSuccess()
      case apiConstantStatus.inProgress:
        return (
          <>
            <Header />
            <div className="loader-container" data-testid="loader">
              <Loader type="ThreeDots" color="#ffffff" height={50} width={50} />
            </div>
          </>
        )
      case apiConstantStatus.failure:
        return this.renderFailure()
      default:
        return null
    }
  }
}

export default JobDetails
