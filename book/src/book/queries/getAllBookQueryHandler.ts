import { IQueryHandler, QueryHandler } from "@nestjs/cqrs";
import { GetAllBookQuery } from "./getAllBookQuery";
import { BookModel } from "../models/bookModel";
import { BookFinder } from "../finders/bookFinder";

@QueryHandler(GetAllBookQuery)
export class GetAllBookQueryHandler
  implements IQueryHandler<GetAllBookQuery, ReadonlyArray<BookModel>> {
  constructor(private readonly bookfinder: BookFinder) {}

  async execute(query: GetAllBookQuery): Promise<BookModel[]> {
    return await this.bookfinder.getAll();
  }
}
