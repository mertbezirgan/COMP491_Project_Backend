import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { DateTimeEntity } from "../base/dateTimeEntity";
import { StockKeepingUnit } from "../stockKeepingUnit/stockKeepingUnit.entity";
import { Token } from "../token/token.entity";
import { User } from "../user/user.entity";
import { Product } from "./product.entity";
import { ProductImage } from "./productImage.entity";

@Entity("product_review", { orderBy: { id: "ASC" } })
export class ProductReview extends DateTimeEntity {
  @PrimaryGeneratedColumn({ type: "bigint" })
  id: number;

  @Column()
  product_id: number;

  @Column()
  user_id: number;

  @Column()
  review: string;

  @Column()
  points: number;

  @ManyToOne((type) => Product, (product) => product.productReviews)
  @JoinColumn({ name: "product_id" })
  product: Product;

  @ManyToOne((type) => User, (user) => user.productReviews)
  @JoinColumn({ name: "user_id" })
  user: User;
}
