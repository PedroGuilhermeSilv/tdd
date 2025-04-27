import { Property } from "../property"

export interface IPropertyRepository {
    findById(id: string): Promise<Property | null>
    save(user: Property): Promise<Property>
}