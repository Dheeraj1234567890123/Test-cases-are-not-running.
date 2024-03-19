import './index.css'

const salaryRange = props => {
  const {salaryDetails, onChangeSalary} = props
  const {label, salaryRangeId} = salaryDetails
  const toChangeSalary = () => {
    onChangeSalary(salaryRangeId)
  }
  return (
    <li className="employment-list">
      <input type="checkbox" id={label} onClick={toChangeSalary} />
      <label htmlFor={label} className="label">
        {label}
      </label>
    </li>
  )
}

export default salaryRange
