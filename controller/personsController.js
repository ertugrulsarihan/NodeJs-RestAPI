var person = require("../models/personsModel");
const { getPostData } = require("../utils");

getPersons = async (req, res) => {
  try {
    const persons = await person.findAll();
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify(persons));
  } catch (error) {
    console.log(error);
  }
};

getPerson = async (req, res, id) => {
  try {
    const persons = await person.findId(id);
    if (!persons) {
      res.writeHead(404, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ mesaj: "Kullanıcı bulunamadı" }));
    } else {
      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(JSON.stringify(persons));
    }
  } catch (error) {
    console.log(error);
  }
};

updatePerson = async (req, res, id) => {
  try {
    const persons = await person.findId(id);
    if (!persons) {
      res.writeHead(404, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ mesaj: "Kullanıcı bulunamadı" }));
    } else {
      const body = await getPostData(req);
      const { isim, email } = JSON.parse(body);

      const personData = {
        isim: isim || persons.isim,
        email: email || persons.email,
      };
      const updatedPerson=await person.updatePerson(id,personData);
      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(JSON.stringify(updatedPerson));
    }
  } catch (error) {
    console.log(error);
  }
};
deletePerson=async(req,res,id)=>{
  try {
    const persons = await person.findId(id);
    if (!persons) {
      res.writeHead(404, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ mesaj: "Kullanıcı bulunamadı" }));
    } else {
      
      await person.remove(id)

    
      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(JSON.stringify({mesaj:`Kullanıcı id=${id} silindi`}));
    }
  } catch (error) {
    console.log(error);
  }
}

createPerson = async (req, res) => {
  try {
    const body = await getPostData(req);
    const { isim, email } = JSON.parse(body);
    const kullanici = {
      isim,
      email,
    };
    const yeniKullanici = await person.createPerson(kullanici);
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify(yeniKullanici));
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  getPersons,
  getPerson,
  createPerson,
  updatePerson,
  deletePerson
};
