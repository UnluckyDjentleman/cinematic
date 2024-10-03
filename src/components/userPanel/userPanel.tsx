import {Flex, Image, Text, Button} from "@mantine/core";
import { getAuth, signInWithPopup, signOut } from "firebase/auth";
import { useAppSelector } from "../../utils/hooks/reduxStore"
import { firebaseData } from "../../firebase/data";
import { useState } from "react";

export default function UserPanel(){
    const user=useAppSelector((state)=>state.user.user);

    const [error, setError]=useState<Error>()

    const clickLogin=()=>{
        const auth=getAuth();
        signInWithPopup(auth, firebaseData.authProvider).catch(err=>setError(err))
    }

    const clickLogout=()=>{
        const auth=getAuth();
        signOut(auth).then(()=>{
            if(window.location.pathname.endsWith('/liked')){
                window.location.assign('/')
            }
        }).catch(error=>setError(error))
    }

    return (
        <Flex align="flex-end">
            {
                user?(
                    <Flex justify="space-between" align="center">
                        <Flex style={{width: '64px', borderRadius: "50%", margin: "3%"}}>
                            <Image src={user.photoUrl}></Image>
                        </Flex>
                        <Flex style={{margin: "3%"}}>
                            <Text>{user.name}</Text>
                        </Flex>
                        <Flex style={{margin: "3%"}}>
                            <Button variant="violet.5" c="white" onClick={clickLogout}>Exit</Button>
                        </Flex>
                    </Flex>
                ):(
                    <Button variant="violet.5" c="white" onClick={clickLogin}>Login through Google</Button>
                )
            }
        </Flex>
    )
}