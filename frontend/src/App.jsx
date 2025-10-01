import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/home/Home.jsx";
import ContactsList from "./pages/contacts/ContactsList.jsx";
import NewContact from './pages/contacts/NewContact.jsx'
import UpdateContact from "./pages/contacts/UpdateContact.jsx";
import ContactView from "./pages/contacts/ContactView.jsx";
import CompaniesList from "./pages/companies/CompaniesList.jsx";
import CompanyView from "./pages/companies/CompanyView.jsx";
import NewCompany from "./pages/companies/NewCompany.jsx";
import UpdateCompany from "./pages/companies/UpdateCompany.jsx";
import ProjectsList from "./pages/projects/ProjectsList.jsx";
import ProjectView from "./pages/projects/ProjectView.jsx";
import UpdateProject from "./pages/projects/UpdateProject.jsx";
import NewProject from "./pages/projects/NewProject.jsx";
import Layout from "./Layout.jsx";
import './styles/app.css';

// ROUTER 
function App() {
  return (
    <> 
    <div className="app-container">
      <BrowserRouter>
        <Routes>
          <Route element={<Layout/>}>

            {/** Home */}
            <Route path='/' element={<ContactsList/>}/>
            <Route path='/home' element={<Home/>}/>

            {/** Contacts */}
            <Route path='/' element={<ContactsList/>}/>
            <Route path='/new-contact' element={<NewContact />} />
            <Route path='/update-contact/:id' element={<UpdateContact/>}/>
            <Route path='/contact-view/:id' element={<ContactView/>}/>

            {/** Companies */}
            <Route path='/companies' element={<CompaniesList/>}/>
            <Route path='/company-view/:id' element={<CompanyView/>}/>
            <Route path='/update-company/:id' element={<UpdateCompany/>}/>
            <Route path='/new-company' element={<NewCompany/>}/>

            {/** Projects */}
            <Route path='/projects' element={<ProjectsList/>}/>
            <Route path='/project-view/:id' element={<ProjectView/>}/>   
            <Route path='/update-project/:id' element={<UpdateProject/>}/>
            <Route path='/new-project' element={<NewProject/>}/>

          </Route>
        </Routes>
      </BrowserRouter>
      </div>
    </>
  )
}

export default App
