import React from "react";
import ClientLogout from "../shared/ClientLogout";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Button } from "../ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { getUserAuth } from "@/lib/auth/utils";

const UserButton = async ({children}:{children:React.ReactNode}) => {
  const { session } = await getUserAuth();
 
  return (
    <div>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="relative h-8 w-8 rounded-full">
            <Avatar className="h-8 w-8">
              <AvatarImage
                src={JSON.stringify(session?.user.picture).replace(/^"|"$/g, '')}
                alt="@shadcn"
              />
              <AvatarFallback>User</AvatarFallback>
            </Avatar>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56" align="end" forceMount>
          <DropdownMenuLabel className="font-normal">
            <div className="flex flex-col space-y-1">
              <p className="text-sm font-medium leading-none">
                {JSON.stringify(session?.user.name).replace(/^"|"$/g, '')}
              </p>
              <p className="text-xs leading-none text-muted-foreground">
                {JSON.stringify(session?.user.email).replace(/^"|"$/g, '')}
              </p>
            </div>
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuGroup className="overflow-auto max-h-[30vh]">

        {children}
          </DropdownMenuGroup>
          <DropdownMenuSeparator />

          <DropdownMenuItem>
            <ClientLogout />
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default UserButton;
