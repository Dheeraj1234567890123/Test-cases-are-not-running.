import {FcRating} from 'react-icons/fc'
import {Link, withRouter} from 'react-router-dom'
import './index.css'

const SoftwareJob = props => {
  const {jobDetails} = props
  const {
    companyLogoUrl,
    employmentType,
    id,
    jobDescription,
    location,
    packagePerAnnum,
    rating,
    title,
  } = jobDetails
  return (
    <li className="engineer-card">
      <Link className="link" to={`/jobs/:${id}`}>
        <div className="company-card">
          <img
            src={companyLogoUrl}
            className="company-image"
            alt="company logo"
          />
          <div>
            <p className="heading">{employmentType}</p>
            <FcRating />
            <p>{rating}</p>
          </div>
        </div>
        <div className="location-card">
          <p className="paragraph">{location}</p>
          <p className="paragraph">Freelance</p>
          <p className="paragraph">{packagePerAnnum}</p>
        </div>
        <h1 className="paragraph">Description</h1>
        <p className="paragraph">{jobDescription}</p>
        <h1>{title}</h1>
      </Link>
    </li>
  )
}
export default withRouter(SoftwareJob)
