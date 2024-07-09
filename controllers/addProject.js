import fs from 'fs';

const addProject = (req,res) => {
    const projects = JSON.parse(fs.readFileSync("./data/project.json", "utf8"));
    const newProject = req.body;
    console.log(projects)
    projects.push(newProject);
    fs.writeFileSync('./data/project.json', JSON.stringify(projects))
    res.status(201).json({message: 'New project added!'})
}

export default addProject;