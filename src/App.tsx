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
export default function App() {
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
    <AppContext.Provider value={userInfo as { [key: string]: any } || cookies.user_info}>
      <div className="App">
        <Header />
        {pathname != "/" && pathname != "/inquiries/create" && pathname != "/teams/create" &&
          <Navigator />
        }
        {Routes()}
        {pathname == "/" &&
          <Footer />
        }
      </div>
    </AppContext.Provider>
  );
}

