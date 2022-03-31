import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { DateTimeEntity } from "../base/dateTimeEntity";
import { Product } from "../product/product.entity";


@Entity('token', { orderBy: {  id: 'ASC' } })
export class Token extends DateTimeEntity {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: number;

  @Column()
  token_address: string;

  @Column()
  image_url: string;

  @Column()
  product_id: number;

  @OneToOne(type => Product, product => product.token)
  product: Product;
}