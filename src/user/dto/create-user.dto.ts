import { IsOptional, IsString, MinLength } from "class-validator";

export class CreateUserDto {
    @IsString()
    name: string;

    @IsString()
    @IsOptional()
    lastName?: string;

    @IsString()
    email: string;

    @IsString()
    @MinLength(8)
    password: string;
}
