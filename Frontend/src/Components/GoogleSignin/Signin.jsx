// import React, { useEffect, useState } from 'react'
// import {auth,provider} from "./config.js"
// import {signInWithPopup} from "firebase/auth"

// const Signin = () => {
//     const [value,setValue] = useState("");
//     const handleClick = ()=>{
//         signInWithPopup(auth,provider).then((data)=>{
//             setValue(data.user.email)
//             localStorage.setItem("email",data.user.email)
//         })

//         useEffect(()=>{
//             setValue(localStorage.getItem('email'))
//         })
//     }
//   return (
//     <div>
//       <button onClick={handleClick}>Continue with google</button>
//     </div>
//   )
// }

// export default Signin
 

import React, { useEffect, useState } from "react";
import { auth, provider } from "./config.js";
import { signInWithPopup, signOut } from "firebase/auth";

const Signin = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Handle Google Sign-In
  const handleSignIn = () => {
    signInWithPopup(auth, provider)
      .then((data) => {
        const userData = {
          name: data.user.displayName,
          email: data.user.email,
          photo: data.user.photoURL,
        };
        setUser(userData);
        localStorage.setItem("user", JSON.stringify(userData));
      })
      .catch((error) => console.error("Sign-In Error:", error));
  };

  // Handle Sign-Out
  const handleSignOut = () => {
    signOut(auth)
      .then(() => {
        setUser(null);
        localStorage.removeItem("user");
      })
      .catch((error) => console.error("Sign-Out Error:", error));
  };

  // Check if the user is already logged in
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  return (
    <div className="relative">
      {loading ? (
        <p>Loading...</p>
      ) : user ? (
        <div className="fixed top-4 right-4">
          <div className="group relative">
            <img
              src={user.photo}
              alt="User"
              className="w-10 h-10 rounded-full cursor-pointer"
            />
            <div className=" right-0 mt-2 hidden group-hover:block bg-white border rounded-lg shadow-lg">
              <button
                onClick={handleSignOut}
                className="px-4 py-2 z-50 text-red-500 hover:bg-gray-100 w-full text-left"
              >
                Sign Out
              </button>
            </div>
          </div>
          <p className="mt-2 text-sm text-gray-500">Welcome, {user.name}!</p>
        </div>
      ) : (
        <div className="fixed top-4 right-4">
          <button
            onClick={handleSignIn}
            className="bg-blue-500 text-white px-6 py-2 rounded-lg shadow-md hover:bg-blue-600 transition"
          >
            Continue with Google
          </button>
        </div>
      )}
    </div>
  );
};

export default Signin;
