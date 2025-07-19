import { signInWithEmailAndPassword, createUserWithEmailAndPassword, sendEmailVerification, sendPasswordResetEmail, reauthenticateWithCredential, EmailAuthProvider, updatePassword, deleteUser, linkWithCredential, GoogleAuthProvider, linkWithPopup, updateProfile, signInWithPopup } from "firebase/auth";
import { auth, usersRef, userRef, usermetadata, usernameRef, batch, imageUploadPath, usermetadataRef, ipDataRef, reviewCollection, testimonialCollection, reviewById, testimonialById, userSignupLogsById, firestoreDb, securityQuestionsRef, userLogCollectionRef, userLogRef, contactUsCollection, profileFilesUploadPath, fileRef, educationCollection, educationById, projectsCollection, projectsById, experienceById, experienceCollection, certificationsCollection, certificationsById, appStatusDocRef, emailDocRef, emailCollection, emailCollectionRef, tokensRef } from "../Firebase/firebase";
import * as authActionTypes from '../reducers/types';
import { dismissNotification, notify } from "reapop";
import { addDoc, arrayRemove, arrayUnion, deleteDoc, FieldValue, getDoc, getDocs, onSnapshot, orderBy, query, runTransaction, setDoc, Transaction, updateDoc, where } from "firebase/firestore";
import { deleteObject, getDownloadURL, uploadBytesResumable } from "firebase/storage";
import { onDisconnect, onValue, set } from "firebase/database";



export const loginRequest = () => ({
  type: authActionTypes.LOGIN_REQUEST
});

export const loginSuccess = (user, path) => ({
  type: authActionTypes.LOGIN_SUCCESS,
  payload: {
    user,
    path,
  }
});

export const loginFailure = (error) => ({
  type: authActionTypes.LOGIN_FAILURE,
  payload: error
});

export const logoutRequest = () => ({
  type: authActionTypes.LOGOUT_REQUEST
});

export const logoutSuccess = () => ({
  type: authActionTypes.LOGOUT_SUCCESS
});

export const logoutFailure = (error) => ({
  type: authActionTypes.LOGOUT_FAILURE,
  payload: error
});
const createNewUserRequest = () => {
  return {
    type: authActionTypes.CREATE_NEW_USER_REQUEST,
  };
};

const createNewUserSuccess = (action) => {
  return {
    type: authActionTypes.CREATE_NEW_USER_SUCCESS,
    payload: action,
  };
};
const createNewUserFailure = (error) => {
  return {
    type: authActionTypes.CREATE_NEW_USER_FAILURE,
    payload: error,
  };
};
export const getCurrentUserDataRequest = () => {
  return {
    type: authActionTypes.GET_CURRENT_USER_DATA_REQUEST,
  };
};
export const getCurrentUserDataSuccess = (data) => {
  return {
    type: authActionTypes.GET_CURRENT_USER_DATA_SUCCESS,
    payload: data,
  };
};
export const getCurrentUserDataFailure = (error) => {
  return {
    type: authActionTypes.GET_CURRENT_USER_DATA_FAILURE,
    payload: error,
  };
};

export const getUserDataByIdRequest = () => {
  return {
    type: 'GET_USER_DATA_BY_ID_REQUEST',
  };
};
export const getUserDataByIdSuccess = (data) => {
  return {
    type: 'GET_USER_DATA_BY_ID_SUCCESS',
    payload: data,
  };
};
export const getUserDataByIdFailure = (error) => {
  return {
    type: 'GET_USER_DATA_BY_ID_FAILURE',
    payload: error,
  };
};
export const getCurrentUserData = (userId) => async (dispatch, getState, { getFirebase, getFirestore }) => {
  try {
    dispatch(getCurrentUserDataRequest());
    getDoc(userRef(userId))
    .then((user) => {
      if (user.exists()) {
        dispatch(getCurrentUserDataSuccess(user.data()));
      }
      else {
        dispatch(notify({ message: 'user not exists',status: 'error' }));
        dispatch(getCurrentUserDataFailure("user not exists"));
      }
    })
    .catch((error) => {
      dispatch(getCurrentUserDataFailure(error.message));
    });
  } catch (error) {
    dispatch(getCurrentUserDataFailure(error.message));
  }
};
export const getUserDataById = (userId) => {
  return (dispatch) => {
    dispatch(getUserDataByIdRequest());
    getDoc(userRef(userId))
      .then((user) => {
        if (user.exists()) {
          dispatch(getUserDataByIdSuccess(user.data()));
        }
        else {
          dispatch(getUserDataByIdFailure({ message: 'user not exists', code: 'USER_NOT_EXISTS' }));
        }
      })
      .catch((error) => {
        dispatch(getUserDataByIdFailure(error));
        dispatch(
          notify({ id: "error", message: error.message, status: "error" })
        );
      });
  };
};

