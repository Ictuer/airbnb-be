// import { Body, Controller, Get, Param, ParseEnumPipe, Post, UseGuards } from '@nestjs/common';
// import { QuestionsService } from './questions.service';
// import { ApiBearerAuth, ApiOperation, ApiParam, ApiTags } from '@nestjs/swagger';
// import { CurrentUser } from 'src/common/decorators/current-user.decorator';
// import { Question, TypeQuestion, User } from '@prisma/client';
// import { AnswerQuestionDto } from './dto/answer-question.dto';
// import { ClerkAuthGuard } from 'src/common/guards/clerk-auth.guard';

// @UseGuards(ClerkAuthGuard)
// @ApiBearerAuth()
// @Controller('questions')
// export class QuestionsController {

//   constructor(private readonly questionsService: QuestionsService) { }

//   @ApiOperation({ summary: 'Generate a question based on knowledge and type' })
//   @ApiParam({ name: 'id', description: 'ID of the knowledge', example: '3f92a5df-09d9-4ae1-ab99-421c7da12ac9' })
//   @ApiParam({ name: 'typeQuestion', description: 'theory || practice', example: 'theory' })
//   @Post('knowledge/:id/generate/:typeQuestion')
//   async generateQuestion(
//     @Param('id') knowledgeId: string,
//     @Param('typeQuestion', new ParseEnumPipe(TypeQuestion)) typeQuestion: TypeQuestion,
//     @CurrentUser() user: User
//   ): Promise<any> {
//     return this.questionsService.createQuestion(knowledgeId, user.id, typeQuestion);
//   }


//   @ApiOperation({ summary: 'Answer a question' })
//   @Post('answer/:id')
//   async answerQuestion(
//     @Param('id') questionId: string,
//     @Body() body: AnswerQuestionDto,
//     @CurrentUser() user: User
//   ): Promise<any> {
//     return this.questionsService.answerQuestion(questionId, body, user);
//   }


//   @ApiOperation({ summary: 'Get latest unanswered question by knowledge and type' })
//   @ApiParam({ name: 'knowledgeId', description: 'ID of the knowledge', example: '3f92a5df-09d9-4ae1-ab99-421c7da12ac9' })
//   @ApiParam({ name: 'typeQuestion', description: 'theory || practice', example: 'theory' })
//   @Get('knowledge/:knowledgeId/latest-unanswered/:typeQuestion')
//   async getLatestUnansweredQuestion(
//     @Param('knowledgeId') knowledgeId: string,
//     @Param('typeQuestion', new ParseEnumPipe(TypeQuestion)) typeQuestion: TypeQuestion,
//     @CurrentUser() user: User
//   ): Promise<any> {
//     return this.questionsService.getLatestUnansweredQuestionByKnowledge(
//       knowledgeId,
//       typeQuestion,
//       user.id,
//     );
//   }


// }
