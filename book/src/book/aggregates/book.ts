import { AggregateRoot, IEvent } from "@nestjs/cqrs";
import { BookCreatedEvent } from "../events/book-created.event";

export class BookAggregate extends AggregateRoot {
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
    events.forEach(e =>  {
      if(this.isEventPayload(e)) {
        switch(e.eventType) {
          case "BookCreated":
            const { author, title } = e.payload;
            this.state = {
              author,
              title
            }
            
            break;
        }
      }
    })
  }

  private isEventPayload(value: any): value is { eventType: string, payload: any} {
    return value.eventType && value.payload;
  }
}
