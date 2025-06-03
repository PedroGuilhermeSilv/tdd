import { Repository } from "typeorm";
import { Property } from "../../domain/entities/property";
import { IPropertyRepository } from "../../domain/entities/repositories/property_repository";
import { PropertyEntity } from "../persistence/entities/property_entity";
import { PropertyMapper } from "../persistence/mappers/property_mapper";

export class TypeOrmPropertyRepository implements IPropertyRepository {
  private readonly repository: Repository<PropertyEntity>;
  constructor(repository: Repository<PropertyEntity>) {
    this.repository = repository;
  }

  async save(property: Property): Promise<Property> {
    const propertyEntity = PropertyMapper.toEntity(property);
    await this.repository.save(propertyEntity);
    return property;
  }

  async findById(id: string): Promise<Property | null> {
    const propertyEntity = await this.repository.findOne({ where: { id } });
    if (!propertyEntity) return null;
    return PropertyMapper.toDomain(propertyEntity);
  }
}
