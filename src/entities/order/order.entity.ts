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
import { orderStatus } from "../../constants/enums";
import { User } from "../user/user.entity";
import { Address } from "../address/address.entity";

@Entity("order", { orderBy: { id: "ASC" } })
export class Order extends DateTimeEntity {
  @PrimaryGeneratedColumn({ type: "bigint" })
  id: number;

  @Column()
  item_price: number;

  @Column()
  tax: number;

  @Column()
  total_price: number;

  @Column({ type: "enum", enum: orderStatus })
  status: number;

  @ManyToOne(type => StockKeepingUnit, stockKeepingUnit => stockKeepingUnit.orders)
  @JoinColumn({ name: "sku_id" })
  stockKeepingUnit: StockKeepingUnit;

  @ManyToOne(type => User, user => user.orders)
  @JoinColumn({ name: "user_id" })
  user: User;

  @ManyToOne(type => Address, address => address.orders)
  @JoinColumn({ name: "address_id" })
  address: Address;
}
