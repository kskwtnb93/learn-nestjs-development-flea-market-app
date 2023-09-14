import { Item } from 'src/entities/item.entity';
import { EntitiyRepository } from 'typeorm';

@EntitiyRepository(Item)
export class ItemRepository extends Repository<Item> {}
