import http from "http";

type MidlewareAddResType = {
  body: object;
}

type MidlewareAddReqType = {
  send: (data: object, status?: number) => void;
}

export type NodeServerReqType = http.IncomingMessage & Partial<MidlewareAddResType>;
export type NodeServerResType = http.ServerResponse<http.IncomingMessage> & {
  req: http.IncomingMessage;
}& Partial<MidlewareAddReqType>;

export type NextFunctionType = () => void;

export type MiddlewareType = (req: NodeServerReqType, res: NodeServerResType, next: NextFunctionType) => void;

export type EndpointsType = {
  [path: string]: {
    [method: string]: (req: NodeServerReqType, res: NodeServerResType, id?: string) => void;
  };
}

export type HandlerType = (req: NodeServerReqType, res: NodeServerResType, id?: string) => void;

export type CreateUserType = {
  username: string;
  age: number;
  hobbies: string[];
}

type UserIdType = {
  id: string;
}

export type UserType = {
  username: string;
  age: number;
  hobbies: string[];
} & UserIdType;














type AddType = {
  hz: (t: number) => void;
}

type SomeT = {
  name: string;
  age: number;
}

type SomeType = SomeT & Partial<AddType>

const testObj: SomeType = {
  name: "John",
  age: 20,
}

const someFn = (some: SomeType) => {
  console.log(some);
}

someFn(testObj);

const fnAddField  = (some: SomeType) => {
  some.hz = (t: number) => {
    console.log(t);
  }
  return some;
}

const middl = fnAddField(testObj);

if (middl.hz) {
  middl.hz(10);
}
testObj.hz!(10);