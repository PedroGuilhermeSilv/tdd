
import { User } from "../domain/entities/user";
import { FakeUserRepository } from "../infrastructure/fake_user_repository";
import { UserService } from "./user_service";

describe('UserService', () => {
    let userService: UserService;
    let fakeRepository: FakeUserRepository;
    beforeEach(() => {
        fakeRepository = new FakeUserRepository()
        userService = new UserService(fakeRepository)
    })
    it('deve retornar null quando o usuario nao for encontrado', async () => {
        const user = await userService.getUserById('1')
        expect(user).toBeNull()
    })

    it('deve retornar o usuario quando for encontrado', async () => {
        await fakeRepository.save(new User('1', 'John Doe'))
        const user = await userService.getUserById('1')
        expect(user?.getId()).toBe('1')
        expect(user?.getName()).toBe('John Doe')
    })


})