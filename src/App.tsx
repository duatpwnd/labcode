import './App.css';
import Header from "src/components/layout/Header";
import Footer from "src/components/layout/Footer";
import Routes from "src/routes/Routes"
import {
  useLocation
} from "react-router-dom";
function App() {
  const { pathname } = useLocation();
  return (
    <div className="App">
      <Header />
      {Routes()}
      {pathname == "/" &&
        <Footer />
      }
    </div>
  );
}

export default App;
