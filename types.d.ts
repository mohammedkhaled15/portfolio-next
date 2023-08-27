type ProjectData =  {
  id: number;
  name: string;
  skills: string[];
  demoLink: string;
  repoLink: string;
  imgUrl: string;
}

type UpdateProjectProps = {
  id:string,
  editedProject:ProjectData
}