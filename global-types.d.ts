import { PoolClient } from 'pg';

declare global {

  namespace Express {

    export interface Request {
      db: PoolClient
    }
  }
}
