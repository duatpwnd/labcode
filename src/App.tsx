import './App.css';
import SignIn from './components/siginin/SignIn';
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
      <SignIn />
      <Header />
      {Routes()}
      {pathname == "/" &&
        <Footer />
      }
    </div>
  );
}

export default App;
