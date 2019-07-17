import { IsNotEmpty } from "class-validator";

export class PostBookModel { 
  @IsNotEmpty()
  code: string;
  @IsNotEmpty()
  title: string;
  @IsNotEmpty()
  author: string;
}