// import { Body, Controller, ParseIntPipe, Post, UseGuards } from '@nestjs/common';
// import { ClerkAuthGuard } from 'src/common/guards/clerk-auth.guard';
// import { ScheduleService } from './schedule.service';
// import { CurrentUser } from 'src/common/decorators/current-user.decorator';
// import { ChangeIntervalDto } from './dto/change-interval.dto';
// import { ApiBearerAuth, ApiBody, ApiOperation } from '@nestjs/swagger';
// import { ChangeKnowledgeIdDto } from './dto/change-knowledgeId.dto';
// import { ChangeTypeQuestionDto } from './dto/change-type-question.dto';

// @ApiBearerAuth()
// @Controller('schedule')
// @UseGuards(ClerkAuthGuard)
// export class ScheduleController {
//   constructor(private readonly scheduleService: ScheduleService) {}

//   @Post('change-interval')
//   @ApiOperation({ summary: 'Change interval send message' })
//   @ApiBody({ type: ChangeIntervalDto })
//   async changeInterval(
//     @Body() changeIntervalDto: ChangeIntervalDto,
//     @CurrentUser() user,
//   ) {
//     return this.scheduleService.changeInterval(changeIntervalDto.interval, user.id);
//   }

//   @Post('schedule-knowledgeId')
//   @ApiOperation({ summary: 'Schedule knowledgeId' })
//   @ApiBody({ type: ChangeKnowledgeIdDto })
//   async scheduleKnowledgeId(
//     @Body() changeKnowledgeIdDto: ChangeKnowledgeIdDto,
//     @CurrentUser() user,
//   ) {
//     return this.scheduleService.scheduleKnowledgeId(changeKnowledgeIdDto.knowledgeId, user.id);
//   }

//   @Post('schedule-type-question')
//   @ApiOperation({ summary: 'Schedule type question' })
//   @ApiBody({ type: ChangeTypeQuestionDto })
//   async scheduleTypeQuestion(
//     @Body() changeTypeQuestionDto: ChangeTypeQuestionDto,
//     @CurrentUser() user,
//   ) {
//     return this.scheduleService.scheduleTypeQuestion(changeTypeQuestionDto.typeQuestion, user.id);
//   }
// }
