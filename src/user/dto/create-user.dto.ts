import { IsString } from "class-validator";

export class CreateUserDto {
    @IsString()
    name: string;

    @IsString()
    lastName: string;

    @IsString()
    phone: string;

    @IsString()
    email: string;

    @IsString()
    password: string;

    @IsString()
    confirmPassword: string;
}
