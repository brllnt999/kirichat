import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { redirect } from "next/navigation";

export type AuthSession = {
  user: any;
  session: {    
    user: {
      id: string;
      email: string | null;
      name: string | null;
      family_name: string | null;
      picture: string | null;
    };
    token: string | null;
  } | null;
};

export const getUserAuth = async () => {
  const { getUser, getAccessToken } = getKindeServerSession();
  const user = await getUser();
  const token = await getAccessToken();

  if (user && token) {
    return {
      session: {      
        user: {
          id: user.id,
          name: `${user.given_name} ${user.family_name}`,
          email: user.email,
          picture: user.picture,
          family_name: user.family_name,
        },
       token: token.jti
      },    
    } as AuthSession;
  } else {
    return { session: null };
  }
};

export const checkAuth = async () => {
  const { session } = await getUserAuth();
  if (session === null) redirect("/api/auth/login");
};
