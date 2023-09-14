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
  findAll(): Item[] {
    return this.ItemsService.findAll();
  }

  @Get(':id') // /item/id
  findById(@Param('id', ParseUUIDPipe) id: string): Item {
    return this.ItemsService.findById(id);
  }

  @Post()
  async create(@Body() createItemDto: CreateItemDto): Promise<Item> {
    return await this.ItemsService.create(createItemDto);
  }

  @Patch(':id')
  updateStatus(@Param('id', ParseUUIDPipe) id: string): Item {
    return this.ItemsService.updateStatus(id);
  }

  @Delete(':id')
  delete(@Param('id', ParseUUIDPipe) id: string): void {
    return this.ItemsService.delete(id);
  }
}
