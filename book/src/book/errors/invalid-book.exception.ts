import { DomainException } from "./domain.exception";

export class InvalidBookException extends DomainException {
  constructor() {
    super("Invalid book data!");
  }
}