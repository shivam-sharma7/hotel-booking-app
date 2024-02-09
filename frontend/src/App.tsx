import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom"
import Layouts from "./layouts/Layouts"
import Register from "./pages/Register"

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={
        <Layouts > 
          <p>Home Page</p>
        </Layouts>} />

        <Route path="/search" element={
        <Layouts > 
          <p>Search Page</p>
        </Layouts>} />
        <Route path="/register" element={
        <Layouts> 
          <Register /> 
        </Layouts>} />

        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  )
}

export default App
