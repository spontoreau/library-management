const Event = (
  eventType?: string
) => {
  const decorator: ClassDecorator = (target) => {
    const type = eventType || target.name.replace("Event", "");
    target.prototype.eventType = type;
    console.log(target.prototype.eventType);
  }
  return decorator
}

export { Event };