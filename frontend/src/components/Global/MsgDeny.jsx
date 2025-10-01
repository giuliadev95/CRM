import React from "react";
import { MdError } from "react-icons/md";


const MsgDeny = ({state, subject}) => {
   if (state == false) {
    return null;
   } else {  
       let message = "";
    
       switch(subject) {
        case "contatto":
            message = "Errore: impossibile aggiornare il contatto";
            break;
        case "azienda":
            message = "Errore: impossibile aggiornare l'azienda";
            break;
        case "nuovo-progetto":
            message = "Errore: creazione progetto non riuscita";
            break;
        default:
            message = "Errore: impossibile completare l'azione";
       }
       return(
        <>
            <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                <div className="bg-white p-6 rounded-lg shadow-lg mx-4 md:mx-0">
                    <p className="mb-4 text-lg font-bold">
                        {message}
                    </p>
                    <div className="flex gap-4 justify-center">
                        <MdError className='text-red-800'/>
                    </div>
                </div>
            </div>
        </>
       )
    }
}

export default MsgDeny;