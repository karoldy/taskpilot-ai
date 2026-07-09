import { InputType, Field } from '@nestjs/graphql';
import { IsEmail, IsString, IsOptional, MinLength, MaxLength, IsEnum } from 'class-validator';
import { UserRole } from '../models/user.model';

@InputType()
export class CreateUserInput {
  @Field({ description: '用户邮箱' })
  @IsEmail()
  email: string;

  @Field({ description: '用户密码，最少 6 位' })
  @IsString()
  @MinLength(6)
  password: string;

  @Field({ description: '用户显示名称，1-100 字符' })
  @IsString()
  @MinLength(1)
  @MaxLength(100)
  displayName: string;

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

  @Field(() => UserRole, {
    defaultValue: UserRole.MEMBER,
    description: '用户角色：super_admin / admin / member',
  })
  @IsOptional()
  @IsEnum(UserRole)
  role?: UserRole;
}
