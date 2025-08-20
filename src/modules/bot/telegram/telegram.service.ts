// import { Injectable } from '@nestjs/common';
// import { User } from '@prisma/client';
// import { QuestionsService } from 'src/modules/questions/questions.service';
// import { UsersService } from 'src/modules/users/users.service';
// import { EnvService } from 'src/shared/env/env.service';
// import { PrismaService } from 'src/shared/prisma/prisma.service';
// const TelegramBot = require('node-telegram-bot-api');

// @Injectable()
// export class TelegramService {
//   private bot: typeof TelegramBot;

//   constructor(
//     private readonly envService: EnvService,
//     private readonly usersService: UsersService,
//     private readonly questionsService: QuestionsService,
//     private readonly prisma: PrismaService,
//   ) {
//     this.bot = new TelegramBot(envService.get('TELE_BOT_TOKEN'), {
//       webhook: true
//     });
//     let url = envService.get('DEPLOY_URL');
//     this.bot.setWebHook(`${envService.get('DEPLOY_URL')}/telegram/webhook`);
//     // this.bot.on('message', (msg) => {
//     //   console.log('Received message:', msg);
//     //   this.handleUpdate(msg);
//     // });
//   }

//   async handleUpdate(message: any) {
//     if (message && message.text) {
//       const chatId = message.chat.id;
//       const text = message.text;
//       try {
//         if (text.startsWith('/start')) {
//           const userId = text.split(' ')[1];
//           const checkUser = await this.usersService.checkUserById(userId);
//           if (checkUser) {
//             await this.usersService.setTelegramId(checkUser.id, chatId + '');
//             this.bot.sendMessage(
//               chatId,
//               `<b>Kết nối thành công!</b>\n\n` +
//                 `<b>ID:</b> <code>${checkUser.id}</code>\n`,
//               { parse_mode: 'HTML' },
//             );
//           } else {
//             this.bot.sendMessage(chatId, `Không tìm thấy tài khoản`);
//           }
//         } else {
//           const reply = message.reply_to_message;
//           if (!reply) {
//             this.bot.sendMessage(
//               chatId,
//               'Vui lòng trả lời một câu hỏi, không nhắn tin tự do',
//             );
//           } else {
//             const questionId = reply.text.split('\n').pop(); // dòng cuối cùng là id
//             const user: any = await this.prisma.user.findUnique({
//               where: {
//                 telegramId: chatId + '',
//               },
//             });
//             if (!user)
//               this.bot.sendMessage(
//                 chatId,
//                 'Vui lòng nhập /start để kết nối tài khoản',
//               );
//             const question = await this.questionsService.getQuestion(
//               questionId,
//               user.id,
//             );
//             if (!question)
//               this.bot.sendMessage(chatId, 'Câu hỏi không tồn tại');
//             const questionAnswered = await this.questionsService.answerQuestion(
//               questionId,
//               { answer: text },
//               user,
//             );
//              this.bot.sendMessage(
//               chatId,
//               `<b>Điểm:</b> ${questionAnswered.score}\n <b>Giải thích:</b> ${questionAnswered.explain}\n` +
//                 `<b>AI Feedback:</b> ${questionAnswered.aiFeedback}`,
//               { parse_mode: 'HTML' },
//             );
//           }
//         }
//       } catch (error) {
//         console.log(error);
//         this.bot.sendMessage(chatId, `Lỗi: ${error.message}`);
//       }
//     }
//   }

//   async sendMessage(chatId: string, message: string) {
//     try {
//       console.log(chatId, message);
//       await this.bot.sendMessage(chatId, message, { parse_mode: 'HTML' });
//     } catch (error) {
//       console.log(error);
//     }
//   }
// }
