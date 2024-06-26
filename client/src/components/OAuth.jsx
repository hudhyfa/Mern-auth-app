import React from "react";
import { GoogleAuthProvider, getAuth, signInWithPopup } from 'firebase/auth'
import { app } from "../firebase";
import { useDispatch } from "react-redux";
import { signInSuccess } from "../redux/user/userSlice";
import { useNavigate } from "react-router-dom";

function OAuth() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
  const handleGoogleClick = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const auth = getAuth(app);
        console.log(auth);
        console.log("provider: " + provider);
        const result = await signInWithPopup(auth, provider);
        console.log("result: " + result[0]);
        const res = await fetch('/api/auth/google', {
            method: 'POST',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify({
                name: result.user.displayName,
                email: result.user.email,
                photo: result.user.photoURL
            })
        });
        const data = await res.json();
        dispatch(signInSuccess(data));
        navigate('/');
    } catch (error) {
        console.log("error while loggin in with Google", error);
    }
  }
  return (
    <button
      type="button"
      onClick={handleGoogleClick}
      className="bg-red-700 text-white rounded-lg p-3 uppercase hover:opacity-95"
    >
      continue with google
    </button>
  );
}

export default OAuth;
