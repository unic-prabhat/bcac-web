import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";


import 'react-notifications/lib/notifications.css';
import {NotificationContainer} from 'react-notifications';
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import {ProtectedRouteUser} from './auth/auth';
import {ProtectedadminRouteUser} from "./auth/adminauth";
import Body from './include/Body';

import Superadminlogin from "./pages/Superadminlogin";
import Manageadmin from "./pages/Manageadmin";
import Adminlogin from "./pages/Adminlogin";
import Manageevent from "./pages/Manageevent";
import Manageparticipant from "./pages/Manageparticipant";

function App() {
  return (
  
       <>
          <Router>
            <Body>

             <Switch>
              <Route exact path='/' component={Superadminlogin} />
              <ProtectedRouteUser exact path='/mangeadmin' component={Manageadmin} />
              <Route exact path='/adminlogin' component={Adminlogin} />
              <ProtectedadminRouteUser exact path='/manageevent' component={Manageevent} />
              <ProtectedadminRouteUser exact path='/manageparticipant' component={Manageparticipant} />
             </Switch>
             <NotificationContainer/>
            </Body>

        </Router>
       </>

  );
}

export default App;
