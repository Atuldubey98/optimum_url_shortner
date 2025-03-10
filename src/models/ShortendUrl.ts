import logger from "../lib/logger";
import SimpleUrl from "./SimpleUrl";

class ShortendUrl extends SimpleUrl {
  private ttl: number;
  constructor(url: string, ttl: number) {
    super(url);
    if (!ttl) throw new Error("Time cannot be less than equal to 0");
    this.ttl = ttl;
  }
  log() {
    logger.info(`${super.getUrl()} saving for ${this.ttl}`);
  }
  getTtl(){
    return this.ttl;
  }
}

export default ShortendUrl;