import { Module } from "@nestjs/common";
import { BookModule } from "./book/bookModule";

@Module({
  imports: [BookModule]
})
export class AppModule {}
