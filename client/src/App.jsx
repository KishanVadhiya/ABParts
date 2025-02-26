import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Sidebar from './Components/Sidebar'
import Header from './Components/Header'
import Home from './Pages/home/Home.jsx'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import AddPart from './Pages/AddPart/AddPart'
import AboutUs from './Pages/AboutUs/AboutUs'
import ActiveParts from './Pages/ActiveParts/ActiveParts.jsx'
import SpareParts from './Pages/SpareParts/SpareParts.jsx'
import ActiveControlValve from './Pages/ActiveControlValve/ActiveControlValve.jsx'
import SpareFlowMeter from './Pages/SpareFlowMeter/SpareFlowMeter.jsx'
import SpareControlValve from './Pages/SpareControlValve/SpareControlValve.jsx'
import AcitveFlowMeter from './Pages/ActiveFlowMeter/AcitveFlowMeter.jsx'
function App() {
  const [showNav, setShowNav] = useState(false);
  const toggleNavbar= ()=>{
    setShowNav(!showNav);
  }

  return (
    <>
      <Router>
        <Header toggleNavbar={toggleNavbar}/>
        <Sidebar isVisible={showNav}/>
        <div className="main">
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/addPart' element={<AddPart />} />
            <Route path='/AboutUs' element={<AboutUs />} />
            <Route path='/active-parts' element={<ActiveParts />} />
            <Route path='/spare-parts' element={<SpareParts />} />
            <Route path='/active-parts/control-valve' element={<ActiveControlValve />} />
            <Route path='/spare-parts/control-valve' element={<SpareControlValve />} />
            <Route path='/active-parts/flow-meter' element={<AcitveFlowMeter />} />
            <Route path='/spare-parts/flow-meter' element={<SpareFlowMeter />} />
          </Routes>
        </div>
      </Router>
    </>
  )
}

export default App
