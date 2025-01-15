import { Application } from 'express';
import compression from 'compression';
import * as bodyParser from 'body-parser';
import cors from 'cors';

import Log from './Log';
import Locals from '../providers/Locals';
import Passport from '../providers/Passport';

class Http {
  public static mount(_express: Application): Application {
    Log.info("Booting the 'HTTP' middleware...");

    // Enables the request body parser
    _express.use(
      bodyParser.json({
        limit: Locals.config().maxUploadLimit,
      })
    );

    _express.use(
      bodyParser.urlencoded({
        limit: Locals.config().maxUploadLimit,
        parameterLimit: Locals.config().maxParameterLimit,
        extended: false,
      })
    );

    // Disable the x-powered-by header in response
    _express.disable('x-powered-by');

    // Enables the CORS
    _express.use(cors());

    // Enables the "gzip" / "deflate" compression for response
    _express.use(compression());

    // Loads the passport configuration
    _express = Passport.mountPackage(_express);

    return _express;
  }
}

export default Http;
