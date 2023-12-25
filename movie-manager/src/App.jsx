import React from "react";
import {BrowserRouter} from "react-router-dom";
import Header from "./components/Header.jsx";
import {Container} from "@mui/material";
import AppRouter from "./components/AppRouter.jsx";


function App() {
    return (
        <BrowserRouter>
            <Header/>
            <Container maxWidth={"lg"}>
                <AppRouter/>
            </Container>
        </BrowserRouter>
    )
}


export default App;
