import { Suspense } from 'react'
import { BrowserRouter as Router, Route, Switch } from "react-router-dom"
import routes from './constants/routes'
import { LANDINGPAGE } from './constants/routes';
import UserContext from "./contexts/user"
import LoggedInUserContext, { defaultCreator } from './contexts/logged-in-user';
import useToken from './hooks/useToken';
import { useState } from 'react';

import { Creator } from './constants/models';

function App() {

    const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false)
    const [user, setUser] = useState<Creator>(defaultCreator)
    const { token, setToken } = useToken({ isLoggedIn })

    return (

        <UserContext.Provider value={{ isLoggedIn, setIsLoggedIn, token, setToken }}>
            <LoggedInUserContext.Provider value={{ user, setUser }}>
                <Router>
                    <Suspense fallback={<p>Loading....</p>}>
                        <Switch>
                            {routes.map((route) => (
                                // Added condtions for route guarding  //  
                                (route.protected && !((isLoggedIn) && (user.pageName))) ? (
                                    <Route
                                        path={route.path}
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
            </LoggedInUserContext.Provider>
        </UserContext.Provider>

    );
}

export default App;