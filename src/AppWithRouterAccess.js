import React from 'react';
import { Route, useHistory, Switch } from 'react-router-dom';
import { Security, SecureRoute, LoginCallback } from '@okta/okta-react';
import { OktaAuth, toRelativeUrl } from '@okta/okta-auth-js';
import Home from './Home';
import Login from './Login';
import Protected from './Protected';
import { oktaAuthConfig } from './config';
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

  let client = null;
  let stateToken = null;
  let fromURI = null;

  if (window.location.search) {
    const urlParams = new URLSearchParams(window.location.search);
    client = urlParams.get('client');
    stateToken = urlParams.get('stateToken');
    fromURI = urlParams.get('fromURI');

    // No client, implies that it's a shared login
    // we can use the RelayState to determine the customer
    if (!client && fromURI.includes('RelayState=')) {
      const param = 'RelayState=';
      const relayStateIndex = fromURI.indexOf(param);
      // if invalid uri
      try {
        const relayState = decodeURIComponent(fromURI.substring(relayStateIndex + param.length));
        console.log(`RelayState = ${relayState}`);
        // Remove stray tail paths
        // Could use regex here instead
        const paths = relayState.split('/').filter(x => x);
        client = paths[paths.length - 1];
      } catch(err) {
        console.warn(err);
      }
    }

    console.log('~~ Client Set:', client);
  }
  
  const currentUrl = new URL(window.location.href);
  if (currentUrl.host.indexOf('.') !== -1) {
    let subdomain = currentUrl.host.split('.')[0];

    if (subdomain !== 'sei') {
      client = subdomain;
    }
  }


  return (
    <div className={`${client ? client : null} background`}>
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
          <Route path='/login' render={() => <Login client={client} stateToken={stateToken} fromURI={fromURI}/>} />
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
    </div>
  );
};
export default AppWithRouterAccess;
