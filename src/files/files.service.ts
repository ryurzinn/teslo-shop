import { BadRequestException, Injectable } from '@nestjs/common';
import { existsSync } from 'fs';
import { join } from 'path';

@Injectable()
export class FilesService {
 
    getStaticProductImage( imageName: string)  { // Da igual el tipo de archivo esto verifica que el file exista sin importar el tipo de dato

        const path = join( __dirname, '../../static/products', imageName);

        if( !existsSync(path) ) // Si el path no existe
            throw new BadRequestException(`No product found with image ${imageName}`);// Devuelve una BadRequest

        return path; // Si existe retorna el path

    }
}
