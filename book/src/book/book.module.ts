import { Module, OnModuleInit } from "@nestjs/common";
import { EventBus, CqrsModule } from "@nestjs/cqrs";
import { BookController } from "./book.controller";
import { BookFinder } from "./queries/book.finder";
import { GetAllBookQueryHandler } from "./queries/get-all-book.handler";
import { CreateBookCommandHandler } from "./commands/create-book.handler";
import { EventStorePublisher } from "src/event-store/event-store.publisher";
import { EventStoreModule } from "src/event-store/event-store.module";

@Module({
  imports: [CqrsModule, EventStoreModule],
  controllers: [BookController],
  providers: [
    BookFinder,
    GetAllBookQueryHandler,
    CreateBookCommandHandler,
  ]
})
export class BookModule implements OnModuleInit {
  constructor(
    private readonly eventBus: EventBus,
    private readonly eventStore: EventStorePublisher,
  ) {}
  onModuleInit() {
    this.eventBus.publisher = this.eventStore;
  }

}
