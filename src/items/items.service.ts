import { User } from './../entities/user.entity';
import { ItemRepository } from './item.repository';
import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
// import { Item } from './item.model';
import { Item } from '../entities/item.entity';
import { ItemStatus } from './item-status.enum';
import { CreateItemDto } from './dto/create-item.dto';
// import { v4 as uuid } from 'uuid';

@Injectable()
export class ItemsService {
  constructor(private readonly itemRepository: ItemRepository) {}

  private items: Item[] = [];

  async findAll(): Promise<Item[]> {
    // return this.items;
    return await this.itemRepository.find();
  }

  async findById(id: string): Promise<Item> {
    // const found = this.items.find((item) => item.id === id);
    const found = await this.itemRepository.findOne(id);
    if (!found) {
      throw new NotFoundException();
    }
    return found;
  }

  async create(createItemDto: CreateItemDto, user: User): Promise<Item> {
    // const item: Item = {
    //   id: uuid(),
    //   ...createItemDto,
    //   status: ItemStatus.ON_SALE,
    // };
    // this.items.push(item);
    // return item;
    return await this.itemRepository.createItem(createItemDto, user);
  }

  async updateStatus(id: string, user: User): Promise<Item> {
    // const item = this.findById(id);
    const item = await this.findById(id);
    if (item.userId === user.id) {
      throw new BadRequestException('自分の商品を購入することはできません。');
    }
    item.status = ItemStatus.SOLD_OUT;
    item.updatedAt = new Date().toISOString();
    await this.itemRepository.save(item);
    return item;
  }

  async delete(id: string, user: User): Promise<void> {
    // this.items = this.items.filter((item) => item.id !== id);
    const item = await this.findById(id);
    if (item.userId !== user.id) {
      throw new BadRequestException('他人の商品を削除することはできません。');
    }
    await this.itemRepository.delete({ id });
  }
}
