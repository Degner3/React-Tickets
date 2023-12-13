import { Outlet } from "react-router-dom"
import style from "./MainLayout.module.scss"
import { Navigation } from "../Components/Navigation/Navigation"
import { Footer } from "../Components/Footer/Footer";



export const MainLayout = () => {


  return (
    <main className={style.layout}>
      <Navigation />
      <div className={style.content}>
        <Outlet />
      </div>
        
      <Footer />
    </main>
  );


};