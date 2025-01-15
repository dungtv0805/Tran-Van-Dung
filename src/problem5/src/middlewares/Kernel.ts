import { Application } from 'express';
import CORS from './CORS';
import Http from './Http';
import Statics from './Statics';

import Locals from '../providers/Locals';

class Kernel {
  public static init(_express: Application): Application {
    // Check if CORS is enabled
    if (Locals.config().isCORSEnabled) {
      // Mount CORS middleware
      _express = CORS.mount(_express);
    }

    // Mount basic express apis middleware
    _express = Http.mount(_express);

    // Mount statics middleware
    _express = Statics.mount(_express);

    return _express;
  }
}

export default Kernel;
