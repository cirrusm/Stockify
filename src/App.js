import Stock from './components/Stock'
import StockContainer from './pages/StockContainer'
import NavBar from './components/NavBar'
import routes from './config/routes';
import Dashboard from './pages/Dashboard'


function App() {
  return (
    <div className="App">
   <NavBar />
   <Dashboard />
   {/* {routes} */}
    </div>
  );
}

export default App;
