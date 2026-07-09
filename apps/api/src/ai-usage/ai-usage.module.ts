import { Module } from '@nestjs/common';
import { AiUsageService } from './ai-usage.service';
import { AiUsageResolver } from './ai-usage.resolver';

@Module({
  providers: [AiUsageService, AiUsageResolver],
  exports: [AiUsageService],
})
export class AiUsageModule {}
