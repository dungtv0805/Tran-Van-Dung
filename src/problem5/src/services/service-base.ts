import { EntityBase } from 'src/entities/entity-base';
import Database from 'src/providers/Database';
import { Constructor } from 'src/utils';

export abstract class ServiceBase<T extends EntityBase> {
  abstract entity: Constructor<T>;
  public get dbStore() {
    return Database.db.get(this.entity);
  }

  addOne(data: T): Promise<T> {
    return this.dbStore.insertAsync(data);
  }

  findById(id: string): Promise<T> {
    return this.dbStore.findOneAsync({ id });
  }
}
