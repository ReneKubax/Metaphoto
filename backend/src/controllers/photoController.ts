import { Request, Response } from 'express';
import axios from 'axios';
import { Photo, EnrichedPhoto } from '../interfaces/photo';
import { Album } from '../interfaces/album';
import { User } from '../interfaces/user';

const USERS_API = 'https://jsonplaceholder.typicode.com/users';
const ALBUMS_API = 'https://jsonplaceholder.typicode.com/albums';
const PHOTOS_API = 'https://jsonplaceholder.typicode.com/photos';

/**
 * Retrieves a photo and enriches it with its associated album and user data.
 *
 * @param {Request} req - The incoming HTTP request.
 * @param {Response} res - The outgoing HTTP response.
 * @return {Promise<void>} A promise that resolves when the enriched photo data has been sent in the response.
 */
export const getEnrichedPhoto = async (req: Request, res: Response) => {
  try {
    const photoId = req.params.id;

    const photoResponse = await axios.get<Photo>(`${PHOTOS_API}/${photoId}`);
    const photo = photoResponse.data;

    const albumResponse = await axios.get<Album>(`${ALBUMS_API}/${photo.albumId}`);
    const album = albumResponse.data;

    const userResponse = await axios.get<User>(`${USERS_API}/${album.userId}`);
    const user = userResponse.data;

    const enrichedPhoto: EnrichedPhoto = {
      ...photo,
      album: {
        ...album,
        user
      }
    };

    res.json(enrichedPhoto);
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      res.status(error.response.status).json({ message: 'Error fetching data', error: error.response.data });
    } else {
      res.status(500).json({ message: 'Error fetching data', error: (error as Error).message });
    }
  }
};

/**
 * Retrieves filtered photos based on provided query parameters.
 *
 * @param {Request} req - The incoming HTTP request.
 * @param {Response} res - The outgoing HTTP response.
 * @return {Promise<void>} A promise that resolves when the filtered photos data has been sent in the response.
 */
export const getFilteredPhotos = async (req: Request, res: Response) => {
  try {
    const { title, 'album.title': albumTitle, 'album.user.email': userEmail, limit = 25, offset = 0 } = req.query;

    const [photosResponse, albumsResponse, usersResponse] = await Promise.all([
      axios.get<Photo[]>(PHOTOS_API),
      axios.get<Album[]>(ALBUMS_API),
      axios.get<User[]>(USERS_API)
    ]);

    let photos = photosResponse.data;
    const albums = albumsResponse.data;
    const users = usersResponse.data;

    if (title) {
      photos = photos.filter(photo => photo.title.includes(title as string));
    }

    if (albumTitle) {
      const filteredAlbums = albums.filter(album => album.title.includes(albumTitle as string)).map(album => album.id);
      photos = photos.filter(photo => filteredAlbums.includes(photo.albumId));
    }

    if (userEmail) {
      const filteredUsers = users.filter(user => user.email === userEmail);
      const filteredAlbums = albums.filter(album => filteredUsers.some(user => user.id === album.userId)).map(album => album.id);
      photos = photos.filter(photo => filteredAlbums.includes(photo.albumId));
    }

    const enrichedPhotos: EnrichedPhoto[] = await Promise.all(photos.slice(Number(offset), Number(offset) + Number(limit)).map(async photo => {
      const album = albums.find(a => a.id === photo.albumId)!;
      const user = users.find(u => u.id === album.userId)!;

      return {
        ...photo,
        album: {
          ...album,
          user
        }
      };
    }));

    res.json(enrichedPhotos);
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      res.status(error.response.status).json({ message: 'Error fetching data', error: error.response.data });
    } else {
      res.status(500).json({ message: 'Error fetching data', error: (error as Error).message });
    }
  }
};
