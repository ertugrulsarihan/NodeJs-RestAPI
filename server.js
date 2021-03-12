const http = require("http");

var {
  getPersons,
  getPerson,
  createPerson,
  updatePerson,
  deletePerson
} = require("./controller/personsController");

const server = http.createServer((req, res) => {
  if (req.url === "/api/persons" && req.method === "GET") {
    getPersons(req, res);
  } else if (req.url.match(/\/api\/person\/([0-9]+)/) && req.method === "GET") {
    const id = req.url.split("/")[3];

    console.log(id);

    getPerson(req, res, id);
  } else if (req.url === "/api/person" && req.method === "POST") {
    createPerson(req, res);
  } else if (req.url.match(/\/api\/person\/([0-9]+)/) && req.method === "PUT") {
    const id = req.url.split("/")[3];
    updatePerson(req,res,id);

  } 
  else if (req.url.match(/\/api\/person\/([0-9]+)/) && req.method === "DELETE") {
    const id = req.url.split("/")[3];
    deletePerson(req,res,id);

  }
  else {
    res.writeHead(404, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ hata: "Yönlendirme geçersiz" }));
  }
});

const port = process.env.PORT || 5000;

server.listen(port, () => {
  console.log("Tebrikler");
});
