export class User {
    constructor(
        private readonly id: string,
        private readonly name: string
    ) {
        this.validateUser(id, name);
        this.id = id;
        this.name = name;
    }

    private validateUser(id: string, name: string): void {
        if (!id) {
            throw new Error('Id não pode ser vazio');
        }
        if (!name) {
            throw new Error('Nome não pode ser vazio');
        }
    }
    getId(): string {
        return this.id;
    }

    getName(): string {
        return this.name;
    }
}