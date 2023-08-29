"use client"
import { useParams, useRouter } from "next/navigation"
import { projects } from "@app/portfolio/projects"
import React, { useEffect, useState } from "react"
import { updateProject } from "@utils/projectsActions"
import useSWR, { Fetcher } from 'swr'
import CreatableSelect from 'react-select/creatable';
import makeAnimated from 'react-select/animated';

const animatedComponents = makeAnimated();

const options = [
  { value: 'python', label: 'python' },
  { value: 'html', label: 'html' },
  { value: 'css', label: 'css' }
]


const EditPage = () => {
  const router = useRouter()
  const searchParams = useParams()
  const projectId = searchParams.id.toString()
  const [disable, setDisable] = useState(false)
  const [dropdown, setDropdown] = useState(false)
  // const [skills, setSkills] = useState([])

  const fetcher = (...args: any[]) => fetch(...args).then(res => res.json())
  const { data: project, error, isLoading } = useSWR(`/api/projects/?id=${projectId}`, fetcher)
  const { data: projects, isLoading: projectsLoading } = useSWR(`/api/projects`, fetcher)


  const [editedProjectData, setEditedProjectData] = useState<ProjectData | undefined>(project)


  // useEffect(() => {
  //   let arr: string[] = []
  //   projects.map((project: ProjectData) => project.skills.map((skill: string) => arr.push(skill)))
  //   setSkills(new Set(arr))
  // }, [projects, projectsLoading])


  useEffect(() => {
    setEditedProjectData(project)
  }, [project])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault()
    setEditedProjectData({ ...project, [e.currentTarget?.name]: e.currentTarget?.value } as ProjectData)
  }

  const handleUpdate = (e: React.FormEvent<HTMLButtonElement>) => {
    e.preventDefault()
    setDisable(true)
    updateProject(projectId, editedProjectData)
    router.push("/dashboard")
  }

  const toggleDropdown = () => {
    setDropdown(prev => !prev)
  }

  if (error) return <h1>Failed to Load!</h1>
  if (isLoading) return <h1>Loading ...</h1>
  if (project) return (
    <div className="flex flex-col gap-3 items-center">
      <h3 className="self-center my-10 ">Create New Project</h3>
      <form className="w-[90%] max-w-[700px] ">
        <div className="relative z-0 w-full mb-6 group">
          <input value={editedProjectData?.name} type="text" name="name" id="name" className="editProject-input" placeholder="" required onChange={handleChange} />
          <label htmlFor="name" className="editProject-label">Project Name</label>
        </div>
        <div className="relative z-0 w-full mb-6 group">
          <CreatableSelect onChange={(e) => console.log(e)} className="multi-select" options={options} components={animatedComponents} isMulti closeMenuOnSelect />
        </div>
        <div className="relative z-0 w-full mb-6 group">
          <input value={editedProjectData?.demoLink} onChange={handleChange} type="text" name="demoLink" id="demoLink" className="editProject-input" placeholder=" " required />
          <label htmlFor="demoLink" className="editProject-label">Demo Link</label>
        </div>
        <div className="relative z-0 w-full mb-6 group">
          <input value={editedProjectData?.repoLink} onChange={handleChange} type="text" name="repoLink" id="repoLink" className="editProject-input" placeholder=" " required />
          <label htmlFor="repoLink" className="editProject-label">Repo Link</label>
        </div>
        <div className="relative z-0 w-full mb-6 group">
          <input value={editedProjectData?.imgUrl} onChange={handleChange} type="text" name="imgUrl" id="imgUrl" className="editProject-input" placeholder=" " required />
          <label htmlFor="imgUrl" className="editProject-label">Image Url</label>
        </div>
        <button disabled={disable} type="submit" onClick={(e) => handleUpdate(e)} className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 disabled:bg-slate-400 disabled:text-slate-700 disabled:hover:bg-slate-400 disabled:hover:text-slate-700">Update</button>
      </form>
    </div >
  )
}

export default EditPage