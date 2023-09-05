import './NavBar.css'
import HomeIcon from '@mui/icons-material/Home';
import MemoryIcon from '@mui/icons-material/Memory';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import FileUploadOutlinedIcon from '@mui/icons-material/FileUploadOutlined';
import AddCircleIcon from '@mui/icons-material/AddCircle';

const NavBar = () => {
  return (
    <div className='menu'>
        <ul className='menu-items'>
            <li className='menu-item'>
              <HomeIcon className='menu-icon'/>
              <p>Home</p>
            </li>
            <li className='menu-item'>
              <MemoryIcon className='menu-icon'/>
              <p>Components</p>
            </li>
            <li className='menu-item'>
              <SearchOutlinedIcon className='menu-icon'/>
              <p>Search</p>
            </li>
            <li className='menu-item'>
              <AddCircleIcon className='menu-icon'/>
              <p>Add Quote</p>
            </li>
            <li className='menu-item'>
              <FileUploadOutlinedIcon className='menu-icon'/>
              <p>Upload file</p>
            </li>
            
        </ul>
      
    </div>
  )
}

export default NavBar
