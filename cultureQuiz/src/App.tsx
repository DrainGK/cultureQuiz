import { Route, Routes } from 'react-router-dom'
import './App.css'
import Games from './pages/Games'
import Quiz from './pages/Quiz'
import Duel from './pages/Duel'

function App() {

  
  return (
    <div className='App flex flex-col'>
      <Routes>
        <Route path="/" element={<Games />}/>
        <Route path="/quiz/:slugAndId" element={<Quiz/>}/>
        <Route path="/duel/:slugAndId" element={<Duel/>}/>
      </Routes>
      
    </div>
  )
}

export default App
