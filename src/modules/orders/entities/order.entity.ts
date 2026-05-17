import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Restaurant } from '../../restaurants/entities/restaurant.entity';
import { User } from '../../users/schemas/user.schema';
import { OrderDetail } from '../../order.detail/entities/order-detail.entity';

@Entity('orders')
export class Order {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'uuid' })
  restaurantId: string;

  @ManyToOne(() => Restaurant, (restaurant) => restaurant.orders)
  restaurant: Restaurant;

  @Column({ type: 'uuid' })
  userId: string;

  @ManyToOne(() => User, (user) => user.orders)
  user: User;

  @Column()
  status: string;

  @Column({ type: 'float' })
  totalPrice: number;

  @Column({ nullable: true })
  orderTime: Date;

  @Column({ nullable: true })
  deliveryTime: Date;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @OneToMany(() => OrderDetail, (orderDetail) => orderDetail.order)
  orderDetails: OrderDetail[];
}