export const loginUser = (email, password, path, navigate) => (dispatch) => {
  dispatch(loginRequest());
  dispatch(
    notify({ id: "loading", message: "logging in...", status: "loading" })
  );
  signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      dispatch(loginSuccess(userCredential.user, path));
      dispatch(dismissNotification("loading"));
      navigate(path);
    })
    .catch((error) => {
      const errorCode = error.code;

      if (errorCode === authActionTypes.ERROR_CODE_WRONG_PASSWORD) {
        dispatch(
          notify({
            id: "error",
            message: `Wrong Password! \n Please try again`,
            status: "error",
          })
        );
        dispatch(dismissNotification("loading"));
        dispatch(loginFailure(error));
      }
      else if (errorCode === authActionTypes.ERROR_CODE_INVALID_CREDENTIALS) {
        dispatch(
          notify({
            id: "error",
            message: `Wrong Email or Password! \n Please try again`,
            status: "error",
          })
        );
        dispatch(dismissNotification("loading"));
        dispatch(loginFailure(error));
      } 
      else if (errorCode === authActionTypes.ERROR_CODE_TOO_MANY_ATTEMPTS) {
        dispatch(
          notify({
            id: "error",
            message: `Access to this account has been temporarily disabled due to many failed login attempts.\n You can immediately restore it by resetting your password or you can try again later.`,
            status: "error",
          })
        );
        dispatch(dismissNotification("loading"));
        dispatch(loginFailure(error));
      } 
      else if (errorCode === authActionTypes.ERROR_CODE_USER_DELETED) {
        dispatch(
          notify({
            id: "error",
            message: `User not found! \n Please try again`,
            status: "error",
          })
        );
      }
      else if (errorCode === authActionTypes.ERROR_CODE_INVALID_EMAIL) {
        dispatch(
          notify({
            id: "error",
            message: `Invalid Email! \n Please try again`,
            status: "error",
          })
        );
      }
      else if (errorCode === authActionTypes.ERROR_CODE_INVALID_PASSWORD) {
        dispatch(
          notify({
            id: "error",
            message: `Invalid Password! \n Please try again`,
            status: "error",
          })
        );
      }
      else if (errorCode === authActionTypes.ERROR_CODE_INVALID_CREDENTIALS) {
        dispatch(
          notify({
            id: "error",
            message: `Invalid Credentials! \n Please try again`,
            status: "error",
          })
        );
      }
     
      else {
        dispatch(loginFailure(error));
        dispatch(
          notify({ id: "error", message: error.message, status: "error" })
        );
        dispatch(dismissNotification("loading"));
      }
      dispatch(loginFailure(error.message));
    });
};
export const loginWithGoogle = (path, navigate) => {
  return async (dispatch) => {
    try {
      dispatch(loginRequest());
      dispatch(
        notify({ id: "loading", message: "logging in...", status: "loading" })
      );
      const googleAuthProvider = new GoogleAuthProvider();
      signInWithPopup(auth, googleAuthProvider)
    .then((userCredential) => {      
      
    })
    .catch((error) => {
      const errorCode = error.code;

      if (errorCode === authActionTypes.ERROR_CODE_WRONG_PASSWORD) {
        dispatch(
          notify({
            id: "error",
            message: `Wrong Password! \n Please try again`,
            status: "error",
          })
        );
        dispatch(dismissNotification("loading"));
        dispatch(loginFailure(error));
      }
      else if (errorCode === authActionTypes.ERROR_CODE_INVALID_CREDENTIALS) {
        dispatch(
          notify({
            id: "error",
            message: `Wrong Email or Password! \n Please try again`,
            status: "error",
          })
        );
        dispatch(dismissNotification("loading"));
        dispatch(loginFailure(error));
      } else if (errorCode === authActionTypes.ERROR_CODE_TOO_MANY_ATTEMPTS) {
        dispatch(
          notify({
            id: "error",
            message: `Access to this account has been temporarily disabled due to many failed login attempts.\n You can immediately restore it by resetting your password or you can try again later.`,
            status: "error",
          })
        );
        dispatch(dismissNotification("loading"));
        dispatch(loginFailure(error));
      } else {
        dispatch(loginFailure(error));
        dispatch(
          notify({ id: "error", message: error.message, status: "error" })
        );
        dispatch(dismissNotification("loading"));
      }
      dispatch(loginFailure(error.message));
    });
    }
    catch (error) {

    }
  }
}
export const updateUserMetaData = (uid, data) => {
  return async (dispatch) => {
    try {
      updateDoc(usermetadata(uid), { ...data })
    }
    catch (error) {
      dispatch(
        notify({ id: "error", message: error.message, status: "error" })
      );
    }
  }
}
export const getUserMetaData = (uid) => {
  return async (dispatch) => {
    try {
      const doc = await getDoc(usermetadata(uid));
      if (doc.exists()) {
        return doc.data();
      }
    }
    catch (error) {
      dispatch(
        notify({ id: "error", message: error.message, status: "error" })
      );
    }
  }
}


