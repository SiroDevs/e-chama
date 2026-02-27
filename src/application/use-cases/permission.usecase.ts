import { BaseRepo } from '@/domain/repositories/supabase/base.repo';
import { CrudUseCase } from './crud.usecase';
import { Permission } from '@/domain/entities';

export class PermissionUseCase extends CrudUseCase<Permission> {
  constructor(repository: BaseRepo<Permission>) {
    super(repository);
  }
}