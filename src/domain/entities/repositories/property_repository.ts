import { Property } from "../property";

export interface IPropertyRepository {
  findById(id: string): Promise<Property | null>;
  save(property: Property): Promise<Property>;
}
