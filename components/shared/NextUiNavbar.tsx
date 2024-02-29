import {  Navbar,   NavbarBrand,   NavbarContent,   NavbarItem,   NavbarMenuToggle,  NavbarMenu,  NavbarMenuItem, Link, Button} from "@nextui-org/react";
import { TextGenerateEffect } from "./TextGenerateEffect";
import SignOutBtn from "../auth/SignOutBtn";
import { AuthSession } from "@/lib/auth/utils";
import UserDropdown from "./UserDropdown";

export default function NextUINavbar({session}:AuthSession) {
    return (
      <Navbar maxWidth="xl" >
        <NavbarBrand className="md:hidden">     
          <TextGenerateEffect words="dk" className="w-10/12"/>
        </NavbarBrand>
        {/* <NavbarContent className="hidden sm:flex gap-4" justify="center">
          <NavbarItem isActive>
            <Link href="/chat" aria-current="page">
              Chat
            </Link>
          </NavbarItem>
          <NavbarItem>
            <Link color="foreground" href="/settings">
              Settings
            </Link>
          </NavbarItem>
        </NavbarContent> */}
        <NavbarContent justify="end">      
          {/* <NavbarItem className="hidden lg:flex">
            <Link href="/sign-in">Login</Link>
          </NavbarItem> */}
          <NavbarItem>
            {session?
          (
         <UserDropdown session={session}/>
      
          ):(
            <Button as={Link} color="primary" href="/sign-in" variant="flat">
            Sign Up
          </Button>
          )  
          }
          </NavbarItem>
        </NavbarContent>
      </Navbar>
    );
  }
  
  