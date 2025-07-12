const fs = require('fs');
const path = require('path');

const ITEMS_DIR = path.join(__dirname, '..', 'items');
const PUBLIC_DIR = path.join(__dirname, '..', 'public');
const BG_DIR = path.join(PUBLIC_DIR, 'bg');

function ensureDir(dir) {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
}

function buildCharacters() {
  const characters = {};
  
  if (!fs.existsSync(ITEMS_DIR)) {
    console.error('items/ directory not found');
    return;
  }

  const itemDirs = fs.readdirSync(ITEMS_DIR).filter(item => {
    const itemPath = path.join(ITEMS_DIR, item);
    return fs.statSync(itemPath).isDirectory();
  });

  for (const slug of itemDirs) {
    const itemPath = path.join(ITEMS_DIR, slug);
    const greetingPath = path.join(itemPath, 'first msg.txt');
    const promptPath = path.join(itemPath, 'first prompt.txt');
    const imagePath = path.join(itemPath, 'image.jpg');

    if (fs.existsSync(greetingPath) && fs.existsSync(promptPath) && fs.existsSync(imagePath)) {
      const greeting = fs.readFileSync(greetingPath, 'utf-8').trim();
      const personaPrompt = fs.readFileSync(promptPath, 'utf-8').trim();
      
      characters[slug] = {
        greeting,
        personaPrompt,
        bg: `/bg/${slug}.jpg`
      };

      ensureDir(BG_DIR);
      const destImagePath = path.join(BG_DIR, `${slug}.jpg`);
      fs.copyFileSync(imagePath, destImagePath);
      console.log(`Copied ${slug}/image.jpg -> public/bg/${slug}.jpg`);
    } else {
      console.warn(`Skipping ${slug}: missing required files`);
    }
  }

  const charactersPath = path.join(__dirname, '..', 'characters.json');
  fs.writeFileSync(charactersPath, JSON.stringify(characters, null, 2));
  console.log('Generated characters.json');
}

buildCharacters();