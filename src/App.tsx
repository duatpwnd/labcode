import './App.css';
// @mui material components
import Header from "src/components/layout/Header";
import Footer from "src/components/layout/Footer";
import Routes from "src/routes/Routes"
function App() {
  return (
    <div className="App">
      <Header />
      {Routes()}
      <Footer />
    </div>
  );
}

export default App;
