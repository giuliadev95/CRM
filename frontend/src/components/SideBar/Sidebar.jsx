import React from 'react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { AiOutlineClose } from 'react-icons/ai';
import { FaBars } from 'react-icons/fa';
import { SidebarData } from './SidebarData';
import '../../styles/app.css';
import { IconContext } from 'react-icons';

function SideBar() {
  const [sidebar, setSidebar] = useState(false);

  const showSidebar = () => setSidebar(!sidebar);
  return(
    <>
      <IconContext.Provider value={{color: '#fff'}}>
        <div className="navbar">
          <button className="menu-bars">
            <FaBars
              onClick={showSidebar}
              />
          </button>
        </div>
        <nav className={sidebar?'nav-menu active' : 'nav-menu'}>
          <ul 
            className='nav-menu-items'
          >
            <li className='navbar-toggle'>
              <button className="menu-bars">
                <AiOutlineClose
                onClick={showSidebar}
                />
              </button>
            </li>
            {SidebarData.map((item, index)=>{
              return(
                <li key={index} className={item.cName} onClick={showSidebar}>
                  <Link to={item.path}>
                  {item.icon}
                  <span>{item.title}</span>
                  
                  </Link>
                </li>
              )
            })}
          </ul>
        </nav>
      </IconContext.Provider>
    </>
  )
}

export default SideBar