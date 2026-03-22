const fs = require('fs');
const path = require('path');

function walkDir(dir, callback) {
  fs.readdirSync(dir).forEach(f => {
    let dirPath = path.join(dir, f);
    let isDirectory = fs.statSync(dirPath).isDirectory();
    isDirectory ? walkDir(dirPath, callback) : callback(path.join(dir, f));
  });
}

function fixStyleTags(filePath) {
  if (!filePath.endsWith('.tsx') && !filePath.endsWith('.jsx')) return;
  const content = fs.readFileSync(filePath, 'utf8');
  
  // Replace multiline <style>{`...`}</style>
  let newContent = content.replace(/<style>\{`([\s\S]*?)`\}<\/style>/g, '<style dangerouslySetInnerHTML={{ __html: `$1` }} />');
  
  // Replace single line <style>{`...`}</style>
  // Handled by the same regex because [\s\S]*? matches across lines.

  if (newContent !== content) {
    fs.writeFileSync(filePath, newContent, 'utf8');
    console.log('Fixed', filePath);
  }
}

walkDir(path.join(__dirname, 'src', 'components'), fixStyleTags);
