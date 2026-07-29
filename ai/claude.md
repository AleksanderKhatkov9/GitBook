# Claude

> Сайт: [claude.com](https://claude.com/) · Документация: [docs.anthropic.com](https://docs.anthropic.com/) · Советы по Claude Code: [Habr / OTUS](https://habr.com/ru/companies/otus/articles/929624/)

**Claude** — ИИ от [Anthropic](https://www.anthropic.com/): чат в браузере и приложениях, API для разработчиков и **Claude Code** — агент для работы с кодом в терминале и IDE.

## Продукты

| Продукт | Для чего |
|---------|----------|
| **Claude** | Чат: код, тексты, анализ, поиск в вебе, файлы |
| **Claude Code** | Агент в терминале / VS Code / Cursor: правки в репозитории, команды, PR |
| **Claude Cowork** | Совместная работа поверх чата |
| **API / Console** | Встраивание моделей в свои приложения |

Модели (линейка Anthropic): **Opus** (сложные задачи), **Sonnet** (баланс), **Haiku** (скорость). Актуальный список — на [claude.com](https://claude.com/).

## Тарифы (ориентир)

| План | Кому |
|------|------|
| **Free** | Знакомство: веб, мобильные, базовый чат |
| **Pro** | Ежедневная работа: больше лимитов, Claude Code, проекты |
| **Max** | Высокая нагрузка (×5 / ×20 относительно Pro) |
| **Team / Enterprise** | Команды и компании |

Цены и лимиты меняются — проверяйте [claude.com](https://claude.com/) и раздел Pricing.

## Claude Code

**Claude Code** — agentic CLI: основной интерфейс часто становится терминал с Claude, а IDE — для проверки diff и быстрых правок (Tab / `Ctrl+K`).

### Установка и запуск

1. Аккаунт на [claude.com](https://claude.com/), план с доступом к Claude Code (обычно Pro и выше).
2. Установите CLI по [официальной документации](https://docs.anthropic.com/).
3. Опционально: расширение **Claude Code** для VS Code / Cursor — лаунчер и несколько панелей агента.

Запуск в проекте:

```bash
cd your-project
claude
```

### Базовый workflow

```
1. Опишите задачу в терминале Claude
2. Claude читает репозиторий, правит файлы, запускает команды
3. Проверьте diff в IDE
4. /clear — новая задача без лишней истории
```

**Совет:** начинайте новую тему с `/clear`, чтобы не тратить токены на старый контекст и не провоцировать сжатие истории.

### Контекст и команды

| Действие | Как |
|----------|-----|
| Указать файл | `@path/to/file` |
| Слэш-команды | `/clear`, `/hooks`, `/terminal-setup`, … |
| История сообщений | Стрелка вверх |
| Остановить агента | **Escape** (не `Ctrl+C` — он закроет процесс) |
| Вернуться к сообщению | Дважды **Escape** |
| Новая строка в вводе | Настроить через `/terminal-setup` (по умолчанию Shift+Enter часто не работает) |
| Вставка картинки | Обычно **Ctrl+V**, не Cmd+V |
| Файл в чат drag-and-drop | С **Shift**, иначе откроется вкладка IDE |

Очередь сообщений: можно набрать несколько follow-up («ещё добавь тесты», «потом обнови README») — Claude обработает их по очереди, если не ждёт вашего ответа.

### Разрешения

По умолчанию Claude часто спрашивает разрешение на правку файла или запуск команды. Для непрерывной работы (аналог «yolo» в Cursor):

```bash
claude --dangerously-skip-permissions
```

Используйте осознанно: агент сможет выполнять shell-команды без подтверждения.

### GitHub и ревью PR

Команда `/install-github-app` подключает проверку pull request. Имеет смысл сузить промпт ревью — иначе комментарии слишком многословны.

Пример `claude-code-review.yml`:

```yaml
direct_prompt: |
  Пожалуйста, проверь этот pull request на наличие багов и проблем с безопасностью.
  Сообщай только о найденных ошибках и возможных уязвимостях. Будь краток.
```

Claude также может подтягивать комментарии из PR и отвечать на них.

## Настройка проекта

### CLAUDE.md

Файл **CLAUDE.md** в корне (и при необходимости во вложенных папках) — краткое описание проекта, стек, команды сборки/линта/тестов. Claude подхватывает иерархию: более вложенный файл приоритетнее.

Пример:

```markdown
# Project

Stack: Laravel 11 + Next.js, MySQL.

## Commands

- `composer test` — PHPUnit
- `npm run lint` — ESLint
- `npm run build` — production build

## Conventions

- Документация на русском, код и идентификаторы — на английском.
- Не коммить `.env` и секреты.
```

Быстро добавить правило в память: префикс `#` в сообщении (например: «# Всегда используй компоненты MUI для нового UI»).

### Хуки (`.claude/settings.json`)

Хуки — shell-команды на этапах жизненного цикла (до/после инструментов, уведомления, стоп). Удобно настраивать через `/hooks` или JSON.

Пример: Prettier и проверка TypeScript после правок:

```json
{
  "hooks": [
    {
      "matcher": "Edit|Write",
      "hooks": [
        {
          "type": "command",
          "command": "prettier --write \"$CLAUDE_FILE_PATHS\""
        }
      ]
    },
    {
      "matcher": "Edit",
      "hooks": [
        {
          "type": "command",
          "command": "if [[ \"$CLAUDE_FILE_PATHS\" =~ \\.(ts|tsx)$ ]]; then npx tsc --noEmit --skipLibCheck \"$CLAUDE_FILE_PATHS\" || echo '⚠️ TypeScript errors - review'; fi"
        }
      ]
    }
  ]
}
```

`matcher` — имя инструмента или regex (`Edit`, `Edit|Write`, `Notebook.*`).

### Свои слэш-команды

Папка `.claude/commands/`, файл `имя.md`. Плейсхолдер `$ARGUMENTS` подставляет аргументы.

`.claude/commands/test.md`:

```markdown
Создай полноценные тесты для: $ARGUMENTS

- Используй стек проекта (PHPUnit / Jest / RTL — смотри package.json / composer.json)
- Покрой основной сценарий и ошибки
- Не трогай несвязанные файлы
```

Запуск: `/test MyButton`.

Подпапки дают вложенные команды, например `/builder/plugin`.

## Claude Code и Cursor

| | Cursor | Claude Code |
|--|--------|-------------|
| Интерфейс | IDE + Agent-панель | Терминал (+ расширение в IDE) |
| Модели | Несколько провайдеров | Модели Anthropic |
| Крупные файлы / сложные задачи | Хорошо, иногда «зависает» на тяжёлых правках | Часто устойчивее на больших diff |
| Быстрые правки | Tab, `Ctrl+K` | Слабее — удобно оставить Cursor |
| Правила проекта | `.cursor/rules` | `CLAUDE.md`, хуки, `/commands` |

Типичный гибрид: **Claude Code** — основные агентские задачи; **Cursor** — автодополнение и мелкий inline-edit, если Claude недоступен.

## Когда что выбирать

```
Длинная фича / большой рефакторинг     → Claude Code
Быстрый вопрос в контексте файла       → Cursor Chat / Claude чат
Spec → design → tasks                  → Kiro
Приватность, офлайн                    → Ollama
Чат без репозитория                    → claude.com
```

## Полезные ссылки

| Ресурс | URL |
|--------|-----|
| Claude | [claude.com](https://claude.com/) |
| Anthropic docs | [docs.anthropic.com](https://docs.anthropic.com/) |
| Практика Claude Code (перевод) | [Habr — OTUS](https://habr.com/ru/companies/otus/articles/929624/) |
| Cursor в этой книге | [cursor.md](cursor.md) |

## Связанные разделы

| Раздел | Связь |
|--------|-------|
| [ИИ — обзор](README.md) | Сравнение инструментов |
| [Cursor](cursor.md) | IDE рядом с Claude Code |
| [Kiro](kiro.md) | Spec-driven альтернатива |
| [AI в Laravel](../Backend/laravel/ai.md) | Boost, MCP |
| [Git](../git/README.md) | Коммиты и PR после правок агента |
