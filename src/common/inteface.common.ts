export interface IPaginate {
  take: number;
  skip: number;
  order?: { [key: string]: string };
}
