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
Object.defineProperty(exports, "__esModule", { value: true });
exports.JwtStrategy = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const passport_1 = require("@nestjs/passport");
const passport_jwt_1 = require("passport-jwt");
const token_e_1 = require("../exceptions/token.e");
const extractFromCookie = (req, config) => {
    let accessJWT = null;
    accessJWT = req === null || req === void 0 ? void 0 : req.cookies[config.get("ACCESS_JWT")];
    if (!accessJWT)
        throw new token_e_1.AccessTokenException();
    return accessJWT;
};
let JwtStrategy = class JwtStrategy extends (0, passport_1.PassportStrategy)(passport_jwt_1.Strategy, 'accessJWT') {
    constructor(config) {
        super({
            jwtFromRequest: (req) => extractFromCookie(req, config),
            ignoreExpiration: true,
            secretOrKey: config.get('SECRET_KEY'),
        });
        this.config = config;
    }
    async validate(payload) {
        if (payload.exp * 1000 < Date.now()) {
            throw new token_e_1.AccessTokenException();
        }
        else {
            return { userID: payload.userID, nickname: payload.sub };
        }
    }
};
JwtStrategy = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [config_1.ConfigService])
], JwtStrategy);
exports.JwtStrategy = JwtStrategy;
//# sourceMappingURL=jwt-access.strategy.js.map