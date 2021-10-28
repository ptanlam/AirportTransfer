import { NestFactory, Reflector } from "@nestjs/core";
import { config } from "aws-sdk";
import * as cookieParser from "cookie-parser";
import { AppModule } from "./app.module";
import { JwtAuthGuard } from "./auth/guards/jwt-auth.guard";
import { RolesGuard } from "./auth/guards/role.guard";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(cookieParser());
  app.setGlobalPrefix("api");
  app.useGlobalGuards(new JwtAuthGuard(new Reflector()));
  app.useGlobalGuards(new RolesGuard(new Reflector()));
  config.update({
    accessKeyId: process.env.AWS_ACCESS_ID,
    secretAccessKey: process.env.AWS_SECRET_KEY,
    region: process.env.AWS_REGION,
  });
  app.enableCors({
    origin: process.env.ORIGINS.split(','),
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    allowedHeaders: "Origin, X-Requested-With, Content-Type, Accept",
    credentials: true,
  });
  await app.listen(3001);
}
bootstrap();
