import { ConfigService } from '@nestjs/config';
import { Request, Response } from 'express';
import { AuthService } from './auth.service';
export declare class AuthController {
    private authService;
    private configService;
    constructor(authService: AuthService, configService: ConfigService);
    handleRefreshToken: any;
    getUserID(req: any, res: Response): Promise<void>;
    loginUser(req: Request, res: Response): Promise<void>;
    logoutUser(req: Request, res: Response): Promise<void>;
    issueAccessToken(req: Request, res: Response): Promise<void>;
    getPage(params: any): Promise<string>;
}
