import React from 'react'
import { Redirect } from 'react-router';
import { Route } from 'react-router';
import { Useprofile } from '../context/profile.context';
import { Container,Loader } from 'rsuite';

const PublicRoute = ({children, ...routeProps}) => {

  const {profile,isLoading} = Useprofile();

  if(isLoading && !profile)
  {
    return <Container>
    <Loader center vertical size="md" content="Loading" speed="slow" />
    </Container>
  }
  if(!profile && !isLoading)
  {
    return <Redirect to="/signin"/>
  }

  if(profile && !isLoading)
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