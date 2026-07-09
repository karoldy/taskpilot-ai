import { InputType, Field } from '@nestjs/graphql';
import { IsString, MinLength } from 'class-validator';

@InputType()
export class CreateCommentInput {
  @Field({ description: '所属任务 ID' })
  @IsString()
  taskId: string;

  @Field({ description: '评论内容' })
  @IsString()
  @MinLength(1)
  content: string;
}
