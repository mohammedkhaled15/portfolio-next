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

  const [selectedOptions, setSelectedOptions] = useState<ISkill[]>([])
  const [selectOptions, setSelectOptions] = useState<ISkill[]>([])

  // Here we populate options of select input with skills came from db on condition when there is difference between their lengths
  useEffect(() => {
    if (selectOptions.length !== skills?.length) {
      skills?.map((skill: ISkill) => {
        setSelectOptions((prev: ISkill[]) => [...prev, { value: skill.value, label: skill.label }])
      })
    }
  }, [skills, selectOptions])

  const [createdProject, setCreatedProject] = useState<ProjectData | undefined>()

  const handleSelectChange = async (option: readonly ISkill[], actionMeta: ActionMeta<ISkill>) => {
    if (actionMeta.action === "create-option") { // when action is create we will create new skill and update selected options
      const res = await fetch("/api/skills", {
        method: "POST",
        headers: {
          "Content-type": "application/json"
        },
        body: JSON.stringify(actionMeta.option)
      })
      setSelectedOptions(prev => ([...prev, actionMeta.option]))
    } else if (actionMeta.action === "remove-value") {
      // update selected options without updating db
      setSelectedOptions(prev => prev.filter(skill => skill.value !== actionMeta.removedValue.value));
    } else {
      setSelectedOptions(prev => [...prev, ...option]); // update selected options without updating db
    }
    console.log(actionMeta)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault()
    setCreatedProject({ ...createdProject, skills: selectedOptions.map(skill => skill.value), [e.currentTarget?.name]: e.currentTarget?.value } as ProjectData)
  }

  const handleCreate = (e: React.FormEvent<HTMLButtonElement>) => {
    e.preventDefault()
    console.log(createdProject)
    setDisable(true)
    createProject(createdProject)
    router.push("/dashboard")
  }

  const animatedComponents = makeAnimated();// for animation of selected labels in select input "from docs"

  return (
    <div className="flex flex-col gap-3 items-center">
      <h3 className="self-center my-10 ">Crreating New Project</h3>
      <form className="w-[90%] max-w-[700px] ">
        <div className="relative z-0 w-full mb-6 group">
          <input value={createdProject?.name} type="text" name="name" id="name" className="editProject-input" placeholder="" required onChange={handleChange} />
          <label htmlFor="name" className="editProject-label">Project Name</label>
        </div>
        <div className="relative z-0 w-full mb-6 group">
          <CreatableSelect
            menuPortalTarget={document.body}
            className="editProject-input"
            id="skills"
            styles={{
              container: (base) => ({ ...base, width: "70%", border: "none" }),
              control: (base) => ({ ...base, height: "25px", backgroundColor: "transparent", color: "white" }),
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
          <input value={createdProject?.demoLink} onChange={handleChange} type="text" name="demoLink" id="demoLink" className="editProject-input" placeholder=" " required />
          <label htmlFor="demoLink" className="editProject-label">Demo Link</label>
        </div>
        <div className="relative z-0 w-full mb-6 group">
          <input value={createdProject?.repoLink} onChange={handleChange} type="text" name="repoLink" id="repoLink" className="editProject-input" placeholder=" " required />
          <label htmlFor="repoLink" className="editProject-label">Repo Link</label>
        </div>
        <div className="relative z-0 w-full mb-6 group">
          <input value={createdProject?.imgUrl} onChange={handleChange} type="text" name="imgUrl" id="imgUrl" className="editProject-input" placeholder=" " required />
          <label htmlFor="imgUrl" className="editProject-label">Image Url</label>
        </div>
        <button disabled={disable} type="submit" onClick={(e) => handleCreate(e)} className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 disabled:bg-slate-400 disabled:text-slate-700 disabled:hover:bg-slate-400 disabled:hover:text-slate-700">Create</button>
      </form>
    </div >
  )
}

export default CreatePage