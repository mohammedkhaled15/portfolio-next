import { useEffect, useState } from "react"
import { projects } from "./projects"

const Filters = ({ setFilteredProjects, filterCriteria, setFilterCriteria }) => {

  const [filterButtons, setFilterButtons] = useState([])

  useEffect(() => {
    let arr = []
    const getAllFilterButtons = () => {
      projects.map(project => project.skills.map(skill => arr.push(skill)))
      setFilterButtons(["All", ...new Set(arr)])
    }
    getAllFilterButtons()
  }, [])

  useEffect(() => {
    if (filterCriteria === "All") {
      setFilteredProjects(projects)
    } else {
      setFilteredProjects(projects.filter(project => project.skills.includes(filterCriteria)))
    }
  }, [filterCriteria, setFilteredProjects])

  return (
    <div className='filter-container'>
      {
        filterButtons.map(skill => {
          return (
            <button
              key={skill}
              className={`btn btn-primary ${filterCriteria === skill.toLocaleLowerCase() ? "active" : ""}`}
              onClick={(e) => setFilterCriteria(skill)}
            >
              {`${skill.toUpperCase()} (${skill === "All" ? projects.length : projects.filter(project => project.skills.includes(skill)).length})`}
            </button>

          )
        })
      }
    </div>
  )

  // return (
  //   <div className='filter-container'>
  //     <button className={`btn btn-primary ${filterCriteria === "All" ? "active" : ""}`} onClick={(e) => setFilterCriteria("All")}>All{` (${filteredRepos.length})`}</button>
  //     <button className={`btn btn-primary ${filterCriteria === "HTML".toLocaleLowerCase() ? "active" : ""}`} onClick={(e) => setFilterCriteria("HTML".toLowerCase())}>HTML{` (${filteredRepos.filter(repo => repo.name.includes("html")).length})`}</button>
  //     <button className={`btn btn-primary ${filterCriteria === "CSS".toLocaleLowerCase() ? "active" : ""}`} onClick={(e) => setFilterCriteria("CSS".toLowerCase())}>CSS{` (${filteredRepos.filter(repo => repo.name.includes("css")).length})`}</button>
  //     <button className={`btn btn-primary ${filterCriteria === "js".toLocaleLowerCase() ? "active" : ""}`} onClick={(e) => setFilterCriteria("js".toLowerCase())}>javaScript{` (${filteredRepos.filter(repo => repo.name.includes("js")).length})`}</button>
  //     <button className={`btn btn-primary ${filterCriteria === "React".toLocaleLowerCase() ? "active" : ""}`} onClick={(e) => setFilterCriteria("React".toLowerCase())}>React{` (${filteredRepos.filter(repo => repo.name.includes("react")).length})`}</button>
  //     <button className={`btn btn-primary ${filterCriteria === "Bootstrap".toLocaleLowerCase() ? "active" : ""}`} onClick={(e) => setFilterCriteria("Bootstrap".toLowerCase())}>Bootstrap{` (${filteredRepos.filter(repo => repo.name.includes("bootstrap")).length})`}</button>
  //     <button className={`btn btn-primary ${filterCriteria === "Tailwind".toLocaleLowerCase() ? "active" : ""}`} onClick={(e) => setFilterCriteria("Tailwind".toLowerCase())}>Tailwind{` (${filteredRepos.filter(repo => repo.name.includes("tailwind")).length})`}</button>
  //     <button className={`btn btn-primary ${filterCriteria === "Scss".toLocaleLowerCase() ? "active" : ""}`} onClick={(e) => setFilterCriteria("Scss".toLowerCase())}>Sass{` (${filteredRepos.filter(repo => repo.name.includes("scss")).length})`}</button>
  //     <button className={`btn btn-primary ${filterCriteria === "Reduxtk".toLocaleLowerCase() ? "active" : ""}`} onClick={(e) => setFilterCriteria("Reduxtk".toLowerCase())}>Redux-tk{` (${filteredRepos.filter(repo => repo.name.includes("reduxtk")).length})`}</button>
  //     <button className={`btn btn-primary ${filterCriteria === "typescript".toLocaleLowerCase() ? "active" : ""}`} onClick={(e) => setFilterCriteria("typescript".toLowerCase())}>typeScript{` (${filteredRepos.filter(repo => repo.name.includes("typescript")).length})`}</button>
  //     <button className={`btn btn-primary ${filterCriteria === "rtkQuery".toLocaleLowerCase() ? "active" : ""}`} onClick={(e) => setFilterCriteria("rtkQuery".toLowerCase())}>typeScript{` (${filteredRepos.filter(repo => repo.name.includes("rtkQuery")).length})`}</button>
  //   </div>
  // )
}

export default Filters