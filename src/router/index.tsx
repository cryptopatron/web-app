import { useContext } from 'react'
import { BrowserRouter, Switch } from 'react-router-dom';
import { GuardProvider, GuardedRoute } from 'react-router-guards';
import routes from '../constants/routes'
import { LANDINGPAGE, NOTFOUND } from '../constants/routes';
import LoggedInUserContext from '../contexts/logged-in-user';

import UserContext from '../contexts/user';

import { getAuthUser } from '../services/backendService';
import * as PATHS from '../constants/paths'

export default function Router() {
    const { token, isLoggedIn, setIsLoggedIn } = useContext(UserContext)
    const { user, setUser } = useContext(LoggedInUserContext)
    // Guard Functions
    const routeGuard = async (to, from, next) => {

        console.log("this is user: ")
        console.log(user)
        
        if (to.location['pathname'] === '/') // if navigating to landing page
        {
            if (token) {
                console.log("token present - calling api");
                const response = await getAuthUser(token)

                if (response.status === 401) {
                    setIsLoggedIn(false)
                }
                if (response.status === 404) {
                    setIsLoggedIn(false)
                    next.redirect(PATHS.ONBOARD)
                }
                if (response.status === 200) {
                    setIsLoggedIn(true)
                    setUser(response.data)
                    next.redirect(PATHS.DASHBOARD)
                }


            }
        }

        console.log("isLoggedIn: " + isLoggedIn)
        if (to.meta['restricted'] && (!(token) || (isLoggedIn))) {
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

    const landingPageRedirect = (to, from, next) => {


    }


    return (
        <BrowserRouter>
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
        </BrowserRouter>
    )
}
