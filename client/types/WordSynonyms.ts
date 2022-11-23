import Word from "./Word";

export default class WordSynonyms {
  id: number;
  text: string;
  description: string;
  synonyms: Word[];

  constructor() {
    this.id = -1;
    this.text = "";
    this.description = "";
    this.synonyms = [];
  }
}
