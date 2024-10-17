import { serve } from '@hono/node-server';
import { Hono } from 'hono';
import { logger as honoLogger } from 'hono/logger';
import { db } from './db/index.js';
import { zValidator } from '@hono/zod-validator';
import { z } from 'zod';
import { appendFileSync } from 'fs';

const app = new Hono();
app.use(honoLogger());

app.get(
  '/films',
  zValidator(
    'query',
    z.object({
      category: z.string(),
    })
  ),
  async (c) => {
    const { category } = c.req.valid('query');
    const query = `select f.film_id, f.title, f.description, f.rental_duration, f.rental_rate, f.rating, c."name" as category from film f
join film_category fc on f.film_id = fc.film_id
join category c on fc.category_id = c.category_id
where c."name" ilike '${category}'`;
    appendFileSync('./static/queries/boolean-based.txt', `${query}\n`);
    const result = await db.execute(query);
    return c.json({ films: result.rows });
  }
);

const port = 8000;
console.log(`Server is running on: http://localhost:${port}`);

serve({
  fetch: app.fetch,
  port,
});
