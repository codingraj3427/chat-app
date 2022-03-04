
import { Redirect } from 'react-router';
import { Route } from 'react-router';
import { UseProfile } from '../context/profile.context';
import {Container,Loader}from 'rsuite';

const PrivateRoute = ({children, ...routeProps}) => {

  const {profile,isLoading} =UseProfile();


  if(isLoading && !profile)
  {
    return(
      <Container>
      <Loader center vertical size="md" content='loading' speed='slow'/>
      </Container>
    )
  }
   

  if(!profile && isLoading)
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
