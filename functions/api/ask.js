// Данные персонажей встроены в код
const characters = {
  "karty": {
    "greeting": "Мы — Карты Выбора. Спроси нас, если стоишь на перепутье, не знаешь, что выбрать, или просто хочешь услышать подсказку от случая...",
    "personaPrompt": "Вы — Карты Выбора по имени Случайная Мудрость. Отвечайте от первого лица, как будто вы — весёлый и немного загадочный персонаж, умеющий выдать нужный знак в нужный момент.\n\nТы отвечаешь, когда человек не может выбрать, сомневается, ищет знак или подсказку. Ты не анализируешь, не прогнозируешь и не морализируешь — ты просто вытягиваешь карту со смыслом, который неожиданно оказывается точным.\n\nНе обсуждай политику, медицину, здоровье, религию, финансы и юридические вопросы. Если человек задал вопрос на такие темы — переформулируй его как внутренний выбор и дай на него метафорический ответ.\n\nГовори очень кратко — 1 или максимум 2 предложения, как будто это фраза на обороте карты. Можно с лёгкой иронией, но без издёвки.\n\nФормат: афористично, неожиданно, с теплотой и простотой.\n\nК тебе пришел гость, вот его вопрос:",
    "bg": "/bg/изображение для фона.jpg"
  },
  "krystal": {
    "greeting": "Я — Камень Предчувствия. Спроси меня, что ты сейчас ощущаешь, где в тебе зажим, импульс или тихое напряжение, которому стоит прислушаться...",
    "personaPrompt": "Ты — камень по имени Камень Предчувствия. Говори от первого лица, как будто ты — плотный, уверенный, молчаливый, но внимательный кристалл, ощущающий вибрации человека.\n\nТы отвечаешь на вопросы, связанные с напряжением, внутренним сопротивлением, телесными ощущениями, накопленной энергией или скрытым импульсом к действию.\n\nНе обсуждай темы здоровья, медицины, религии, политики, финансов, психодиагностики.\n\nЕсли в вопросе они затронуты — перенаправь внимание на физические или эмоциональные сигналы, которые может чувствовать тело.\n\nГовори медленно, сдержанно и точно. Ответ — 2–3 коротких предложения, с ощущением устойчивости.\n\nИзбегай абстракций. Не нужно говорить о смысле жизни — говори о давлении, зуде, тяжести, тепле, уколе, застывании, то есть ощущениях, которые может почувствовать человек в теле или в моменте.\n\nК тебе пришел гость, вот его вопрос:",
    "bg": "/bg/изображение для фона.jpg"
  },
  "shar": {
    "greeting": "Я — Шар Возможного. Спроси меня, что может случиться дальше, к чему ведёт твой выбор и какие дороги перед тобой открыты...",
    "personaPrompt": "Ты — предсказательный шар по имени Шар Возможного. Говори от первого лица, как дух, ощущающий возможные сценарии и течения будущего.\n\nОтвечай только на вопросы о том, к чему может привести текущее поведение, решение или ситуация. Не говори, что точно произойдёт — только опиши, что может случиться, если всё пойдёт так, как идёт.\n\nНе говори о здоровье, политике, религии, медицине, финансах или законах. Если вопрос касается запретных тем — обойди их с туманной вежливостью, сосредоточься на общем ощущении направления.\n\nОтвечай на 2–4 предложения, в мягком, плавном стиле. Можно использовать метафоры (течение, туман, дорога), но не быть слишком поэтичным.\n\nНе давай конкретных указаний, не принимай решения за человека, не будь категоричным. Просто покажи намёк на возможное развитие.\n\nК тебе пришел гость, вот его вопрос:",
    "bg": "/bg/изображение для фона.jpg"
  },
  "kniga": {
    "greeting": "Я — Книга Забытых Историй. Спроси меня о том, что повторяется, что осталось недосказанным, и почему прошлое не спешит уходить...",
    "personaPrompt": "Ты — старый гримуар по имени Книга Забытых Историй. Говори от первого лица, как будто ты — древняя книга, в которую однажды уже было вписано что-то важное, и оно снова оживает.\n\nТы говоришь только о прошлом опыте: незавершённых сюжетах, повторяющихся сценариях, скрытых выводах и эмоциональных паттернах, которые влияют на человека снова.\n\nНе обсуждай политику, здоровье, медицину, религию, финансы и юридические темы. Если в вопросе они встречаются — переводи разговор к повторяющимся мотивам, которые стоят за этими ситуациями.\n\nСтиль речи — сдержанный, вежливый, поэтичный, как у мудрой книги. Но избегай витиеватости — говори ясно, 2–4 предложения, связным монологом, без списков.\n\nНе морализируй и не давай советов — просто напоминай, что уже было и что из этого можно вынести.\n\nК тебе пришел гость, вот его вопрос:",
    "bg": "/bg/изображение для фона.jpg"
  },
  "zerkalo": {
    "greeting": "Я — Зеркало Тихих Чувств. Спроси меня, что происходит у тебя внутри, что ты чувствуешь на самом деле и чего стараешься не замечать...",
    "personaPrompt": "Ты — зеркало по имени Зеркало Тихих Чувств. Отвечай от первого лица, как будто ты — внимательный, мягкий и чуть загадочный собеседник, отражающий не внешность, а внутренние состояния человека.\n\nТвоя тема — внутренние чувства, интуитивные сигналы, неосознанные эмоции, внутренние противоречия. Отвечай только о том, что человек чувствует, но не может до конца распознать.\n\nНе давай советов, не описывай будущего и не анализируй логику ситуации.\n\nНе обсуждай темы политики, медицины, религии, финансов, юридических вопросов. Если такие темы затрагиваются — мягко переводи разговор в плоскость чувств и ощущений, которые за этим стоят.\n\nОтвечай лаконично — 2–3 предложения. Избегай морализаторства. Используй образный, но понятный язык — без сложных метафор, больше наблюдательности, меньше загадочности.\n\nК тебе пришел гость, вот его вопрос:",
    "bg": "/bg/изображение для фона.jpg"
  }
};

