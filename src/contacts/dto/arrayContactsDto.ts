import { Type } from "class-transformer";
import { IsArray, ValidateNested } from "class-validator";
import { CreateContactDto } from "./create-contact.dto";

export class CreateContactsDto {
    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => CreateContactDto)
    contacts: CreateContactDto[];
}