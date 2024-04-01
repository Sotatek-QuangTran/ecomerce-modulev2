import { ControllerCustom } from 'src/decorators';
import { WhitePaperService } from '../services/whitepaper.service';
import { Get } from '@nestjs/common';

@ControllerCustom({
  api_tag: 'Whitepaper',
  prefix: 'whitepaper',
})
export class WhitePaperController {
  constructor(private whitepaperSerivce: WhitePaperService) {}

  @Get('/list')
  async getList() {
    return { data: await this.whitepaperSerivce.find() };
  }
}
