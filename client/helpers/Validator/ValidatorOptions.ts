import { FieldType } from "./FieldType";

export interface ValidationFunc {
  (input: string): string[];
}

export const validatorOptions: Record<FieldType, ValidationFunc> = {
  0: (field: string): string[] => {
    let messages: string[] = [];

    if (field.length < 1) {
      messages.push("Can't be empty");
    }

    if (/\d/.test(field)) {
      messages.push("Can't contain numbers");
    }

    if (/[!@#$%^*()_+\=\[\]{};\\|<>\/?~]/.test(field)) {
      messages.push("Can't contain special characters");
    }

    return messages;
  },

  1: (field: string): string[] => {
    let messages: string[] = [];

    if (field.length < 1) {
      messages.push("Can't be empty");
    }

    return messages;
  },
};
