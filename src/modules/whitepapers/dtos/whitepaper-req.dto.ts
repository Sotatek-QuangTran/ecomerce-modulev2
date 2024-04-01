import { ApiProperty } from '@nestjs/swagger';

export class WhitePaperCreateDto {
  @ApiProperty()
  content: string;

  @ApiProperty()
  parentId: number;
}
