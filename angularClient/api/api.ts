export * from './movie.service';
import { MovieService } from './movie.service';
export * from './user.service';
import { UserService } from './user.service';
export const APIS = [MovieService, UserService];
