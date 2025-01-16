import { EntityBase } from 'src/entities/entity-base';
import Database from 'src/providers/Database';
import { Constructor } from 'src/utils';

export abstract class ServiceBase<T extends EntityBase = EntityBase> {
  abstract entity: Constructor<T>;
  public get dbStore() {
    return Database.db.get(this.entity);
  }

  addOne(data: T): Promise<T> {
    return this.dbStore.insertAsync(data);
  }

  findById(_id: string): Promise<T> {
    return this.dbStore.findOneAsync({ _id });
  }

  paginate(query: Partial<T>) {
    return this.dbStore.findAsync(query);
  }

  update(_id: string, data: Partial<T>) {
    return this.dbStore.updateAsync({ _id }, data, {
      upsert: true,
      multi: false,
    });
  }

  delete(_id: string) {
    return this.dbStore.removeAsync({ _id }, { multi: false });
  }
}
