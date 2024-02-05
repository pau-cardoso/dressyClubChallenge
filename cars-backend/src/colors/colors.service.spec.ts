import { Test, TestingModule } from '@nestjs/testing';
import { ColorsService } from './colors.service';
import { Model } from 'mongoose';
import { Color } from './schemas/color.schema';
import { getModelToken } from '@nestjs/mongoose';

const mockColor = {
  name: 'Blue',
};

describe('ColorsService', () => {
  let service: ColorsService;
  let model: Model<Color>;

  const colorsArray = [
    {
      name: 'Blue',
    },
    {
      name: 'Red',
    },
  ];

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ColorsService,
        {
          provide: getModelToken('Color'),
          useValue: {
            new: jest.fn().mockResolvedValue(mockColor),
            constructor: jest.fn().mockResolvedValue(mockColor),
            create: jest.fn(),
            save: jest.fn(),
            exec: jest.fn(),
            find: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<ColorsService>(ColorsService);
    model = module.get<Model<Color>>(getModelToken('Color'));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should return all colors', async () => {
    jest.spyOn(model, 'find').mockReturnValue({
      exec: jest.fn().mockResolvedValueOnce(colorsArray),
    } as any);
    const colors = await service.findAll();
    expect(colors).toEqual(colorsArray);
  });

  it('should insert a new color', async () => {
    jest.spyOn(model, 'create').mockImplementationOnce(() =>
      Promise.resolve({
        name: 'Blue',
      } as any),
    );
    const newColor = await service.createColor({
      name: 'Blue',
    });
    expect(newColor).toEqual(mockColor);
  });
});
