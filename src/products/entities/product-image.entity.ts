import { Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Column } from "typeorm";
import { Product } from "./product.entity";


@Entity()
export class ProductImage {

    @PrimaryGeneratedColumn()
    id: number;

    @Column('text')
    url: string;

    @ManyToOne(
        () => Product,
        (product) => product.images
    )
    product: Product

}