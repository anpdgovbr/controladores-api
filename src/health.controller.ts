// src/health.controller.ts
import { Controller, Get } from "@nestjs/common"

@Controller("health")
export class HealthController {
  @Get()
  get() {
    return {
      status: "ok",
      uptime: process.uptime(),
      timestamp: new Date().toISOString(),
    }
  }
}
