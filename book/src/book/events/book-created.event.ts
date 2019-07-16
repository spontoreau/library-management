import { IEvent } from "@nestjs/cqrs";
import { Event } from "../../event-store/event.decorator";

@Event()
export class BookCreatedEvent implements IEvent {
  constructor(
    public readonly aggregateId: string,
    public readonly title: string,
    public readonly author: string,
  ) { }
}