import * as Knex from 'knex';
import { addTimeStamps } from '../helpers/addTimeStamps';

const TABLE_NAME = 'users';

// tslint:disable-next-line: no-any
export async function up(knex: Knex): Promise<any> {
  await knex.raw('create extension if not exists "uuid-ossp"');

  const tableExists = await knex.schema.hasTable(TABLE_NAME);

  if (!tableExists) {
    await knex.schema
      .createTable(TABLE_NAME, t => {
        t.uuid('id')
          .primary()
          .defaultTo(knex.raw('uuid_generate_v4()'));
        t.string('username').unique().notNullable();
        t.string('avatarUrl');
        t.string('bio', 256);
        t.string('email').unique().notNullable();
        t.string('hash').notNullable();
        t.string('salt').notNullable();
      })
      .then(async () => {
        await addTimeStamps(knex, TABLE_NAME);
      });
  }
}

// tslint:disable-next-line: no-any
export async function down(knex: Knex): Promise<any> {
  await knex.schema.dropTableIfExists(TABLE_NAME);
  await knex.raw('drop extension if exists "uuid-ossp"');
}
