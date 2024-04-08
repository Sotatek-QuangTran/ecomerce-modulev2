import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { WhitePaperEntity } from '../entities/whitepaper.entity';
import { Repository } from 'typeorm';
import { WhitePaperCreateDto } from '../dtos/whitepaper-req.dto';

@Injectable()
export class WhitePaperService {
  constructor(
    @InjectRepository(WhitePaperEntity)
    private whitepaperEntity: Repository<WhitePaperEntity>,
  ) {}

  async create(data: WhitePaperCreateDto) {
    const check = this.whitepaperEntity.findOne({
      where: { id: data.parentId },
    });
    if (!check) {
      throw new BadRequestException('ParentId not found');
    }
    return await this.whitepaperEntity.save(this.whitepaperEntity.create(data));
  }

  async find() {
    return await this.whitepaperEntity.find({
      relations: ['childs'],
    });
  }
}
