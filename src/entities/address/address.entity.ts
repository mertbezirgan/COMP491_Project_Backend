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
import { Order } from "../order/order.entity";

@Entity("address", { orderBy: { id: "ASC" } })
export class Address extends DateTimeEntity {
  @PrimaryGeneratedColumn({ type: "bigint" })
  id: number;

  @Column()
  title: string;

  @Column()
  address_line_1: string;

  @Column()
  address_line_2: string;

  @Column()
  state: string;

  @Column()
  city: string;

  @Column()
  zip_code: string;

  @Column()
  country: string;

  @Column()
  phone_number: string;

  @ManyToOne(type => User, user => user.addresses)
  @JoinColumn({ name: "user_id" })
  user: User;

  @OneToMany(
    (type) => Order,
    (addressOrder) => addressOrder.address
  )
  orders: Order[];
}
