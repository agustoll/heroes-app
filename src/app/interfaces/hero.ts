export interface HeroDto {
  id: number;
  name: string;
  slug: string;
  appearance: AppearanceDto;
}

export interface AppearanceDto {
  gender: string;
  race: string;
  eyeColor: string;
  hairColor: string;
}

export interface Hero {
  id: number;
  name: string;
  slug: string;
  hairColor: string;
}
