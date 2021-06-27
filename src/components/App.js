import { BrowserRouter, Route} from 'react-router-dom';
import DashBoard from './DashBoard.js';
import SelectedCityDetails  from './SelectedCityDetails'
import CompChart from './CityComparisionChart';
import Header from './Header';
import Footer from './Footer';
import Error from './Error';
import '../styling/App.css';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Header />
        <Route exact path="/" component={DashBoard} />
        <Route path="/cityDetails/:city" component={SelectedCityDetails} />
        <Route path="/cityCompChart" component={CompChart} />
        <Route path="/error" component={Error} />
        <Footer/>
      </div>
    </BrowserRouter>
  );
}

export default App;
