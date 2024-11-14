import { useEffect, useState } from "react";
import { getAuth } from "firebase/auth";
import authState from "../../constants/types/authState";
import User from "../../constants/types/user";

export default function useAuth() {
  const [data, setData] = useState<User | null>();
  const [state, setState] = useState<authState>(authState.Loading);
  const [error, setError] = useState<Error>();

  useEffect(() => {
    const auth = getAuth();

    auth.onAuthStateChanged(
      (user) => {
        if (user) setState(authState.Authorized);
        else setState(authState.NotAuthorized);

        setData(user);
      },
      (error) => {
        setState(authState.Failed);
        setError(error);
      }
    );
  }, []);

  return { data, state, error };
}
