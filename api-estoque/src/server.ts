import { SetupApplication } from "./App";
import dotenv from "dotenv";

dotenv.config();

const PORT =
  Number(process.env.PORT_API_ESTOQUE_DEV) ||
  Number(process.env.PORT_API_ESTOQUE_PROD) ||
  3000;

class Server {
  static start(): void {
    const application = new SetupApplication(PORT);
    application.init();
    application.start();
  }
}

Server.start();
