export type DtoType = {
  properties: {
    [key: string]: {
      type: 'array' | 'string' | 'number';
      isRequired?: boolean;
      itemsType?: 'string';
    };
  };
};

export const CreateUserDto: DtoType = {
  properties: {
    username: { type: "string", isRequired: true },
    age: { type: "number", isRequired: true},
    hobbies: { type: "array", isRequired: true, itemsType: "string" },
  },
}
