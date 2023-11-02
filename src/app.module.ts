import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { config } from './config';
import { PlaywrightModule } from './playwright/playwright.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [config],
    }),
    PlaywrightModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
