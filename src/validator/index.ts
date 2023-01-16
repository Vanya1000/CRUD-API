import { DtoType } from "../users/dto/create-user.dto.js";

const isObject = (value: unknown) => {
  return typeof value === "object" && value !== null && !Array.isArray(value);
};

export const checkValid = (value: any, dto: DtoType) => {
  const errors: string[] = [];
  if (dto.properties) {
    if (isObject(value) === false) {
      errors.push("Payload should be an object");
      return errors;
    }
    Object.keys(dto.properties).forEach((key) => {
      if (dto.properties[key].isRequired) {
        if (!value[key]) {
          errors.push(`Property ${key} is required`);
          return errors;
        }
      }
      if (dto.properties[key].type === "string") {
        if (typeof value[key] !== "string") {
          errors.push(`Property ${key} should be a string`);
        }
      }
      if (dto.properties[key].type === "number") {
        if (typeof value[key] !== "number") {
          errors.push(`Property ${key} should be a number`);
        }
      }
      if (dto.properties[key].type === "array") {
        if (!Array.isArray(value[key])) {
          errors.push(`Property ${key} should be an array`);
          return errors;
        }
        if (value[key].length > 0) {
          if (dto.properties[key].itemsType === "string") {
            value[key].some((item: any) => {
              if (typeof item !== "string") {
                errors.push(`Property ${key} should be an array of strings`);
                return errors;
              }
            });
          }
        }
      }
    });
  }
  return errors;
};
