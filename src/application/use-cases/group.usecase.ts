import { BaseRepo } from '@/domain/repositories/supabase/base.repo';
import { CrudUseCase } from './crud.usecase';
import { Group } from '@/domain/entities';

export class GroupUseCase extends CrudUseCase<Group> {
  constructor(repository: BaseRepo<Group>) {
    super(repository);
  }
}