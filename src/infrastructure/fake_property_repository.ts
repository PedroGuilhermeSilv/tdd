import { Property } from "../domain/entities/property";
import { IPropertyRepository } from "../domain/entities/repositories/property_repository";


export class FakePropertyRepository implements IPropertyRepository {
    private properties: Property[] = [
        new Property(
            "1", "casa", "muito boa", 2, 2,
        )
    ]
    async findById(id: string): Promise<Property | null> {
        return this.properties.find(property => property.getId() === id) || null
    }
    async save(property: Property): Promise<Property> {
        this.properties.push(property)
        return property
    }
}