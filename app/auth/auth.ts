export type SuccessfullAuthResponse = {
  success: true;
  token: string;
};

export type FailedAuthResponse = {
  success: false;
  error: string;
};

export type AuthResponse = SuccessfullAuthResponse | FailedAuthResponse;
