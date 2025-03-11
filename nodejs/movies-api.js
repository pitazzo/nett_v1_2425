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

  res.writeHead(404);
  res.end("Method not found");
});

server.listen(3000, () => {
  console.log("movies API is running at http://localhost:3000 🎬");
});
