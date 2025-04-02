import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './css/App.css'
import ProfessorCard from './components/ProfessorCard'
import Professors from './pages/Professors'
import {Routes, Route} from "react-router-dom"
import Evaluations from './pages/EvaluationsList'
import Login from './pages/Login'

function App() {

  return (
   <>
   <main className='main-content'> 
    <Routes>
      <Route path='/' element = {<Login/>} />
      <Route path='/professors'element={<Professors/>}/>
      <Route path='/evaluations' element = {<Evaluations/>}/>
    </Routes>
   </main>
   
   </>
  )
}

export default App
