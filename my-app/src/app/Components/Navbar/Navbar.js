"use client"
import React from 'react';
import { useState, useEffect } from 'react';
import { Link as Scroll } from 'react-scroll';
import Link from 'next/link';

import './Navbar.css';
import { imageConfigDefault } from 'next/dist/shared/lib/image-config';

const Navbar = () => {

    const [showDiv, setShowDiv] = useState(false);
      
        useEffect(() => {
          const handleScroll = () => {
            const scrollPosition = window.scrollY;
      
            if (scrollPosition > window.innerHeight * 0.3) {
              setShowDiv(true);
            } else {
              setShowDiv(false);
            }
          };
      
          window.addEventListener('scroll', handleScroll);
      
          return () => {
            window.removeEventListener('scroll', handleScroll);
          };
    }, []);
    


    const handleScroll = () => {
        window.scrollTo({
          top: 0,
          behavior: "smooth"
        });
      }


  return (
    <div className="NavbarComponent">
      <div className="NavbarComponent-in" id={showDiv ? 'show-color' : 'show-shadow'}>
        <div className="Navbar-one">
            { showDiv ? <h1 onClick={handleScroll}>Student Activity Center</h1> : <img src="https://firebasestorage.googleapis.com/v0/b/sacwebsite-8d0b5.appspot.com/o/HeroVideo%2FOfficialSacLogo.png?alt=media&token=8a73bd93-832c-4d5d-819d-0e371d12b01c" alt="" /> }
        </div>
        <div className="Navbar-two">
          <ul>
            <li>
              <Scroll
                className='nav-scroll-links'
                activeClass="active"
                to="three"
                spy={true}
                smooth={true}
                offset={-10}
                duration={200}
              >
                About
              </Scroll>
            </li>
            <li>
              <Scroll
                className='nav-scroll-links'
                activeClass="active"
                to="five"
                spy={true}
                smooth={true}
                offset={-50}
                duration={200}
              >
                Clubs
              </Scroll>
            </li>
            {/* <li>
              <Scroll
                className='nav-scroll-links'
                activeClass="active"
                to="nine"
                spy={true}
                smooth={true}
                offset={-50}
                duration={200}
              >
                Blogs
              </Scroll>
            </li> */}
            <li>
              <Scroll
                className='nav-scroll-links'
                activeClass="Twelve"
                to="news"
                spy={true}
                smooth={true}
                offset={-60}
                duration={200}
              >
                News
              </Scroll>
            </li>
            <li>
              <Scroll
                className='nav-scroll-links'
                activeClass="active"
                to="ten"
                spy={true}
                smooth={true}
                offset={-60}
                duration={200}
              >
                Events
              </Scroll>
            </li>
            <li>
              <Link href='https://sac-svr.vercel.app' target='_blank'>
                  SVR
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
