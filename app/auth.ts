import type {
  GetServerSidePropsContext,
  NextApiRequest,
  NextApiResponse,
} from "next"
import type { NextAuthOptions } from "next-auth"
import { getServerSession } from "next-auth"
import EmailProvider from "next-auth/providers/email";
import { KyselyAdapter } from "@auth/kysely-adapter";
import { db } from "@/lib/db/db";

export const config = {
  adapter: KyselyAdapter(db),
  callbacks: {
    session: async ({ session, user }) => {
      session.user.id = user.id
      
      return session
    }
  },
  providers: [
    EmailProvider({
      server: {
        host: process.env.EMAIL_SERVER_HOST,
        port: process.env.EMAIL_SERVER_PORT,
        auth: {
          user: process.env.EMAIL_SERVER_USER, 
          pass: process.env.EMAIL_SERVER_PASSWORD, 
        }
      }, 
      from: process.env.EMAIL_FROM
    })
  ]
} satisfies NextAuthOptions

export function auth(
  ...args:
    | [GetServerSidePropsContext["req"], GetServerSidePropsContext["res"]]
    | [NextApiRequest, NextApiResponse]
    | []
) {
  return getServerSession(...args, config)
}
