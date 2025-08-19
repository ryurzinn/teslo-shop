import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req, Header, Headers, SetMetadata } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto, LoginUserDto } from './dto';
import { AuthGuard } from '@nestjs/passport';
import { User } from './entities/user.entity';
import { RawHeaders, GetUser, Auth } from './decorators';
import * as http from 'http';
import { UserRoleGuard } from './guards/user-role/user-role.guard';
import { META_ROLES, RoleProtected } from './decorators/role-protected/role-protected.decorator';
import { ValidRoles } from './interfaces';


@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  createUser(@Body() createUserDto: CreateUserDto) {
    return this.authService.create(createUserDto);
  }

  @Post('login')
  LoginUser(@Body() loginUserDto: LoginUserDto) {
    return this.authService.login(loginUserDto);
  }

  @Get('private')
  @UseGuards( AuthGuard()  )
  testingPrivateRoute (
    @Req() request: Express.Request,
    @GetUser() user: User,  
    @GetUser('email') userEmail: string, 
    @RawHeaders('rawHeaders') rawHeaders: string[],
    @Headers() headers: http.IncomingHttpHeaders,

  ){

    return {
      ok: true,
      msg: 'Hola mundo private',
      user,
      userEmail,
      rawHeaders,
      headers
    }
  }

// @SetMetadata('roles', ['admin', 'super-user']) // Recomendable no usar esto, es mejor usar uno personalizado

  @Get('private2')
  @RoleProtected(ValidRoles.superUser, ValidRoles.admin)
  @UseGuards( AuthGuard(), UserRoleGuard )
  privateRoute2( // Validar los roles 
    @GetUser() user: User
  ) {

    return {
      ok: true,
      user
    }
  }

  @Get('private3')
  @Auth(ValidRoles.admin)
  privateRoute3( // Validar los roles 
    @GetUser() user: User
  ) {

    return {
      ok: true,
      user
    }
  }

}
