import { Controller, Get } from "@nestjs/common";
import { CommandBus, QueryBus } from "@nestjs/cqrs";
import { GetAllBookQuery } from "./queries/getAllBookQuery";
import { BookModel } from "./models/bookModel";

@Controller("book")
export class BookController {
  constructor(
    private readonly queryBus: QueryBus,
  ) {}

  @Get()
  async getAll(): Promise<BookModel> {
    return this.queryBus.execute(new GetAllBookQuery());
  }
}
