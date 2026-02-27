import { BaseRepo } from '@/domain/repos/base.repo';
import { CrudUseCase } from './crud.usecase';
import { Member } from '@/domain/entities';

export class MemberUseCase extends CrudUseCase<Member> {
  constructor(repository: BaseRepo<Member>) {
    super(repository);
  }
}