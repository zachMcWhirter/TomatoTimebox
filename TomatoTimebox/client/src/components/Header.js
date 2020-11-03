import React, { useState, useContext } from 'react';
import { NavLink as RRNavLink } from "react-router-dom";
import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink
} from 'reactstrap';
import { UserProfileContext } from "../providers/UserProfileProvider";
import TimerWithReset from "../components/Timer/Timer2";

export default function Header() {
    const { isLoggedIn, logout } = useContext(UserProfileContext);
    const [isOpen, setIsOpen] = useState(false);
    const toggle = () => setIsOpen(!isOpen);

    return (

        <div className="navbar-container">
            <div className="h1-with-timer">
                <h1 className="header-h1">Tomato Timebox</h1>

                {isLoggedIn &&
                    <div><TimerWithReset></TimerWithReset></div>
                }
            </div>
            <div className="nav-items">
                <NavbarBrand tag={RRNavLink} to="/">TomatoTimebox</NavbarBrand>
                {/* <div > */}
                <div>

                    {isLoggedIn &&
                        <>
                            <NavItem>
                                <NavLink tag={RRNavLink} to="/tasks">Task List</NavLink>
                            </NavItem>
                        </>
                    }
                </div>
                <div>
                    {isLoggedIn &&
                        <>
                            <NavItem>
                                <a aria-current="page" className="nav-link"
                                    style={{ cursor: "pointer" }} onClick={logout}>Logout</a>
                            </NavItem>
                        </>
                    }
                </div>
                {/* <div>
                    {!isLoggedIn &&
                        <>
                            <NavItem>
                                <NavLink tag={RRNavLink} to="/login">Login</NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink tag={RRNavLink} to="/register">Register</NavLink>
                            </NavItem>
                        </>
                    }
                </div> */}
                {/* </div> */}
            </div>

        </div>
    );
}