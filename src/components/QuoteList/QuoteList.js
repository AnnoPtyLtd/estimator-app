import './QuoteList.css'
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';



const QuoteList = () => {
  return (
    <div className='quote-list'>
      <div className='title'>
        <p>Quote list</p>
      </div>
      <div className='search-field'>
        <SearchOutlinedIcon/>
        <input type='search' />
      </div>
      
    </div>
  )
}

export default QuoteList
