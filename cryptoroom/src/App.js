import './App.css';
import Header from './components/Header';
import {Routes, Route} from 'react-router-dom';
import HomePage from './pages/HomePage';
import CoinPage from './pages/CoinPage';
import {makeStyles} from '@material-ui/core';

function App() {

  const useStyles = makeStyles(() =>( {
    App: {
      backgroundColor: '#14161a',
      color: 'white',
      minHeight: '100vh',
    }
  }));

  const classes = useStyles();

  return (
    <div className={classes.App}>
      <Header />
      <Routes>
        <Route path='/' element={<HomePage />} exact></Route>
        <Route path='/coins/:id' element={<CoinPage />} />
      </Routes>
    </div>
  );
}

export default App;
