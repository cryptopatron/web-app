import { Suspense } from 'react'
import { BrowserRouter as Router, Route, Switch } from "react-router-dom"
import routes from './constants/routes'
import { LANDINGPAGE } from './constants/routes';
import "@material-tailwind/react/tailwind.css";

function App() {
    return (
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
    );
}

export default App;