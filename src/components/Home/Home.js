import './Home.css';
import {useState} from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../AuthContext';
import QuoteList from '../ComponentsPage/QuoteList';
import Topbar from '../Topbar/Topbar';
import QuoteDetails from '../QuoteDetails/QuoteDetails';
import NavBar from '../NavBar/NavBar';
import QuoteItemsList from '../QuoteItemsList/QuoteItemsList';
import ComponentDetailsPage from '../ComponentDetailsPage/ComponentDetailsPage';
import Charts from '../Charts/Charts';
import { motion } from "framer-motion";

const Home = () => {

  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [selectedQuote, setSelectedQuote] = useState(null);
  
  if (!isAuthenticated) {
    navigate('/home')
  }

  const handleQuoteClick = (quote) => {
    setSelectedQuote(quote);
    console.log('handleSelectQuote called!')
  };

  const container = {
    hidden: { opacity: 1, scale: 0 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        delayChildren: 0.5,
        staggerChildren: 0.2
      }
    }
  };

  const item = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1
    }
  };

  return (
    <div className='home'>
      <div className='left-panel'>
        <motion.div
          initial={{ x: -100 }}
          animate={{ x: 0 }}
          transition={{ type: "tween", stiffness: 160, damping: 20 }}>
          <NavBar />
        </motion.div>
      </div>
      <div className='right-panel'>
        <Topbar />
        <motion.ul
          className="quote-section"
          variants={container}
          initial="hidden"
          animate="visible">
          <motion.li className="item" variants={item}><QuoteItemsList onQuoteClick={handleQuoteClick}/></motion.li>
          <motion.li className="item" variants={item}><QuoteDetails selectedQuote={selectedQuote} setSelectedQuote={handleQuoteClick}/></motion.li>
        </motion.ul>
      </div>
    </div>
  );
};

export default Home;