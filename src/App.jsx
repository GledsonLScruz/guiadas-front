import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './css/App.css'
import ProfessorCard from './components/ProfessorCard'
import ProfessoresPage from './pages/Professors'
import {Routes, Route} from "react-router-dom"
import Evaluations from './pages/EvaluationsList'
import Login from './pages/Login'
import ClassesPerProfessor from './pages/ClassesPerProfessor'
import NewEvaluation from './pages/newEvaluation'

function App() {

  return (
   <>
   <main className='main-content'> 
    <Routes>
      <Route path='/' element = {<Login/>} />
      <Route path='/professors'element={<ProfessoresPage/>}/>
      <Route path='/evaluations' element = {<Evaluations/>}/>
      <Route path='/classesPerProfessor' element = {<ClassesPerProfessor/>}/>
      <Route path='/NewEvaluation' element = {<NewEvaluation/>}/>
    </Routes>
   </main>
   
   </>
  )
}

export default App
