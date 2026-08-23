import fs from 'fs';
import path from 'path';

const files = [
  'dist/client/sitemap-index.xml',
  'dist/client/sitemap-0.xml',
  '.vercel/output/static/sitemap-index.xml',
  '.vercel/output/static/sitemap-0.xml'
];

files.forEach((file) => {
  const filePath = path.resolve(file);
  if (fs.existsSync(filePath)) {
    const content = fs.readFileSync(filePath, 'utf-8');
    const formatted = content
      .replace(/></g, '>\n<')
      .replace(/<sitemap>/g, '  <sitemap>')
      .replace(/<\/sitemap>/g, '  </sitemap>')
      .replace(/<loc>/g, '    <loc>')
      .replace(/<url>/g, '  <url>')
      .replace(/<\/url>/g, '  </url>');
    fs.writeFileSync(filePath, formatted);
  }
});
