import './App.css';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import '../node_modules/bootstrap/dist/js/bootstrap.bundle.min.js'
import Navbar from './component/Navbar';
import Home from './component/Home';
import Register from './component/Register';
import { Route, Routes } from "react-router-dom"
import Edit from './component/Edit';
import Details from './component/Details';

function App() {
  return (
    <>
    <Navbar/>
     <Routes>
        <Route exact path="/" element={<Home/>}/>
        <Route exact path="/register" element={<Register/>}/>
        <Route exact path="/edit/:id" element={<Edit/>}/>
        <Route exact path="/view/:id" element={<Details/>}/>
    </Routes>
    
    </>
  );
}


export default App;
