import { BrowserRouter, Route, Routes } from "react-router-dom";
import './App.css'

// Pages
import { Overview } from "./Pages/Overview/Overview";
import { MainLayout } from "./Layout/MainLayout";
import { Bookings } from "./Pages/Bookings/Bookings";
import { CreateEvent } from "./Pages/CreateEvent/CreateEvent";
import { Profile } from "./Pages/Profile/Profile";
import { LoginPage } from "./Pages/Login/LoginPage";
import { SignUpPage } from "./Pages/Login/SignUpPage";
import { EditPage } from "./Pages/CreateEvent/EditPage";



function App() {

  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<MainLayout/>}>
        <Route index element={<Overview/>}/>
        <Route path="/bookings" element={<Bookings/>}/>
        <Route path="/create" element={<CreateEvent/>}/>
        <Route path="/login" element={<LoginPage/>}/>
        <Route path="/signup" element={<SignUpPage/>}/>
        <Route path="/profile" element={<Profile />}/>
        <Route path="/edit/:id" element={<EditPage/>}/>
      </Route>
    </Routes>
    </BrowserRouter>
  )
}

export default App
