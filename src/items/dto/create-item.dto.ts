import { Type } from 'class-transformer';
import { IsInt, IsNotEmpty, IsString, MaxLength, Min } from 'class-validator';

export class CreateItemDto {
  @IsString() // 文字列かどうか
  @IsNotEmpty() // 1文字以上
  @MaxLength(40) // 40文字以内
  name: string;

  @IsInt() // 数値
  @Min(1) // 1円以上
  @Type(() => Number) // 文字列で渡ってきてもNum型で認識
  price: number;

  @IsString() // 文字列かどうか
  @IsNotEmpty() // 1文字以上
  description: string;
}
