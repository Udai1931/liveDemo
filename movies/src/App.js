import logo from './logo.svg';
import './App.css';
import Navbar2 from './Components/Navbar2';
import Banner2 from './Components/Banner2';
import Movies2 from './Components/Movies2';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Favourites from './Components/Favourites';
import Favourites3 from './Components/Favourites3';
import Movies3 from './Components/Movies3';
// import "react-loader-spinner/dist/loader/css/react-spinner-loader.css"

function App() {
  return (
    <BrowserRouter>
      <Navbar2 />
      <Routes>
        <Route path="/" element={<><Banner2 /><Movies3/></>} />
        <Route path="/favourites" element={<Favourites3/>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
