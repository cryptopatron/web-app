import { useContext } from 'react'
import { BrowserRouter, Switch } from 'react-router-dom';
import { GuardProvider, GuardedRoute } from 'react-router-guards';
import routes from '../constants/routes'
import { NOTFOUND } from '../constants/routes';
import LoggedInUserContext from '../contexts/logged-in-user';

import UserContext from '../contexts/user';

import { getAuthUser } from '../services/backendService';
import * as PATHS from '../constants/paths'

export default function Router() {

    const { token, setIsAuth } = useContext(UserContext)
    const { setUser } = useContext(LoggedInUserContext)

    // local non-states
    let _isAuth = false
    let _user = {pageName: ""}

    // Guard Functions
    const routeGuard = async (to, from, next) => {
        
        if (token) {

            const response = await getAuthUser(token)

            if (response.status === 404) {
                _isAuth = true
                setIsAuth(true)
            }

            if (response.status === 200) {
                _isAuth = true
                _user = response.data
                setIsAuth(true)
                setUser(response.data)
            }

        }

        if (to.meta['restricted'] && (!(token) || (_user.pageName))) {
            next.redirect('/');
        }

        if (to.meta['protected'] && !(_user.pageName)) {
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

    const LandingPageRedirect = (to, from, next) => {
        console.log()
        if (token && to.location['pathname'] === '/') {
            if (_user.pageName) {
                // TODO - Change to dashboard
                next.redirect(`/${_user.pageName}`)
            }
            if (_isAuth) {
                next.redirect(PATHS.ONBOARD)
            }
        }
        next()
    }

    return (
        <BrowserRouter>
            <GuardProvider guards={[routeGuard, LandingPageRedirect]} loading={LoadingScreen} error={NOTFOUND.component}>
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