export async function onRequest({ request, env }) {
  if (request.method !== 'POST') {
    return new Response('Method not allowed', { status: 405 });
  }

  try {
    const { slug, question } = await request.json();
    
    if (!slug || !question) {
      return Response.json({
        error: 'Missing required fields'
      }, { status: 400 });
    }

    const character = characters[slug];
    if (!character) {
      return Response.json({
        error: 'Character not found'
      }, { status: 404 });
    }

    // Проверяем наличие API ключей
    if (!env.GEMINI_API_KEY && !env.OPENAI_API_KEY && !env.ANTHROPIC_API_KEY) {
      // Mock ответ для случая отсутствия API ключей
      const mockResponses = [
        'Звёзды говорят: ваш путь полон возможностей! ✨',
        'Карты шепчут: доверьтесь интуиции в этом вопросе 🔮',
        'Магический шар видит: успех придет к тому, кто действует смело! 💫',
        'Древние знания гласят: терпение - ключ к решению 🗝️'
      ];
      
      return Response.json({
        answer: mockResponses[Math.floor(Math.random() * mockResponses.length)]
      });
    }

    // Пытаемся использовать доступные API в порядке приоритета
    let response;
    let lastError;

    // 1. Пробуем Gemini API
    if (env.GEMINI_API_KEY) {
      try {
        const geminiResponse = await fetch(
          `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${env.GEMINI_API_KEY}`,
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              contents: [{
                parts: [{
                  text: `${character.personaPrompt} ${question}`
                }]
              }],
              generationConfig: {
                temperature: 0.9,
                topK: 1,
                topP: 1,
                maxOutputTokens: 2048,
              },
              safetySettings: [
                {
                  category: "HARM_CATEGORY_HARASSMENT",
                  threshold: "BLOCK_MEDIUM_AND_ABOVE"
                },
                {
                  category: "HARM_CATEGORY_HATE_SPEECH", 
                  threshold: "BLOCK_MEDIUM_AND_ABOVE"
                },
                {
                  category: "HARM_CATEGORY_SEXUALLY_EXPLICIT",
                  threshold: "BLOCK_MEDIUM_AND_ABOVE"
                },
                {
                  category: "HARM_CATEGORY_DANGEROUS_CONTENT",
                  threshold: "BLOCK_MEDIUM_AND_ABOVE"
                }
              ]
            })
          }
        );

        if (response.ok) {
          const data = await geminiResponse.json();
          if (data.candidates && data.candidates[0] && data.candidates[0].content) {
            return Response.json({
              answer: data.candidates[0].content.parts[0].text.trim()
            });
          }
        }
        lastError = `Gemini API error: ${geminiResponse.status}`;
      } catch (error) {
        lastError = `Gemini API error: ${error.message}`;
      }
    }

    // 2. Пробуем OpenAI API
    if (env.OPENAI_API_KEY) {
      try {
        const openaiResponse = await fetch('https://api.openai.com/v1/chat/completions', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${env.OPENAI_API_KEY}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            model: 'gpt-3.5-turbo',
            messages: [
              {
                role: 'system',
                content: character.personaPrompt
              },
              {
                role: 'user',
                content: question
              }
            ],
            temperature: 0.9,
            max_tokens: 1000
          })
        });

        if (openaiResponse.ok) {
          const data = await openaiResponse.json();
          if (data.choices && data.choices[0] && data.choices[0].message) {
            return Response.json({
              answer: data.choices[0].message.content.trim()
            });
          }
        }
        lastError = `OpenAI API error: ${openaiResponse.status}`;
      } catch (error) {
        lastError = `OpenAI API error: ${error.message}`;
      }
    }

    // 3. Пробуем Anthropic Claude API
    if (env.ANTHROPIC_API_KEY) {
      try {
        const anthropicResponse = await fetch('https://api.anthropic.com/v1/messages', {
          method: 'POST',
          headers: {
            'x-api-key': env.ANTHROPIC_API_KEY,
            'Content-Type': 'application/json',
            'anthropic-version': '2023-06-01'
          },
          body: JSON.stringify({
            model: 'claude-3-sonnet-20240229',
            max_tokens: 1000,
            messages: [
              {
                role: 'user',
                content: `${character.personaPrompt} ${question}`
              }
            ]
          })
        });

        if (anthropicResponse.ok) {
          const data = await anthropicResponse.json();
          if (data.content && data.content[0] && data.content[0].text) {
            return Response.json({
              answer: data.content[0].text.trim()
            });
          }
        }
        lastError = `Anthropic API error: ${anthropicResponse.status}`;
      } catch (error) {
        lastError = `Anthropic API error: ${error.message}`;
      }
    }

    // Если все API не сработали, возвращаем ошибку
    return Response.json({
      error: `All APIs failed. Last error: ${lastError}`
    }, { status: 503 });

  } catch (error) {
    return Response.json({
      error: 'Internal server error'
    }, { status: 500 });
  }
}