export const createUserDataonSignup = (data, form) => {
  return (dispatch, getState) => {
    let userId = data.user.uid;
    let user = data.user;
    const { password, verifyPassword, ...formInfo } = form;
    const userData = {
      ...formInfo,
      email: user.email,
      id: user.uid,
      userSecurityQuestionEnabled: false,
      photoURL: user.photoURL,
      providerData: user.providerData,
      emailVerified: user.emailVerified,
      phoneNumber: user.phoneNumber,
      accessToken: user.accessToken,
      creationTime: new Date(),
      lastSignInTime: user.metadata.lastSignInTime,
    }
    dispatch(
      notify({
        id: "loading",
        message: "logging in...",
        status: "loading",
        dismissAfter: 100000,
      })
    );
    getDoc(userRef(userId)).then((info) => {
      if (info.exists()) {
        dispatch(
          notify({
            message: "User already exists!.",
            status: "success",
            dismissAfter: 5000,
          })
        );
      } else {
        batch.set(userRef(userId), userData);
        updateProfile(auth.currentUser, {
          displayName: formInfo.firstName + ' ' + formInfo.lastName
        })
        batch
          .commit()
          .then(() => {
            dispatch(createNewUserSuccess(userData));
            dispatch(getCurrentUserDataSuccess(userData));
            dispatch(
              notify({
                message: "Account created successfully!.",
                status: "success",
              })
            );

          })
          .catch((error) => {
            dispatch(createNewUserFailure(error));
            dispatch(
              notify({ id: "error", message: error.message, status: "error" })
            );
          });
      }
    }).catch((error) => {
      dispatch(loginFailure(error));
      dispatch(
        notify({ id: "error", message: error.message, status: "error" })
      );
      dispatch(dismissNotification("loading"));
    })
  };
};
export const updateUserProfile = (userId, info) => {
  return async (dispatch) => {
    const userData = {
      ...info,
      lastUpdatedBy: usermetadata(auth.currentUser.uid)
    };
    const userDocRef = userRef(userId);

    try {
      if(userId !== info.uid){
        throw new Error('You cannot change the user Id')
      }
      await runTransaction(userDocRef.firestore, async (transaction) => {
        const usermetadataExists = (await transaction.get(usermetadata(userId))).exists();
        const usernamedataExists = (await transaction.get(usernameRef(userId))).exists();
        const userDocRef = userRef(userId);
        // Update the user profile document
        transaction.update(userDocRef, { ...userData });

        // Update the user's profile in Firebase Authentication
        await updateProfile(auth.currentUser, { ...info });

        // Update the user metadata document
        const metadata = {};
        if (info.email) metadata.email = info.email;
        if (info.photoURL) metadata.photoURL = info.photoURL;
        metadata.uid = userId;
        if (info.firstName && info.lastName) {
          metadata.fullName = info.firstName + ' ' + info.lastName;
        }
        if (info.phoneNumber) metadata.phone = info.phoneNumber;
        if (info.firstName) metadata.firstName = info.firstName;
        if (info.tagLine) metadata.tagLine = info.tagLine;
        if (info.lastName) metadata.lastName = info.lastName;

        const usernameData = {    }
        if (info.username) usernameData.username = info.username.toLowerCase();
if (info.email) usernameData.email = info.email;
if (info.photoURL) usernameData.photoURL = info.photoURL;
if (info.uid) usernameData.id = info.uid;
if (info.firstName) usernameData.firstName = info.firstName;
if (info.lastName) usernameData.lastName = info.lastName;

        if(usermetadataExists){
          transaction.update(usermetadata(userId), { ...metadata });
        }
        else {
          transaction.set(usermetadata(userId), {
             ...metadata
          })
        }
        if(usernamedataExists){
          transaction.update(usernameRef(userId), { ...usernameData });
        }
        else {
          transaction.set(usernameRef(userId), {
             ...usernameData
          })
        }
        if(info?.onBoardingStatus){
          transaction.update(userRef(userId), {onBoardingStatus : true});
          dispatch({ type: 'UPDATE_USER_PROFILE_SUCCESS' });
          dispatch(notify({ message: 'Onboarding completed successfully. Welcome aboard!', status: 'success' }));

        }
        else{
          dispatch(notify({ message: `Profile updated successfully.`, status: 'success' }));
          dispatch({ type: 'UPDATE_USER_PROFILE_SUCCESS' });

        }
        // Dispatch actions after successful transaction
        setTimeout(() => {
          dispatch(getCurrentUserData(userId)); // Assuming this action fetches the updated user data
        }, [500])
      });
    } catch (error) {
      dispatch(notify({ message: error.message, status: 'error' }));
    }
  };
};

