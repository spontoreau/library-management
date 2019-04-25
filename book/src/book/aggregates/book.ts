import { AggregateRoot, IEvent } from "@nestjs/cqrs";
import { BookCreatedEvent } from "../events/bookCreatedEvent";

export class Book extends AggregateRoot {
  state: {
    title: string;
    author: string;
  };

  constructor(readonly aggreateId: string) {
    super();
  }

  create(title: string, author: string) {
    this.apply(new BookCreatedEvent(this.aggreateId, title, author));
  }

  loadFromHistory(events: IEvent[]) {
    // TODO
  }
}
