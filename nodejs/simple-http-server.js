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

  res.writeHead(404);
  res.end("Method not found");
});

server.listen(3000, () => {
  console.log("server is running at http://localhost:3000 🚀");
});
