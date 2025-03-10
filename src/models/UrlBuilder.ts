export default class UrlBuilder {
  private url: string;
  constructor(cachedId: string) {
    this.url = `${process.env.BE_SERVER_URL}/${cachedId}`;
  }
  getUrl() {
    return this.url;
  }
  getSharablePlatforms() {
    return [
      { name: "Instagram", url: `https://www.instagram.com/?url=${this.url}` },
      {
        name: "Facebook",
        url: `https://www.facebook.com/sharer/sharer.php?u=${this.url}`,
      },
      { name: "WhatsApp", url: `https://wa.me/?text=${this.url}` },
      {
        name: "Gmail",
        url: `https://mail.google.com/mail/?view=cm&fs=1&to=&su=Check%20this%20out&body=${this.url}`,
      },
      {
        name: "Twitter",
        url: `https://twitter.com/intent/tweet?url=${this.url}`,
      },
    ];
  }
}
