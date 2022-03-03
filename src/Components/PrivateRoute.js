import React, { useContext } from 'react'
import { Redirect } from 'react-router';
import { Route } from 'react-router';
import { Useprofile } from '../context/profile.context';

const PrivateRoute = ({children, ...routeProps}) => {

  const profile =Useprofile();

  if(!profile)
  {
    return <Redirect to="/signin"/>
  }

  return (
    <Route {...routeProps}>
      {children}
    </Route>
  )
}

export default PrivateRoute;
