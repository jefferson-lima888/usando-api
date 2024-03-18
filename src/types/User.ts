export type User = {
  id: number;
  name: string;
  email: string;
  address: Address;
};

type Address = {
  city: string;
};
