import { Column, Entity, OneToMany, PrimaryGeneratedColumn, Unique } from 'typeorm';
import { Address } from '../address/address.entity';
import { DateTimeEntity } from '../base/dateTimeEntity';
import { Order } from '../order/order.entity';
import { ProductReview } from '../product/productReview.entity';

@Entity('user_auth', { orderBy: {  id: 'ASC' } })
export class User extends DateTimeEntity {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: number;

  @Column()
  @Unique(['email'])
  email: string;

  @Column()
  name: string;

  @Column()
  password: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  lastLogin: string;

  @Column({ default: false })
  isStaff: boolean;

  @Column({ default: true })
  isActive: boolean;

  @OneToMany(type => ProductReview, productReview => productReview.user)
  productReviews: ProductReview[];

  @OneToMany(
    (type) => Order,
    (userOrder) => userOrder.user
  )
  orders: Order[];

  @OneToMany(
    (type) => Address,
    (userAddress) => userAddress.user
  )
  addresses: Address[];
}
