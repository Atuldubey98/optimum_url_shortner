import Redis, { RedisOptions } from "ioredis";

class CachingService {
  private redis: Redis;
  constructor() {
    const props = (
      process.env.NODE_ENV === "production"
        ? {
            host: process.env.REDIS_HOST,
            username: process.env.REDIS_USERNAME,
            port: process.env.REDIS_PORT,
            password: process.env.REDIS_PASSWORD,
          }
        : {}
    ) as RedisOptions;
    this.redis = new Redis(props);
  }
  set(key: string, value: string | Buffer | number) {
    return this.redis.set(key, value);
  }
  get(key: string) {
    return this.redis.get(key);
  }
  setAndExpire(key: string, value: string | Buffer | number, ttl: number = 0) {
    return this.redis.set(key, value, "EX", ttl);
  }
}

export default CachingService;
