export interface EventDescriptor {
  aggregateId: string;
  eventType: string;
  created: Date;
  payload: any;
}
