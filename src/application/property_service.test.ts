import { Property } from "../domain/entities/property";
import { FakePropertyRepository } from "../infrastructure/fake_property_repository";
import { PropertyService } from "./property_service";

describe("PropertyService", () => {
  let property_service: PropertyService;
  let fakePropertyRepository: FakePropertyRepository;

  beforeEach(() => {
    fakePropertyRepository = new FakePropertyRepository();
    property_service = new PropertyService(fakePropertyRepository);
  });

  it("deve retornar null quando um ID inválido for passado", async () => {
    const property = await property_service.getPropertyById("999");
    expect(property).toBeNull();
  });

  it("deve retornar uma propriedade quando um ID válido for passado", async () => {
    const property = await property_service.getPropertyById("1");
    expect(property).not.toBeNull();
    expect(property?.getId()).toBe("1");
  });

  it("deve salver uma nova propiedade com sucesso", async () => {
    const property = new Property("3", "casa", "muito boa", 2, 2);
    const property_on_db = await property_service.save(property);
    expect(property_on_db).not.toBeNull();
    expect(property_on_db?.getId()).toBe("3");
  });
});
