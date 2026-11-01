import type { DatabaseConnection } from "../db.js";
import type { Fullz, NewFullz, UpdateFullz } from "../schema/fullzTable.js";
export declare class FullzModel {
    constructor(connection: DatabaseConnection);
    private connection;
    findById(id: string): Fullz | undefined;
    findBySSN(ssn: string): Fullz | undefined;
    findByEmail(email: string): Fullz | undefined;
    findByPhoneNumber(phoneNumber: string): Fullz | undefined;
    findByMothersMaidenName(mothersMaidenName: string): Fullz | undefined;
    findByDateOfBirth(dateOfBirth: string): Fullz[];
    findByLastName(lastName: string): Fullz[];
    findByFirstName(firstName: string): Fullz[];
    findByMiddleName(middleName: string): Fullz[];
    findByCountry(country: string): Fullz[];
    findByState(state: string): Fullz[];
    findByCity(city: string): Fullz[];
    findByZipCode(zipCode: string): Fullz[];
    findAll(): Fullz[];
    create(fullz: NewFullz): Fullz;
    update(id: string, fullz: UpdateFullz): Fullz | undefined;
    delete(id: string): Fullz | undefined;
}
//# sourceMappingURL=fullzModel.d.ts.map