import http from "http";
import cluster, { Worker } from "cluster";
import { join, dirname } from "node:path";
import { fileURLToPath } from "url";
import { cpus } from "os";
import { spawn } from "child_process";
import "dotenv/config";

import Application from "./server/Application.js";
import middlewareJsonParser from "./server/middlewares/parseJson.js";
import middlewareBodyParser from "./server/middlewares/bodyParser.js";
import userRouter from "./users/userRouter.js";

const PORT = process.env.PORT ? +process.env.PORT : 4000;

if (cluster.isPrimary) {
  const cpuCount = cpus().length;
  const workers: Worker[] = [];
  let workerIndex = 0;

  for (let i = 0; i < cpuCount; i++) {
    const worker = cluster.fork({ PORT_WORKER: PORT + i + 1 });
    workers.push(worker);
  }

  const server = http.createServer((req, res) => {
    if (workerIndex === cpuCount) workerIndex = 0;
    let dataIncoming = "";
    req.on("data", (chunk) => {
      dataIncoming += chunk;
    });
    req.on("end", () => {
      const options = {
        host: "localhost",
        port: PORT + workerIndex + 1,
        path: req.url,
        method: req.method,
        headers: req.headers,
      };
      const requestToWorker = http.request(options, (response) => {
        let data = "";
        response.on("data", (chunk) => {
          data += chunk;
        });
        response.on("end", () => {
          if (response.statusCode) {
            res.writeHead(response.statusCode, response.headers);
            res.end(data);
          }
        });
      });
      requestToWorker.write(dataIncoming);
      requestToWorker.end();
      workerIndex++;
    });
  });

  server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT} on worker ${process.pid}`);
  });

  const __filename = fileURLToPath(import.meta.url);
  const __dirname = dirname(__filename);

  const childProcessDB = spawn(
    "node",
    [join(__dirname, "data", "dbInMemory.js")],
    { cwd: __dirname, stdio: [null, null, null, "ipc"] }
  );

  childProcessDB.on("message", (data) => {
    workers.forEach((worker) => {
      worker.send(data);
    });
  });

  workers.forEach((worker) => {
    worker.on("message", (data) => {
      childProcessDB.send(data);
    });
  });
} else {
  const PORT = process.env.PORT_WORKER;
  if (!PORT) throw new Error("PORT_WORKER is not defined");

  const app = new Application();

  app.use(middlewareBodyParser);
  app.use(middlewareJsonParser);

  app.addRouter(userRouter);

  app.listen(+PORT, () => {
    console.log(`Server is running on port ${PORT} on worker ${process.pid}`);
  });
}
