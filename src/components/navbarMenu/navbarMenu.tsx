import { Flex, NavLink } from "@mantine/core";
import { useCallback, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../utils/hooks/reduxStore";
import { setActive } from "../../store/reducers/navigateLinkReducer";

export default function NavbarMenu(){

    const dispatch=useAppDispatch()
    const links=useAppSelector((state)=>state.navigateLink)

    const [active, setActiveLnk]=useState<string>(links.active)

    const setActiveLink=useCallback((name: string)=>{
        setActiveLnk(name)
        dispatch(setActive(name))
    },[active])

    return (
        <Flex direction="column" mt="50%">
            {
                links.arr.map((item)=>(
                    <NavLink
                        href={item.href}
                        key={item.name}
                        active={item.href===window.location.pathname}
                        label={item.name}
                        onClick={() => {
                            window.location.pathname=item.href
                            setActiveLink(window.location.pathname);
                        }}
                        color="violet"
                    ></NavLink>
                ))
            }
        </Flex>
    )
}