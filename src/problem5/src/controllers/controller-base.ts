import { Request, Response } from 'express';
import { ServiceBase } from 'src/services/service-base';

export abstract class ControllerBase {
  abstract service: ServiceBase;

  addOne(req: Request, res: Response) {
    this.service.addOne(req.body).then((data) => res.json(data));
  }

  findById(req: Request, res: Response) {
    const { _id } = req.params;
    this.service.findById(_id).then((data) => {
      res.json(data);
    });
  }

  paginate(req: Request, res: Response) {
    this.service.paginate(req.query).then((data) => {
      res.json(data);
    });
  }

  update(req: Request, res: Response) {
    const { _id } = req.params;
    this.service.update(_id, req.body).then(({ numAffected }) => {
      res.json({ status: numAffected ? 'success' : 'failed' });
    });
  }

  delete(req: Request, res: Response) {
    const { _id } = req.params;
    this.service.delete(_id).then((data) => {
      res.json({
        status: data ? 'success' : 'failed',
      });
    });
  }
}
