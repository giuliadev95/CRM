import React from "react";

const Pagination = ({contactsPerPage, totalContacts})=> {

    const pageNumbers=[];

    for(let i=1; i <= Math.ceil(totalContacts / contactsPerPage); i++){
        pageNumbers.push(i);
    }
    return(
        <>
           <nav>
                <ul className="pagination">
                    {pageNumbers.map(number => {
                        return(
                            <>
                                <li key={number} className="page-item">
                                    <a href="!#" className="page-link">
                                        {number}
                                    </a>
                                </li>
                            </>
                        )
                    })}
                </ul>
            </nav> 
        </>
    )
}

export default Pagination;