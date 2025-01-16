import { Entity } from './decorator-entities';
import { EntityBase } from './entity-base';

@Entity({ dbName: 'resources' })
export class ResourceEntity extends EntityBase {
  name: string;
  description: string;
  status: string;
}
