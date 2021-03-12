var persons = require("../data/DB.json");
const { v4: uuidv4 } = require("uuid");
const { folderWrite } = require("../utils");

findAll = () => {
  return new Promise((resolve, reject) => {
    resolve(persons);
  });
};

findId = (id) => {
  return new Promise((resolve, reject) => {
    const person = persons.find((k) => k.id === id);
    resolve(person);
  });
};

updatePerson = (id, person) => {
  return new Promise((resolve, reject) => {
    const index = persons.findIndex((k) => k.id === id);
    persons[index] = { id, ...person };

    folderWrite("./data/DB.json", persons);
    resolve(persons[index]);
  });
};

createPerson = (person) => {
  return new Promise((resolve, reject) => {
    const newPerson = { id: uuidv4(), ...person };
    persons.push(newPerson);
    folderWrite("./data/DB.json", persons);
    resolve(newPerson);
  });
};
remove=(id)=>{
  return new Promise((resolve,reject)=>{
    persons=persons.filter((k)=>k.id!==id);
    folderWrite('./data/DB.json',persons);
    resolve();
  })
}

module.exports = {
  findAll,
  findId,
  createPerson,
  updatePerson,
  remove
};
