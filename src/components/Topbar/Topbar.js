import { useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';
import './Topbar.css'


const Topbar = () => {
  const navigate = useNavigate();
  const handleSignOut = () => {
    navigate('/signin')
  }

  return (
    <div className='topbar'>
      <div className='topbar-title'>
        <div>
          <p className='topbar-title-text'>QUOTE ESTIMATOR</p>
        </div>
      </div>
      <div className='signout-div'>
        <Button variant='outlined' color='error' onClick={handleSignOut}>Sign Out</Button>
      </div>
    </div>
  )
}

export default Topbar
