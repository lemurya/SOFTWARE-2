import { CreateUserDTO, LoginUserDto, UpdateUserDTO } from "../dtos";
import { UserEntity } from "../entities";

export abstract class UserRepository{
    abstract getByEmail(email: string): Promise<UserEntity>
    abstract getById(id: number): Promise<UserEntity>
    abstract registro(createUserDTO: CreateUserDTO): Promise<{user: UserEntity, token: string}>
    abstract login(loginUserDto: LoginUserDto): Promise<{user: Partial<UserEntity>, token: string}>
    abstract validateEmail(token:string): Promise<boolean>;
    abstract enviarCodigo(email: string): Promise<boolean>;
    abstract cambiarContrasenia(updateUserDto: UpdateUserDTO): Promise<Partial<UserEntity>>
    // Crear DTO para usuario perfil
    abstract obtenerPerfil(userID:number): Promise<any>

}