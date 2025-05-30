import { Property } from "../../domain/entities/property";
import { IPropertyRepository } from "../../domain/entities/repositories/property_repository";

export class PropertyService {
  private readonly propertyRepository: IPropertyRepository;
  constructor(propertyRepository: IPropertyRepository) {
    this.propertyRepository = propertyRepository;
  }
  async getPropertyById(id: string): Promise<Property | null> {
    const property = await this.propertyRepository.findById(id);
    return property;
  }

  async save(property: Property): Promise<Property> {
    return await this.propertyRepository.save(property);
  }
}
