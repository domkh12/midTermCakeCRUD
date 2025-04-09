import {useEffect} from "react";
import {Outlet} from "react-router-dom";
import {cakeApiSlice} from "../../feature/cake/cakeApiSlice.js";
import store from "../store.js";

function Prefetch() {

    useEffect(() => {
            store.dispatch(cakeApiSlice.util.prefetch("getCake", "cakeList", {
                force: true,
            }));


    }, []);

    return <Outlet/>;
}

export default Prefetch;
