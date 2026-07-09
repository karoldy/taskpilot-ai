import { InputType, Field } from '@nestjs/graphql';
import { IsString, IsOptional, MaxLength, IsEnum, IsBoolean } from 'class-validator';
import { UserRole } from '../models/user.model';

@InputType()
export class UpdateUserInput {
  @Field({ nullable: true, description: '用户显示名称，最长 100 字符' })
  @IsOptional()
  @IsString()
  @MaxLength(100)
  displayName?: string;

  @Field({ nullable: true, description: '中文姓名' })
  @IsOptional()
  @IsString()
  nameZh?: string;

  @Field({ nullable: true, description: '英文姓名' })
  @IsOptional()
  @IsString()
  nameEn?: string;

  @Field({ nullable: true, description: '所属部门 ID' })
  @IsOptional()
  @IsString()
  departmentId?: string;

  @Field({ nullable: true, description: '所属职位 ID' })
  @IsOptional()
  @IsString()
  positionId?: string;

  @Field(() => UserRole, { nullable: true, description: '用户角色：super_admin / admin / member' })
  @IsOptional()
  @IsEnum(UserRole)
  role?: UserRole;

  @Field({ nullable: true, description: '启用/停用状态，true 为启用，false 为停用（软删除）' })
  @IsOptional()
  @IsBoolean()
  status?: boolean;
}
