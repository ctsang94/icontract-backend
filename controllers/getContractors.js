import fs from 'fs';

const getContractors = (req, res) => {
    const contractors= fs.readFileSync("./data/contractors.json", "utf8");
    res.json(JSON.parse(contractors));
  };

export default getContractors;