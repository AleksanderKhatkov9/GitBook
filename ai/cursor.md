# Cursor

> Сайт: [cursor.com](https://cursor.com/) · Документация: [docs.cursor.com](https://docs.cursor.com/)

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
| `@Docs` | Документация (Laravel, React…) |
| `@Web` | Поиск в интернете |
| `@Git` | Diff, коммиты |

Для GitBook: `@SUMMARY.md` + `@english/README.md` — агент видит структуру меню.

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

- [Ollama](ollama.md) — локальные модели
- [Kiro](kiro.md) — spec-driven IDE
- [AI в Laravel](../Backend/laravel/ai.md) — Boost, MCP
- [GitBook — страницы](../gitbook/pages.md) — как добавлять `.md`

## Следующий шаг

[Kiro](kiro.md) — specs, hooks и agentic workflow от Amazon.
