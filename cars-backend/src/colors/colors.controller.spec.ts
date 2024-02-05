import { Test, TestingModule } from '@nestjs/testing';
import { ColorsController } from './colors.controller';
import { ColorsService } from './colors.service';
import { CreateColorDto } from './dto/create-color.dto';
import { Color } from './schemas/color.schema';

describe('ColorsController', () => {
  let controller: ColorsController;
  let service: ColorsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ColorsController],
      providers: [
        {
          provide: ColorsService,
          useValue: {
            createColor: jest
              .fn()
              .mockImplementation((createColorDto: CreateColorDto) => {
                return {
                  _id: '1',
                  name: createColorDto.name,
                };
              }),
            findAll: jest.fn().mockImplementation(() => {
              return [
                { _id: '1', name: 'Blue' },
                { _id: '2', name: 'Red' },
              ];
            }),
          },
        },
      ],
    }).compile();

    controller = module.get<ColorsController>(ColorsController);
    service = module.get<ColorsService>(ColorsService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create', () => {
    it('should create a color', async () => {
      const createColorDto: CreateColorDto = { name: 'Green' };
      const createdColor: Color = await controller.create(createColorDto);
      expect(createdColor).toBeDefined();
      // expect(createdColor._id).toBeDefined();
      expect(createdColor.name).toEqual(createColorDto.name);
      expect(service.createColor).toHaveBeenCalledWith(createColorDto);
    });
  });

  describe('findAll', () => {
    it('should return an array of colors', async () => {
      const colors: Color[] = await controller.findAll();
      expect(colors).toBeDefined();
      expect(colors.length).toBe(2);
      expect(colors[0].name).toEqual('Blue');
      expect(colors[1].name).toEqual('Red');
      expect(service.findAll).toHaveBeenCalled();
    });
  });
});
