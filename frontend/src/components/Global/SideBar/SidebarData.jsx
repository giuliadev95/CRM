import React from "react";
import { AiFillHome } from 'react-icons/ai';
import { RiContactsBook2Fill } from "react-icons/ri";
import { FaRocket } from "react-icons/fa";
import { MdBusinessCenter } from "react-icons/md";



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
        icon: <RiContactsBook2Fill/>,
        cName: 'nav-text'
    },
    { 
        title: 'Aziende',
        path: '/companies',
        icon: <MdBusinessCenter/>,
        cName: 'nav-text'
    },
    { 
        title: 'Progetti',
        path: '/projects',
        icon: <FaRocket/>,
        cName: 'nav-text'
    }
]