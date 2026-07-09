import { Module } from '@nestjs/common';
import { SprintsService } from './sprints.service';
import { SprintsResolver } from './sprints.resolver';

@Module({
  providers: [SprintsService, SprintsResolver],
  exports: [SprintsService],
})
export class SprintsModule {}
