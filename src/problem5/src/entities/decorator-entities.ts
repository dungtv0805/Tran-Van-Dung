import DataStore from '@seald-io/nedb';
import Database from 'src/providers/Database';
import Locals from 'src/providers/Locals';

export function Entity(config: { dbName: string }) {
  return function <T extends { new (...args: any[]): any }>(constructor: T) {
    Database.db.set(
      constructor,
      new DataStore({
        filename: `${Locals.config().localDbPath}/${config.dbName}`,
      })
    );
    return constructor;
  };
}
