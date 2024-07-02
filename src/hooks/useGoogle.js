import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { auth } from "../firebase/firebaseConfige";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../app/userSlice";
import toast from "react-hot-toast";

export let useGoogle = () => {
  const provider = new GoogleAuthProvider();
  //   let { user } = useSelector((state) => state.user);
  let dispetch = useDispatch();
  let handleGoogle = () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const user = result.user;
        toast.success(`Welocome ${user.displayName}`);
        dispetch(login(user));
      })
      .catch((error) => {
        const errorMessage = error.message;
        toast.error(error.message);
      });
  };
  return { handleGoogle };
};
