import { InputType, Field } from '@nestjs/graphql';
import { IsString, IsOptional, MinLength, MaxLength } from 'class-validator';

@InputType()
export class CreateDocumentInput {
  @Field({ nullable: true, description: '所属项目 ID' })
  @IsOptional()
  @IsString()
  projectId?: string;

  @Field({ description: '文档标题' })
  @IsString()
  @MinLength(1)
  @MaxLength(500)
  title: string;

  @Field({ defaultValue: '', description: '文档内容' })
  @IsOptional()
  @IsString()
  content?: string;
}
