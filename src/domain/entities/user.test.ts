import { User } from './user';
describe('User', () => {
    it('deve criar uma instancia de User com Id e Nome', () => {
        const user = new User('1', 'John Doe');
        expect(user).toBeDefined();
        expect(user.getId()).toBe('1');
        expect(user.getName()).toBe('John Doe');
    });

    it('deve lançar um erro se o Id for vazio', () => {
        expect(() => new User('', 'John Doe')).toThrow('Id não pode ser vazio');
    });

    it('deve lançar um erro se o Nome for vazio', () => {
        expect(() => new User('1', '')).toThrow('Nome não pode ser vazio');
    });
});
