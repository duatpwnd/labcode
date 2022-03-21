import './App.css';
import Header from "src/components/layout/header/Header";
import Footer from './components/layout/footer/Footer';
import Navigator from 'components/layout/navigation/Navigator';
import Routes from "src/routes/Routes"
import { useCookies } from 'react-cookie';
import { signInSuccess } from "src/actions/signIn"
import {
  useLocation
} from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "src/reducers";
import { useEffect, createContext } from 'react';
import { preloadImg } from "src/utils/common";
import toast, { Toaster } from 'react-hot-toast';
import InActiveDashBoardIco from "images/dashboard_ico.svg"
import ActiveDashBoardIco from "images/active_dashboard_ico.svg"
import InActiveTeamIco from "images/team_ico.svg"
import ActiveTeamIco from "images/active_team_ico.svg"
import InActiveProjectIco from "images/project_ico.svg"
import ActiveProjectIco from "images/active_project_ico.svg"
import CheckBoxOnIco from "images/checkbox_ico_on.svg"
import CheckBoxOffIco from "images/checkbox_ico_off.svg"

export const AppContext = createContext<{ [key: string]: any }>({})
export default function App() {
  const { pathname } = useLocation();
  const [cookies, setCookie] = useCookies();
  const dispatch = useDispatch();
  const userInfo = useSelector((state: RootState) => {
    return state.signIn.userInfo
  })
  useEffect(() => {
    preloadImg([InActiveDashBoardIco, ActiveDashBoardIco, InActiveTeamIco, ActiveTeamIco, InActiveProjectIco, ActiveProjectIco, CheckBoxOnIco, CheckBoxOffIco]);
    if (cookies.user_info != null) {
      dispatch(signInSuccess(cookies.user_info))
    }
  }, [])
  return (
    <AppContext.Provider value={userInfo as { [key: string]: any } || cookies.user_info}>
      <div className="App">
        <Toaster
          position="top-center"
          reverseOrder={false}
        />
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

