const http = require("http");
const fs = require("fs");
const path = require("path");

const PORT = Number(process.env.PORT || 3000);
const HOST = "0.0.0.0";
const ROOT = __dirname;

const MIME_TYPES = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "application/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".png": "image/png",
  ".svg": "image/svg+xml",
  ".webp": "image/webp",
  ".mp4": "video/mp4",
  ".mov": "video/quicktime",
  ".m4v": "video/x-m4v",
  ".ico": "image/x-icon",
};

function safePath(urlPath) {
  const decoded = decodeURIComponent(urlPath.split("?")[0]);
  const relative = decoded.replace(/^\/+/, "");
  const normalized = path.normalize(relative).replace(/^([.][.][/\\])+/, "");
  return path.join(ROOT, normalized);
}

function sendNotFound(res) {
  res.writeHead(404, { "Content-Type": "text/plain; charset=utf-8" });
  res.end("Not Found");
}

function sendFile(req, res, filePath) {
  fs.stat(filePath, (err, stats) => {
    if (err || !stats.isFile()) {
      sendNotFound(res);
      return;
    }

    const ext = path.extname(filePath).toLowerCase();
    const contentType = MIME_TYPES[ext] || "application/octet-stream";
    const rangeHeader = req.headers.range;

    if (rangeHeader) {
      const match = /^bytes=(\d*)-(\d*)$/.exec(rangeHeader);

      if (!match) {
        res.writeHead(416, { "Content-Range": `bytes */${stats.size}` });
        res.end();
        return;
      }

      const start = match[1] ? Number(match[1]) : 0;
      const end = match[2] ? Number(match[2]) : stats.size - 1;

      if (!Number.isFinite(start) || !Number.isFinite(end) || start > end || start >= stats.size) {
        res.writeHead(416, { "Content-Range": `bytes */${stats.size}` });
        res.end();
        return;
      }

      const safeEnd = Math.min(end, stats.size - 1);
      const chunkSize = safeEnd - start + 1;

      res.writeHead(206, {
        "Content-Type": contentType,
        "Accept-Ranges": "bytes",
        "Content-Range": `bytes ${start}-${safeEnd}/${stats.size}`,
        "Content-Length": chunkSize,
      });

      if (req.method === "HEAD") {
        res.end();
        return;
      }

      fs.createReadStream(filePath, { start, end: safeEnd }).pipe(res);
      return;
    }

    res.writeHead(200, {
      "Content-Type": contentType,
      "Content-Length": stats.size,
      "Accept-Ranges": "bytes",
    });

    if (req.method === "HEAD") {
      res.end();
      return;
    }

    fs.createReadStream(filePath).pipe(res);
  });
}

function requestHandler(req, res) {
  console.log(`${new Date().toISOString()} ${req.method} ${req.url}`);

  if (req.url === "/health") {
    res.writeHead(200, { "Content-Type": "text/plain; charset=utf-8" });
    res.end("ok");
    return;
  }

  const reqPath = req.url === "/" ? "index.html" : req.url;
  const filePath = safePath(reqPath);

  // Keep serving only files inside the project directory.
  if (!filePath.startsWith(ROOT)) {
    res.writeHead(403, { "Content-Type": "text/plain; charset=utf-8" });
    res.end("Forbidden");
    return;
  }

  fs.stat(filePath, (err, stats) => {
    if (!err && stats.isFile()) {
      sendFile(req, res, filePath);
      return;
    }

    if (path.extname(reqPath)) {
      sendNotFound(res);
      return;
    }

    sendFile(req, res, path.join(ROOT, "index.html"));
  });
}

const mainServer = http.createServer(requestHandler);

mainServer.listen(PORT, HOST, () => {
  console.log(`Server running on http://${HOST}:${PORT}`);

  if (PORT !== 3000) {
    const fallbackServer = http.createServer(requestHandler);
    fallbackServer.listen(3000, HOST, () => {
      console.log(`Server running on http://${HOST}:3000`);
    });
  }
});
