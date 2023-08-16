"use client"
import { useParams } from "next/navigation"
import { useSearchParams } from "next/navigation"

const EditPage = () => {
  const params = useParams()
  const searchParams = useSearchParams()
  // console.log(searchParams)
  return (
    <div>
      {JSON.stringify(params)}
      {JSON.stringify(searchParams)}
    </div>
  )
}

export default EditPage