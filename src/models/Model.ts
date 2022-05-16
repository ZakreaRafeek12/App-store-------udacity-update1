import bcrypt from 'bcrypt';
import db from '../database';
import User from '../types/user.type';

class Model {
  constructor(public table: string) {}
  // create
  async create(user: User): Promise<User> 
  {
    try 
    {
      // open connection with DB
      const conn = await db.connect();
      const data_1 = Object.keys(user);
      const sql = `INSERT INTO ${this.table} (${data_1.join(',')})
        values (${Array.from(
          { length: data_1.length },
          (e, i) => `$${i + 1}`
        )}) returning *`;
      // run query
      const res = await conn.query(sql, Object.values(user));
      // release connection
      conn.release();
      // return created
      return res.rows[0];
    } catch (error) {
      throw new Error(`Unable to create ${this.table.slice(0, -1)}`);
    }
  }

  // get all
  async getAll(): Promise<User[]> 
  {
    try {
      const conn = await db.connect();
      const sql = `SELECT * FROM ${this.table}`;
      const res = await conn.query(sql);
      conn.release();
      return res.rows;
    } catch (error) {
      throw new Error(
        `Unable to get ${this.table}: ${(error as Error).message}`
      );
    }
  }

  // get specific one
  async getOne(id: string): Promise<User> 
  {
    try 
    {
      const conn = await db.connect();
      const sql = `SELECT * FROM ${this.table} WHERE id=($1)`;
      const res = await conn.query(sql, [id]);
      conn.release();
      return res.rows[0];
    } catch (error) {
      throw new Error(
        `Unable to get ${this.table.slice(0, -1)}:${id}, ${
          (error as Error).message
        }`
      );
    }
  }

  // update one
  async updateOne(id: string, u: User): Promise<User> 
  {
    try 
    {
      const conn = await db.connect();
      const sql = `
      UPDATE ${this.table}
      SET ${Object.keys(u)
        .map((e, i) => `${e}=$${i + 1}`)
        .join(',')}
      
      WHERE id=${id}
      RETURNING *`;
      const res = await conn.query(sql, Object.values(u));
      conn.release();
      return res.rows[0];
    } catch (error) {
      throw new Error(
        `Unable to update ${this.table.slice(0, -1)}:${u.firstName} ${
          u.lastName
        }, ${(error as Error).message} `
      );
    }
  }

  // delete one
  async deleteOne(id: string): Promise<User> 
  {
    try 
    {
      const conn = await db.connect();
      const sql = `DELETE FROM ${this.table}
      WHERE id=$1
      RETURNING *`;
      const res = await conn.query(sql, [id]);
      conn.release();
      return res.rows[0];
    } catch (error) {
      throw new Error(`Unable to delete ${this.table.slice(0, -1)}: ${id}, ${
        (error as Error).message
      };
    )`);
    }
  }

  // authenticate user
  // hash Password
  async hashPassword(password: string): Promise<string> 
  {
    const salt = await bcrypt.genSalt(10);
    const hash_pass = await bcrypt.hash(password, salt);
    return hash_pass;
  }
}

export default Model;
