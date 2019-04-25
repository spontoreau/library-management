import { IEventHandler, EventsHandler } from "@nestjs/cqrs";
import { EventRepository } from "../repositories/eventRepository";
import { BookCreatedEvent } from "./bookCreatedEvent";

@EventsHandler(BookCreatedEventHandler)
export class BookCreatedEventHandler implements IEventHandler<BookCreatedEvent> {
  constructor(private readonly repository: EventRepository) {}
  handle(event: BookCreatedEvent) {
    this.repository.save({
      aggregateId: event.code,
      eventName: BookCreatedEvent.eventName,
      data: JSON.stringify(event)
    });
  }
}