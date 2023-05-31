import React, { useEffect, useState } from 'react';
import './Navbar.css';
import { useStateContext } from '../contexts/ContextProvider';
import NavbarMenu from './NavbarMenu';
import Logo from './Logo';
import Hamburger from './Hamburger';

export default function Navbar() {
    const [isScrolled, setIsScrolled] = useState(false);
    const {showMenu, setShowMenu} = useStateContext()

    useEffect(() => {
        window.addEventListener('resize', (e) => {
            if(window.innerWidth > 600) {
                setShowMenu(false)
            }
        })

        // NOTE: I think I don't need to do this because there is no vertical scroll bar on small screens???
        // Hide vertical scroll bar when user click on HamburgerIcon and open menu
        // if(showMenu) {
        //   document.body.style.overflowY = 'hidden';
        // } else {
        //   document.body.style.overflowY = 'auto';
        // }

        const handleScroll = () => {
            const scrollTop = window.pageYOffset;
            if(scrollTop > 400) {
              setIsScrolled(true);
            }
            else {
              setIsScrolled(false)
            }
        };

        window.addEventListener('scroll', handleScroll);

        return () => {
        window.removeEventListener('scroll', handleScroll);
        };
    }, [showMenu]);

    return (
    <nav className={`Navbar section ${isScrolled ? 'scrolled' : ''}`}>
        <Logo />
        <NavbarMenu />
        <Hamburger />
      </nav>
    );
  }
  