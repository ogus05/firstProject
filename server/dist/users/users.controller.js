"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersController = void 0;
const common_1 = require("@nestjs/common");
const auth_service_1 = require("../auth/auth.service");
const users_dto_1 = require("./dto/users.dto");
const users_service_1 = require("./users.service");
const config_1 = require("@nestjs/config");
let UsersController = class UsersController {
    constructor(configService, usersService, authService) {
        this.configService = configService;
        this.usersService = usersService;
        this.authService = authService;
    }
    async createUser(body, res) {
        try {
            await this.usersService.createUser(body);
            res.send({ message: "성공적으로 회원가입이 되었습니다." });
        }
        catch (e) {
            throw new common_1.HttpException(e.message, common_1.HttpStatus.BAD_REQUEST);
        }
    }
    async updatePasswordUser(body, req) {
        if (body.userID !== req.user.userID) {
            throw new common_1.BadRequestException('아이디가 다릅니다.');
        }
        else if (body.password === body.updatePassword) {
            throw new common_1.BadRequestException('현재 비밀번호와 이전 비밀번호의 값이 같습니다.');
        }
        else {
            try {
                await this.usersService.updatePasswordUser(body);
            }
            catch (e) {
                throw new common_1.BadRequestException(e.message);
            }
        }
    }
    async updateNicknameUser(body, req) {
        try {
            if (body.userID !== req.user.userID) {
                throw new common_1.BadRequestException('아이디가 다릅니다.');
            }
            await this.usersService.updateNicknameUser(body);
        }
        catch (e) {
            throw new common_1.BadRequestException(e.message);
        }
    }
};
__decorate([
    (0, common_1.Post)(),
    (0, common_1.HttpCode)(201),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [users_dto_1.CreateUserDto, Object]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "createUser", null);
__decorate([
    (0, common_1.Patch)('/password'),
    (0, common_1.HttpCode)(200),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [users_dto_1.UpdatePasswordUserDto, Object]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "updatePasswordUser", null);
__decorate([
    (0, common_1.Patch)('/nickname'),
    (0, common_1.HttpCode)(200),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [users_dto_1.UpdateNicknameUserDto, Object]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "updateNicknameUser", null);
UsersController = __decorate([
    (0, common_1.Controller)('users'),
    __metadata("design:paramtypes", [config_1.ConfigService,
        users_service_1.UsersService,
        auth_service_1.AuthService])
], UsersController);
exports.UsersController = UsersController;
//# sourceMappingURL=users.controller.js.map