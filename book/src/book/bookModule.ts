import { Module } from "@nestjs/common";
import { CqrsModule } from "@nestjs/cqrs";
import { BookController } from "./bookController";
import { BookFinder } from "./finders/bookFinder";
import { GetAllBookQueryHandler } from "./queries/getAllBookQueryHandler";
import { BookRepository } from "./repositories/bookRepository";
import { EventRepository } from "./repositories/eventRepository";
import { CreateBookCommandHandler } from "./commands/createBookCommandHandler";
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
