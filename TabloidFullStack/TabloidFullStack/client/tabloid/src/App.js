import React, { useState } from 'react';
import { BrowserRouter as Router } from "react-router-dom";
import Header from "./components/Header";
import ApplicationViews from "./components/ApplicationViews";
import { useEffect } from 'react';
import Authorize from './components/Authorize';

function App() {
    const [isLoggedIn, setIsLoggedIn] = useState(true);


    useEffect(() => {
        if (!localStorage.getItem("userProfile")) {
            setIsLoggedIn(false)

        }
    }, [isLoggedIn])

    return (
        <Router>
            {isLoggedIn ?
                <ApplicationViews isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn}/>
                :
                <Authorize setIsLoggedIn={setIsLoggedIn} />
            }
        </Router>
    );
}

export default App;