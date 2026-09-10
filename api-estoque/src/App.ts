import express from "express";
import { Server } from "http";
import { Pool } from "pg";
import database from "./config/database";
import router from "./routes/Routes";
import logger from "./config/logger";

export class SetupApplication {
  private server?: Server;
  private pool?: Pool;

  constructor(
    private port = 3000,
    public app = express(),
  ) {}

  public init(): void {
    this.setupExpress();
    this.setupRoutes();
  }

  private setupRoutes(): void {
    this.app.use(router);
  }

  private setupExpress(): void {
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
  }

  private async setupDatabase(): Promise<void> {
    try {
      this.pool = database;
      await this.pool.connect();
      logger.info("Database connected successfully");
    } catch (error) {
      logger.error("Database connection failed:", error);
      process.exit(1);
    }
  }

  public async start(): Promise<void> {
    await this.setupDatabase();
    this.server = this.app.listen(this.port, () => {
      logger.info(
        `Server running on port ${this.port}, http://localhost:${this.port}`,
      );
    });
  }
}
