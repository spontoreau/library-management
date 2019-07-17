import { IQueryHandler, QueryHandler } from "@nestjs/cqrs";
import { GetAllBookQuery } from "./get-all-book.query";
import { BookReadModel } from "./book.readmodel";
import { BookFinder } from "./book.finder";

@QueryHandler(GetAllBookQuery)
export class GetAllBookQueryHandler
  implements IQueryHandler<GetAllBookQuery, ReadonlyArray<BookReadModel>> {
  constructor(private readonly bookfinder: BookFinder) {}

  async execute(query: GetAllBookQuery): Promise<BookReadModel[]> {
    return await this.bookfinder.getAll();
  }
}
