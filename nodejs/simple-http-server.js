const http = require("http");

const server = http.createServer(async (req, res) => {
  const url = req.url;
  const method = req.method;

  if (url === "/toUpperCase" && method === "POST") {
    let raw = "";
    for await (const chunk of req) {
      raw += chunk;
    }

    const body = JSON.parse(raw);

    const response = {
      value: body["value"].toUpperCase(),
    };

    res.writeHead(200);
    res.end(JSON.stringify(response));

    return;
  }

  if (url === "/add" && method === "POST") {
    let raw = "";
    for await (const chunk of req) {
      raw += chunk;
    }

    let body;

    try {
      body = JSON.parse(raw);
    } catch {
      res.writeHead(400);
      res.end("Please provide a valid JSON body such as {'a': 2, 'b': 3}");
      return;
    }

    const a = parseInt(body["a"]);
    const b = parseInt(body["b"]);

    if (!a || !b) {
      res.writeHead(400);
      res.end("Please provide valid numbers for a and b");
      return;
    }

    const response = {
      result: a + b,
    };

    res.writeHead(200);
    res.end(JSON.stringify(response));

    return;
  }

  res.writeHead(404);
  res.end("Method not found");
});

server.listen(3000, () => {
  console.log("server is running at http://localhost:3000 🚀");
});
