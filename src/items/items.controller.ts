import { Controller } from '@nestjs/common';

@Controller('items')
export class ItemsController {
  @Get()
  findAll() {
    return 'This is findAll';
  }
}
