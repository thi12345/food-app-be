import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Order } from '../../orders/entities/order.entity';
import { Menu } from '../../menus/entities/menu.entity';
import { MenuItem } from '../../menu.items/entities/menu-item.entity';
import { MenuItemOption } from '../../menu.item.options/entities/menu-item-option.entity';

@Entity('order_details')
export class OrderDetail {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'uuid' })
  orderId: string;

  @ManyToOne(() => Order, (order) => order.orderDetails)
  order: Order;

  @Column({ type: 'uuid', nullable: true })
  menuId: string;

  @ManyToOne(() => Menu, (menu) => menu.orderDetails, { nullable: true })
  menu: Menu;

  @Column({ type: 'uuid', nullable: true })
  menuItemId: string;

  @ManyToOne(() => MenuItem, (menuItem) => menuItem.orderDetails, { nullable: true })
  menuItem: MenuItem;

  @Column({ type: 'uuid', nullable: true })
  menuItemOptionId: string;

  @ManyToOne(() => MenuItemOption, (option) => option.orderDetails, { nullable: true })
  menuItemOption: MenuItemOption;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
