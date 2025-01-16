import { Router } from 'express';
import { ResourceController } from 'src/controllers/resource/resource.controller';

const router = Router();

const resourceController = new ResourceController();

router.get(
  '/resource/:_id',
  resourceController.findById.bind(resourceController)
);
router.get(
  '/resource',
  resourceController.paginate.bind(resourceController)
);
router.post('/resource', resourceController.addOne.bind(resourceController));
router.patch(
  '/resource/:_id',
  resourceController.update.bind(resourceController)
);
router.delete(
  '/resource/:_id',
  resourceController.delete.bind(resourceController)
);
export default router;
