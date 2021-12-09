import { Link } from "react-router-dom";
import './App.css';
import Header from "src/components/layout/Header";
import Footer from "src/components/layout/Footer";
import Routes from "src/routes/Routes"
function App() {
  return (
    <div className="App">
      <Header />
      {Routes()}
      {/* <Footer /> */}
    </div>
  );
}

export default App;
