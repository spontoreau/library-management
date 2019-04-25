import { Controller, Get } from "@nestjs/common";
import { CommandBus, QueryBus } from "@nestjs/cqrs";
import { GetAllBookQuery } from "./queries/getAllBookQuery";
import { BookProjection } from "./projections/bookProjection";

@Controller("book")
export class BookController {
  constructor(
    private readonly queryBus: QueryBus,
  ) {}

  @Get()
  async getAll(): Promise<BookProjection> {
    return this.queryBus.execute(new GetAllBookQuery());
  }
}
