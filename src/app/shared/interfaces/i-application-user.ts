export interface IApplicationUser {
    UserId: number;
    RoleId: number;
    Email: string;
    Identity: string;
    exp: number;
    UseCases: number[];
}
