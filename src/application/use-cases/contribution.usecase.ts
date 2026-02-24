import { BaseRepo } from '@/domain/repos/base.repo';
import { CrudUseCase } from './crud.usecase';
import { Contribution } from '@/domain/entities';

export class ContributionUseCase extends CrudUseCase<Contribution> {
  constructor(repository: BaseRepo<Contribution>) {
    super(repository);
  }
}