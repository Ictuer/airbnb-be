// import { Injectable} from '@nestjs/common';
// import { PrismaService } from 'src/shared/prisma/prisma.service';
// import { Statistic } from './interfaces/statistic.interface';
// import { User } from '@prisma/client';

// @Injectable()
// export class DashboardService {

//   constructor(private readonly prisma: PrismaService) {}

//   async getStatistics(user: User): Promise<Statistic> {
//     const bestDay = await this.prisma.activity.findFirst({
//       where: { userId: user.id },
//       orderBy: { count: 'desc' },
//     });

//     const activeDays = await this.prisma.activity.count({ where: { userId: user.id } });

//     const statistic: Statistic = {
//       currentStreak: user["streak"],
//       longestStreak: user["longestStreak"],
//       bestDay: bestDay?.count || 0,
//       activeDays: activeDays,
//     };

//     return statistic;
//   }

//   async getCalendar(user: User, year: number): Promise<any> {
//     const calendar = await this.prisma.activity.findMany({
//       where: { userId: user.id, date: { startsWith: year.toString() } },
//       select: {
//         date: true,
//         count: true,
//       },
//     });

//     return calendar;
//   }
// }
