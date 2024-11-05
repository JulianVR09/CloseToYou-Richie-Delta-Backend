import { IsString } from "class-validator";

export class CreateContactDto {
    @IsString()
    name: string;

    @IsString()
    userId: string;

    @IsString()
    phone: string;

    @IsString()
    email: string;
}
