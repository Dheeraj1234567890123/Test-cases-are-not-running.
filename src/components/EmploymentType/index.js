import './index.css'

const EmploymentType = props => {
  const {employmentDetails, onchangeEmployment} = props
  const {label, employmentTypeId} = employmentDetails
  const onClickchangeEmployment = () => {
    onchangeEmployment(employmentTypeId)
  }
  return (
    <li className="employment-list">
      <input type="checkbox" id={label} onClick={onClickchangeEmployment} />
      <label htmlFor={label} className="label">
        {label}
      </label>
    </li>
  )
}

export default EmploymentType
