import React from "react";
import { AiFillHome, AiOutlineClose } from 'react-icons/ai';
import { FaCartPlus } from 'react-icons/fa';
import { IoIosPaper, IoMdPerson } from "react-icons/io";


export const SidebarData = [
   { 
        title: 'Home',
        path: '/',
        icon: <AiFillHome/>,
        cName: 'nav-text'
    },
    { 
        title: 'Contatti',
        path: '/',
        icon: <FaCartPlus/>,
        cName: 'nav-text'
    },
    { 
        title: 'Aziende',
        path: '/companies',
        icon: <IoMdPerson/>,
        cName: 'nav-text'
    },
    { 
        title: 'Progetti',
        path: '/projects',
        icon: <IoIosPaper/>,
        cName: 'nav-text'
    }
]