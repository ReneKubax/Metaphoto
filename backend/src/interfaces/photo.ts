import { Album } from './album';
import { User } from './user';
export interface Photo {
    id: number;
    title: string;
    url: string;
    thumbnailUrl: string;
    albumId: number;
  }
  
  export interface EnrichedPhoto extends Photo {
    album: Album & { user: User };
  }
  