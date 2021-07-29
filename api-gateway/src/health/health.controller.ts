import { Controller, Get } from "@nestjs/common";
import { RmqOptions, Transport } from "@nestjs/microservices";
import {
  HealthCheck,
  HealthCheckService,
  MicroserviceHealthIndicator,
} from "@nestjs/terminus";
import { Public } from "src/common/decorators/public.decorator";

@Controller("health")
export class HealthController {
  constructor(
    private health: HealthCheckService,
    private microservice: MicroserviceHealthIndicator
  ) {}

  @Public()
  @Get()
  @HealthCheck()
  check() {
    return this.health.check([
      async () =>
        this.microservice.pingCheck<RmqOptions>("amqp", {
          transport: Transport.RMQ,
          timeout: 10000,
          options: {
            urls: [process.env.MQ_URL],
          },
        }),
    ]);
  }
}
