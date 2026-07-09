import { ObjectType, Field, ID } from '@nestjs/graphql';
import { Float } from '@nestjs/graphql';

@ObjectType()
export class AiUsageRecord {
  @Field(() => ID, { description: '记录唯一标识' })
  id: string;

  @Field({ description: '用户 ID' })
  userId: string;

  @Field({ nullable: true, description: '所属项目 ID' })
  projectId?: string;

  @Field({ nullable: true, description: '所属任务 ID' })
  taskId?: string;

  @Field({ description: 'AI 提供商，如 openai、anthropic' })
  provider: string;

  @Field({ description: '模型名称，如 gpt-4、claude-3' })
  modelName: string;

  @Field({ description: '请求类型：chat / completion / embedding' })
  requestType: string;

  @Field({ description: '输入 token 数' })
  promptTokens: number;

  @Field({ description: '输出 token 数' })
  completionTokens: number;

  @Field(() => Float, { description: '预估费用（美元）' })
  estimatedCost: number;

  @Field({ nullable: true, description: '请求耗时（毫秒）' })
  requestDurationMs?: number;

  @Field({ description: '创建时间' })
  createdAt: Date;
}
