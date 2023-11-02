import { Module } from '@nestjs/common';
import { PlaywrightService } from './playwright.service';
import { PlaywrightController } from './playwright.controller';

@Module({
  controllers: [PlaywrightController],
  providers: [PlaywrightService],
})
export class PlaywrightModule {}
