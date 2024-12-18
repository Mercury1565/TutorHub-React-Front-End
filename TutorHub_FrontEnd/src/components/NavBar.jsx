import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import '../styles/header/Header.css';

import {userIcon} from '../assets/assets.js'

import logo_black from "../assets/header_assets/Logo-black.png";
import Top from "./Top";


function Header({user}){
    const loggedIn = Boolean(localStorage.getItem('token'))

    const [dropdownOpen, setDropdownOpen] = useState(false);

    const toggleDropdown = () => {
        setDropdownOpen(!dropdownOpen);
    };

    const navigate_login = useNavigate();
    const navigate_profile = useNavigate();

    return(
        <header className="header">
            <Top/>

            <nav className="nav_container">
                <div className="navbar-navigators">
                    <NavLink to="/" className="nav_logo_container">
                        <img className="nav-logo" src={logo_black} alt="Logo" />
                    </NavLink>
                  
            
                    <div className="nav__menu" id="nav-menu">
                        <ul className="nav__list">
                            <li className="nav__item">
                                {user === "student" &&(
                                <NavLink to="/student" className="nav__link">
                                    Home
                                </NavLink>
                                )}
                            </li>

                            <li className="nav__item">
                                {user === "student" &&(
                                <NavLink to="/student/courses" className="nav__link">
                                    Tutorials
                                </NavLink>
                                )}
                            </li>

                            <li className="nav__item">
                                {user === "student" &&(
                                <NavLink to="/student/about_us" className="nav__link">
                                    About Us
                                </NavLink>
                                )}
                            </li>

                            <li className="nav__item">
                                {user === "tutor" &&(
                                <NavLink to="/tutor" className="nav__link">
                                    Home
                                </NavLink>
                                )}
                            </li>
                            <li className="nav__item">
                                {user === "tutor" &&(
                                <NavLink to="/tutor/add_course" className="nav__link">
                                    Add Program
                                </NavLink>
                                )}
                            </li>

                            <li className="nav__item">
                                {user === "tutor" &&(
                                <NavLink to="/tutor/about_us" className="nav__link">
                                    About Us
                                </NavLink>
                                )}
                            </li> 

                            
                        </ul>
                    </div>
                </div>

                {!loggedIn && 
                    <div className="login-button-container">
                        <button 
                            className="login-button"
                            onClick={() => {navigate_login('/login')}}
                            >
                                Login
                        </button>
                    </div>
                }

                {loggedIn && 
                    <div className="user-button-container">
                        <img src={userIcon} onClick={toggleDropdown}/>
                        {dropdownOpen && 
                            <div className="dropdown-menu">
                                <button
                                    onClick={() => {navigate_profile('/tutor/profile')}}
                                >
                                    View Profile
                                </button>
                                <button>Log Out</button>
                            </div>
                        }
                    </div>
                }       
            </nav>

        </header>
    );
}

export default Header