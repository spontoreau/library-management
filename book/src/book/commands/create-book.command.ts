import { ICommand } from "@nestjs/cqrs";

export class CreateBookCommand implements ICommand {
  constructor(
    public readonly aggregateId: string,
    public readonly title: string,
    public readonly author: string
  ) {}

}