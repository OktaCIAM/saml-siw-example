import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useHistory } from 'react-router-dom';
import { useOktaAuth } from '@okta/okta-react';

const Home = () => {
  const history = useHistory();
  const { oktaAuth, authState } = useOktaAuth();
  const [ user, setUser ] = useState({});

  useEffect(() => {
    const setUserInfo = async () => {
        if (authState.isAuthenticated) {
            const user = await oktaAuth.token.getUserInfo();
            setUser(user);
        }
    }
    setUserInfo();
  }, [authState.isAuthenticated])

  if (authState.isPending) return null;

  const login = async () => history.push('/login');
  
  const logout = async () => oktaAuth.signOut();

  const button = authState.isAuthenticated ? 
    <button onClick={logout}>Logout</button> :
    <button onClick={login}>Login</button>;

  return (
    <div>
        <div>
            <Link to='/'>Home</Link><br/>
            <Link to='/protected'>Protected</Link><br/>
            {button}
        </div>

        <h3>Welcome to the app, {user.email}</h3>
    </div>
    

  );
};
export default Home;
