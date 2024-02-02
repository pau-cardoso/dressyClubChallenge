import { Test, TestingModule } from '@nestjs/testing';
import { BrandsService } from './brands.service';
import { Model } from 'mongoose';
import { Brand } from './schemas/brand.schema';
import { getModelToken } from '@nestjs/mongoose';

const mockBrand = {
  name: 'Ford',
};

describe('BrandsService', () => {
  let service: BrandsService;
  let model: Model<Brand>;

  const brandsArray = [
    {
      name: 'Ford',
    },
    {
      name: 'Toyota',
    },
  ];

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        BrandsService,
        {
          provide: getModelToken('Brand'),
          useValue: {
            new: jest.fn().mockResolvedValue(mockBrand),
            constructor: jest.fn().mockResolvedValue(mockBrand),
            create: jest.fn(),
            save: jest.fn(),
            exec: jest.fn(),
            find: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<BrandsService>(BrandsService);
    model = module.get<Model<Brand>>(getModelToken('Brand'));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should return all brands', async () => {
    jest.spyOn(model, 'find').mockReturnValue({
      exec: jest.fn().mockResolvedValueOnce(brandsArray),
    } as any);
    const brands = await service.findAll();
    expect(brands).toEqual(brandsArray);
  });

  it('should insert a new brand', async () => {
    jest.spyOn(model, 'create').mockImplementationOnce(() =>
      Promise.resolve({
        name: 'Ford',
      } as any),
    );
    const newBrand = await service.createBrand({
      name: 'Ford',
    });
    expect(newBrand).toEqual(mockBrand);
  });
});
