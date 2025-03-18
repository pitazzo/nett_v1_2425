const http = require("http");

const db = [
  {
    id: 1,
    title: "La naranaja mecánica",
    year: 1972,
    duration: 120,
    director: "Kubrick",
    isSaga: false,
  },
  {
    id: 2,
    title: "El Apartamento",
    year: 1964,
    duration: 90,
    director: "Billy Wilder",
    isSaga: false,
  },
  {
    id: 3,
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

const server = http.createServer(async (req, res) => {
  const url = req.url;
  const method = req.method;

  const [, endpoint, rawParam] = url.split("/");

  if (endpoint === "movies" && !rawParam && method === "GET") {
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

  if (endpoint === "movies" && rawParam && method === "GET") {
    const param = parseInt(rawParam);

    if (!param) {
      res.writeHead(400);
      res.end("Please provide a valid movie ID");
      return;
    }

    const movie = db.find((movie) => movie.id === param);

    if (!movie) {
      res.writeHead(404);
      res.end(`Movie with ID ${param} was not found`);
      return;
    }

    res.writeHead(200);
    res.end(JSON.stringify(movie));
    return;
  }

  if (endpoint === "movies" && !rawParam && method === "POST") {
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
      id: db.length + 1,
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

  if (endpoint === "movies" && rawParam && method === "DELETE") {
    const param = parseInt(rawParam);

    if (!param) {
      res.writeHead(400);
      res.end("Please provide a valid movie ID");
      return;
    }

    const index = db.findIndex((movie) => param === movie.id);

    if (index === -1) {
      res.writeHead(404);
      res.end(`Movie with ID ${param} was not found`);
      return;
    }

    const deletedMovie = db.splice(index, 1);

    res.writeHead(200);
    res.end(JSON.stringify(deletedMovie));

    return;
  }

  res.writeHead(404);
  res.end("Method not found");
});

server.listen(3000, () => {
  console.log("movies API is running at http://localhost:3000 🎬");
});
