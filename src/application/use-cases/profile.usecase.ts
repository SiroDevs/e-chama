import { BaseRepo } from '@/domain/repositories/supabase/base.repo';
import { CrudUseCase } from './crud.usecase';
import { Profile } from '@/domain/entities';

export class ProfileUseCase extends CrudUseCase<Profile> {
  constructor(repository: BaseRepo<Profile>) {
    super(repository);
  }
}