import { ApiExtraModels, ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsOptional, IsString } from "class-validator";


export class CreateTopicDto {
  @IsNotEmpty({ message: "Name is required" })
  @IsString({ message: "Name must be a string" })
  @ApiProperty({
    description: "Name of the topic",
    example: "Tiếng anh",
  })
  name: string;

  @IsString()
  @IsOptional()
  @ApiProperty({
    description: "Prompt for the topic",
    example: "prompt...",
  })
  prompt: string;
}