import { AggregateRoot } from "@nestjs/cqrs";

export class Book extends AggregateRoot {
  constructor(private readonly id: string) {
    super();
  }
}
