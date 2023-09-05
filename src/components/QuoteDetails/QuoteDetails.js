import './QuoteDetails.css'

const QuoteDetails = () => {
  return (
    <div className='quote-details-container'>
      <div className='quote-details-title'>
        <p>Quote Details</p>
      </div>
      <div className='quote-details-column'>
        <div className='detail-items'>
          <label htmlFor='name'> Name </label>
          <input type='text' id='name' />
        </div>

        <div className='search-name-date'>
          <div className='detail-items'>
            <label htmlFor='name'> Quote list </label>
            <select id="dropdown">
              <option value="choosequote">Choose Quote</option>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
            </select>
          </div>
          <div className='detail-items'>
            <label htmlFor='name'> Quote Date </label>
            <input type='date' id='name' />
          </div>
        </div>
      </div>
      <div className='quote-details-components'>
        <p>container</p>
      </div>
    </div>
  )
}

export default QuoteDetails
