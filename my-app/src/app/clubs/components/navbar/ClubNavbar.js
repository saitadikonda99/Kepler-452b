"use client"
import React from 'react';
import { useState, useEffect } from 'react';
import { Link as Scroll } from 'react-scroll';
import Link from 'next/link';

import './ClubNavbar.css';

const Navbar = (props) => {


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
                { showDiv ? <h1 onClick={handleScroll}>{props.ClubName}</h1> : <img src={props.ClubImg} alt="" /> }
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
                            duration={400}
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
                            offset={-10}
                            duration={400}
                        >
                        Domains
                        </Scroll>
                    </li>
                    <li>
                        <Scroll
                            className='nav-scroll-links'
                            activeClass="active"
                            to="four"
                            spy={true}
                            smooth={true}
                            offset={-10}
                            duration={400}
                        >
                        Team
                        </Scroll>
                    </li>
                    <li>
                        <Scroll
                            className='nav-scroll-links'
                            activeClass="active"
                            to="seven"
                            spy={true}
                            smooth={true}
                            offset={-10}
                            duration={400}
                        >
                        News
                        </Scroll>
                    </li>
                    <li>
                        <Scroll
                            className='nav-scroll-links'
                            activeClass="active"
                            to="eight"
                            spy={true}
                            smooth={true}
                            offset={-10}
                            duration={400}
                        >
                        Upcoming Events
                        </Scroll>
                    </li>
                    <li>
                        <Scroll
                            className='nav-scroll-links'
                            activeClass="active"
                            to="Twelve"
                            spy={true}
                            smooth={true}
                            offset={-10}
                            duration={400}
                        >
                        FAQs
                    </Scroll>
                    </li>
                    <li>
                        <Scroll
                            className='nav-scroll-links'
                            activeClass="active"
                            to="thirteen"
                            spy={true}
                            smooth={true}
                            offset={-10}
                            duration={400}
                        >
                        Clubs
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