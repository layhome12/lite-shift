import dotenv from "dotenv";

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
}

export default new config();
