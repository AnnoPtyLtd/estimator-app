import './App.css';
import Home from './components/Home/Home';
import NavBar from './components/NavBar/NavBar';
import QuoteDetails from './components/QuoteDetails/QuoteDetails';
import QuoteList from './components/QuoteList/QuoteList'
import Signin from './components/Signin/Signin';
import Signup from './components/Signup/Signup';
import Topbar from './components/Topbar/Topbar';
import { BrowserRouter as Router,Routes,Route } from 'react-router-dom';

function App() {
  return (
    <Router>
      <Routes>
      <Route path="/" element={<Home/>} />
      <Route path="/home" element={<Home/>} />
      <Route path="/signin" element={<Signin />} />
      <Route path="/signup" element={<Signup />} />
      </Routes>
    </Router>
  );
}

export default App;
