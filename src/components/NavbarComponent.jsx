import {Button, Navbar, NavbarBrand} from "flowbite-react";
import {useDispatch} from "react-redux";
import {setIsOpenAddNew} from "../redux/feature/cake/cakeSlice.js";
import {AddNewCakeModalComponent} from "./AddNewCakeModalComponent.jsx";

export function NavbarComponent() {
    const dispatch = useDispatch();
    return (
        <>
            <Navbar fluid className="fixed w-full top-0 z-10">
                <NavbarBrand href="#">
                    <img src="/images/cakeLogo.png" className="mr-3 h-6 sm:h-9" alt="Flowbite React Logo"/>
                    <span
                        className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">Cake CRUD</span>
                </NavbarBrand>
                <div className="flex md:order-2">
                    <Button onClick={() => dispatch(setIsOpenAddNew(true))}>បន្ថែមនំ</Button>
                </div>
            </Navbar>
            <AddNewCakeModalComponent />
        </>
    );
}
