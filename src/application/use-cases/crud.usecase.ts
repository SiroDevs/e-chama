import { BaseRepo, PaginatedResult, PaginationOptions } from "@/domain/repos/base.repo";

export abstract class CrudUseCase<T> {
  constructor(protected repository: BaseRepo<T>) { }

  async getAll(): Promise<T[]> {
    return this.repository.getAll();
  }

  async getAllPaginated(options: PaginationOptions): Promise<PaginatedResult<T>> {
    if (typeof this.repository.getAllPaginated === 'function') {
      return this.repository.getAllPaginated(options);
    }

    const allData = await this.repository.getAll();
    const startIndex = (options.page - 1) * options.pageSize;
    const endIndex = startIndex + options.pageSize;
    const paginatedData = allData.slice(startIndex, endIndex);

    return {
      data: paginatedData,
      total: allData.length,
      page: options.page,
      pageSize: options.pageSize,
      totalPages: Math.ceil(allData.length / options.pageSize),
    };
  }

  async getById(id: number): Promise<T | null> {
    return this.repository.getById(id);
  }

  async create(data: Omit<T, 'rid' | 'createdAt' | 'updatedAt'>): Promise<T> {
    return this.repository.create(data);
  }

  async update(id: number, data: Partial<T>): Promise<T> {
    return this.repository.update(id, data);
  }

  async delete(id: number): Promise<void> {
    return this.repository.delete(id);
  }
}