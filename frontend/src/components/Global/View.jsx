import React from "react";
import { FaUserAlt } from "react-icons/fa";
import { HiBuildingOffice2 } from "react-icons/hi2";
import { FaProjectDiagram } from "react-icons/fa";
import { IoMdArrowRoundBack } from "react-icons/io";
import { useNavigate } from "react-router-dom";

const View = ({title, fields, avatar}) => {

    const navigate = useNavigate();

    return(
        <div className="flex flex-col items-start justify-start mt-4">
            <div className="mx-8 flex flex-col gap-3 justify-start">  
                <button
                    type="button"
                    onClick={()=> navigate(-1)}
                    className="flex gap-1 items-center"
                >
                    <IoMdArrowRoundBack/>{" Indietro"}
                </button> 
                <div className="flex items-center justify-start gap-3 mb-4">
                    {
                        avatar === "contact" ? (   
                        <FaUserAlt size={"2rem"}/>
          
                        ): avatar==="company"? (
                            <HiBuildingOffice2 size={"2rem"}/>

                        ): <FaProjectDiagram size={"2rem"}/>
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
            </div>	
        </div>
    )
}

export default View;