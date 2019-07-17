import { Controller, Get, Post, Body } from "@nestjs/common";
import { CommandBus, QueryBus } from "@nestjs/cqrs";
import { GetAllBookQuery } from "./queries/get-all-book.query";
import { BookReadModel } from "./queries/book.readmodel";
import { CreateBookCommand } from "./commands/create-book.command";

@Controller("book")
export class BookController {
  constructor(
    private readonly queryBus: QueryBus,
    private readonly commandBus: CommandBus
  ) {}

  @Get()
  async getAll(): Promise<BookReadModel> {
    return this.queryBus.execute(new GetAllBookQuery());
  }

  @Post()
  async post(@Body()book: { code: string, title: string, author: string}) {
    return this.commandBus.execute(new CreateBookCommand(book.code, book.title, book.author));
  }
}
