import connectDb from "@config/connectDb";
import User from "../../../../models/user";
import CredentialsProvider from "next-auth/providers/credentials";

const authOptions = {
  providers: [
    CredentialsProvider({
      name: "credentials",
      id: "credentials",
      async authorize(credentials) {
        await connectDb();
        try {
          const foundedUser = await User.findOne({
            username: credentials.username,
          });
          if (foundedUser) {
            const isPassCorrect = foundedUser.password === credentials.password;
            if (isPassCorrect) {
              const { password, username } = foundedUser;
              const user = {
                id: foundedUser._id.toString(),
                name: foundedUser.username,
              };
              return user;
            } else {
              throw new Error("Invailed Credentials");
            }
          } else {
            throw new Error("Invailed Credentials");
          }
        } catch (error) {
          throw new Error(error);
        }
      },
    }),
  ],
  session: { strategy: "jwt" },
  pages: { signIn: "/login" },
};

export default authOptions;
