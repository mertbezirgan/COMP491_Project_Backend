import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { DateTimeEntity } from "../base/dateTimeEntity";
import { Product } from "../product/product.entity";

export enum size {
  XXS = "XXS",
  XS = "XS",
  S = "S",
  M = "M",
  L = "L",
  XL = "XL",
  XXL = "XXL",
  XXXL = "XXXL"
}

@Entity("stock_keeping_unit", { orderBy: { id: "ASC" } })
export class StockKeepingUnit extends DateTimeEntity {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: number;

  @Column()
  sku: string;

  @Column()
  is_available: boolean;

  @Column({ default: 0 })
  stock: number;

  @Column({type: 'enum', enum: size})
  size: size;

  @Column()
  product_id: number;

  @ManyToOne(type => Product, product => product.stockKeepingUnits)
  @JoinColumn({ name: "product_id" })
  product: Product;
}