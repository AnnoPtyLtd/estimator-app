import React from 'react'
import NavBar from '../NavBar/NavBar'
import QuoteList from '../QuoteList/QuoteList'
import Topbar from '../Topbar/Topbar'
import QuoteDetails from '../QuoteDetails/QuoteDetails'
import './Home.css'

const Home = () => {
  return (
    <div className='home'>
      <div className='left-panel'>
        <NavBar />
      </div>
      <div className='right-panel'>
        <Topbar />
        <div className='quote-section'>
          <QuoteList />
          <QuoteDetails />
        </div>
      </div>
    </div>
  )
}

export default Home