export const updateUserDetailsRequest = () => ({
  type: authActionTypes.UPDATE_USER_DETAILS_REQUEST,
});

export const updateUserDetailsSuccess = (updatedDetails) => ({
  type: authActionTypes.UPDATE_USER_DETAILS_SUCCESS,
  payload: updatedDetails,

});

// Action creator for failed update
export const updateUserDetailsFailure = (error) => ({
  type: authActionTypes.UPDATE_USER_DETAILS_FAILURE,
  payload: error,
});

 

export const signupUser = (form) => async (dispatch, getState) => {
  try {
    dispatch(createNewUserRequest());
  
     const userCredential = await createUserWithEmailAndPassword(auth, form.email, form.password);
    const user = userCredential.user;
    let userId = user.uid;
    const { password, verifyPassword, ...formInfo } = form;
    const userData = {
      ...formInfo,
      email: user.email,
      id: user.uid,
       photoURL: user.photoURL,
      providerData: user.providerData,
      emailVerified: user.emailVerified,
      phoneNumber: user.phoneNumber,
      accessToken: user.accessToken,
      creationTime: new Date(),
      lastSignInTime: user.metadata.lastSignInTime,
        }
          dispatch(
            notify({
        id: "loading",
        message: "logging in...",
        status: "loading",
        dismissAfter: 100000,
      })
    );
    getDoc(userRef(userId)).then((info) => {
      if (info.exists()) {
          dispatch(
            notify({
            message: "User already exists!.",
            status: "success",
            dismissAfter: 5000,
          })
        );
        } else {
        batch.set(userRef(userId), userData);
        updateProfile(auth.currentUser, {
          displayName: formInfo.firstName + ' ' + formInfo.lastName
        })
        batch
          .commit()
          .then(() => {
            dispatch(createNewUserSuccess(userData));
    dispatch(
      notify({
                message: "Account created successfully!.",
                status: "success",
      })
      );
      dispatch(dismissNotification("loading"));
            dispatch(getCurrentUserData(user.uid));
        })
        .catch((error) => {
            dispatch(createNewUserFailure(error));
            dispatch(
              notify({ id: "error", message: error.message, status: "error" })
            );
          });
      }
    }).catch((error) => {
      dispatch(loginFailure(error));
    dispatch(
        notify({ id: "error", message: error.message, status: "error" })
      );
        dispatch(dismissNotification("loading"));
    })
  } catch (error) {
    dispatch(createNewUserFailure(error.message));
    throw error;
  }
};
export const logoutUser = () => {
  return (dispatch, getState) => {
    dispatch({ type: 'LOGOUT_REQUEST' });
    const userId = auth.currentUser.uid;
    const log = getState?.auth?.loginLogs;
    if (log) {
      const userLogDetails = {
        ...log,
        securityQuestionsVerified: true,
        lastLoginAt: new Date(),
      }
      localStorage.setItem('userLogId', JSON.stringify(userLogDetails));
      updateDoc(userLogRef(userId, userLogDetails?.logId), {
        securityQuestionsVerified: false,
        active: false
      })
        .then(() => {
          auth.signOut()
            .then(() => {
              dispatch({ type: 'LOGOUT_SUCCESS' });
              window.location.reload();
            })
            .catch((error) => {
              dispatch({ type: 'LOGOUT_FAILURE', payload: error.message });
            });
        })
        .catch((error) => {
          // Error fetching document
          dispatch(notify({ message: error.message, status: 'error' }));
          dispatch({ type: 'LOGOUT_FAILURE', payload: error.message });
        });
    }
    else {
      auth.signOut()
        .then(() => {
          dispatch({ type: 'LOGOUT_SUCCESS' });
          window.location.reload();

        })
        .catch((error) => {
          dispatch({ type: 'LOGOUT_FAILURE', payload: error.message });
        });
    }
  };
};

