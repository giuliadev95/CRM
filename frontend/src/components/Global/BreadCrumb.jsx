import React from "react";
import { Link } from "react-router-dom";

const Breadcrumb = ({items}) => {
    return(
        <>
             <nav aria-label="breadcrumb">
                <ol class="breadcrumb">
                    {items.map((item, index)=> {
                        const isLast = index === items.length - 1; // If the position of the element is (2 - 1) = 1, show the element as an active Link, with an aria
                        return(
                            <>
                                <li key = {index} 
                                    className={isLast? "active" : ""} 
                                    aria-current = {isLast? "page" : null}
                                >
                                    {isLast? (item.label) : (
                                        <>
                                            <Link to={item.href}>
                                                {item.label}
                                            </Link>
                                            {" /"}  
                                        </>
                                    ) 
                                }
                                </li>
                            </>
                        );
                    })}
                </ol>
            </nav>
        </>
    );
};

export default Breadcrumb;