import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WhitePaperEntity } from './entities/whitepaper.entity';
import { WhitePaperService } from './services/whitepaper.service';
import { WhitePaperController } from './controllers/whitepaper.controller';

@Module({
  imports: [TypeOrmModule.forFeature([WhitePaperEntity])],
  providers: [WhitePaperService],
  controllers: [WhitePaperController],
})
export class WhitePaperModule {}
