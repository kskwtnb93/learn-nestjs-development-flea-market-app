import { User } from './../entities/user.entity';
import { Item } from '../entities/item.entity';
import { EntityRepository, Repository } from 'typeorm';
import { CreateItemDto } from './dto/create-item.dto';
import { ItemStatus } from './item-status.enum';

@EntityRepository(Item)
export class ItemRepository extends Repository<Item> {
  async createItem(createItemDto: CreateItemDto, user: User): Promise<Item> {
    const { name, price, description } = createItemDto;
    const currentTime = new Date().toISOString();
    // this: Repository クラスの create メソッド
    const item = this.create({
      name,
      price,
      description,
      status: ItemStatus.ON_SALE,
      createdAt: currentTime,
      updatedAt: currentTime,
      user,
    });

    await this.save(item); // Repository クラスの save メソッド

    return item;
  }
}
