import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MenuItemOptionsService } from './menu.item.options.service';
import { MenuItemOptionsController } from './menu.item.options.controller';
import { MenuItemOption } from './entities/menu-item-option.entity';

@Module({
  imports: [TypeOrmModule.forFeature([MenuItemOption])],
  controllers: [MenuItemOptionsController],
  providers: [MenuItemOptionsService],
  exports: [TypeOrmModule],
})
export class MenuItemOptionsModule {}
