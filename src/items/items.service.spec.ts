import { ItemRepository } from './item.repository';
import { ItemsService } from './items.service';
import { Test } from 'nestjs/testing';

describe('ItemsServiceTest', () => {
  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        ItemsService,
        {
          provide: ItemRepository,
          useFactory: mockItemRepository,
        },
      ],
    }).compile();

    itemService = module.get<ItemsService>(ItemsService);
    itemRepository = module.get<ItemRepository>(ItemRepository);
  });
});
