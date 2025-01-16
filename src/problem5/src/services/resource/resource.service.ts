import { ResourceEntity } from 'src/entities';
import { Constructor } from 'src/utils';
import { ServiceBase } from '../service-base';

export class ResourceSerivce extends ServiceBase<ResourceEntity> {
  constructor(public entity: Constructor<ResourceEntity>) {
    super();
  }
}
