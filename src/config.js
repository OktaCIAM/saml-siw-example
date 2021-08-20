const oktaAuthConfig = {
    // Note: If your app is configured to use the Implicit flow
    // instead of the Authorization Code with Proof of Code Key Exchange (PKCE)
    // you will need to add `pkce: false`
    // issuer: 'https://2020spaces-poc.okta.com/oauth2/default',
    issuer: 'https://ashwin.okta.com/oauth2/default',
    // redirectUri: window.location.origin + '/login/callback',

};

const oktaSignInConfig = {
    baseUrl: 'https://ashwin.okta.com',
    language: 'en',
    i18n: {
      en: {
        'primaryauth.title': 'Welcome to SEI Advisor Center',
        'primaryauth.username.placeholder': 'User ID',
        'primaryauth.submit': 'Log In'
      }
    },
    features: {
        rememberMe: false
    }
};
  
export { oktaAuthConfig, oktaSignInConfig };
  
