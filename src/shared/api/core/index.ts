import { SupabaseClient } from '@supabase/supabase-js';

import { Database } from '@/shared/lib/supabase/database.types';
import { Games } from './games';
import { Auth } from './auth';
import { Users } from './users';
import { Wishlist } from './wishlist';

export class Core {
  public readonly games: Games;
  public readonly auth: Auth;
  public readonly users: Users;
  public readonly wishlist: Wishlist;

  constructor(supabase: SupabaseClient<Database>) {
    this.games = new Games(supabase);
    this.auth = new Auth(supabase);
    this.users = new Users(supabase);
    this.wishlist = new Wishlist(supabase);
  }
}

export { Games } from './games';
export { Auth } from './auth';
export { Users } from './users';
export { Wishlist } from './wishlist';
export type {
  GetGamesOptions,
  GameResponse,
  PriceHistoryRecordResponse,
  GameStoreResponse,
} from './games';
export type {
  OauthLoginResponse,
  OauthRegistrationCompleteResponse,
  OauthRegistrationRequireResponse,
} from './auth';
