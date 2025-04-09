import { Button } from "flowbite-react";
import {Suspense} from "react";
import Home from "./page/Home.jsx";
import {Route, Routes} from "react-router-dom";
import WaveLoadingComponent from "./components/WaveLoadingComponent.jsx";
import {Layout} from "./page/Layout.jsx";

function App() {
    return(
        <Suspense fallback={<WaveLoadingComponent/>}>
            <Routes>
                <Route path="/" element={<Layout />} >
                    <Route index element={<Home />} />
                </Route>
            </Routes>
        </Suspense>
    )
}

export default App
