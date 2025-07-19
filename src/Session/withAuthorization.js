import React, { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../Firebase/firebase";
import { userRef } from "../Firebase/firebase";
import { getDoc } from "firebase/firestore";
import Loading from "../components/Loading/loading";
import { useNavigate, useLocation } from "react-router-dom";
import * as ROUTES from "../assets/constants";

const withAuthorization = (condition) => (Component) => {
  const WithAuthorization = (props) => {
    const [currentUser, setCurrentUser] = useState(null);
    const navigate = useNavigate();
    const location = useLocation(); // Use React Router hook to get location

    useEffect(() => {
      const fetchData = async () => {
        const authUser = await new Promise((resolve, reject) => {
          onAuthStateChanged(auth, resolve, reject);
        });

        if (authUser) {
          const uid = authUser.uid;
          const snapshot = await getDoc(userRef(uid));
          const dbUser = snapshot.data();

          if (dbUser && dbUser.roles === undefined) {
            dbUser.roles = [];
          }

          const mergedUser = {
            uid: authUser.uid,
            email: authUser.email,
            emailVerified: authUser.emailVerified,
            roles: [...dbUser.roles],
            ...authUser,
          };

          setCurrentUser(mergedUser);

          if (!condition(mergedUser)) {
            navigate("/error-403");
          }
        } else {
          navigate(ROUTES.LOGIN, { state: { from: location.pathname } });
        }
      };

      fetchData();
    }, [condition, location.pathname, navigate]);

    return currentUser ? <Component {...props} /> : <Loading />;
  };

  return WithAuthorization;
};

export default withAuthorization;
