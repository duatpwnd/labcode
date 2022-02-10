import './App.css';
import Header from "components/layout/Header";
import Footer from "components/layout/Footer";
import Navigator from 'components/layout/navigation/Navigator';
import Routes from "src/routes/Routes"
import { useCookies } from 'react-cookie';
import { signInSuccess } from "src/actions/signIn"
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "src/reducers";

import {
  useLocation
} from "react-router-dom";
import { useEffect, createContext } from 'react';
export const AppContext = createContext<{ [key: string]: any }>({})
function App() {
  const { pathname } = useLocation();
  const [cookies, setCookie] = useCookies();
  const dispatch = useDispatch();
  const userInfo = useSelector((state: RootState) => {
    return state.signIn.userInfo
  })

  useEffect(() => {
    if (cookies.user_info != null) {
      dispatch(signInSuccess(cookies.user_info))
    }
  }, [])
  return (
    <div className="App">
      <AppContext.Provider value={userInfo as { [key: string]: any } || cookies.user_info}>
        <Header />
        {pathname != "/" && pathname != "/inquiries" && pathname != "/createTeam" &&
          <Navigator />
        }
        {Routes()}
        {pathname == "/" &&
          <Footer />
        }
      </AppContext.Provider>
    </div>
  );
}

export default App;
