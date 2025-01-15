import { Application } from 'express';
import * as path from 'path';
import * as dotenv from 'dotenv';

class Locals {
  /**
   * Makes env configs available for your app
   * throughout the app's runtime
   */
  public static config(): any {
    dotenv.config({ path: path.join(__dirname, '../../.env') });

    const url = process.env.APP_URL || `http://localhost:${process.env.PORT}`;
    const port = process.env.PORT || 4040;
    const maxUploadLimit = process.env.APP_MAX_UPLOAD_LIMIT || '50mb';
    const maxParameterLimit = process.env.APP_MAX_PARAMETER_LIMIT || '50mb';

    const name = process.env.APP_NAME || 'NodeTS Dashboard';
    const keywords = process.env.APP_KEYWORDS || 'somethings';
    const year = new Date().getFullYear();
    const copyright = `Copyright ${year} ${name} | All Rights Reserved`;
    const company = process.env.COMPANY_NAME || 'GeekyAnts';
    const description =
      process.env.APP_DESCRIPTION || 'Here goes the app description';

    const jwtExpiresIn = process.env.JWT_EXPIRES_IN || 3;
    const apiPrefix = process.env.API_PREFIX || 'api';

    const queueMonitor = process.env.QUEUE_HTTP_ENABLED || true;
    const queueMonitorHttpPort = process.env.QUEUE_HTTP_PORT || 5550;
    const isProduction = process.env.NODE_ENV === 'production';

    return {
      apiPrefix,
      company,
      copyright,
      description,
      jwtExpiresIn,
      keywords,
      maxUploadLimit,
      maxParameterLimit,
      name,
      port,
      url,
      queueMonitor,
      queueMonitorHttpPort,
      isProduction,
    };
  }

  /**
   * Injects your config to the app's locals
   */
  public static init(_express: Application): Application {
    _express.locals.app = this.config();
    return _express;
  }
}

export default Locals;
