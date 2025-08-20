import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ThrottlerModule } from '@nestjs/throttler';
import { ConfigModule } from '@nestjs/config';
import { TopicsModule } from './modules/topics/topics.module';
// import { KnowledgesModule } from './modules/knowledges/knowledges.module';
// import { GeminiModule } from './modules/gemini/gemini.module';
import { PrismaModule } from './shared/prisma/prisma.module';
import { EnvModule } from './shared/env/env.module';
// import { QuestionsModule } from './modules/questions/questions.module';
import { ClerkModule } from './modules/clerk/clerk.module';
import { ClerkClientProvider } from './modules/clerk/clerk.provider';
import { APP_GUARD } from '@nestjs/core';
import { ClerkAuthGuard } from './common/guards/clerk-auth.guard';
import { UsersModule } from './modules/users/users.module';
import { AuthModule } from './modules/auth/auth.module';
// import { TelegramModule } from './modules/bot/telegram/telegram.module';
// import { DashboardModule } from './modules/dashboard/dashboard.module';
// import { ScheduleModule } from '@nestjs/schedule';
// import { ScheduleModule as ScheduleModule2 } from './modules/schedule/schedule.module';

@Module({
  imports: [
    EnvModule,
    ThrottlerModule.forRoot([
      {
        name: 'short',
        ttl: 1000,
        limit: 5,
      },
      {
        name: 'medium',
        ttl: 3000,
        limit: 10,
      },
    ]),
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    // ScheduleModule.forRoot(),
    PrismaModule,
    TopicsModule,
    // KnowledgesModule,
    // GeminiModule,
    // QuestionsModule,
    ClerkModule,
    UsersModule,
    AuthModule,
    // TelegramModule,
    // DashboardModule,
    // ScheduleModule2,
    // ScheduleModule,
  ],
  controllers: [AppController],
  providers: [AppService, ClerkClientProvider, {
    provide: APP_GUARD,
    useClass: ClerkAuthGuard,
  }
],
})
export class AppModule {}
