import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Body,
  Param,
  ParseUUIDPipe,
} from '@nestjs/common';
import { CreateItemDto } from './dto/create-item.dto';
// import { Item } from './item.model';
import { Item } from '../entities/item.entity';
import { ItemsService } from './items.service';

@Controller('items')
export class ItemsController {
  constructor(private readonly ItemsService: ItemsService) {}

  @Get()
  async findAll(): Promise<Item[]> {
    return await this.ItemsService.findAll();
  }

  @Get(':id') // /item/id
  async findById(@Param('id', ParseUUIDPipe) id: string): Promise<Item> {
    return await this.ItemsService.findById(id);
  }

  @Post()
  async create(@Body() createItemDto: CreateItemDto): Promise<Item> {
    return await this.ItemsService.create(createItemDto);
  }

  @Patch(':id')
  async updateStatus(@Param('id', ParseUUIDPipe) id: string): Promise<Item> {
    return await this.ItemsService.updateStatus(id);
  }

  @Delete(':id')
  async delete(@Param('id', ParseUUIDPipe) id: string): Promise<void> {
    return await this.ItemsService.delete(id);
  }
}
