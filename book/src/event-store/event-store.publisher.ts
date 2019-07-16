import { IEventPublisher } from "@nestjs/cqrs/dist/interfaces/events/event-publisher.interface";
import { IEvent,  } from "@nestjs/cqrs";
import { EventStore } from "./event-store";
import { EventDescriptor } from "./event-descriptor";
import * as moment from "moment";
import { Injectable } from "@nestjs/common";

@Injectable()
export class EventStorePublisher implements IEventPublisher {
  constructor(
    private readonly eventStore: EventStore
  ) { }

  async publish<T extends IEvent>(event: T) {
    if(!this.containsAggregateIdProp(event)) {
      throw new Error("AggegateId is required!");
    }
    else if (!this.containsEventTypeProp(event)) {
      throw new Error("Event type is required");
    } else {
      const { aggregateId, eventType, ...payload } = event;
      const created = moment().toDate();

      const eventDescriptor: EventDescriptor = {
        aggregateId,
        eventType,
        payload,
        created
      }
      await this.eventStore.create(eventDescriptor);
    }
  }

  private containsAggregateIdProp(value: any): value is { aggregateId } {
    return !!value.aggregateId;
  }

  private containsEventTypeProp(value: any): value is { eventType } {
    return !!value.eventType;
  }
}