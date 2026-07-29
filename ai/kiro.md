# Kiro

> Сайт: [kiro.dev](https://kiro.dev/) · IDE: [kiro.dev/ide](https://kiro.dev/ide/) · GitHub: [kirodotdev/Kiro](https://github.com/kirodotdev/Kiro)

**Kiro** — agentic IDE от Amazon на базе **Code OSS** (как VS Code). Отличие от «просто чата с кодом» — **spec-driven development**: промпт → структурированные требования → дизайн → список задач → выполнение агентами.

## Установка

1. Зарегистрируйтесь на [kiro.dev](https://kiro.dev/).
2. Скачайте **Kiro IDE** (Windows / macOS / Linux) или установите **Kiro CLI**.
3. Импортируйте настройки VS Code / расширения Open VSX при необходимости.

> На момент preview часть функций и языков интерфейса может быть ограничена — проверяйте актуальность на сайте.

## Ключевые концепции

| Концепция | Описание |
|-----------|----------|
| **Specs** | Требования → design → tasks (markdown-файлы в проекте) |
| **Hooks** | Автоматизация по событиям (save, create file…) |
| **Steering** | Правила поведения агента (стандарты кода, архитектура) |
| **Agentic Chat** | Диалог с контекстом файлов, URL, документации |
| **MCP** | Внешние инструменты через Model Context Protocol |
| **Powers** | Доп. контекст и инструменты для агентов |
| **CLI** | Kiro в терминале и CI/CD |

## Spec-driven workflow

Типичный цикл фичи:

```
1. Prompt        →  "Add user profile page with avatar upload"
2. Requirements  →  requirements.md (user stories, EARS-формат)
3. Design        →  design.md (API, компоненты, БД)
4. Tasks         →  tasks.md (чеклист подзадач)
5. Execution     →  агент выполняет tasks по очереди или параллельно
6. Verification  →  property-based tests, unit tests
```

### EARS (формат требований)

**Easy Approach to Requirements Syntax** — шаблон «когда X, система должна Y»:

```
When the user uploads a valid image,
the system shall store it in S3 and update the profile avatar URL.

When the file exceeds 2 MB,
the system shall reject the upload with a validation error.
```

Такие требования проще проверять тестами и агентами.

### Пример структуры spec в проекте

```
.kiro/specs/user-profile/
├── requirements.md
├── design.md
└── tasks.md
```

Содержимое `tasks.md` (упрощённо):

```markdown
- [ ] Migration: add avatar_url to users
- [ ] API: POST /api/profile/avatar
- [ ] Validation: image, max 2MB
- [ ] Frontend: ProfileAvatar component
- [ ] Tests: upload success and rejection
```

Агент отмечает выполненные пункты и может обновлять plan при изменениях.

## Hooks

**Hooks** — триггеры на события разработки:

| Событие | Пример hook |
|---------|-------------|
| File save | Дописать PHPDoc к изменённому классу |
| File create | Сгенерировать базовый test |
| Commit | Проверить naming convention |

Настраиваются промптами: «при сохранении `*.php` в `app/` предложи unit test».

## Steering

Аналог **Rules** в Cursor — markdown-файлы с правилами проекта:

- стиль кода (PSR-12, Laravel conventions);
- запреты (не использовать `dd()` в production paths);
- предпочитаемые паттерны (Form Request, Service classes).

Kiro может **сгенерировать steering** из существующей кодовой базы.

Пример фрагмента:

```markdown
# Laravel API

- Use Form Request for validation.
- Controllers stay thin; logic in Services.
- API responses: JSON with consistent envelope { data, message, errors }.
- All endpoints covered by Pest feature tests.
```

## Agentic Chat

Для задач **без полного spec** — обычный чат с контекстом:

- файлы проекта;
- URL документации;
- подключённые MCP-серверы.

Подходит для багфиксов и мелких правок, как Cursor Chat.

## MCP и Powers

| Механизм | Назначение |
|----------|------------|
| **MCP** | БД, AWS, браузер, кастомные API |
| **Powers** | Готовые наборы знаний (domain-specific) |

Для Laravel-проекта имеет смысл MCP со схемой БД и Artisan — см. [Laravel Boost](../Backend/laravel/ai.md).

## Kiro CLI

CLI для скриптов и автomation:

```bash
# Примерный сценарий (уточняйте по docs.kiro.dev)
kiro --help
```

Использование: CI, batch-задачи, интеграция в pipeline без GUI.

## Модели

Kiro использует модели Anthropic (Claude) и режим **Auto** (м mix моделей). Альтернативные провайдеры могут добавляться — смотрите настройки IDE.

Для локальных моделей см. [Ollama](ollama.md) (если Kiro поддерживает custom endpoint в вашей версии).

## Kiro vs Cursor

| Критерий | Kiro | Cursor |
|----------|------|--------|
| Подход | Spec-first, production-ready | Agent-first, быстрые итерации |
| Планирование | requirements.md, design.md, tasks.md | Промпт + @context |
| Автomation | Hooks на события | Rules + Agent terminal |
| Экосистема | AWS, Open VSX | Широкое community, MCP |

**Практика:** Kiro — новая фича «от идеи до PR»; Cursor — ежедневная разработка и правки документации (как эта GitBook).

## Типичный сценарий (Laravel + Next.js)

1. **Spec в Kiro:** REST endpoint + Next.js page для списка заказов.
2. **Requirements:** pagination, auth, empty state.
3. **Design:** `OrderController`, `OrderResource`, React `OrdersPage`.
4. **Tasks:** migration → API → tests → frontend → e2e.
5. **Hooks:** на save модели — предложить factory update.
6. Дальнейшие правки — в **Cursor** или Kiro Chat.

## Ограничения

- Preview / тарифы — уточняйте на [kiro.dev](https://kiro.dev/).
- Язык интерфейса и чата — преимущественно English (для русских пояснений можно просить в steering).
- Agentic IDE ≠ замена code review и тестов в CI.

## Полезные ссылки

- [Introducing Kiro](https://kiro.dev/blog/introducing-kiro/)
- [IDE overview](https://kiro.dev/ide/)
- [Getting Started](https://kiro.dev/docs/) — актуальные туториалы на сайте

## Связанные разделы

- [Cursor](cursor.md) — AI-редактор
- [Ollama](ollama.md) — локальные LLM
- [AI в Laravel](../Backend/laravel/ai.md) — Boost + MCP
- [DevOps — Laravel + Next.js](../devops/laravel-next/README.md) — fullstack на одном домене

## Следующий шаг

[English — ИИ](../english/ai-practice.md) — тренировка английского через ChatGPT, Cursor и Ollama.
