import { BadRequestException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { CreateUserDto } from './dto/crate-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { User } from './entities/user.entity';

@Injectable()
export class AuthService {

  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>
  ){}

  async create(createUserDto: CreateUserDto) {
    
    try {

      const {password, ...userData} = createUserDto;
      
      const user = this.userRepository.create( {
        ...userData,
        password: bcrypt.hashSync(password, 10)
      });

      await this.userRepository.save(user);
      
      const {password: _, ...result} = user;

      return result;

      // TODO: Retornar el JWT de ACCESO

    } catch (error) {
      this.handleDBErrors(error);
    }


  }

  private handleDBErrors( error: any): never {
    if( error.code === '23505' )
      throw new BadRequestException(error.detail);

    console.log(error);

    throw new InternalServerErrorException('Please check server logs!');
  }

}
