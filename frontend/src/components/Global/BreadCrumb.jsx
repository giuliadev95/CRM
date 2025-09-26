import React from "react";
import { Link } from "react-router-dom";
import { FiChevronRight } from "react-icons/fi";

const Breadcrumb = ({items}) => {
    return(
        <>
            <nav aria-label="breadcrumb" className="text-sm md:text-base max-w-[90%] flex flex-wrap">             
                <ol class="breadcrumb">
                    {items.map((item, index)=> {
                        const isLast = index === items.length - 1; // If the position of the element is (2 - 1) = 1, show the element as an active Link with an aria attribute of "page", if not it's not a link and doesn't have an aria attribute at all.
                        return(
                            <li key = {index} 
                                className={isLast? "active" : ""} 
                                aria-current = {isLast? "page" : null}
                            >
                                {isLast? (item.label) : (
                                    <>
                                        <Link 
                                            to={item.href}
                                            onClick={item.onClick}
                                            className="flex items-center"
                                        >
                                            {item.label}
                                            <FiChevronRight className="text-gray-600"/>
                                        </Link>
                                    </>
                                ) 
                            }
                            </li>
                        );
                    })}
                </ol>
            </nav>
        </>
    );
};

export default Breadcrumb;