import './App.css';
import Header from "components/layout/Header";
import Footer from "components/layout/Footer";
import Navigator from 'components/layout/navigation/Navigator';
import Routes from "src/routes/Routes"
import {
  useLocation
} from "react-router-dom";
function App() {
  const { pathname } = useLocation();
  return (
    <div className="App">
      <Header />
      {pathname != "/" &&
        <Navigator />
      }
      {Routes()}
      {pathname == "/" &&
        <Footer />
      }
    </div>
  );
}

export default App;
