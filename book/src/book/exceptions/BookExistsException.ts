import { BadRequestException } from "@nestjs/common";

export class BookExistsException extends BadRequestException {
  constructor() {
    super("Book already exists!");
  }
}