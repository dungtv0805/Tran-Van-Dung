import { ResourceEntity } from 'src/entities';
import { ResourceSerivce } from '../../services/resource/resource.service';
import { ControllerBase } from '../controller-base';

export class ResourceController extends ControllerBase {
  service = new ResourceSerivce(ResourceEntity);
}
