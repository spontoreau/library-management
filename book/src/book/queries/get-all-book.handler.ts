import { IQueryHandler, QueryHandler } from "@nestjs/cqrs";
import { GetAllBookQuery } from "./get-all-book.query";
import { BookProjection } from "./book.readmodel";
import { BookFinder } from "../finders/book.finder";

@QueryHandler(GetAllBookQuery)
export class GetAllBookQueryHandler
  implements IQueryHandler<GetAllBookQuery, ReadonlyArray<BookProjection>> {
  constructor(private readonly bookfinder: BookFinder) {}

  async execute(query: GetAllBookQuery): Promise<BookProjection[]> {
    return await this.bookfinder.getAll();
  }
}
