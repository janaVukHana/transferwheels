import { Link, NavLink } from 'react-scroll';
import './NavbarMenu.css'
import { useStateContext } from '../contexts/ContextProvider';
import axiosClient from '../axios-client';
import { useEffect } from 'react';

export default function NavbarMenu() {

  const {token, setUser, setToken, setNotification} = useStateContext()

    const onLogout = (e) => {
        e.preventDefault()

        axiosClient.post('/logout')
            .then(() => {
                setUser({})
                setToken(null)
                setNotification('Izlogovan si.')
            })
    }

    const {showMenu, setShowMenu} = useStateContext()

    const handleClick = () => {
      if(window.innerWidth <= 600) {
        setShowMenu(false)
      }
    }

    return (
      <div className={`NavbarMenu ${showMenu ? 'show-menu':''}`}>
        <ul>
          <li>
            <Link
              onClick={handleClick}
              activeClass="active"
              to="home"
              spy={true}
              smooth={true}
              offset={-70}
              duration={500}
            >
              Početna
            </Link>
          </li>
          <li>
            <Link
              onClick={handleClick}
              activeClass="active"
              to="aboutus"
              spy={true}
              smooth={true}
              offset={-70}
              duration={500}
            >
              O&nbsp;Nama
            </Link>
          </li>
          <li>
            <Link
              onClick={handleClick}
              activeClass="active"
              to="price"
              spy={true}
              smooth={true}
              offset={-70}
              duration={500}
            >
              Cenovnik
            </Link>
          </li>
          <li>
            <Link
              onClick={handleClick}
              activeClass="active"
              to="contact"
              spy={true}
              smooth={true}
              offset={-70}
              duration={500}
            >
              Kontakt
            </Link>
          </li>
          {token && 
              <li><a className="active" href="/dashboard">Dashboard</a></li>
          }
          {token && 
              <li><a href="#" onClick={onLogout}>Logout</a></li>
          }
        </ul>
      </div>
    )
}