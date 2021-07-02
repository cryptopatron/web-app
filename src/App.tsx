import { Suspense } from 'react'
import { BrowserRouter as Router, Route, Switch } from "react-router-dom"
import routes from './constants/routes'
import { LANDINGPAGE } from './constants/routes';
import "@material-tailwind/react/tailwind.css";
import UserContext, { creator } from "./contexts/user"
import useToken from './hooks/useToken';
import { useState } from 'react';

import { Creator } from './constants/models';

function App() {

    const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false)
    const [user, setUser] = useState<Creator>(creator)
    const {token, setToken} = useToken({isLoggedIn})
    
    return (
        <UserContext.Provider value={{user, setUser, isLoggedIn, setIsLoggedIn}}>
            <Router>
                <Suspense fallback={<p>Loading....</p>}>
                    <Switch>
                        {routes.map((route) => (
                            // Added ccondtions for route guarding 
                            (route.protected) ? (
                                <Route
                                    path={LANDINGPAGE.path}
                                    component={LANDINGPAGE.component}
                                    exact={LANDINGPAGE.exact}
                                />
                            ) :
                                (<Route
                                    path={route.path}
                                    component={route.component}
                                    exact={route.exact}
                                />)
                        ))}
                    </Switch>
                </Suspense>
            </Router>
        </UserContext.Provider>
    );
}

export default App;