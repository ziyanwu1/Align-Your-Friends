import React, { useEffect } from "react";
import {
  GoogleOAuthProvider,
  GoogleLogin,
  googleLogout,
  useGoogleLogin,
} from "@react-oauth/google";

import "../../utilities.css";
import "./Login.css";

/*
Basically, all this file does (once we remove the text) is that it handles the Login with Google button.
We can prolly style this appropriately later, but for now we can keep the button

*/

//TODO: REPLACE WITH YOUR OWN CLIENT_ID
const GOOGLE_CLIENT_ID = "587118584276-upe1j2pf4s5shm87q876jloqsibglgld.apps.googleusercontent.com";

// I think the current problem here is that we didn't setup our database oops lol
// Basically, look through the tutorials and fill out ALLLLLL the client id's 4head

const Login = ({ userId, handleLogin, handleLogout }) => {
  return (
    <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
      {userId ? (
        <button
          onClick={() => {
            googleLogout();
            handleLogout();
          }}
          className="Login-logout"
        >
          Logout
        </button>
      ) : (
        <GoogleLogin
          clientId={GOOGLE_CLIENT_ID}
          onSuccess={handleLogin}
          onFailure={(err) => console.log(err)}
          size="small"
        />
      )}
    </GoogleOAuthProvider>
  );
};

export default Login;
