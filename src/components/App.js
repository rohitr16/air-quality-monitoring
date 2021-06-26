import { BrowserRouter, Route} from 'react-router-dom';
import DashBoard from './DashBoard.js';
import Header from './Header';
import Footer from './Footer';
import '../styling/App.css';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Header />
        <Route exact path="/" component={DashBoard} />
        <Footer/>
      </div>
    </BrowserRouter>
  );
}

export default App;
