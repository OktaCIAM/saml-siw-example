import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import OktaSignInWidget from './OktaSignInWidget';
import { useOktaAuth } from '@okta/okta-react';
import { oktaSignInConfig } from './config';

const Login = ({client, stateToken, fromURI}) => {
  const { oktaAuth, authState } = useOktaAuth();
  const [override, setOverride] = useState(true);
  let config = oktaSignInConfig;

  if (client === 'sei-1') {
    config = {
      ...oktaSignInConfig,
      logo: 'https://www.pinclipart.com/picdir/big/347-3475475_generic-company-logo-clipart-best-generic-company-logo.png',
      helpSupportNumber: '(123) SEI-1800',
      helpLinks: {
        help: 'https://sei-1.ciam.app/help'
      }
    };

    config.i18n.en['primaryauth.title'] = 'Welcome SEI-1 - SEI Advisor Center';
  }

  if (client === 'sei-2') {
    config = {
      ...oktaSignInConfig,
      logo: 'https://www.pngkit.com/png/full/141-1416995_generic-logo-transparent-background.png',
      helpSupportNumber: '(123) SEI-1800',
      helpLinks: {
        help: 'https://sei-1.ciam.app/help'
      }
    };
  
    config.i18n.en['primaryauth.title'] = 'Welcome SEI-2 - SEI Advisor Center';
  }

  if (stateToken) {
    // config.stateToken = stateToken;
  }
  
  const onSuccess = (res) => {
    console.log('login success', res);
    if (res.status === 'SUCCESS') {
      res.session.setCookieAndRedirect(fromURI)
    }
  };

  const onError = (err) => {
    console.log('error logging in', err);
  };

  if (!authState) return null;

  return authState.isAuthenticated ?
    <Redirect to={{ pathname: '/' }}/> :
    <main id={override ? 'override' : null} className={`${override ? 'override' : null} login`}>
      <div className="btn-group">
        <button className="btn-primary" onClick={() => {
          setOverride(!override);
        }}>
          {override ? 'Switch to Default Styles' : 'Switch to Override Styles' }
        </button>
      </div>

      <div className="main__container">
        <OktaSignInWidget
          config={config}
          onSuccess={onSuccess}
          onError={onError}/>
        <div className="login__terms">
          <span>
    By logging in to this site you agree to the <br/>
    <span className="login__terms-link">Terms and Conditions of Use</span> and <span className="login__terms-link">Privacy Policy.</span>
          </span>
        </div>
      </div>
     
    </main>



};
export default Login;