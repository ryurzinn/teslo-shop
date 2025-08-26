import { BeforeInsert, BeforeUpdate, Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { ProductImage } from "./product-image.entity";
import { User } from "src/auth/entities/user.entity";
import { ApiProperty } from "@nestjs/swagger";

@Entity({ name: 'products' })
export class Product {

    @ApiProperty({ 
        example: "5e7a0e75-097c-49ba-94d8-5eda48c42175",
        description: "Product ID",
        uniqueItems: true
     })
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @ApiProperty({ 
        example: "T-shirt Teslo",
        description: "Product Title",
        uniqueItems: true
     })
    @Column('text', {
        unique: true,
    })
    title: string;

    @ApiProperty({ 
        example: 0,
        description: "Product Price",
     })
    @Column('float', {
        default: 0
    })
    price: number;

    @ApiProperty({ 
        example: "this is a description",
        description: "Product Description",
        default: null
     })
    @Column({
        type: 'text',
        nullable: true
    })
    description: string;

    @ApiProperty({ 
        example: "t_shirt_teslo",
        description: "Product Slug - for SEO",
        uniqueItems: true
     })
    @Column('text', {
        unique: true
    })
    slug: string;

    @ApiProperty({ 
        example: 10,
        description: "Product Stock",
        default: 0
     })
    @Column('integer', {
        default: 0
    })
    stock: number;

    @ApiProperty({ 
        example: ["M", "S", "XL", "XXL"],
        description: "Product Sizes",
     })
    @Column('text', {
        array: true
    })
    sizes: string[];

    @ApiProperty({ 
        example: "women",
        description: "Product Gender",
        uniqueItems: true
     })
    @Column('text')
    gender: string;

    @ApiProperty()
    @Column('text', {
        array: true,
        default: []
    })
    tags: string[];


    //  images
    @OneToMany(
        ( ) => ProductImage,
        (productImage) => productImage.product,
        {cascade: true, eager: true}
    )
    images?: ProductImage[];

    @ManyToOne(
    () => User,
    (user) => user.product,
    {eager: true}
   )
    user: User;


    @BeforeInsert()
    checkSlugInsert() {
        if ( !this.slug ) {
            this.slug = this.title
        }
       this.slug = this.slug
        .toLowerCase()
        .replaceAll("'",'')
        .replaceAll(' ', '_')
    }

    @BeforeUpdate()
    checkSlugUpdate() {
       this.slug = this.slug
        .toLowerCase()
        .replaceAll("'",'')
        .replaceAll(' ', '_')
    }
}
