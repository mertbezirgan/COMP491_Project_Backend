import { Column, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { DateTimeEntity } from "../base/dateTimeEntity";
import { StockKeepingUnit } from "../stockKeepingUnit/stockKeepingUnit.entity";
import { Token } from "../token/token.entity";
import { User } from "../user/user.entity";

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

  @Column({ default: false })
  once_sold: boolean;

  @Column()
  token_id: number;

  @OneToOne(type => Token, token => token.product)
  token: Token;

  @OneToMany(type => ProductImage, productImage => productImage.product)
  productImages: ProductImage[];

  @OneToMany(type => StockKeepingUnit, productStockKeepingUnit => productStockKeepingUnit.product)
  stockKeepingUnits: StockKeepingUnit[];

  @OneToMany(type => ProductReview, productReview => productReview.product)
  productReviews: ProductReview[];
}

@Entity("product_image", { orderBy: { id: "ASC" } })
export class ProductImage extends DateTimeEntity {
  @PrimaryGeneratedColumn({ type: "bigint" })
  id: number;

  @Column()
  image_url: string;

  @Column()
  product_id: number;

  @ManyToOne(type => Product, product => product.productImages)
  @JoinColumn({ name: "product_id" })
  product: Product;
}

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

  @ManyToOne(type => Product, product => product.productReviews)
  @JoinColumn({ name: "product_id" })
  product: Product;

  @ManyToOne(type => User, user => user.productReviews)
  @JoinColumn({ name: "user_id" })
  user: User;
}