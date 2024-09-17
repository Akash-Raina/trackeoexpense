import {BrowserRouter as Router, Route, Routes } from "react-router-dom"
import { Signup } from "./pages/Signup"
import { Login } from "./pages/Login"
import { Home } from "./pages/Home"
function App() {

  return (
    <Router>
      <Routes>
        <Route path="/signup" element = {<Signup/>}/>
        <Route path="/login" element = {<Login/>}/>
        <Route path="/" element = {<Home/>}/>
      </Routes>
    </Router>
  )
}

export default App
