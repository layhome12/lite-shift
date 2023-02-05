import dotenv from "dotenv";
import fs from "fs";

class config {
  constructor() {
    dotenv.config();
  }

  public baseUrl(): string {
    let baseUrl = process.env.BASE_URL;
    let url = baseUrl?.replace("http://", "").replace("https://", "");
    return url ? url.split(":")[0] : "localhost";
  }

  public port(): string {
    let baseUrl = process.env.BASE_URL;
    let port = baseUrl?.replace("http://", "").replace("https://", "");
    return port ? port.split(":")[1] : "80";
  }

  public safeDir(path: string = ""): string {
    let dir: string = process.env.SAFE_DIR ? process.env.SAFE_DIR : "private";
    if (path != "") dir += path;
    if (process.env.NODE_ENV == "development") {
      if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
    }

    return dir;
  }

  public publicDir(path: string = ""): string {
    let dir: string = process.env.PUBLIC_DIR
      ? process.env.PUBLIC_DIR
      : "public";

    if (path != "") dir += path;
    if (process.env.NODE_ENV == "development") {
      if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
    }

    return dir;
  }
}

export default new config();
