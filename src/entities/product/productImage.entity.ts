import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { DateTimeEntity } from "../base/dateTimeEntity";
import { Product } from "./product.entity";

@Entity("product_image", { orderBy: { id: "ASC" } })
export class ProductImage extends DateTimeEntity {
  @PrimaryGeneratedColumn({ type: "bigint" })
  id: number;

  @Column()
  image_url: string;

  @Column()
  alt_text: string;

  @Column()
  product_id: number;

  @ManyToOne((type) => Product, (product) => product.productImages)
  @JoinColumn({ name: "product_id" })
  product: Product;
}
