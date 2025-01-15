import { Application } from 'express';

class Passport {
  public mountPackage(_express: Application): Application {
    this.mountLocalStrategies();

    return _express;
  }

  public mountLocalStrategies(): void {
    //
  }

  public isAuthenticated(req, res, next): any {
    return next();
  }

  public isAuthorized(req, res, next): any {
    return next();
  }
}

export default new Passport();
