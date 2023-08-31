"use client"
import { useParams, useRouter } from "next/navigation"
import React, { useEffect, useState } from "react"
import { updateProject } from "@utils/projectsActions"
import useSWR from 'swr'
import CreatableSelect from 'react-select/creatable';
import makeAnimated from 'react-select/animated';
import { ActionMeta } from "react-select"


const animatedComponents = makeAnimated();

const EditPage = () => {
  const router = useRouter()
  const searchParams = useParams()
  const projectId = searchParams.id.toString()
  const [disable, setDisable] = useState(false)

  const fetcher = (...args: Parameters<typeof fetch>) => fetch(...args).then(res => res.json())
  const { data: project, error, isLoading } = useSWR(`/api/projects/?id=${projectId}`, fetcher)
  const { data: skills } = useSWR(`/api/skills`, fetcher)
  console.log(project && project[0].skillsDetails)

  const [selectedOptions, setSelectedOptions] = useState<ISkill[]>([])
  const [selectOptions, setSelectOptions] = useState<ISkill[]>([])

  useEffect(() => { // Here we populate options of select input with skills came from db on condition when there is difference between their lengths
    if (selectOptions.length !== skills?.length) {
      skills?.map((skill: ISkill) => {
        setSelectOptions((prev: ISkill[]) => [...prev, { value: skill.value, label: skill.label }])
      })
    }
  }, [skills, selectOptions])

  const [editedProjectData, setEditedProjectData] = useState<ProjectData | undefined>(project)

  useEffect(() => { // Here we set edited project which used as value for all form inputs with project came from db
    project && setEditedProjectData(project[0])
  }, [project])

  useEffect(() => { // update selectedOptions with values of skills came already with the project data from db
    if (project && Object.entries(project).length !== 0) {
      project && setSelectedOptions(project[0]?.skillsDetails)
    }
    console.log(selectedOptions)
  }, [project])

  const handleSelectChange = async (option: readonly ISkill[], actionMeta: ActionMeta<ISkill>) => {
    if (actionMeta.action === "create-option") { // when action is create we will create new skill and update selected options
      const res = await fetch("/api/skills", {
        method: "POST",
        headers: {
          "Content-type": "application/json"
        },
        body: JSON.stringify(actionMeta.option)
      })
      setSelectedOptions((prev: ISkill[]) => ([...prev, ...option, actionMeta.option]))
    } else if (actionMeta.action === "remove-value") {
      setSelectedOptions(prev => prev.filter(skill => skill.value !== actionMeta.removedValue.value)); // update selected options without updating db
    } else {
      setSelectedOptions((prev: ISkill[]) => [...prev, ...option]); // update selected options without updating db
    }
    console.log(actionMeta)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault()
    setEditedProjectData({ ...editedProjectData, skills: selectedOptions.map(skill => skill.value), [e.currentTarget?.name]: e.currentTarget?.value } as ProjectData)
  }

  const handleUpdate = (e: React.FormEvent<HTMLButtonElement>) => {
    e.preventDefault()
    console.log(editedProjectData)
    setDisable(true)
    updateProject(projectId, editedProjectData)
    router.push("/dashboard")
  }

  if (error) return <h1>Failed to Load!</h1>
  if (isLoading) return <h1>Loading ...</h1>
  if (project) return (
    <div className="flex flex-col gap-3 items-center">
      <h3 className="self-center my-10 ">Editing Project: {project?.name?.toUpperCase().replace("-", " ")}</h3>
      <form className="w-[90%] max-w-[700px] ">
        <div className="relative z-0 w-full mb-6 group">
          <input value={editedProjectData?.name} type="text" name="name" id="name" className="editProject-input" placeholder="" required onChange={handleChange} />
          <label htmlFor="name" className="editProject-label">Project Name</label>
        </div>
        <div className="relative z-0 w-full mb-6 group">
          <CreatableSelect
            menuPortalTarget={document.body}
            className="editProject-input"
            id="skills"
            styles={{
              container: (base, state) => ({ ...base, width: "70%", border: "none" }),
              control: (base, state) => ({ ...base, height: "25px", backgroundColor: "transparent", color: "white" }),
              input: (base, state) => ({ ...base, color: "white" }),
              menu: (base, state) => ({ ...base, borderRadius: "10px" }),
              menuList: (base, state) => ({ ...base, backgroundColor: "#1F1F38", overflow: "scroll" }),
              option: (base, state) => ({ ...base, backgroundColor: state.isFocused ? "#4DB5FF" : "", fontSize: "12px" }),
              multiValueLabel: (base, state) => ({ ...base, backgroundColor: "#4DB5FF", color: "white", padding: "3px", width: "fit-content" }),
            }}
            options={selectOptions}
            components={animatedComponents}
            isMulti={true}
            closeMenuOnSelect
            onChange={handleSelectChange}
            placeholder="Select Or Create new Skill..."
            value={selectedOptions}
          />
          <label htmlFor="skills" className="editProject-label">Select Skills</label>
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