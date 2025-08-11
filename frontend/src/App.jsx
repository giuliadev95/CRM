import { BrowserRouter, Routes, Route } from "react-router-dom";
import ContactsList from "./pages/contacts/ContactsList.jsx";
import NewContact from './pages/contacts/NewContact.jsx'
import UpdateContact from "./pages/contacts/UpdateContact.jsx";
import ContactView from "./pages/contacts/ContactView.jsx";
import CompaniesList from "./pages/companies/CompaniesList.jsx";
import LeadsList from "./pages/leads/LeadsList.jsx";
import ProjectsList from "./pages/projects/ProjectsList.jsx";
import Layout from "./Layout.jsx";
import './styles/app.css';

// 3 ROUTES: Homepage with the contact list, Page to add a new contact, Page to update an existent contact
function App() {
  return (
    <> 
    <div className="app-container">
      <BrowserRouter>
        <Routes>
          <Route element={<Layout/>}>
            <Route path='/' element={<ContactsList/>}/>
            <Route path='/new-contact' element={<NewContact />} />
            <Route path='/update-contact/:id' element={<UpdateContact/>}/> {/** ROUTE TO DISPLAY THE UPDATE-CONTACT FORM */}
            <Route path='/contact-view/:id' element={<ContactView/>}/>
            <Route path='/companies' element={<CompaniesList/>}/>
            <Route path='/leads' element={<LeadsList/>}/>
            <Route path='/projects' element={<ProjectsList/>}/>   
          </Route>
        </Routes>
      </BrowserRouter>
      </div>
    </>
  )
}

export default App
