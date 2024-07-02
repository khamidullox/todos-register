//firebase
import {
  signInWithEmailAndPassword,
  updateProfile,
  sendPasswordResetEmail,
} from "firebase/auth";
import { auth } from "../firebase/firebaseConfige";

//react
import { useState } from "react";

//redux
import { login } from "../app/userSlice";
import { useDispatch } from "react-redux";

//toast
import toast from "react-hot-toast";

export let useLogin = () => {
  let dispatch = useDispatch();
  let [isPending, setIsPending] = useState(false);
  let loginUser = async ({ email, password }) => {
    setIsPending(true);
    try {
      let userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      let user = userCredential.user;
      setIsPending(false);
      dispatch(login(user));
      toast.success(`Welocome ${user.displayName}`);
    } catch (error) {
      toast.error(error.message);
      setIsPending(false);
    }
  };
  let resetPassword = async ({ email }) => {
    sendPasswordResetEmail(auth, email)
      .then(() => {
        toast.success("Password reset email sent!");
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        toast.error(errorMessage);
      });
  };
  return { isPending, loginUser, resetPassword };
};
