import { Module, DynamicModule } from "@nestjs/common";
import { EventStore } from "./event-store";
import { EventStorePublisher } from "./event-store.publisher";

@Module({
  imports: [],
  providers: [EventStore, EventStorePublisher],
  exports: [EventStore, EventStorePublisher]
})
export class EventStoreModule {

}