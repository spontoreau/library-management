import { CommandHandler, ICommandHandler, EventPublisher } from "@nestjs/cqrs";
import { CreateBookCommand } from "./create-book.command";
import { BookAggregate } from "../aggregates/book";
import { BookExistsException } from "../errors/book-exists.exception";
import { EventStore } from "src/event-store/event-store";

@CommandHandler(CreateBookCommand)
export class CreateBookCommandHandler
  implements ICommandHandler<CreateBookCommand> {
  constructor(
    private readonly eventStore: EventStore,
    private readonly publisher: EventPublisher
  ) {}

  async execute(command: CreateBookCommand): Promise<void> {
    const book = await this.eventStore.get(command.code, BookAggregate);

    if (book) {
      throw new BookExistsException();
    } else {
      const newBook = this.publisher.mergeObjectContext(
        new BookAggregate(command.code)
      );
      newBook.create(command.title, command.author);
      newBook.commit();
    }
  }
}
