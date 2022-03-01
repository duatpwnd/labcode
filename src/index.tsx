import ReactDOM from 'react-dom';
import './index.css';
import reportWebVitals from './reportWebVitals';
import { Provider } from 'react-redux';
import store from "src/store"
import Axios from './utils/Axios';
import 'src/lang/i18n';
import CustomRouter from './CustomRouter';
import App from "src/App"
import history from "src/utils/history"
ReactDOM.render(
  <Provider store={store}>
    <CustomRouter history={history}>
      <Axios />
      <App />
    </CustomRouter>
  </Provider>
  ,
  document.getElementById('root')
);
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
