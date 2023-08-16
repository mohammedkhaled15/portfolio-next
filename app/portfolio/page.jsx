"use client"
import { useEffect, useState } from 'react'
// import axios from 'axios'
import "./portofolio.css"
import Filters from './Filters'
import { motion, AnimatePresence } from 'framer-motion'
import { projects } from './projects'



const Portofolio = () => {
  const [filterCriteria, setFilterCriteria] = useState("All")
  const [filteredProjects, setFilteredProjects] = useState([])

  // const deleteAddedWords = str => {
  //   const words = ["PS22-", "-html", "-css", "-scss", "-js", "-react", "-tailwind", "-bootstrap", "-oop", "-reduxtk", "-typescript", "rtkQuery", "nodejs"]
  //   for (let i in words) {
  //     str = str.replace(words[i], "").trim()
  //   }
  //   return str
  // }

  // useEffect(() => {

  //   setChoosedRepos(projects)
  // }, [])

  return (
    <section id='portofolio'>
      <h5>My Recent Work</h5>
      <h2>Portofolio</h2>
      <div className="container portofolio__container">
        {
          projects.length === 0 ?
            null :
            <Filters
              setFilteredProjects={setFilteredProjects}
              filterCriteria={filterCriteria}
              setFilterCriteria={setFilterCriteria}
            />
        }
        <AnimatePresence>
          <motion.div layout className="projects">
            {
              filteredProjects === null ? "Loading" : (
                filteredProjects.map(project => {
                  return (
                    <motion.div
                      layout animate={{ opacity: 1 }}
                      initial={{ opacity: 0 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.8 }}
                      className="repo-card" key={project.id}
                    >
                      <img src={project.imgUrl} alt="project main img" />
                      <div className="overlay">
                        <div className="overlay__cta">
                          <a href={project.demoLink} className="btn btn-primary" target="_blan;">Live Demo</a>
                          <a href={project.repoLink} className="btn" target="_blan;">Repo</a>
                        </div>
                        <h4 >{project.name}</h4>
                      </div>
                    </motion.div>
                  )
                })
              )
            }
          </motion.div>
        </AnimatePresence>
      </div>
    </section >
  )
}

export default Portofolio