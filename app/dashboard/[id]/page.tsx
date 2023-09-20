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

  const [selectedOptions, setSelectedOptions] = useState<(ISkill[] | undefined)>([])
  const [selectOptions, setSelectOptions] = useState<ISkill[]>([])

  useEffect(() => {
    skills && setSelectOptions(skills)
  }, [skills])

  const [editedProjectData, setEditedProjectData] = useState<ProjectData>(project)

  useEffect(() => {
    // Here we set edited project which used as value for all form inputs with project came from db
    project && setEditedProjectData(project[0])
  }, [project])

  useEffect(() => { // update selectedOptions with values of skills came already with the project data from db
    if (project && Object.entries(project).length !== 0) {
      project && setSelectedOptions(project[0]?.skillsDetails)
    }
  }, [project])

  const [newSkills, setNewSkills] = useState<(ISkill | undefined)[]>([])

  const handleSelectChange = async (options: readonly (ISkill | undefined)[], actionMeta: ActionMeta<ISkill>) => {
    if (actionMeta.action === "create-option") {
      // when action is create we will create new skills array to update the db with it
      setNewSkills((prev: (ISkill | undefined)[]) => [...prev, actionMeta.option])
    }
    setSelectedOptions(options as (ISkill[] | undefined))
    setEditedProjectData({
      ...editedProjectData,
      skills: (options as (ISkill[] | undefined))?.map(skill => skill?.value)
    })
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditedProjectData({
      ...editedProjectData,
      skills: selectedOptions?.map(skill => skill.value),
      [e.currentTarget?.name]: e.currentTarget?.value
    })
  }

  const handleUpdate = async (e: React.FormEvent<HTMLButtonElement>) => {
    e.preventDefault()
    // steps to check if the skill you created you selected it after that or deleted it so we can make sure that it is correct to add it to the database
    let skillsToAdd: (ISkill | undefined)[] = []
    newSkills.map(newSkill => {
      selectedOptions?.map(selectedSkill => {
        selectedSkill?.value === newSkill?.value ? skillsToAdd.push(selectedSkill) : null
      })
    })
    const res = await fetch("/api/skills", {
      method: "POST",
      headers: {
        "Content-type": "application/json"
      },
      body: JSON.stringify(skillsToAdd)
    })
    setDisable(true)
    updateProject(projectId, editedProjectData)
    router.push("/dashboard")
  }

  if (error) return <h1>Failed to Load!</h1>
  if (isLoading) return <h1>Loading ...</h1>
  if (project) return (
    <div className="flex flex-col gap-3 items-center">
      <h3 className="self-center my-10 ">Editing Project: {project[0]?.name?.toUpperCase().replace("-", " ")}</h3>
      <form className="w-[90%] max-w-[700px] ">
        <div className="relative z-0 w-full mb-6 group">
          <input value={editedProjectData?.name} type="text" name="name" id="name" className="editProject-input" placeholder="" required onChange={handleChange} />
          <label htmlFor="name" className="editProject-label">Project Name</label>
        </div>
        <div className="relative z-0 w-full mb-6 group">
          <CreatableSelect
            menuPortalTarget={window.document.body}
            className="editProject-input"
            id="skills"
            styles={{
              container: (base, state) => ({ ...base, width: "100%", minHeight: "30px", border: "none" }),
              control: (base, state) => ({ ...base, minHeight: "25px", backgroundColor: "transparent", color: "white" }),
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