"use client"
import { SignInResponse, signIn } from "next-auth/react"
import { redirect, useRouter } from "next/navigation"
import { useSession } from "next-auth/react"
import { Spinner } from "@app/components"

const Login = () => {

  const { data, status } = useSession()
  const router = useRouter()

  const handleSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault()
    const target = e.target as typeof e.target & {
      username: { value: string };
      password: { value: string };
    };
    const username = target.username.value
    const password = target.password.value

    const res: SignInResponse | undefined = await signIn("credentials", { redirect: true, username, password })
    if (res?.ok) router.push("/dashboard")
  }

  if (status === "authenticated") { router.push("/dashboard") }
  if (status === "loading") return <section className="min-h-screen flex justify-center items-center"><Spinner /></section>
  if (status === "unauthenticated") return (
    <section className="min-h-screen">
      <h5>Login</h5>
      <h2>Manage Your Projects</h2>
      <div className="container">
        <form className="mt-36 flex justify-center items-center flex-col" onSubmit={handleSubmit}>
          <div className="mb-6 w-[70%]">
            <label htmlFor="username-input" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Username</label>
            <input name="username" type="text" id="username-input" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
          </div>
          <div className="mb-6 w-[70%]">
            <label htmlFor="password-input" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
            <input name="password" type="password" id="password-input" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
          </div>
          <input type="submit" value="Sign In" className="cursor-pointer text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800" />
        </form>
      </div>
    </section >
  )
}

export default Login