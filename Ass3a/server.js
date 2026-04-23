// server.js
// Node.js Static Web Server
// Lists all files in directory and shows file content on click

const http = require("http");
const fs = require("fs");
const path = require("path");

const PORT = 3000;
const DIRECTORY = __dirname; // current folder

const server = http.createServer((req, res) => {
    const url = decodeURIComponent(req.url);

    // Home Page - Show File List
    if (url === "/") {
        fs.readdir(DIRECTORY, (err, files) => {
            if (err) {
                res.writeHead(500, { "Content-Type": "text/plain" });
                return res.end("Error reading directory");
            }

            let html = `
                <html>
                <head>
                    <title>File List</title>
                    <style>
                        body {
                            font-family: Arial;
                            padding: 20px;
                            background: #f4f4f4;
                        }
                        h1 {
                            color: #333;
                        }
                        ul {
                            list-style: none;
                            padding: 0;
                        }
                        li {
                            margin: 10px 0;
                        }
                        a {
                            text-decoration: none;
                            color: blue;
                            font-size: 18px;
                        }
                        a:hover {
                            color: red;
                        }
                    </style>
                </head>
                <body>
                    <h1>Files in Directory</h1>
                    <ul>
            `;

            files.forEach(file => {
                html += `<li><a href="/file/${encodeURIComponent(file)}">${file}</a></li>`;
            });

            html += `
                    </ul>
                </body>
                </html>
            `;

            res.writeHead(200, { "Content-Type": "text/html" });
            res.end(html);
        });
    }

    // Show File Content
    else if (url.startsWith("/file/")) {
        const fileName = decodeURIComponent(url.replace("/file/", ""));
        const filePath = path.join(DIRECTORY, fileName);

        fs.readFile(filePath, "utf8", (err, data) => {
            if (err) {
                res.writeHead(404, { "Content-Type": "text/plain" });
                return res.end("File not found");
            }

            res.writeHead(200, { "Content-Type": "text/html" });
            res.end(`
                <html>
                <head>
                    <title>${fileName}</title>
                    <style>
                        body {
                            font-family: Arial;
                            padding: 20px;
                            background: #f4f4f4;
                        }
                        pre {
                            background: white;
                            padding: 15px;
                            border: 1px solid #ccc;
                            white-space: pre-wrap;
                        }
                        a {
                            text-decoration: none;
                            color: blue;
                        }
                    </style>
                </head>
                <body>
                    <h2>${fileName}</h2>
                    <pre>${data}</pre>
                    <br>
                    <a href="/">Back</a>
                </body>
                </html>
            `);
        });
    }

    // Invalid URL
    else {
        res.writeHead(404, { "Content-Type": "text/plain" });
        res.end("Page not found");
    }
});

server.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});