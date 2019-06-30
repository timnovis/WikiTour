import path from 'path';
import fs from 'fs';
import { promisify } from 'util';
import express from 'express';
import { wiki } from './wiki';

const app = express();
const port = process.env.PORT || 3000;
const readFile = promisify(fs.readFile);

app.use(express.static('dist'));

/**
 * JSON endpoint to retrieve locations around a set of coordinates
 */
app.get('/landmarks', async (req, res) => {
  const landmarks = await wiki.search(req.query.lat, req.query.lng);

  res.json(landmarks);
});

/**
 * View endpoint to show home page
 */
app.get('/', (req, res) => {
  res.sendFile(path.resolve(process.cwd() + '/dist/index.html'));
});

/**
 * View endpoint to show location detail page
 */
app.get('/:id', async (req, res) => {
  const { id } = req.params;

  let template = await readFile(path.resolve(process.cwd() + '/dist/detail.html'), 'utf8');

  const { extract, title } = await wiki.getExtract(id);

  /**
   * Replace placeholder in HTML file with paragraphed content from wikipedia
   */
  template = template
    .replace(
      '{{ content }}',
      extract
        .split('\n')
        .map(p => `<p>${p}</p>`)
        .join(''),
    )
    .replace('{{title}}', title)
    .replace('{{title}}', title);

  res.send(template);
});

app.listen(port, () => {
  console.log(`Listening on :${port}`);
});
