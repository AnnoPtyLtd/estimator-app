import { useNavigate } from 'react-router-dom';
import './Topbar.css'


const Topbar = () => {
  const navigate = useNavigate();
  const handleSignOut = () => {
    navigate('/signin')
  }

  return (
    <div className='topbar'>
      <div className='topbar-title'>
        <p>Quote Estimator app</p>
      </div>
      <div className='signout-div'>
        <button onClick={handleSignOut}>Sign Out</button>
      </div>
    </div>
  )
}

export default Topbar
