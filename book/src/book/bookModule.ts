import { Module } from "@nestjs/common";
import { CqrsModule } from "@nestjs/cqrs";
import { BookController } from "./bookController";
import { BookFinder } from "./finders/bookFinder";
import { GetAllBookQueryHandler } from "./queries/getAllBookQueryHandler";

@Module({
  imports: [CqrsModule],
  controllers: [BookController],
  providers: [
    BookFinder,
    GetAllBookQueryHandler
  ]
})
export class BookModule {}
