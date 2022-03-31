import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";


import 'react-notifications/lib/notifications.css';
import {NotificationContainer} from 'react-notifications';
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import Body from './include/Body';

import Superadminlogin from "./pages/Superadminlogin";
import Manageadmin from "./pages/Manageadmin";
import Adminlogin from "./pages/Adminlogin";
import Manageevent from "./pages/Manageevent";

function App() {
  return (
  
       <>
          <Router>
            <Body>

             <Switch>
              <Route exact path='/' component={Superadminlogin} />
              <Route exact path='/mangeadmin' component={Manageadmin} />
              <Route exact path='/adminlogin' component={Adminlogin} />
              <Route exact path='/manageevent' component={Manageevent} />
             </Switch>
             <NotificationContainer/>
            </Body>

        </Router>
       </>

  );
}

export default App;
