import { ForbiddenException, HttpException, Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy } from "passport-jwt";
import { TokenException } from "../exceptions/token.e";

const extractFromCookie = req => {
    let accessJWT = null;
    if(req?.cookies){
        accessJWT = req.cookies['accessJWT'];
    }
    return accessJWT;
}

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'accessJWT'){
    constructor(
        private configService: ConfigService,
    ){
        super({
            //Reqeust에서 JWT를 추출하는 방법. 지금 방법은 Authorization 헤더에 전달자 토큰을 제공하는 방법.
            jwtFromRequest: extractFromCookie,
            //false는 JWT가 Pasport모듈에 만료되지 않았는지 확인하는 책임을 위임한다.
            ignoreExpiration: true,
            //시크릿 키
            secretOrKey: configService.get('SECRET_KEY'),      
        },
        )
    }
    async validate(payload: any){
        //기간 만료 시 Guard의 Handler에게 에러 전송.
        if(payload.exp * 1000 < Date.now()){
            throw new TokenException();
        }
        return {userID: payload.userID, nickname: payload.sub}
        //Passport는 Request객체에 속성으로 이를 첨부한다. 데이터베이스에 접근하여 더 많은 객체 추출 가능.
    }
}