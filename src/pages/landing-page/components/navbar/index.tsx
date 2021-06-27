import React from 'react';
import logo from '../../../../assets/images/Logo(Latest).jpg';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';

export default function NavbarComponent(){
    const [navbarOpen, setNavbarOpen] = React.useState(false);
    return (
        <>
          <nav className="relative flex flex-wrap items-center justify-between px-2 py-3 bg-white mb-5">
            <div className="container px-4 mx-auto flex flex-wrap items-center justify-between">
              <div className="w-full relative flex justify-between lg:w-auto lg:static lg:block lg:justify-start">
                <a
                  className="leading-relaxedmr-4 py-2 whitespace-nowrap"
                  href="#pablo"
                >
                  <img src={logo} alt="Navbar Kōen logo" />
                </a>
                <button
                  className="text-black cursor-pointer text-xl leading-none px-3 py-1 border border-solid border-transparent rounded bg-transparent block lg:hidden outline-none focus:outline-none"
                  type="button"
                  onClick={() => setNavbarOpen(!navbarOpen)}
                >
                  <FontAwesomeIcon icon={faBars} />
                </button>
              </div>
              <div
                className={
                  "lg:flex flex-grow items-center" +
                  (navbarOpen ? " flex" : " hidden")
                }
                id="example-navbar-danger"
              >
                <ul className="flex flex-col lg:flex-row list-none lg:ml-auto">
                  <li className="nav-item">
                    <a
                      className="px-3 py-2 flex items-center text-xs uppercase font-bold leading-snug text-black hover:opacity-75"
                      href="#pablo"
                    >
                      <i className="fab fa-facebook-square text-lg leading-lg text-white opacity-75"></i><span className="ml-2">Sign In</span>
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </nav>
        </>
      );
}