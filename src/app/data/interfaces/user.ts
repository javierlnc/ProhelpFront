export interface User {
  id: number;
  username: string;
  email: string;
  name: string;
  role: string;
  area: { areaDTO: { id: number; name: string } };
}
