import './index.css'

const FailureViewWithButton = () => (
  <div className="failure-card">
    <img
      src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
      alt="failure view"
      className="failed-img"
    />
    <h1 className="failure-name">Oops! Something Went Wrong</h1>
    <p className="failure-des">
      We cannot seem to find the page you are looking for.
    </p>
  </div>
)

export default FailureViewWithButton
