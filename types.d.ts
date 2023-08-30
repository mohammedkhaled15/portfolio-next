type ProjectData = {
  id: number;
  name: string;
  skill: string[];
  skillsDetails: ISkill[];
  demoLink: string;
  repoLink: string;
  imgUrl: string;
};

type UpdateProjectProps = {
  id: string;
  editedProject: ProjectData;
};

interface ISkill {
  value: string;
  label: string;
  optionIsNew?: Boolean;
}
interface IProject {
  id: number;
  name: string;
  skills: { name: String }[];
  demoLink: string;
  repoLink: string;
  imgUrl: string;
}

interface Option {
  label: String;
  value: String;
}
