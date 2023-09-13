"use client"
import { useEffect, useState } from 'react'
import "./portofolio.css"
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import useSWR from 'swr'
import makeAnimated from 'react-select/animated';
import Select, { MultiValue } from 'react-select';
import { Spinner } from '@app/components'

const animatedComponents = makeAnimated();

const Portofolio = () => {
  const [filterCriterias, setFilterCriterias] = useState<(string)[]>([])
  const [filteredProjects, setFilteredProjects] = useState([])

  const fetcher = (...args: Parameters<typeof fetch>) => fetch(...args).then(res => res.json())
  const { data: projects, error: projectsError, isLoading: projectsIsLoading } = useSWR(`/api/projects/`, fetcher)
  const { data: skills, error: skillsError, isLoading: skillsIsLoading } = useSWR(`/api/skills`, fetcher)

  const handleSelectChange = (options: MultiValue<ISkill>) => {
    const filters = options?.map(option => option?.value)
    setFilterCriterias(filters)
  }

  useEffect(() => {
    if (filterCriterias?.length !== 0) {
      const choossedProjects = projects?.filter((project: ProjectData) =>
        filterCriterias.every(filter => project.skills?.includes(filter))
      )
      setFilteredProjects(choossedProjects)
    } else {
      setFilteredProjects(projects)
    }
  }, [filterCriterias, projects])

  return (
    <section id='portfolio'>
      <h5>My Recent Work</h5>
      <h2>Portofolio</h2>
      {
        <div className="container portofolio__container">
          <Select
            instanceId='filterSkills'
            closeMenuOnSelect={true}
            components={animatedComponents}
            onChange={handleSelectChange as (newValue: MultiValue<unknown>) => void}
            // menuPortalTarget={document.body}
            isMulti
            options={skills}
            placeholder={"Choose between diffrent filters"}
            styles={{
              container: (base, state) => ({ ...base, width: "100%", minHeight: "30px", border: "none" }),
              control: (base, state) => ({ ...base, minHeight: "25px", backgroundColor: "transparent", color: "white" }),
              input: (base, state) => ({ ...base, color: "white" }),
              menu: (base, state) => ({ ...base, borderRadius: "10px" }),
              menuList: (base, state) => ({ ...base, backgroundColor: "#1F1F38", overflow: "scroll" }),
              option: (base, state) => ({ ...base, backgroundColor: state.isFocused ? "#4DB5FF" : "", fontSize: "12px" }),
              multiValueLabel: (base, state) => ({ ...base, backgroundColor: "#4DB5FF", color: "white", padding: "3px", width: "fit-content" }),
            }}
          />
          <AnimatePresence>
            <motion.div layout className="projects">
              {projectsIsLoading ? <Spinner /> : null}
              {projectsError ? <h1>Failed to Load</h1> : null}
              {
                filteredProjects?.length > 0 && projects?.length > 0 ?
                  (filteredProjects?.map((project: ProjectData) => {
                    return (
                      <motion.div
                        layout animate={{ opacity: 1 }}
                        initial={{ opacity: 0 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.8 }}
                        className="repo-card" key={project.name}
                      >
                        <div className='img'>
                          <Image src={project.imgUrl} fill style={{ objectFit: "cover", borderRadius: "1rem" }} alt="project main img" />
                          <div className="overlay">
                            <div className="overlay__cta">
                              <a href={project.demoLink} className="btn btn-primary" target="_blan;">Live Demo</a>
                              <a href={project.repoLink} className="btn" target="_blan;">Repo</a>
                            </div>
                            <h4 >{project.name}</h4>
                          </div>
                        </div>
                      </motion.div>
                    )
                  })) : <h1 style={{ gridArea: "none" }}>No Projects Matches These Filters</h1>
              }
            </motion.div>
          </AnimatePresence>
        </div>
      }
    </section >
  )
}

export default Portofolio