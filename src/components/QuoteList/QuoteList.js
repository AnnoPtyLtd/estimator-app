import './QuoteList.css'
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';



const QuoteList = () => {
  return (
    <div className='quote-list-container'>
      <div className='quote-list-title'>
        <p>Quote list</p>
      </div>
      <div className='search-field'>
        <input type='search' placeholder='Search...' />
        <SearchOutlinedIcon className='search-icon' />
      </div>
      <div className='quote-list'>
        <ul className='quote-list-items'>
          <li>quote item 1</li>
          <li>quote item 2</li>
          <li>quote item 3</li>
        </ul>
      </div>
      <div className='quote-list'>
        <ul className='quote-list-items'>
          <li>quote item 4</li>
          <li>quote item 5</li>
          <li>quote item 6</li>
        </ul>
      </div>

    </div>
  )
}

export default QuoteList
