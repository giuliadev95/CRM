/*  
    Display dynamic route for a single contact 's info
        click contact.name => open this dynamic route => 
            query sql : fetch 

            use the controllers/contact.js get_single_contact function
                do the same you do tu update the contact, but be aware of creating:
                    1- single_contact's page : 
                                                LEFT:  button Modify => onClick()=> { ModifyContact *}
                                                RIGHT: button

            * ModifyContact() {

                                open the same exact page of the single contact, but with different functionalities 
                                write in it the same info it already has as a placeholder, 
                                allow to delete the words and overwrite them, 
                                then place a check of required fields (so when they're void the user is told to compile
                                button SAVE onClick ()=> { put call to sql database and update info }  
                                button CANCEL ()=> { djust close the window => navigate to the single_contact_page}
                                                
             }
                                            

*/

