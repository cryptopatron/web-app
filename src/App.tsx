import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { GuardProvider, GuardedRoute } from 'react-router-guards';
import routes from './constants/routes'
import { LANDINGPAGE, NOTFOUND } from './constants/routes';
import UserContext from "./contexts/user"
import LoggedInUserContext, { defaultCreator } from './contexts/logged-in-user';
import useToken from './hooks/useToken';
import { useState, useEffect } from 'react';

import { Creator } from './constants/models';

function App() {

    const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false)
    const [user, setUser] = useState<Creator>(defaultCreator)
    const { token, setToken } = useToken();
    const [accessToken, setAccessToken] = useState('');

    // Guard Functions
    const routeGuard = (to, from, next) => {

        if (to.meta['restricted'] &&  ( !(token) || ( (token) && isLoggedIn))) {
            console.log("restricted route")
            next.redirect('/');
        }

        if (to.meta['protected'] && !(isLoggedIn)) {
            next.redirect('/');
        }
        next();
    };

    // loading screen
    const LoadingScreen = () => {
        return (
            <p>Loading.....</p>
        )
    }


    return (

        <UserContext.Provider value={{ isLoggedIn, setIsLoggedIn, token, setToken, accessToken, setAccessToken }}>
            <LoggedInUserContext.Provider value={{ user, setUser }}>
                <Router>
                    <GuardProvider guards={[routeGuard]} loading={LoadingScreen} error={NOTFOUND.component}>
                        <Switch>
                            {routes.map((route, index) => (
                                // Added condtions for route guarding  //  
                                <GuardedRoute
                                    key={index}
                                    path={route.path}
                                    component={route.component}
                                    exact={route.exact}
                                    meta={route.meta}
                                />
                            ))}
                        </Switch>
                    </GuardProvider>
                </Router>
            </LoggedInUserContext.Provider>
        </UserContext.Provider>

    );
}

export default App;