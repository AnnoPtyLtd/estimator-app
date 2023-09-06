import './App.css';
import NavBar from './components/NavBar/NavBar';
import QuoteDetails from './components/QuoteDetails/QuoteDetails';
import QuoteList from './components/QuoteList/QuoteList'
import Signin from './components/Signin/Signin';
import Signup from './components/Signup/Signup';
import Topbar from './components/Topbar/Topbar';

function App() {
  return (
    // <div className='App'>
    //   <NavBar />
    //   <div className='right-panel'>
    //     <Topbar />
    //     <div className='quote-section'>
    //       <QuoteList />
    //       <QuoteDetails />
    //     </div>
    //   </div>
    // </div>
    <Signin/>
  );
}

export default App;
