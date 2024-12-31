import { ForbiddenException, Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { AuthDto } from "./dto";
import * as argon from "argon2";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { JwtService } from "@nestjs/jwt";
import { ConfigService } from "@nestjs/config";
@Injectable()
export class AuthService{
    constructor(private prisma :PrismaService,
                private jwt:JwtService,
                private config:ConfigService,
    ){
        
    }
  async  signup(dto:AuthDto){
        //generate the password hash
        const hash = await argon.hash(dto.password);
        //save-the-user
        try{
            const user=await this.prisma.user.create({
            
                data:{
                    email:dto.email,
                    hash,
                },
                
    
    
                });
              
                return this.signToken(user.id,user.email);
            
        }catch(error){
            
            if(error
                 instanceof PrismaClientKnownRequestError){
if(error.code==="p2002")
             {
throw new ForbiddenException("  credentials are already in use ");
            }
        }
        throw error;
    }}    
        

         //return-the-user
         
    
    async signin(Dto:AuthDto){
        //FIND THE USER by email
        const user=await this.prisma.user.findUnique({
            where:{
                email:Dto.email
            }
        });
        if(!user){
            throw new ForbiddenException("user not found",);
        }
        // IF THE USER IS NOT FOUND THROW AN ERROR
        // COMPARE THE PASSWORD
        const pwMatches=await argon.verify(
user.hash,
Dto.password
        );
        // IF PASSWORD IF NOT MATCHED THROW AN EXCEPTION 
        if (!pwMatches){
            throw new ForbiddenException("credentials in corrent",);
        }
        // RETURN THE USER
       
        return this.signToken(user.id,user.email);
    }
 // ...existing code...
async signToken(
    userId: number,
    email: string
): Promise<{ access_token: string }> {
    const payload = {
        sub: userId,
        email,
    };
    const secret = this.config.get("JWT_SECRET");

    // Use a library like jsonwebtoken to sign the token
    const token = await this.jwt.signAsync(payload, { secret });

    return {
        access_token: token,
    };
}
// ...existing code...
}
