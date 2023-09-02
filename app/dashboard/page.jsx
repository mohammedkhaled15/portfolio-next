import Image from "next/image"
import Link from "next/link"
import Modal from "@app/components/modal/Modal"
import "./dashboard.css"
import { deleteProject, getAllProjects } from "@utils/projectsActions"
import { addAllProjects } from "@utils/projectsActions"
import { clearAllProjects } from "@utils/projectsActions"
import { useRouter } from "next/navigation"

const Dashboard = async () => {

  async function handleClose() {
    "use server"
    console.log("modal closed")
  }
  async function handleOk(e) {
    "use server"
    await deleteProject(e)
  }

  const projects = await getAllProjects()
  return (
    <>
      <Modal onClose={handleClose} onOk={handleOk} title="Delete Confirmation">
        <h4>Are you sure you want to delete this project?</h4>
      </Modal>
      {/* <form action={addAllProjects}>
        <button>add</button>
      </form>
      <form action={clearAllProjects}>
        <button>Clear</button>
      </form> */}
      <div className="relative h-screen flex flex-col gap-10 mt-4 overflow-x-auto shadow-md sm:rounded-lg">
        <h3 className="self-center">All Projects</h3>
        <Link href="/dashboard/create" type="button" className="cursor-pointer text-white self-end bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center flex gap-3 items-center mr-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">
          Create New Project
          <svg className="w-6 h-6 text-gray-800 dark:text-white" fill="currentColor" viewBox="0 0 18 18">
            <path d="M6.143 0H1.857A1.857 1.857 0 0 0 0 1.857v4.286C0 7.169.831 8 1.857 8h4.286A1.857 1.857 0 0 0 8 6.143V1.857A1.857 1.857 0 0 0 6.143 0Zm10 0h-4.286A1.857 1.857 0 0 0 10 1.857v4.286C10 7.169 10.831 8 11.857 8h4.286A1.857 1.857 0 0 0 18 6.143V1.857A1.857 1.857 0 0 0 16.143 0Zm-10 10H1.857A1.857 1.857 0 0 0 0 11.857v4.286C0 17.169.831 18 1.857 18h4.286A1.857 1.857 0 0 0 8 16.143v-4.286A1.857 1.857 0 0 0 6.143 10ZM17 13h-2v-2a1 1 0 0 0-2 0v2h-2a1 1 0 0 0 0 2h2v2a1 1 0 0 0 2 0v-2h2a1 1 0 0 0 0-2Z" />
          </svg>
        </Link>

        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                id
              </th>
              <th scope="col" className="px-6 py-3">
                Project name
              </th>
              <th scope="col" className="px-6 py-3">
                skills
              </th>
              <th scope="col" className="px-6 py-3">
                Demo
              </th>
              <th scope="col" className="px-6 py-3">
                Repo
              </th>
              <th scope="col" className="px-6 py-3">
                Image
              </th>
              <th scope="col" className="px-6 py-3">
                <span className="sr-only">Edit</span>
              </th>
            </tr>
          </thead>
          <tbody>
            {projects?.length > 0 ?
              projects?.map((project, index) => (
                <tr key={project.name} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                  <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                    {index + 1}
                  </th>
                  <td className="px-6 py-4">
                    {project.name.toLocaleUpperCase()}
                  </td>
                  <td className="px-6 py-4 flex flex-wrap flex-row gap-1 ">
                    {project.skills.map((skill) => (
                      <span key={skill} className="p-2 bg-blue-600 text-white rounded-lg">{skill}</span>
                    ))}
                  </td>
                  <td className="px-6 py-4">
                    <Link href={project.demoLink} className="btn btn-primary" target="_blank">Demo</Link>
                  </td>
                  <td className="px-6 py-4">
                    <Link href={project.repoLink} className="btn btn-primary" target="_blank">Repo</Link>
                  </td>
                  <td className="px-6 py-4">
                    <Image className="ProjectImage" src={project.imgUrl} width={25} height={25} style={{ objectFit: "contain" }} alt="Project Image" />
                  </td>
                  <td className="px-6 py-4 text-right flex gap-2">
                    <Link href={`/dashboard/${project._id}`} className=" btn btn-primary font-medium bg-blue-600 dark:bg-blue-500">Edit</Link>
                    <Link href={`/dashboard?showModal=y&id=${project._id}`} className="btn btn-primary font-medium bg-red-600 dark:bg-red-500">Delete</Link>
                  </td>
                </tr>
              )) :
              <tr>
                <th>No Projects to load</th>
              </tr>
            }
          </tbody>
        </table>
      </div>
    </>
  )
}

export default Dashboard