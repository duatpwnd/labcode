import './App.css';
import Header from "components/layout/Header";
import Footer from "components/layout/Footer";
import Navigator from 'components/layout/navigation/Navigator';
import Routes from "src/routes/Routes"
import { useCookies } from 'react-cookie';
import { useDispatch } from "react-redux";
import { signInSuccess } from "src/actions/signIn"
import {
  useLocation
} from "react-router-dom";
import { useEffect } from 'react';
function App() {
  const { pathname } = useLocation();
  const [cookies, setCookie] = useCookies();
  const dispatch = useDispatch();
  useEffect(() => {
    if (cookies.user_info != null) {
      dispatch(signInSuccess(cookies.user_info))
    }
  }, [])
  return (
    <div className="App">
      <Header />
      {pathname != "/" && pathname != "/inquiries" && pathname != "/createTeam" &&
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
