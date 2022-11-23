import WordSynonyms from "../../types/WordSynonyms";
import { FieldType } from "./FieldType";
import { ValidationFunc, validatorOptions } from "./ValidatorOptions";

export class Validator {
  static options: Record<FieldType, ValidationFunc> = validatorOptions;

  constructor() {}

  static validateField(field: FieldType, input: string): string[] {
    return this.options[field](input);
  }

  static validateNewSynonym(
    elements: WordSynonyms[],
    newItem: WordSynonyms
  ): boolean {
    for (let i = 0; i < elements.length; i++) {
      const element = elements[i];

      if (element.id === newItem.id) {
        return false;
      }

      for (let j = 0; j < element.synonyms.length; j++) {
        const elementSynonym = element.synonyms[j];

        if (elementSynonym.id === newItem.id) {
          return false;
        }
      }
    }

    return true;
  }
}
