# Cursor

> Сайт: [cursor.com](https://cursor.com/) · Документация: [cursor.com/ru/docs](https://cursor.com/ru/docs)

**Cursor** — редактор кода на базе VS Code с встроенным ИИ: чат с контекстом проекта, **Agent** (автономные правки в нескольких файлах), **Rules**, **MCP**, терминал. Эта GitBook собирается и редактируется в Cursor.

## Установка

1. Скачайте с [cursor.com/downloads](https://cursor.com/downloads) (Windows / macOS / Linux).
2. При первом запуске можно импортировать настройки и расширения из VS Code.
3. Войдите в аккаунт Cursor (нужен для облачных моделей и лимитов).

## Основные режимы

| Режим | Где | Для чего |
|-------|-----|----------|
| **Chat** | Боковая панель (`Ctrl+L`) | Вопросы, объяснения, мелкие правки |
| **Composer / Agent** | `Ctrl+I` или Agent | Задачи на несколько файлов, рефакторинг |
| **Inline Edit** | Выделить код → `Ctrl+K` | Локальная правка фрагмента |
| **Tab** | Автодополнение | Продолжение строки / блока |

### Agent

Agent может:
- читать и менять файлы проекта;
- запускать команды в терминале (`npm test`, `php artisan migrate`);
- искать по кодовой базе;
- использовать MCP-серверы.

Пример запроса:

```
Add a new GitBook page english/ai-tools.md with a table comparing
Ollama, Cursor, and Kiro. Update SUMMARY.md. Match existing markdown style.
```

**Совет:** формулируйте чётко: что сделать, какие файлы затронуть, что не трогать.

## Контекст (@)

В чате подключайте контекст через `@`:

| Символ | Что добавляет |
|--------|---------------|
| `@Files` | Конкретный файл |
| `@Folders` | Папка |
| `@Codebase` | Поиск по проекту |
| `@Web` | Поиск в интернете |
| `@Git` | Diff, коммиты |
| `@` + файл `.md` | Ваша страница документации из проекта |

Отдельный индекс `@Docs` сняли в Cursor 3.14.2. Как теперь подключать документацию — в разделе ниже.

Для GitBook: `@SUMMARY.md` + `@english/README.md` — агент видит структуру меню.

## Документация в Cursor

Официальная документация на русском: [cursor.com/ru/docs](https://cursor.com/ru/docs).

Агент умеет сам открывать документацию в сети, но без точного источника легко берёт другой релиз или чужой пример. Документацию подключают тремя способами.

### Ссылка в запросе

Вставьте URL страницы прямо в сообщение. Агент прочитает её:

```
По странице https://laravel.com/docs/13.x/queues
добавь Job для писем. Laravel 13, синтаксис старых релизов не предлагай.
```

Если точного адреса нет, добавьте `@Web` и название библиотеки с версией.

### Страницы в проекте

Файл в репозитории стабильнее ссылки: он не меняется между запросами, и правка видна в diff. Упомяните его через `@`:

```
@Backend/laravel/queues.md @Backend/laravel/ai.md
Сделай пример по этим страницам. Стиль не меняй.
```

Чужую или закрытую документацию сохраните как `.md` (например в `docs/`) и укажите так же. Эта GitBook уже лежит в репозитории — её страницы можно давать агенту как контекст.

### Правила на каждый запрос

То, что нужно всегда, не повторяйте в чате. Положите в `.cursor/rules/`:

```markdown
---
description: Laravel answers follow the project GitBook
globs: "Backend/laravel/**"
---

- Before changing Laravel code, read the matching page in Backend/laravel/.
- Prefer the version and commands written there.
- If the page and the official docs disagree, follow the page and say so.
```

Для Laravel точнее [Laravel Boost](../Backend/laravel/ai.md): MCP ищет документацию пакетов по версиям из `composer.json`.

## Rules (правила проекта)

Файлы в `.cursor/rules/` или `AGENTS.md` / `.cursorrules` — постоянные инструкции для ИИ.

Пример `.cursor/rules/gitbook.mdc`:

```markdown
---
description: GitBook markdown conventions
globs: "**/*.md"
---

- Write in Russian unless the page is English grammar content.
- Use tables and code blocks like existing pages in seo/ and english/.
- After adding pages, update SUMMARY.md.
- Do not edit _book/ manually.
```

Rules применяются автоматически к подходящим файлам.

## MCP (Model Context Protocol)

MCP подключает внешние инструменты к Agent: БД, API, браузер, Laravel Boost.

Настройка: **Cursor Settings → MCP → Add server** или файл `.cursor/mcp.json`:

```json
{
  "mcpServers": {
    "laravel-boost": {
      "command": "php",
      "args": ["artisan", "boost:mcp"]
    }
  }
}
```

Подробнее для Laravel: [AI в Laravel](../Backend/laravel/ai.md).

## Модели

**Settings → Models** — выбор модели для Chat и Agent.

| Источник | Пример |
|----------|--------|
| Cursor (облако) | Claude, GPT, Gemini |
| Свой API key | OpenAI, Anthropic |
| Локально | [Ollama](ollama.md): `http://localhost:11434/v1` |

Для сложного Agent лучше сильные облачные модели; для быстрых вопросов — можно локальную через Ollama.

## Типичные сценарии

### Новая страница GitBook

```
@SUMMARY.md @seo/README.md
Create mysql/indexing.md about MySQL indexes.
Add to SUMMARY under MySQL section. Russian, same style as seo/basics.md.
```

### Laravel

```
@routes/web.php @app/Models/User.php
Add API endpoint GET /api/users/{id}/posts with pagination.
Use Form Request for validation. Add feature test.
```

### Рефакторинг

```
Refactor UserController: extract validation to StoreUserRequest,
move business logic to UserService. Don't change routes.
Run php artisan test --filter=User
```

### Английский

См. [ai-practice.md](../english/ai-practice.md) — те же промпты работают в Cursor Chat.

## Как использовать ИИ для обучения программированию

ИИ ускоряет того, кто уже понимает задачу. Если принимать готовый код не глядя, навык остаётся у модели: через месяц файл в репозитории есть, а объяснить его нельзя. Это вайбкодинг. Правило ниже — чтобы расти как программист.

В этом репозитории то же поведение задано для агента в `.cursor/rules/learn-programming.mdc`. Правило включено всегда.

1. **Сначала сам.** Пишите код или решайте задачу самостоятельно. К ИИ — после того как свои попытки исчерпаны. В запросе приложите, что уже пробовали.
2. **Подсказка, а не готовое решение.** «Я пишу функцию для X, она выдаёт ошибку Y. Код за меня не пиши. Дай подсказку, куда смотреть.»
3. **Строгий ментор.** «Ты — строгий ментор. Я присылаю свой код. Ищи логические ошибки и плохие практики и объясняй, как сделать правильно. Файл не переписывай.»
4. **Один микро-шаг.** Одна подзадача за раз. «Сделай приложение» заменяется на «помоги спроектировать структуру базы для списка задач».
5. **Разбор каждой части.** Если берёте чужой или сгенерированный код: «Объясни этот код простыми словами, по блокам. Что делает каждая часть и зачем.»

Полный код уместен для рутины, которую вы уже умеете, и когда вы прямо просите готовое решение. Перед коммитом вы можете пересказать diff своими словами.

## Горячие клавиши (Windows)

| Действие | Клавиши |
|----------|---------|
| Chat | `Ctrl+L` |
| Agent / Composer | `Ctrl+I` |
| Inline edit | `Ctrl+K` |
| Принять Tab-предложение | `Tab` |

## Безопасность

- Не включайте в контекст `.env`, ключи, пароли.
- Проверяйте diff перед коммитом — Agent может затронуть лишние файлы.
- Для закрытых репозиториев рассмотрите [Ollama](ollama.md) для чувствительных фрагментов.

## Cursor vs Kiro

| | Cursor | Kiro |
|--|--------|------|
| Фокус | Гибкий Agent + редактор | Spec-driven: ТЗ → design → tasks |
| База | VS Code fork | Code OSS |
| Сильная сторона | Быстрые итерации, MCP | Структура фичи, hooks |

Можно использовать **оба**: Kiro для крупной фичи по spec, Cursor для ежедневных правок.

## Связанные разделы

- [Документация Cursor](https://cursor.com/ru/docs) — официальная, на русском
- [Ollama](ollama.md) — локальные модели
- [Kiro](kiro.md) — spec-driven IDE
- [AI в Laravel](../Backend/laravel/ai.md) — Boost, MCP
- [GitBook — страницы](../gitbook/pages.md) — как добавлять `.md`

## Следующий шаг

[Kiro](kiro.md) — specs, hooks и agentic workflow от Amazon.
