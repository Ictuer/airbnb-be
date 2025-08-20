import { ApiProperty } from "@nestjs/swagger";
import { Status } from "@prisma/client";
import { IsBoolean, IsDate, IsEnum, IsNumber, IsString } from "class-validator";

export class ResponseTopicDto{
  @IsString()
  @ApiProperty({
    description: 'The id of the topic',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  id: string;

  @IsString()
  @ApiProperty({
    description: 'The name of the topic',
    example: 'Topic 1',
  })
  name: string;

  @IsString()
  @ApiProperty({
    description: 'The prompt of the topic',
    example: 'Không có mô tả',
  })
  prompt: string;

  @IsBoolean()
  @ApiProperty({
    description: 'The deleted status of the topic',
    example: false,
  })
  deleted: boolean;

  @IsDate()
  @ApiProperty({
    description: 'The created date of the topic',
    example: '2023-01-01T00:00:00.000Z',
  })
  createdAt: Date;

  @IsDate()
  @ApiProperty({
    description: 'The updated date of the topic',
    example: '2023-01-01T00:00:00.000Z',
  })
  updatedAt: Date;

  @IsEnum(Status)
  @ApiProperty({
    description: 'The status of the topic',
    example: Status.active,
  })
  status: Status;

  @IsNumber()
  @ApiProperty({
    description: 'The total knowledge of the topic',
    example: 10,
  })
  totalKnowledge: number;

  @IsNumber()
  @ApiProperty({
    description: 'The total question of the topic',
    example: 10,
  })
  totalQuestion: number;

  @IsNumber()
  @ApiProperty({
    description: 'The average score of the theory questions of the topic',
    example: 45.6,
  })
  avgScoreTheory: number;

  @IsNumber()
  @ApiProperty({
    description: 'The average score of the practice questions of the topic',
    example: 30,
  })
  avgScorePractice: number;

}