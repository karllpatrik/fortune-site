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
    
    // Поддержка как старого, так и нового формата файлов
    const greetingPath = fs.existsSync(path.join(itemPath, 'privetstvie.txt')) 
      ? path.join(itemPath, 'privetstvie.txt')
      : path.join(itemPath, 'first msg.txt');
    
    const promptPath = fs.existsSync(path.join(itemPath, 'prompt.txt'))
      ? path.join(itemPath, 'prompt.txt') 
      : path.join(itemPath, 'first prompt.txt');
    
    const imagePath = path.join(itemPath, 'image.jpg');
    
    // Проверяем наличие основных файлов
    if (fs.existsSync(greetingPath) && fs.existsSync(promptPath)) {
      const greeting = fs.readFileSync(greetingPath, 'utf-8').trim();
      const personaPrompt = fs.readFileSync(promptPath, 'utf-8').trim();
      
      let bgPath;
      if (fs.existsSync(imagePath)) {
        // Если есть индивидуальное изображение
        ensureDir(BG_DIR);
        const destImagePath = path.join(BG_DIR, `${slug}.jpg`);
        fs.copyFileSync(imagePath, destImagePath);
        bgPath = `/bg/${slug}.jpg`;
        console.log(`Copied ${slug}/image.jpg -> public/bg/${slug}.jpg`);
      } else {
        // Используем общее изображение для фона
        const commonImagePath = path.join(ITEMS_DIR, 'изображение для фона.jpg');
        if (fs.existsSync(commonImagePath)) {
          ensureDir(BG_DIR);
          const destImagePath = path.join(BG_DIR, 'изображение для фона.jpg');
          if (!fs.existsSync(destImagePath)) {
            fs.copyFileSync(commonImagePath, destImagePath);
            console.log('Copied common background image');
          }
          bgPath = '/изображение для фона.jpg';
        } else {
          bgPath = `/bg/${slug}.jpg`; // fallback
        }
      }
      
      characters[slug] = {
        greeting,
        personaPrompt,
        bg: bgPath
      };
    } else {
      console.warn(`Skipping ${slug}: missing required files (greeting: ${fs.existsSync(greetingPath)}, prompt: ${fs.existsSync(promptPath)})`);
    }
  }

  const charactersPath = path.join(__dirname, '..', 'characters.json');
  fs.writeFileSync(charactersPath, JSON.stringify(characters, null, 2));
  console.log('Generated characters.json');
}

buildCharacters();