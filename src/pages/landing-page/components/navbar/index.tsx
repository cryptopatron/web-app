import React from 'react';
import logo from '../../../../assets/images/Logo(Latest).jpg';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';

export default function NavbarComponent(){
    const [navbarOpen] = React.useState(true);
    return (
        <>
          <nav className="relative flex items-center justify-between px-2 py-3 bg-white mb-5">
            <div className="container px-4 mx-auto flex items-center justify-between">
              <div className="w-auto relative flex justify-start static lg:block">
                <a
                  className="leading-relaxedmr-4 py-2 whitespace-nowrap"
                  href="#pablo"
                >
                  <img src={logo} alt="Navbar Kōen logo" />
                </a>
              </div>
              <div className="items-center">
                <ul className="ml-auto">
                  <li className="nav-item">
                    <a
                      className="items-center text-xs uppercase font-bold text-black hover:opacity-75"
                      href="#pablo"
                    >
                      <span>Sign In</span>
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </nav>
        </>
      );
}