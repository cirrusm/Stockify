import Stock from './components/Stock'
import StockContainer from './pages/StockContainer'
import NavBar from './components/NavBar'
import routes from './config/routes';


function App() {
  return (
    <div className="App">
   <NavBar />
   {routes}
    </div>
  );
}

export default App;
