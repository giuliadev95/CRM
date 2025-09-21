import React from "react";

const Pagination = ({recordsPerPage, totalRecords, paginate})=> {

    const pageNumbers=[];

    for(let i=1; i <= Math.ceil(totalRecords / recordsPerPage); i++){
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