import { BadRequestException } from "@nestjs/common";

export class InvalidBookException extends BadRequestException {
  constructor() {
    super("Invalid book data!");
  }
}