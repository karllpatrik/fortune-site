#!/bin/bash

# Скрипт для деплоя на Cloudflare Pages
set -e

echo "🚀 Начинаем деплой на Cloudflare Pages..."

# Проверяем наличие wrangler
if ! command -v wrangler &> /dev/null; then
    echo "❌ Wrangler не найден. Устанавливаем..."
    npm install -g wrangler
fi

# Проверяем аутентификацию
echo "🔐 Проверяем аутентификацию в Cloudflare..."
if ! wrangler whoami &> /dev/null; then
    echo "❌ Не авторизованы в Cloudflare. Выполните: wrangler login"
    exit 1
fi

# Сборка данных
echo "📦 Сборка данных персонажей..."
npm run build:data

# Проверяем наличие необходимых файлов
if [ ! -f "characters.json" ]; then
    echo "❌ Файл characters.json не найден после сборки"
    exit 1
fi

# Проверяем наличие фонового изображения
if [ ! -f "items/f-image.png" ]; then
    echo "⚠️  Внимание: фоновое изображение f-image.png не найдено"
fi

# Деплой
echo "🌐 Загружаем на Cloudflare Pages..."
wrangler pages deploy . --project-name fortune-site

echo "✅ Деплой завершен!"
echo ""
echo "📝 Не забудьте настроить секреты в Cloudflare Dashboard:"
echo "   - GEMINI_API_KEY"
echo "   - GEMINI_MODEL"
echo ""
echo "🔗 Ваш сайт доступен по адресу: https://fortune-site.pages.dev"