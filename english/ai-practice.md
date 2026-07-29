# Тренировка грамматики и речи через ИИ

> Платформы: [ChatGPT](https://chat.openai.com/) · [Ollama](../ai/ollama.md) · [Cursor](../ai/cursor.md) · [Kiro](../ai/kiro.md) · [English Grammar](README.md)

ИИ не заменяет учебник и живую практику, но хорошо дополняет их: даёт упражнения по запросу, объясняет ошибки, ведёт диалог и подстраивается под ваш уровень. Ниже — сценарии для **ChatGPT**, **Ollama**, **Cursor** и **Kiro**.

---

## Что можно тренировать

| Навык | ChatGPT | Ollama | Cursor / Kiro |
|-------|---------|--------|---------------|
| Грамматика | ✓ упражнения, проверка | ✓ локально, приватно | ✓ Chat в IDE |
| Письмо | ✓ исправление текстов | ✓ | ✓ правка в `.md` |
| Речь | ✓ голосовой режим | ✗ (только текст) | ✗ (только текст) |
| Лексика | ✓ | ✓ | ✓ |
| Код + English | ограниченно | ✓ в терминале | ✓ контекст проекта |

Подробнее об инструментах: [ИИ в разработке](../ai/README.md).

---

## Настройка чата (системный промпт)

Создайте новый чат и вставьте в **первое сообщение** — это «роль репетитора»:

```
You are my English tutor. My level is A2–B1. I am a developer.

Rules:
1. Answer in English, but explain grammar in Russian when I ask.
2. Correct every mistake in my messages. Show: wrong → correct → short rule.
3. Keep answers short (3–5 sentences) unless I ask for more.
4. Use examples from IT: code, Git, Laravel, meetings, emails.
5. Don't give me full answers to exercises — give hints first.
6. At the end of each reply, ask one short follow-up question in English.
```

Уровень меняйте: *A1*, *B1*, *B2*. Тему контекста — под себя (маркетинг, дизайн и т.д.).

### Ollama (локально)

```bash
ollama run llama3.2
```

Вставьте тот же system prompt в первое сообщение. Данные не уходят в облако — удобно для личных заметок.

### Cursor

Откройте Chat (`Ctrl+L`), вставьте промпт. Для практики письма — создайте `english-practice.md` и просите исправлять абзацы inline (`Ctrl+K`).

### Kiro

Используйте **Agentic Chat** с тем же промптом. Для регулярной практики добавьте **steering**: «When I write in English, correct grammar and explain in Russian».

---

## Грамматика: готовые промпты

### 1. Объяснение темы

```
Explain Present Perfect vs Past Simple for A2 level.
Give 5 examples about work and 3 common mistakes Russian speakers make.
Explain in Russian, examples in English.
```

Темы из книги: [Present Perfect](tenses.md), [модальные](modals.md), [условные](sentence.md).

### 2. Упражнения с проверкой

```
Give me 10 gap-fill exercises on "used to vs be used to".
Wait for my answers. Then check each one and explain errors in Russian.
```

Варианты:
- *Transformations* — перепиши предложение в другом времени
- *Error correction* — найди ошибку в предложении
- *Multiple choice* — выбери правильный вариант

### 3. Мини-тест по разделу

```
Test me on articles (a/an/the/zero). 15 questions, mixed difficulty.
One question at a time. Don't show the score until the end.
```

После теста:

```
Show my weak points and give 5 extra exercises only on those topics.
Link each mistake to a grammar rule in one sentence.
```

### 4. Сравнение двух тем

```
Compare "will" and "going to" with a table and 6 example pairs.
Then give 8 sentences where I must choose will or going to.
Context: planning a software release.
```

---

## Речь и диалог

### Текстовый диалог

```
Let's role-play: a stand-up meeting. You are the team lead, I am a developer.
Ask about yesterday's tasks and blockers. Correct my English after each of my replies.
Keep the conversation to 8–10 turns.
```

Другие сценарии:
- собеседование (*job interview for junior developer*)
- созвон с клиентом (*explain a bug and ETA*)
- small talk на конференции
- заказ в кафе / отель (travel English)

### Голосовой режим (ChatGPT Voice)

1. Откройте ChatGPT на телефоне или в приложении.
2. Включите **Voice** / голосовой чат.
3. Задайте правило устно или заранее в тексте:

```
Voice practice: speak only English with me. If I make a mistake,
say the correct phrase and ask me to repeat it once.
Topic: describing my daily work routine.
```

**Совет:** говорите **полными фразами**, не односложно. После сессии попросите текстовый разбор:

```
Summarize the grammar mistakes I made in our voice chat.
List them as: what I said → correct → rule.
```

### Shadowing (повтор за моделью)

```
I will paste a short paragraph about my project. Rewrite it in natural B1 English.
Then split it into 4 short sentences. I will read each sentence aloud and type "next".
After all 4, comment on clarity and suggest one more natural version.
```

---

## Письмо: email, коммиты, документация

### Исправление текста

```
Correct my English. Keep my meaning. Show changes in bold.
Explain only the 3 most important fixes in Russian.

My text:
"""
Hi, I finished task about login. Can you review it when you have time?
There was problem with validation but I fix it.
"""
```

### Улучшение стиля

```
Make this email more professional but still friendly. B1 level.

[paste your draft]
```

### Практика для разработчика

```
Give me 5 typical phrases for:
- Pull request description
- Asking for code review
- Explaining a delay in Slack
I'll write my versions, you correct them.
```

---

## Недельный план с ChatGPT (20–30 мин/день)

| День | Фокус | Промпт (кратко) |
|------|-------|-----------------|
| Пн | Теория | Explain [topic] + examples |
| Вт | Упражнения | 10 gap-fill on [topic] |
| Ср | Письмо | Correct my paragraph / email |
| Чт | Диалог | Role-play: [scenario] |
| Пт | Голос | Voice chat 10 min + summary of errors |
| Сб | Повторение | Quiz on this week's topics |
| Вс | Свободно | Tell ChatGPT about your week in English |

Сочетайте с [планом на 8 недель](resources.md): сначала правило в GitBook → упражнения в Murphy → закрепление в ChatGPT.

---

## Промпты под темы из GitBook

| Раздел | Промпт |
|--------|--------|
| [Времена](tenses.md) | `Drill Present Perfect vs Past Simple. 5 min, one sentence per turn.` |
| [Модальные](modals.md) | `Role-play: I must explain why I can't deploy today. Use must/have to/should.` |
| [Фразовые глаголы](verbs.md) | `Use 8 phrasal verbs about work in a short dialogue. Test me on meaning.` |
| [Условные](sentence.md) | `Give second conditional scenarios about career. I respond, you correct.` |
| [Косвенная речь](sentence.md) | `Convert 8 direct speech sentences to reported speech. Check my answers.` |
| [Артикли](parts-of-speech.md) | `Only correct my articles in messages. Don't answer other questions until I say stop.` |

---

## Ограничения ИИ — что учитывать

| Риск | Что делать |
|------|------------|
| ИИ иногда ошибается | Сверяйте спорные правила с [GrammarWay](https://grammarway.com/ru/) или учебником |
| Слишком «идеальный» английский | Просите *B1 level, not C2* — проще и реалистичнее |
| Вы только читаете ответы | Пишите и говорите **сами**; ИИ — собеседник, не замена |
| Нет реального произношения | Голос ChatGPT + [Cambridge Dictionary](https://dictionary.cambridge.org/) для аудио |
| Зависимость от перевода | Чередуйте: «explain in Russian» только для сложных тем |

---

## Шаблон одной учебной сессии (25 мин)

```
1. [5 мин]  "Quick review: 5 questions on [yesterday's topic]"
2. [10 min] "10 exercises, one by one, with hints"
3. [7 min]  "Role-play: [situation], correct my mistakes"
4. [3 min]  "List my top 3 errors today and one homework sentence for each"
```

Домашнее задание записывайте в блокнот и принесите в следующий чат:

```
Here is my homework from yesterday. Check and give new sentences with the same grammar.
```

---

## Альтернативы ChatGPT

| Сервис | Особенность |
|--------|-------------|
| [ChatGPT](https://chat.openai.com/) | Диалог, голос, гибкие промпты |
| [Ollama](../ai/ollama.md) | Локально, офлайн, API |
| [Cursor](../ai/cursor.md) | Chat + Agent в IDE, Rules |
| [Kiro](../ai/kiro.md) | Spec-driven IDE, steering |
| Claude | Длинные тексты, разбор письма |
| Gemini | Интеграция с Google, голос |
| [Elsa Speak](https://elsaspeak.com/) | Произношение |
| [Grammarly](https://www.grammarly.com/) | Проверка текста в браузере |

Логика та же: **правило → упражнение → продукция своего языка → разбор ошибок**.

---

## Следующий шаг

- [ИИ: Ollama, Cursor, Kiro](../ai/README.md) — разработка с локальными моделями и AI IDE
- [Ресурсы и план](resources.md) — учебники и чеклист тем
- [Времена](tenses.md) — выберите тему для первого промпта
