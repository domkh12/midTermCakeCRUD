import {NavbarComponent} from "../components/NavbarComponent.jsx";
import {Outlet} from "react-router-dom";

export function Layout(){
    return (
        <>
            <NavbarComponent />
            <div className="dark:bg-black mt-[60px] lg:px-20 pt-10 pb-32">
            <Outlet/>
            </div>
        </>
    )
}