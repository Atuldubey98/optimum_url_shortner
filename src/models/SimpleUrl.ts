class SimpleUrl {
  private url: string;
  constructor(url: string) {
    if (!url) throw new Error("Invalid url");
    this.url = url;
  }
  setUrl(url: string) {
    this.url = url;
  }
  getUrl() {
    return this.url;
  }
}
export default SimpleUrl;