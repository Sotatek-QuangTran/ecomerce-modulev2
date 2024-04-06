import type { NamingStrategyInterface } from 'typeorm';
import { DefaultNamingStrategy } from 'typeorm';
import { snakeCase } from 'typeorm/util/StringUtils';

export class SnakeNamingStrategy
  extends DefaultNamingStrategy
  implements NamingStrategyInterface
{
  tableName(className: string, customName: string | undefined): string {
    return customName ?? snakeCase(className.replace("Entity", ""));
  }

  columnName(propertyName: string, customName: string): string {
    return customName ?? snakeCase(propertyName);
  }
}
