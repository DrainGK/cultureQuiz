import { Route, Routes } from 'react-router-dom'
import './App.css'
import Games from './pages/Games'
import Quiz from './pages/Quiz'

function App() {

  
  return (
    <div className='App w-full'>
      <Routes>
        <Route path="/" element={<Games />}/>
        <Route path="/quiz/:id" element={<Quiz/>}/>
      </Routes>
      
    </div>
  )
}

export default App
