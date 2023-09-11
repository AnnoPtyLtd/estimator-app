import './UserProfile.css'
import ProfileImage from '../../assets/profileimg.jpg'

const UserProfile = () => {
  return (
    <div className='user-container'>
      <img src={ProfileImage} alt='profile-img'/>
      <h2>User Name</h2>
      <p>Email address</p>
    </div>
  )
}

export default UserProfile
