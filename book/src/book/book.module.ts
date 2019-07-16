import { Module } from "@nestjs/common";
import { CqrsModule } from "@nestjs/cqrs";
import { BookController } from "./book.controller";
import { BookFinder } from "./finders/book.finder";
import { GetAllBookQueryHandler } from "./queries/get-all-book.handler";
import { BookRepository } from "./repositories/book.repository";
import { EventRepository } from "./repositories/event.repository";
import { CreateBookCommandHandler } from "./commands/create-book.handler";
import { BookCreatedEventHandler } from "./events/bookCreatedEventHandler";

@Module({
  imports: [CqrsModule],
  controllers: [BookController],
  providers: [
    BookFinder,
    BookRepository,
    EventRepository,
    GetAllBookQueryHandler,
    CreateBookCommandHandler,
    BookCreatedEventHandler
  ]
})
export class BookModule {}
