export default class HttpConfig {
  static serverAddress = "https://synonym-api.azurewebsites.net/";

  static endPoints = {
    lookup: (input: string) => `${this.serverAddress}lookup/${input}`,
    search: (filter: string, itemsPerPage: number, pageNumber: number = 1) =>
      `${this.serverAddress}search?filter=${filter}&itemsPerPage=${itemsPerPage}&pageNumber=${pageNumber}`,
    get: (id: number) => `${this.serverAddress}${id}`,
    getAll: () => `${this.serverAddress}all`,
    getAllIDs: () => `${this.serverAddress}all/id`,
  };
}
