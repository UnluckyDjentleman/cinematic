import { AppShell, Image, Burger, Loader } from '@mantine/core'
import Logo from '../../constants/images/logo.png'
import { useClickOutside } from '@mantine/hooks'
import NavbarMenu from '../navbarMenu/navbarMenu'
import { useState } from 'react'
import UserPanel from '../userPanel/userPanel'
import { useAppDispatch } from '../../utils/hooks/reduxStore'
import useAuth from '../../utils/hooks/useAuth'
import authState from '../../constants/types/authState'
import { setUser } from '../../store/reducers/userReducer'

export default function MainLayout({children}:{children: React.ReactNode}){

    const [opened, setOpened] = useState<boolean>(false);
    const ref=useClickOutside(()=>setOpened(false),['mouseup', 'touchend'])

    console.log(opened);

    return (
      <>
      <AppShell
      navbar={{
        width:  { sm: 200, lg: 300 },
        breakpoint: "sm",
        collapsed: { mobile: !opened },
      }}>
        <Burger
            ref={ref}
            onClick={()=>setOpened(true)}
            hiddenFrom="sm"
            size="sm"
            style={{position: "sticky"}} />
          <AppShell.Navbar bg="violet.1" withBorder={false} style={{width:200}}>
            <Image src={Logo}></Image>
            <NavbarMenu />
          </AppShell.Navbar>
          <AppShell.Main>
                  {children}
          </AppShell.Main>
      </AppShell>
      </>
    )
}