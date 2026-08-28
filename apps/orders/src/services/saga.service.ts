import { DataSource } from 'typeorm';

export class SagaService {
  constructor(private readonly dataSource: DataSource) {}

  private advance() {}
}
