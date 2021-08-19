const oktaAuthConfig = {
    // Note: If your app is configured to use the Implicit flow
    // instead of the Authorization Code with Proof of Code Key Exchange (PKCE)
    // you will need to add `pkce: false`
    // issuer: 'https://2020spaces-poc.okta.com/oauth2/default',
    issuer: 'https://ashwin.okta.com/oauth2/default',
    clientId: '0oay7najdfoctpPO50h7',
    // redirectUri: window.location.origin + '/login/callback',

};

const oktaSignInConfig = {
    baseUrl: 'https://ashwin.okta.com',
    clientId: '0oabhnnghhz6sIHFK357',
    redirectUri: window.location.origin + '/login/callback',
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
    // idps: [
    //     {type: "GOOGLE", id: "0oaz5t6tyubdTIue70h7", text: "google"},     
    //     {type: "FACEBOOK", id: "0oaz463iwpC1jc29f0h7"},       
    //     {type: "CUSTOM", "text": "AWS Cognito", id: "0oazp0mqdhPVlWgwx0h7", className: 'social-auth-facebook-button'},   
    //     {type: "CUSTOM", "text": "SAML", id: "0oa10e48d88qoGAKM0h8"}
    // ],
    // Additional documentation on config options can be found at https://github.com/okta/okta-signin-widget#basic-config-options
};
  
export { oktaAuthConfig, oktaSignInConfig };
  
