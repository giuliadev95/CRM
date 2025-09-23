import React from "react";
import { FaUserAlt } from "react-icons/fa";
import { HiBuildingOffice2 } from "react-icons/hi2";
import { FaRocket } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const View = ({title, fields, avatar}) => {
    const navigate = useNavigate();

    return(
        <>
            <div className="mx-8 flex flex-col gap-4">
                <div className="flex items-end justify-start gap-3">
                    {
                        avatar === "contact" ? (   
                        <FaUserAlt/>
          
                        ): avatar==="company"? (
                            <HiBuildingOffice2 size={"2rem"}/>

                        ): <FaRocket/>
                    }
                    <h1 class="h2 p-0 m-0">{title}</h1>   
                </div>
                <ul className="list-unstyled flex flex-col">
                    {fields.map((field, index) => {
                        return(
                            <li key={index} className="mb-2">
                                <p className="font-bold text-gray-600 text-lg m-0">{field.label}</p>
                                <p className="m-0">{field.value || "-"}</p>
                                <hr className="mb-1 bg-gray-400"></hr>
                            </li>
                        )
                    })}
                </ul>
                <button
                    type="button"
                    onClick={()=> navigate(-1)}
                    >
                    Indietro
                </button>
            </div>	
        </>
    )
}

export default View;