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
import { ProductImage } from "./productImage.entity";
import { ProductReview } from "./productReview.entity";

@Entity("product", { orderBy: { id: "ASC" } })
export class Product extends DateTimeEntity {
  @PrimaryGeneratedColumn({ type: "bigint" })
  id: number;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column()
  weight: number;

  @Column()
  bundle_price: number;

  @Column()
  price: number;

  @Column({ default: false })
  once_sold: boolean;

  @Column()
  token_id: number;

  @OneToOne((type) => Token, (token) => token.product)
  token: Token;

  @OneToMany((type) => ProductImage, (productImage) => productImage.product)
  productImages: ProductImage[];

  @OneToMany(
    (type) => StockKeepingUnit,
    (productStockKeepingUnit) => productStockKeepingUnit.product
  )
  stockKeepingUnits: StockKeepingUnit[];

  @OneToMany((type) => ProductReview, (productReview) => productReview.product)
  productReviews: ProductReview[];
}
