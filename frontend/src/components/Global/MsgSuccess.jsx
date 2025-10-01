import React from "react";
import { FaRegCheckCircle } from "react-icons/fa";


const MsgSuccess = ({state, subject}) => {
   if (state == false) {
    return null;
   } else {  
       let message = "";
    
       switch(subject) {
        case "contatto":
            message = "Contatto aggiornato con successo";
            break;
        case "azienda":
            message = "Azienda aggiornata con successo";
            break;
        case "nuovo-progetto":
            message = "Progetto creato con successo";
            break;
        default:
            message = "Progetto aggiornato con successo";
       }
       return(
        <>
            <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                <div className="bg-white p-6 rounded-lg shadow-lg mx-4 md:mx-0">
                    <p className="mb-4 text-lg font-bold">
                        {message}
                    </p>
                    <div className="flex gap-4 justify-center">
                    <FaRegCheckCircle className='text-green-600'/>
                    </div>
                </div>
            </div>
        </>
       )
    }

}

export default MsgSuccess;