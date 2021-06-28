import { useState } from 'react';
import logo from '../../../../assets/images/Logo(Latest).jpg';
import Modal from "@material-tailwind/react/Modal";
import ModalHeader from "@material-tailwind/react/ModalHeader";
import ModalBody from "@material-tailwind/react/ModalBody";
import ModalFooter from "@material-tailwind/react/ModalFooter";

import LoginOverlayComponent from './../login-overlay/'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';

export default function NavbarComponent(){
    const [showLoginOverlay, setShowLoginOverlay] = useState(false);
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
                    <button
                      className="btn-main"
                      onClick={() => {
                          setShowLoginOverlay(true)
                      }}
                    >
                      <span>Sign In</span>
                    </button>
                  </li>
                </ul>
              </div>
            </div>
          </nav>
          
          <Modal size="regular" active={showLoginOverlay} toggler={() => setShowLoginOverlay(false)}>
                <ModalHeader toggler={() => setShowLoginOverlay(false)}>
                </ModalHeader>
                <ModalBody>
                    <LoginOverlayComponent/>
                </ModalBody>
                <ModalFooter>
                </ModalFooter>
            </Modal>

        </>
      );
}