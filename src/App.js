import React from 'react'
import { Routes, Route } from "react-router-dom"
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from './Components/Header';
import Cads from './Components/Cads';
import CardDetailes from './Components/CardDetailes';



const App = () => {
  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path='/' element={<Cads />} />
        <Route path='/Cads/:id' element={<CardDetailes />} />
      </Routes>
    </div>
  )
}

export default App
