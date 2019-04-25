import { Controller, Get, Post, Body } from "@nestjs/common";
import { CommandBus, QueryBus } from "@nestjs/cqrs";
import { GetAllBookQuery } from "./queries/getAllBookQuery";
import { BookProjection } from "./projections/bookProjection";
import { CreateBookCommand } from "./commands/createBookCommand";

@Controller("book")
export class BookController {
  constructor(
    private readonly queryBus: QueryBus,
    private readonly commandBus: CommandBus
  ) {}

  @Get()
  async getAll(): Promise<BookProjection> {
    return this.queryBus.execute(new GetAllBookQuery());
  }

  @Post()
  async post(@Body()createBookCommand: CreateBookCommand) {
    return this.commandBus.execute(createBookCommand);
  }
}
