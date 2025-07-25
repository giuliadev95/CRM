import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from '../src/pages/Home.jsx'
import AddContact from '../src/pages/AddContact.jsx'
import UpdateContact from "./pages/UpdateContact.jsx";
import Navbar from "./components/NavBar.jsx";
import './styles/index.css';

// 3 ROUTES: Homepage with the contact list, Page to add a new contact, Page to update an existent contact
function App() {
  return (
    <> 
      <BrowserRouter>
        <Navbar/>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/new-contact' element={<AddContact />} />
          <Route path='/update-contact/:id' element={<UpdateContact/>}/> {/** ROUTE TO DISPLAY THE UPDATE-CONTACT FORM */}
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
