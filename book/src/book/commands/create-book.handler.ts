import { CommandHandler, ICommandHandler, EventPublisher } from "@nestjs/cqrs";
import { CreateBookCommand } from "./create-book.command";
import { InvalidBookException } from "../exceptions/InvalidBookException";
import { BookAggregate } from "../aggregates/book.aggregate";
import { BookRepository } from "../repositories/book.repository";
import { BookExistsException } from "../exceptions/BookExistsException";

@CommandHandler(CreateBookCommand)
export class CreateBookCommandHandler implements ICommandHandler<CreateBookCommand> {

  constructor(
    private readonly repository: BookRepository,
    private readonly publisher: EventPublisher
  ) { }

  async execute(command: CreateBookCommand): Promise<void> {
    //Data validation    
    if(!command.author || !command.code || !command.title) {
      throw new InvalidBookException()
    }
    
    const book = await this.repository.get(command.code);

    if(book) {
      throw new BookExistsException();
    } else {
      const newBook = this.publisher.mergeObjectContext(
        new BookAggregate(command.code)
      );
      newBook.create(command.title, command.author);
      newBook.commit();
    }

    await Promise.resolve();
  }
}

