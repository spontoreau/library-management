import { IEventHandler, EventsHandler } from "@nestjs/cqrs";
import { EventRepository } from "../repositories/eventRepository";
import { BookCreatedEvent } from "./bookCreatedEvent";

@EventsHandler(BookCreatedEvent)
export class BookCreatedEventHandler implements IEventHandler<BookCreatedEvent> {
  constructor(private readonly repository: EventRepository) {}
  async handle(event: BookCreatedEvent) {
    await this.repository.save({
      aggregateId: event.code,
      eventName: BookCreatedEvent.eventName,
      data: JSON.stringify(event)
    });
  }
}