import { InputType, Field } from '@nestjs/graphql';
import { IsString, IsEnum } from 'class-validator';
import { ProjectMemberRole } from '../models/project.model';

@InputType()
export class AddProjectMemberInput {
  @Field({ description: '要添加的用户 ID' })
  @IsString()
  userId: string;

  @Field(() => ProjectMemberRole, {
    defaultValue: ProjectMemberRole.MEMBER,
    description: '成员角色：owner / admin / member / viewer',
  })
  @IsEnum(ProjectMemberRole)
  role: ProjectMemberRole;
}
