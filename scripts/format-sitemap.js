import fs from 'fs';
import path from 'path';

const dirs = [
  'dist/client',
  '.vercel/output/static'
];

dirs.forEach((dir) => {
  const dirPath = path.resolve(dir);
  if (fs.existsSync(dirPath)) {
    const files = fs.readdirSync(dirPath).filter((f) => f.endsWith('.xml'));
    files.forEach((file) => {
      const filePath = path.join(dirPath, file);
      const content = fs.readFileSync(filePath, 'utf-8');
      const formatted = content
        .replace(/></g, '>\n<')
        .replace(/<sitemap>/g, '  <sitemap>')
        .replace(/<\/sitemap>/g, '  </sitemap>')
        .replace(/<loc>/g, '    <loc>')
        .replace(/<url>/g, '  <url>')
        .replace(/<\/url>/g, '  </url>');
      fs.writeFileSync(filePath, formatted);
    });
  }
});
