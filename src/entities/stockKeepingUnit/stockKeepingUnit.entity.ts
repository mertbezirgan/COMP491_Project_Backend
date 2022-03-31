import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  OneToMany
} from "typeorm";
import { DateTimeEntity } from "../base/dateTimeEntity";
import { Product } from "../product/product.entity";
import { size } from "../../constants/enums";
import { Order } from "../order/order.entity";

@Entity("stock_keeping_unit", { orderBy: { id: "ASC" } })
export class StockKeepingUnit extends DateTimeEntity {
  @PrimaryGeneratedColumn({ type: "bigint" })
  id: number;

  @Column()
  sku: string;

  @Column({ default: true })
  is_available: boolean;

  @Column({ default: 0 })
  stock: number;

  @Column({ type: "enum", enum: size })
  size: size;

  @Column()
  product_id: number;

  @ManyToOne((type) => Product, (product) => product.stockKeepingUnits)
  @JoinColumn({ name: "product_id" })
  product: Product;

  @OneToMany(
    (type) => Order,
    (stockKeepingUnitOrder) => stockKeepingUnitOrder.stockKeepingUnit
  )
  orders: Order[];
}
