import React from 'react'
import { Redirect } from 'react-router';
import { Route } from 'react-router';
import { Useprofile } from '../context/profile.context';

const PublicRoute = ({children, ...routeProps}) => {

  const profile = Useprofile();

  if(profile)
  {
    return <Redirect to="/"/>
  }

  return (
    <Route {...routeProps}>
      {children}
    </Route>
  )
}

export default PublicRoute;