import {lazy, Suspense } from 'react'
import { BrowserRouter as Router, Route, Switch } from "react-router-dom"
import * as ROUTES from './constants/routes' 


const LandingPage = lazy( () => import('./pages/landing-page'))
const NotFound = lazy( () => import('./pages/not-found'))

function App() {
  return (
    <Router>
        <Suspense fallback={<p>Loading....</p>}>
            <Switch>
                <Route path={'/'} exact component = {LandingPage}/>
                <Route path={ROUTES.NOTFOUND} exact component = {NotFound}/>
            </Switch>
        </Suspense>
    </Router>
  );
}

export default App;
