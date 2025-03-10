import ShortendUrl from "../models/ShortendUrl";
import CachingService from "./caching-service";
import shortid from "shortid";
class ShortenService {
  private cachingService: CachingService;
  constructor() {
    this.cachingService = new CachingService();
  }
  async save(shortenUrl: ShortendUrl) {
    try {
      const uuid = shortid();
      const response = await this.cachingService.setAndExpire(
        uuid,
        shortenUrl.getUrl(),
        shortenUrl.getTtl()
      );
      if (response === "OK") return uuid;
      throw new Error("Unable to save");
    } catch (error) {
      throw error;
    }
  }
  async get(uuid: string) {
    try {
      const response = await this.cachingService.get(uuid);
      if (!response) throw new Error("Invalid url");
      return response;
    } catch (error) {
      throw error;
    }
  }
}

export default ShortenService;
