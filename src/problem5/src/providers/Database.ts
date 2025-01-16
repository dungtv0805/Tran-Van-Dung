import DataStore from '@seald-io/nedb';
import { EntityBase } from 'src/entities/entity-base';
import { Constructor } from 'src/utils';

export class Database {
  static db: Map<Constructor<EntityBase>, DataStore> = new Map();
  static entities: EntityBase[] = [];
  // Initialize your database pool
  public static async init(): Promise<any> {
    for (const [entity, store] of this.db) {
      store.loadDatabaseAsync();
      this.entities.push(entity);
    }
  }
}

export default Database;
