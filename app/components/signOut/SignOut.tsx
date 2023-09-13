"use client"
import { signOut } from "next-auth/react"
import { useRouter } from "next/navigation"

const SignOut = () => {
  const router = useRouter()

  const logout = () => {
    signOut()
    router.push("/")
  }

  return (
    <button onClick={logout} type="button" className="cursor-pointer text-white self-end bg-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center flex gap-3 items-center mr-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800">
      Sign Out
    </button>
  )
}

export default SignOut