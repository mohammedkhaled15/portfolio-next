"use client"

import { createProject } from "@utils/projectsActions"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { ActionMeta } from "react-select"
import useSWR from "swr"
import CreatableSelect from 'react-select/creatable';
import makeAnimated from 'react-select/animated';

const CreatePage = () => {
  const router = useRouter()
  const [disable, setDisable] = useState(false)

  const fetcher = (...args: Parameters<typeof fetch>) => fetch(...args).then(res => res.json())
  const { data: skills } = useSWR(`/api/skills`, fetcher)

  const [selectedOptions, setSelectedOptions] = useState<(ISkill[] | undefined)>([])
  const [selectOptions, setSelectOptions] = useState<ISkill[]>([])

  // Here we populate options of select input with skills came from db on condition when there is difference between their lengths
  useEffect(() => {
    skills && setSelectOptions(skills)
  }, [skills])

  const [projectToCreate, setProjectToCreate] = useState<ProjectData>({ name: "", skills: [], skillsDetails: [], demoLink: "", repoLink: "", imgUrl: "" })
  const [newSkills, setNewSkills] = useState<(ISkill | undefined)[]>([])

  const handleSelectChange = (options: readonly (ISkill | undefined)[], actionMeta: ActionMeta<ISkill | undefined>) => {
    if (actionMeta.action === "create-option") {
      // when action is create we will create new skills array to update the db with it
      setNewSkills((prev: (ISkill | undefined)[]) => [...prev, actionMeta.option])
    }
    setSelectedOptions(options as (ISkill[] | undefined))
    setProjectToCreate({
      ...projectToCreate,
      skills: (options as (ISkill[] | undefined))?.map(skill => skill?.value)
    })
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setProjectToCreate({
      ...projectToCreate,
      skills: selectedOptions?.map(skill => skill?.value),
      [e.currentTarget?.name]: e.currentTarget?.value
    })
  }

  const handleCreate = async (e: React.FormEvent<HTMLButtonElement>) => {
    e.preventDefault()
    setDisable(true)
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
    console.log(projectToCreate)
    createProject(projectToCreate)
    router.push("/dashboard")
  }

  const animatedComponents = makeAnimated();// for animation of selected labels in select input "from docs"

  return (
    <div className="flex flex-col gap-3 items-center">
      <h3 className="self-center my-10 ">Crreating New Project</h3>
      <form className="w-[90%] max-w-[700px] ">
        <div className="relative z-0 w-full mb-6 group">
          <input value={projectToCreate.name} type="text" name="name" id="name" className="editProject-input" placeholder="" required onChange={handleChange} />
          <label htmlFor="name" className="editProject-label">Project Name</label>
        </div>
        <div className="relative z-0 w-full mb-6 group">
          <CreatableSelect
            menuPortalTarget={document.body}
            className="editProject-input"
            id="skills"
            styles={{
              container: (base) => ({ ...base, width: "100%", minHeight: "30px", border: "none" }),
              control: (base) => ({ ...base, minHeight: "25px", backgroundColor: "transparent", color: "white" }),
              input: (base) => ({ ...base, color: "white" }),
              menu: (base) => ({ ...base, borderRadius: "10px" }),
              menuList: (base) => ({ ...base, backgroundColor: "#1F1F38", overflow: "scroll" }),
              option: (base, state) => ({ ...base, backgroundColor: state.isFocused ? "#4DB5FF" : "", fontSize: "12px" }),
              multiValueLabel: (base) => ({ ...base, backgroundColor: "#4DB5FF", color: "white", padding: "3px", width: "fit-content" }),
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
          <input value={projectToCreate.demoLink} onChange={handleChange} type="text" name="demoLink" id="demoLink" className="editProject-input" placeholder=" " required />
          <label htmlFor="demoLink" className="editProject-label">Demo Link</label>
        </div>
        <div className="relative z-0 w-full mb-6 group">
          <input value={projectToCreate.repoLink} onChange={handleChange} type="text" name="repoLink" id="repoLink" className="editProject-input" placeholder=" " required />
          <label htmlFor="repoLink" className="editProject-label">Repo Link</label>
        </div>
        <div className="relative z-0 w-full mb-6 group">
          <input value={projectToCreate.imgUrl} onChange={handleChange} type="text" name="imgUrl" id="imgUrl" className="editProject-input" placeholder=" " required />
          <label htmlFor="imgUrl" className="editProject-label">Image Url</label>
        </div>
        <button disabled={disable} type="submit" onClick={(e) => handleCreate(e)} className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 disabled:bg-slate-400 disabled:text-slate-700 disabled:hover:bg-slate-400 disabled:hover:text-slate-700">Create</button>
      </form>
    </div >
  )
}

export default CreatePage