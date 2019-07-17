const Event = (eventType?: string) => {
  const decorator: ClassDecorator = target => {
    const type = eventType || target.name.replace("Event", "");
    target.prototype.eventType = type;
  };
  return decorator;
};

export { Event };
