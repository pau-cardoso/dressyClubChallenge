import { Test, TestingModule } from '@nestjs/testing';
import { BrandsController } from './brands.controller';
import { BrandsService } from './brands.service';
import { CreateBrandDto } from './dto/create-brand.dto';
import { Brand } from './schemas/brand.schema';

describe('BrandsController', () => {
  let controller: BrandsController;
  let service: BrandsService;

  const createBrandDto: CreateBrandDto = {
    name: 'Ford',
  };

  const mockBrand = {
    name: 'Ford',
    _id: '1',
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BrandsController],
      providers: [
        {
          provide: BrandsService,
          useValue: {
            createBrand: jest.fn().mockResolvedValue(createBrandDto),
            findAll: jest
              .fn()
              .mockResolvedValue([
                { name: 'Ford' },
                { name: 'Chevy' },
                { name: 'Toyota' },
              ]),
          },
        },
      ],
    }).compile();

    controller = module.get<BrandsController>(BrandsController);
    service = module.get<BrandsService>(BrandsService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create', () => {
    it('should create a new brand', async () => {
      const createSpy = jest
        .spyOn(service, 'createBrand')
        .mockResolvedValueOnce(mockBrand);

      const createdBrand = await controller.create(createBrandDto);
      expect(createSpy).toHaveBeenCalledWith(createBrandDto);
      expect(createdBrand).toBeDefined();
      expect(createdBrand.name).toBe(createBrandDto.name);
    });
  });

  describe('findAll', () => {
    it('should return an array of brands', async () => {
      const brands: Brand[] = await controller.findAll();
      expect(brands).toBeDefined();
      expect(brands.length).toBe(3);
      expect(brands[0].name).toEqual('Ford');
      expect(brands[1].name).toEqual('Chevy');
      expect(brands[2].name).toEqual('Toyota');
      expect(service.findAll).toHaveBeenCalled();
    });
  });
});
