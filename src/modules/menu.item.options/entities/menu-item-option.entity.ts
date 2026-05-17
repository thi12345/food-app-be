import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { MenuItem } from '../../menu.items/entities/menu-item.entity';
import { OrderDetail } from '../../order.detail/entities/order-detail.entity';

@Entity('menu_item_options')
export class MenuItemOption {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'uuid' })
  menuItemId: string;

  @ManyToOne(() => MenuItem, (menuItem) => menuItem.options)
  menuItem: MenuItem;

  @Column()
  title: string;

  @Column({ nullable: true })
  description: string;

  @Column({ type: 'float' })
  additionalPrice: number;

  @Column({ nullable: true })
  optionalDescription: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @OneToMany(() => OrderDetail, (orderDetail) => orderDetail.menuItemOption)
  orderDetails: OrderDetail[];
}
