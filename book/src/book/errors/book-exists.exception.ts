import { DomainException } from "./domain.exception";

export class BookExistsException extends DomainException {
  constructor() {
    super("Book already exists!");
  }
}
