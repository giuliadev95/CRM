import React from "react";

const Pagination = ({contactsPerPage, totalContacts, paginate})=> {

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
                                    <a          
                                        className="page-link"
                                        onClick={()=> paginate(number)}
                                    >
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