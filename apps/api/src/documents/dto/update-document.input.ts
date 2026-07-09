import { InputType, Field } from '@nestjs/graphql';
import { IsString, IsOptional, MaxLength, IsBoolean } from 'class-validator';

@InputType()
export class UpdateDocumentInput {
  @Field({ nullable: true, description: '文档标题' })
  @IsOptional()
  @IsString()
  @MaxLength(500)
  title?: string;

  @Field({ nullable: true, description: '文档内容（保存即创建新版本）' })
  @IsOptional()
  @IsString()
  content?: string;

  @Field({ nullable: true, description: '启用/停用状态（软删除）' })
  @IsOptional()
  @IsBoolean()
  status?: boolean;
}
