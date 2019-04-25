import { ICommand } from "@nestjs/cqrs";

export class CreateBookCommand implements ICommand {
  code: string;
  title: string;
  author: string;
}