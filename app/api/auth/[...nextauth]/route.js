import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials"
import { users } from "../../../data/users";
import GitHubProvider from "next-auth/providers/github";

export const authOptions={
    providers:[
        GitHubProvider({
            clientId: process.env.GITHUB_ID,
            clientSecret: process.env.GITHUB_SECRET
          }),
        CredentialsProvider({
            name: 'Cred',
            credentials: {
                email: { label: "Email", type: "email", placeholder: "Enter email" },
                password: { label: "Password", type: "password" }
              },
              async authorize(credentials, req){
                if (!credentials || !credentials.email ||!credentials.password) {
                    return null
                }else{
                    const user=users.find((user)=>user.email===credentials.email);
                    if(user?.password===credentials.password){
                        return user
                    }
                    return null
                }
              }
        })
    ],
    secret:process.env.NEXTAUTH_SECRET
}
const handler=NextAuth(authOptions);
export {handler as GET, handler as POST}