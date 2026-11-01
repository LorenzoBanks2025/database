import type { DatabaseConnection } from "../db.js";
import type { Lead, NewLead, UpdateLead } from "../schema/leadsTable.js";
export declare class LeadsModel {
    constructor(connection: DatabaseConnection);
    private connection;
    findById(id: string): Lead | undefined;
    findByEmail(email: string): Lead | undefined;
    findByPhone(phone: string): Lead | undefined;
    findByScrapedFrom(scrapedFrom: string): Lead[];
    findByFirstName(firstName: string): Lead[];
    findByLastName(lastName: string): Lead[];
    findByFullName(firstName: string, lastName: string): Lead[];
    findByCity(city: string): Lead[];
    findByState(state: string): Lead[];
    findByCountry(country: string): Lead[];
    findByZipCode(zipCode: string): Lead[];
    findAll(): Lead[];
    create(lead: NewLead): Lead;
    update(id: string, lead: UpdateLead): Lead | undefined;
    delete(id: string): Lead | undefined;
}
//# sourceMappingURL=leadsModel.d.ts.map