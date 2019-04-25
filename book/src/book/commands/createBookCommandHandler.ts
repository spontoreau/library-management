import { CommandHandler, ICommandHandler, EventPublisher } from "@nestjs/cqrs";
import { CreateBook } from "./createBook";
import { InvalidBookException } from "../exceptions/InvalidBookException";
import { Book } from "../aggregates/book";
import { BookRepository } from "../repositories/bookRepository";
import { BookExistsException } from "../exceptions/BookExistsException";

@CommandHandler(CreateBook)
export class CreateBookCommandHandler implements ICommandHandler<CreateBook> {

  constructor(
    private readonly repository: BookRepository,
    private readonly publisher: EventPublisher
  ) { }

  async execute(command: CreateBook): Promise<void> {
    //Data validation    
    if(!command.author || !command.code || !command.title) {
      throw new InvalidBookException()
    }

    //Code must be unique
    const book = this.publisher.mergeObjectContext(
      await this.repository.get(command.code)
    )

    if(book) {
      throw new BookExistsException();
    } else {
      const newBook = new Book(command.code);
      newBook.create(command.title, command.author);
      newBook.commit();
    }

    await Promise.resolve();
  }
}

