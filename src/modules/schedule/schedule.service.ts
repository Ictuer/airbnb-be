// import { Injectable, NotFoundException } from '@nestjs/common';
// import { Cron, CronExpression } from '@nestjs/schedule';
// import { TypeQuestion, User } from '@prisma/client';
// import { PrismaService } from 'src/shared/prisma/prisma.service';
// import { TelegramService } from '../bot/telegram/telegram.service';
// import { QuestionsService } from '../questions/questions.service';
// import { EnvService } from 'src/shared/env/env.service';
// import { TypeQuestionEnum } from './dto/change-type-question.dto';

// @Injectable()
// export class ScheduleService {
//   constructor(
//     private readonly prisma: PrismaService,
//     private readonly telegramService: TelegramService,
//     private readonly questionsService: QuestionsService,
//     private readonly envService: EnvService,
//   ) {}

//   @Cron(CronExpression.EVERY_MINUTE)
//   async handleCron() {
//     const now = new Date();
//     const hour = now.getHours();
//     const minute = now.getMinutes();
//     if (hour < 0) return;
//     const totalMinutes = (hour - 6) * 60 + minute;

//     const users: any = await this.prisma.$queryRaw`
//       SELECT * FROM users 
//       WHERE "telegramId" IS NOT NULL 
//         AND CAST(${totalMinutes} AS int) % "intervalSendMessage" = 0
//     `;

//     for (const user of users) {
//       if (user.telegramId) {
//         const knowledgeId = user.scheduleKnowledgesId;
//         const typeQuestion = user.scheduleTypeQuestion;
//         try {
//           const question = await this.questionsService.createQuestion(
//             knowledgeId,
//             user.id,
//             typeQuestion,
//           );
//           this.telegramService.sendMessage(
//             user.telegramId,
//             `<b>Câu hỏi:</b> ${question.content}\n` +
//               `<code>${question.id}</code>`,
//           );
//         } catch (error) {
//           console.log("error schedule service")
//           if (error?.response?.message === 'There is already an unanswered question for this knowledge and type')
//             this.telegramService.sendMessage(
//               user.telegramId,
//               'Bạn có câu hỏi chưa trả lời, vui lòng trả lời câu hỏi trước khi nhận câu hỏi mới',
//             );
//           else
//             this.telegramService.sendMessage(
//               user.telegramId,
//               'Có lỗi xảy ra, tạm thời không thể gửi câu hỏi',
//             );
//         }
//       }
//     }
//   }

//   async changeInterval(interval: number, userId: string) {
//     await this.prisma.user.update({
//       where: {
//         id: userId,
//       },
//       data: {
//         intervalSendMessage: interval,
//       },
//     });
//   }

//   async scheduleKnowledgeId(knowledgeId: string, userId: string) {
//     const knowledge = await this.prisma.knowledge.findUnique({
//       where: {
//         topic: {
//           class: {
//             userId: userId,
//           },
//         },
//         id: knowledgeId,
//       },
//     });

//     if (!knowledge) throw new NotFoundException('Knowledge not found');

//     await this.prisma.user.update({
//       where: {
//         id: userId,
//       },
//       data: {
//         scheduleKnowledgesId: knowledgeId,
//       },
//     });
//   }

//   async scheduleTypeQuestion(typeQuestion: TypeQuestionEnum, userId: string) {
//     await this.prisma.user.update({
//       where: {
//         id: userId,
//       },
//       data: {
//         scheduleTypeQuestion: typeQuestion,
//       },
//     });
//   }
// }
