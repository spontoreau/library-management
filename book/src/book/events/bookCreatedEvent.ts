import { IEvent } from "@nestjs/cqrs";

export class BookCreatedEvent implements IEvent {
  static readonly eventName = "BookCreated";
  constructor(
    public readonly code: string,
    public readonly title: string,
    public readonly author: string,
  ) { }
}