import * as mcache from 'memory-cache';

class Cache {
  public cache(_duration: number): any {
    return (req, res, next) => {
      const key = '__express__' + req.originalUrl || req.url;

      const cachedBody = mcache.get(key);
      if (cachedBody) {
        res.send(cachedBody);
      } else {
        res.sendResponse = res.send;
        res.send = (body) => {
          mcache.put(key, body, _duration * 1000);
          res.sendResponse(body);
        };
        next();
      }
    };
  }
}

export default new Cache();
