import WordSynonyms from "./WordSynonyms";

export default class WordInsert {
  text: string;
  description: string;
  synonyms: WordSynonyms[];

  constructor() {
    this.text = "";
    this.description = "";
    this.synonyms = [];
  }
}

export const generateRequest = (data: WordInsert): WordInsertRequest =>
  new WordInsertRequest(data);

export class WordInsertRequest {
  text: string;
  description: string;
  synonyms: number[];

  constructor(data: WordInsert) {
    this.text = data.text;
    this.description = data.description;
    this.synonyms = data.synonyms.map((element, index) => element.id);
  }
}
