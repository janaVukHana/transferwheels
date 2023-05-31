import { useEffect } from 'react'
import { useStateContext } from './contexts/ContextProvider'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import reactLogo from './assets/react.svg'
import './App.css'
import ScrollToTop from './components/ScrollToTop'
import Protected from './components/Protected'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Home from './views/Home'
import Login from './views/Login'
import Dashboard from './views/Dashboard'
import NotFound from './views/NotFound'

function App() {

  const {notification, setNotification} = useStateContext()

  useEffect(() => {
    if(notification) {
      setTimeout(() => {
        setNotification(null)
      }, 5000)
    }
  })

  return (
    <div className="App">
      <BrowserRouter>
      <ScrollToTop />
        <Navbar />

        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/dashboard" element={<Protected><Dashboard /></Protected>} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>

        <Footer />
    </BrowserRouter>
    {notification && <p className='notification'>{notification}</p>}
    </div>
  )
}

export default App
