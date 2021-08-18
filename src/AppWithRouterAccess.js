import React from 'react';
import { Route, useHistory, Switch } from 'react-router-dom';
import { Security, SecureRoute, LoginCallback } from '@okta/okta-react';
import { OktaAuth, toRelativeUrl } from '@okta/okta-auth-js';
import Home from './Home';
import Login from './Login';
import Protected from './Protected';
import { oktaAuthConfig, oktaSignInConfig } from './config';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPhone } from '@fortawesome/free-solid-svg-icons';

const oktaAuth = new OktaAuth(oktaAuthConfig);

const AppWithRouterAccess = () => {
  const history = useHistory();

  const customAuthHandler = () => {
    history.push('/login');
  };
  
  const restoreOriginalUri = async (_oktaAuth, originalUri) => {
    history.replace(toRelativeUrl(originalUri, window.location.origin));
  };

  return (
    <Security
      oktaAuth={oktaAuth}
      onAuthRequired={customAuthHandler}
      restoreOriginalUri={restoreOriginalUri}
    >
      <header>
        <img src="https://impsauth.gws.seic.com/advmfaservices/gws/i14amfade/images/adv1ade_header_corporate.png"></img>
        <div className="header__contact-us">
          <h3>Contact Us</h3>
          <FontAwesomeIcon className="header__icon" icon={faPhone} />
        </div>
      </header>
      <Switch>
        <Route path='/' exact={true} component={Home} />
        <SecureRoute path='/protected' component={Protected} />
        <Route path='/login' render={() => <Login config={oktaSignInConfig} />} />
        <Route path='/login/callback' component={LoginCallback} />
      </Switch>
      <footer>
        <h3>Disclaimer</h3>
        <h3>|</h3>
        <h3>Terms &amp; Conditions</h3>
        <h3>|</h3>
        <h3>Privacy Policy</h3>
      </footer>
    </Security>
  );
};
export default AppWithRouterAccess;
