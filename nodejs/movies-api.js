const http = require("http");
const { v4: uuidv4, validate: uuidValidate } = require("uuid");
require("dotenv").config();

const db = [
  {
    id: "2aa1cc7c-ae73-4a21-b354-f19b243a7e5b",
    title: "La naranaja mecánica",
    year: 1972,
    duration: 120,
    director: "Kubrick",
    isSaga: false,
  },
  {
    id: "58e816d4-4969-4276-866e-a0832af9a5fc",
    title: "El Apartamento",
    year: 1964,
    duration: 90,
    director: "Billy Wilder",
    isSaga: false,
  },
  {
    id: "13577b18-bdce-4127-a951-4a4215334404",
    title: "Harry Potter I",
    year: 2002,
    duration: 100,
    director: "Chris Columbus",
    isSaga: true,
  },
];

async function parseBody(req) {
  let raw = "";
  for await (const chunk of req) {
    raw += chunk;
  }
  try {
    return JSON.parse(raw);
  } catch {
    return {};
  }
}

async function handleRequest(req, res) {
  const url = req.url;
  const method = req.method;

  const [, endpoint, param] = url.split("/");

  if (endpoint === "movies" && !param && method === "GET") {
    const body = await parseBody(req);

    const isSaga = body["isSaga"];

    let result;

    if (isSaga === undefined) {
      result = db;
    } else {
      result = db.filter((movie) => movie.isSaga === isSaga);
    }

    res.writeHead(200);
    res.end(JSON.stringify(result));
    return;
  }

  if (endpoint === "movies" && param && method === "GET") {
    if (!uuidValidate(param)) {
      res.writeHead(400);
      res.end("Please provide a valid movie UUID");
      return;
    }

    const movie = db.find((movie) => movie.id === param);

    if (!movie) {
      res.writeHead(404);
      res.end(`Movie with UUID ${param} was not found`);
      return;
    }

    res.writeHead(200);
    res.end(JSON.stringify(movie));
    return;
  }

  if (endpoint === "movies" && !param && method === "POST") {
    const body = await parseBody(req);

    const title = body["title"];
    const director = body["director"];
    const year = parseInt(body["year"]);
    const duration = parseInt(body["duration"]);
    const isSaga = body["isSaga"];

    if (!title || title.length < 3 || typeof title !== "string") {
      res.writeHead(400);
      res.end("Please provide a valid movie title");
      return;
    }

    if (!director || director.length < 3 || typeof director !== "string") {
      res.writeHead(400);
      res.end("Please provide a valid movie director");
      return;
    }

    if (!year || year < 1800 || year > new Date().getFullYear()) {
      res.writeHead(400);
      res.end("Please provide a valid movie year");
      return;
    }

    if (!duration || duration < 1) {
      res.writeHead(400);
      res.end("Please provide a valid movie duration");
      return;
    }

    if (typeof isSaga != "boolean") {
      res.writeHead(400);
      res.end("Please provide a valid movie isSaga value");
      return;
    }

    const newMovie = {
      id: uuidv4(),
      title: title,
      year: year,
      director: director,
      duration: duration,
      isSaga: isSaga,
    };
    db.push(newMovie);

    res.writeHead(201);
    res.end(JSON.stringify(newMovie));
    return;
  }

  if (endpoint === "movies" && param && method === "DELETE") {
    if (!uuidValidate(param)) {
      res.writeHead(400);
      res.end("Please provide a valid movie UUID");
      return;
    }

    const index = db.findIndex((movie) => param === movie.id);

    if (index === -1) {
      res.writeHead(404);
      res.end(`Movie with UUIID ${param} was not found`);
      return;
    }

    const deletedMovie = db.splice(index, 1);

    res.writeHead(200);
    res.end(JSON.stringify(deletedMovie));

    return;
  }

  res.writeHead(404);
  res.end("Method not found");
}

async function checkApiKeyMiddleware(req, res, next) {
  const key = req.headers["authorization"];

  if (key !== process.env.API_KEY) {
    res.writeHead(401);
    res.end("Please provide a valid API key in header authorization");
    return;
  }

  next(req, res);
}

const server = http.createServer(async (req, res) => {
  checkApiKeyMiddleware(req, res, (req, res) => {
    handleRequest(req, res);
  });
});

server.listen(process.env.PORT, () => {
  console.log(
    `movies API is running at http://localhost:${process.env.PORT} 🎬`
  );
});
