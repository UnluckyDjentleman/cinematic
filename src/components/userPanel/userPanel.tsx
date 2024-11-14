import { Flex, Image, Text, Button } from "@mantine/core";
import { getAuth, signInWithPopup, signOut } from "firebase/auth";
import { useAppSelector } from "../../utils/hooks/reduxStore";
import { firebaseData } from "../../firebase/data";

export default function UserPanel() {
  const user = useAppSelector((state) => state.user.user);

  const clickLogin = () => {
    const auth = getAuth();
    signInWithPopup(auth, firebaseData.authProvider).catch((err) =>
      console.error(err)
    );
  };

  const clickLogout = () => {
    const auth = getAuth();
    signOut(auth)
      .then(() => {
        if (window.location.pathname.endsWith("/liked")) {
          window.location.assign("/");
        }
      })
      .catch((error) => console.error(error));
  };

  return (
    <Flex align="flex-end">
      {user ? (
        <Flex justify="space-between" align="center">
          <Flex style={{ width: "64px", borderRadius: "50%", margin: "3%" }}>
            <Image src={user.photoURL}></Image>
          </Flex>
          <Flex style={{ margin: "3%" }}>
            <Text>{user.displayName}</Text>
          </Flex>
          <Flex style={{ margin: "3%" }}>
            <Button variant="violet.5" c="white" onClick={clickLogout}>
              Exit
            </Button>
          </Flex>
        </Flex>
      ) : (
        <Button variant="violet.5" c="white" onClick={clickLogin}>
          Login through Google
        </Button>
      )}
    </Flex>
  );
}
