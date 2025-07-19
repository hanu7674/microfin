export const LOGIN_REQUEST = 'LOGIN_REQUEST';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAILURE = 'LOGIN_FAILURE';

export const LOGOUT_REQUEST = 'LOGOUT_REQUEST';
export const LOGOUT_SUCCESS = 'LOGOUT_SUCCESS';
export const LOGOUT_FAILURE = 'LOGOUT_FAILURE';

export const GET_CURRENT_USER_DATA_REQUEST = 'GET_CURRENT_USER_DATA_REQUEST';
export const GET_CURRENT_USER_DATA_SUCCESS = 'GET_CURRENT_USER_DATA_SUCCESS';
export const GET_CURRENT_USER_DATA_FAILURE = 'GET_CURRENT_USER_DATA_FAILURE';

export const CREATE_NEW_USER_REQUEST = 'CREATE_NEW_USER_REQUEST';
export const CREATE_NEW_USER_SUCCESS = 'CREATE_NEW_USER_SUCCESS';
export const CREATE_NEW_USER_FAILURE = 'CREATE_NEW_USER_FAILURE';

export const UPDATE_USER_DETAILS_REQUEST = 'UPDATE_USER_DETAILS_REQUEST';
export const UPDATE_USER_DETAILS_SUCCESS = 'UPDATE_USER_DETAILS_SUCCESS';
export const UPDATE_USER_DETAILS_FAILURE = 'UPDATE_USER_DETAILS_FAILURE';

export const ERROR_CODE_ACCOUNT_EXISTS =
  'auth/account-exists-with-different-credential';

export const ERROR_MSG_ACCOUNT_EXISTS = `
  An account with an E-Mail address to
  this social account already exists. Try to login from
  this account instead and associate your social accounts on
  your personal account page.
`;
export const ERROR_CODE_ACCOUNT_ALREADY_EXISTS = 'auth/email-already-in-use';
export const ERROR_MSG_ACCOUNT_ALREADY_EXISTS = `
An account with an E-Mail address is already exists. Try to login from
  this account instead.`;
export const ERROR_CODE_WRONG_PASSWORD = 'auth/wrong-password';
export const ERROR_CODE_INVALID_LOGIN_CREDENTIALS = 'auth/invalid-login-credentials';
export const ERROR_MSG_WRONG_PASSWORD = `Wrong Password! \n Please try again`;
export const ERROR_CODE_TOO_MANY_ATTEMPTS = "auth/too-many-requests";
export const ERROR_MSG_TOO_MANY_ATTEMPTS = `Access to this account has been temporarily disabled due to many failed login attempts.\n You can immediately restore it by resetting your password or you can try again later.`
export const ERROR_CODE_INVALID_LOGIN_CREDS = "auth/invalid-login-credentials";
export const ERROR_MSG_INVALID_LOGIN_CREDS = `Email or Password wrong.! \n Please try again`
export const ERROR_CODE_MISSING_LOGIN_CREDS = "auth/missing-password";
export const ERROR_MSG_MISSING_LOGIN_CREDS = `Password Missing.! \n Please try again`
export const ERROR_CODE_USER_DELETED = 'auth/user-not-found';
export const ERROR_MSG_USER_DELETED = `User not found! \n Please try again`;
export const ERROR_CODE_INVALID_CREDENTIALS = 'auth/invalid-credential';
export const ERROR_MSG_INVALID_CREDENTIALS = `Invalid Credentials! \n Please try again`;
export const ERROR_CODE_INVALID_EMAIL = 'auth/invalid-email';
export const ERROR_MSG_INVALID_EMAIL = `Invalid Email! \n Please try again`;
export const ERROR_CODE_INVALID_PASSWORD = 'auth/invalid-password';
export const ERROR_MSG_INVALID_PASSWORD = `Invalid Password! \n Please try again`;
export const ERROR_CODE_INVALID_PHONE_NUMBER = 'auth/invalid-phone-number';
export const ERROR_MSG_INVALID_PHONE_NUMBER = `Invalid Phone Number! \n Please try again`;
export const ERROR_CODE_INVALID_USERNAME = 'auth/invalid-username';
export const ERROR_MSG_INVALID_USERNAME = `Invalid Username! \n Please try again`;