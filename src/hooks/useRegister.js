//firebase
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from "../firebase/firebaseConfige";

//react
import { useState } from "react";

//redux
import { login } from "../app/userSlice";
import { useDispatch } from "react-redux";

//toast
import toast from "react-hot-toast";

export let useRegister = () => {
  let dispatch = useDispatch();
  let [isPending, setIsPending] = useState(false);
  let register = async ({ email, password, photoURL, displayName }) => {
    setIsPending(true);
    try {
      let userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      await updateProfile(auth.currentUser, {
        displayName,
        photoURL,
      });
      let user = userCredential.user;
      setIsPending(false);
      toast.success(`Welocome ${user.displayName}`);
      dispatch(login(user));
    } catch (error) {
      toast.error(error.message);
      setIsPending(false);
    }
  };
  return { isPending, register };
};
