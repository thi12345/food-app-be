import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Menu } from '../../menus/entities/menu.entity';
import { MenuItemOption } from '../../menu.item.options/entities/menu-item-option.entity';
import { OrderDetail } from '../../order.detail/entities/order-detail.entity';

@Entity('menu_items')
export class MenuItem {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'uuid' })
  menuId: string;

  @ManyToOne(() => Menu, (menu) => menu.menuItems)
  menu: Menu;

  @Column()
  title: string;

  @Column({ nullable: true })
  description: string;

  @Column({ type: 'float' })
  basePrice: number;

  @Column({ nullable: true })
  image: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @OneToMany(() => MenuItemOption, (option) => option.menuItem)
  options: MenuItemOption[];

  @OneToMany(() => OrderDetail, (orderDetail) => orderDetail.menuItem)
  orderDetails: OrderDetail[];
}
