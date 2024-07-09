import fs from 'fs';

const getAllProjects = (req, res) => {
    const projects = fs.readFileSync("./data/project.json", "utf8");
    res.json(JSON.parse(projects));
  };

export default getAllProjects;