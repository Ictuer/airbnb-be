// import { Controller, Get, Query, UseGuards } from '@nestjs/common';
// import { ApiBearerAuth } from '@nestjs/swagger';
// import { ClerkAuthGuard } from 'src/common/guards/clerk-auth.guard';
// import { DashboardService } from './dashboard.service';
// import { CurrentUser } from 'src/common/decorators/current-user.decorator';
// import { User } from '@prisma/client';


// @ApiBearerAuth()
// @UseGuards(ClerkAuthGuard)
// @Controller('dashboard')
// export class DashboardController {

//   constructor(private readonly dashboardService: DashboardService) {}

//   @Get('statistics')
//   async getStatistics(@CurrentUser() user: User) {
//     return this.dashboardService.getStatistics(user);
//   }

//   @Get('calendar')
//   async getCalendar(@CurrentUser() user: User, @Query('year') year: number) {
//     return this.dashboardService.getCalendar(user, year);
//   }
// }
