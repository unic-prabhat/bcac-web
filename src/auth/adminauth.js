import React from "react";
import { Route, Redirect } from "react-router-dom";
import cookie from 'react-cookies'


export const ProtectedadminRouteUser = ({
  component: Component,
  ...rest
}) => {
  return (
    <Route
      {...rest}
      render={props => {

        // const logindata = localStorage.getItem('userlogin') === 'true'
        const logindata = cookie.load('adminlogin') === 'true';
  
      
        if (logindata) {

          var data=cookie.load('admindata');

          return <Component {...props} />;
          // if(data.email_verification=='NotVerified'){
          //   return <Redirect to="/emailverification" />
          // }else{
          //   return <Component {...props} />;
          // }


        } else {

          return (
            <Redirect
              to={{
                pathname: "/adminlogin",
                state: {
                  from: props.location
                }
              }}
            />
          );

        }
      }}
    />
  );
};