const fs = require("fs");
const http = require("http");
const path = require("path");

const PORT = Number(process.env.PORT) || 8000;
const SITE_DIR = process.env.SITE_DIR || path.join(__dirname, "site");

const mimeTypes = {
  ".css": "text/css",
  ".html": "text/html",
  ".js": "text/javascript",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".ttf": "font/ttf"
};

function send(res, status, content, type = "text/plain") {
  res.writeHead(status, { "Content-Type": type });
  res.end(content);
}

function getFilePath(requestUrl) {
  const { pathname } = new URL(requestUrl, "http://localhost");
  const safePath = path.normalize(decodeURIComponent(pathname)).replace(/^(\.\.[/\\])+/, "");
  const fileName = safePath === "/" ? "index.html" : safePath.replace(/^[/\\]+/, "");
  return path.join(SITE_DIR, fileName);
}

http.createServer((req, res) => {
  const filePath = getFilePath(req.url);

  if (!filePath.startsWith(SITE_DIR)) {
    return send(res, 403, "Access denied");
  }

  fs.readFile(filePath, (error, content) => {
    if (error) {
      return send(res, 404, "Page not found");
    }

    const type = mimeTypes[path.extname(filePath)] || "application/octet-stream";
    return send(res, 200, content, type);
  });
}).listen(PORT, () => {
  console.log(`Assignment 1a Docker app running at http://localhost:${PORT}`);
});
