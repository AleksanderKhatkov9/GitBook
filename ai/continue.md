# Continue

> Сайт: [continue.dev](https://continue.dev/) · Docs: [docs.continue.dev](https://docs.continue.dev/) · OpenRouter: [настройка в Continue](https://docs.continue.dev/customize/model-providers/top-level/openrouter) · Видео: [YouTube](https://www.youtube.com/watch?v=QUGS3qg7h9Q)

**Continue** — open-source AI-ассистент для **VS Code** и JetBrains: чат с контекстом проекта, правки кода, autocomplete, Agent. Модели подключаются сами: локально через [Ollama](ollama.md) или через облако ([OpenRouter](openrouter.md) и другие провайдеры).

Типичный стек для VS Code без Cursor:

```
VS Code + Continue + Ollama     → приватность, офлайн
VS Code + Continue + OpenRouter → много облачных моделей через один API-ключ
```

## Установка

1. Установите [VS Code](https://code.visualstudio.com/).
2. Расширение **Continue** из Marketplace: поиск `Continue` или [страница расширения](https://marketplace.visualstudio.com/items?itemName=Continue.continue).
3. Откройте панель Continue (иконка в сайдбаре) или Command Palette → `Continue: …`.

Конфиг открывается так: **Ctrl+Shift+P** → `Continue: Open Config` — файл `config.yaml`.

| ОС | Путь к конфигу |
|----|----------------|
| Windows | `%USERPROFILE%\.continue\config.yaml` |
| macOS / Linux | `~/.continue/config.yaml` |

После сохранения Continue обычно подхватывает изменения сам; при необходимости — **Reload config** в селекторе моделей.

## Ollama + Continue (локально)

### 1. Подготовка Ollama

См. [Ollama](ollama.md). Минимум:

```bash
ollama serve
curl http://localhost:11434   # ответ: Ollama is running

# Chat / edit (подберите под RAM)
ollama pull qwen2.5-coder:7b

# Быстрый Tab autocomplete
ollama pull qwen2.5-coder:1.5b

# Embeddings для @codebase (опционально)
ollama pull nomic-embed-text

ollama list
```

Имя модели в `config.yaml` должно **точно** совпадать с `ollama list` (включая тег `:7b`, `:1.5b`).

### 2. Пример `config.yaml` только с Ollama

```yaml
name: Local Ollama
version: 1.0.0
schema: v1

models:
  - name: Qwen2.5-Coder 7B (Chat)
    provider: ollama
    model: qwen2.5-coder:7b
    apiBase: http://localhost:11434
    roles:
      - chat
      - edit
      - apply
    defaultCompletionOptions:
      contextLength: 8192
      temperature: 0.1

  - name: Qwen2.5-Coder 1.5B (Autocomplete)
    provider: ollama
    model: qwen2.5-coder:1.5b
    apiBase: http://localhost:11434
    roles:
      - autocomplete
    autocompleteOptions:
      debounceDelay: 250
      maxPromptTokens: 1024
      onlyMyCode: true

  - name: Nomic Embed
    provider: ollama
    model: nomic-embed-text
    apiBase: http://localhost:11434
    roles:
      - embed
```

Официальный гайд: [Using Ollama with Continue](https://docs.continue.dev/guides/ollama-guide).

### Автодетект моделей

Если не хотите перечислять модели вручную:

```yaml
models:
  - name: Autodetect
    provider: ollama
    model: AUTODETECT
    apiBase: http://localhost:11434
    roles:
      - chat
      - edit
      - apply
      - autocomplete
```

Либо в UI Continue: селектор моделей → **Autodetect**.

### Agent и tool_use

Для Agent mode модели нужна поддержка tools. Если Continue пишет, что Agent не поддерживается, добавьте:

```yaml
  - name: Llama 3.1 8B
    provider: ollama
    model: llama3.1:8b
    apiBase: http://localhost:11434
    roles:
      - chat
      - edit
    capabilities:
      - tool_use
```

Не все локальные модели реально умеют function calling — тогда Agent будет нестабилен; для агента чаще берут облачную модель через OpenRouter.

## OpenRouter

Аккаунт, ключ, каталог [Models](https://openrouter.ai/models) и примеры API — отдельная страница: **[OpenRouter](openrouter.md)**.

Кратко для Continue — в `config.yaml`:

```yaml
  - name: Claude via OpenRouter
    provider: openrouter
    model: anthropic/claude-sonnet-4   # ID с openrouter.ai/models
    apiBase: https://openrouter.ai/api/v1
    apiKey: ${{ secrets.OPENROUTER_API_KEY }}
    roles: [chat, edit, apply]
    capabilities: [tool_use]
```

Ключ: `%USERPROFILE%\.continue\.env` → `OPENROUTER_API_KEY=sk-or-v1-...`

Docs Continue: [OpenRouter provider](https://docs.continue.dev/customize/model-providers/top-level/openrouter).

## Гибрид: Ollama + OpenRouter

Локальный autocomplete + облачный чат:

```yaml
name: Hybrid
version: 1.0.0
schema: v1

models:
  - name: Local Autocomplete
    provider: ollama
    model: qwen2.5-coder:1.5b
    apiBase: http://localhost:11434
    roles:
      - autocomplete

  - name: Cloud Chat (OpenRouter)
    provider: openrouter
    model: anthropic/claude-sonnet-4
    apiBase: https://openrouter.ai/api/v1
    apiKey: ${{ secrets.OPENROUTER_API_KEY }}
    roles:
      - chat
      - edit
      - apply
    capabilities:
      - tool_use
```

В панели Continue переключайте модель для чата; autocomplete идёт через роль `autocomplete`. Подробнее про ключ и выбор slug — [openrouter.md](openrouter.md).

## Основные действия в VS Code

| Действие | Как (ориентир) |
|----------|----------------|
| Чат | Панель Continue |
| Inline edit / генерация | `Ctrl+I` (Windows/Linux) / `Cmd+I` (macOS) |
| Контекст файла / папки | `@` в чате |
| Открыть конфиг | `Continue: Open Config` |
| Перезагрузить модели | Reload config в селекторе |

Подробный разбор UI — в [видео на YouTube](https://www.youtube.com/watch?v=QUGS3qg7h9Q).

## Устранение проблем

| Симптом | Что проверить |
|---------|----------------|
| `404 model not found` | `ollama pull` с **точным** тегом; имя = `ollama list` |
| Нет ответа / connection refused | `ollama serve`, `curl http://localhost:11434` |
| Мало памяти | Уменьшите `contextLength` (например `2048`) или модель |
| OpenRouter `401` | Ключ в `~/.continue/.env`, Reload config |
| OpenRouter `402` | Нет кредитов — [пополнить](https://openrouter.ai/settings/credits) |
| OpenRouter 404 на chat/completions | Неверный Model ID с [Models](https://openrouter.ai/models) или модель без tools при Agent |
| Ключ OpenRouter «не виден» | Положите в `~/.continue/.env`, не только в shell |
| Медленный autocomplete | Модель 1.5B–3B, увеличьте `debounceDelay` |

## Continue vs Cursor

| | Continue | Cursor |
|--|----------|--------|
| Лицензия | Open-source расширение | Коммерческая IDE (форк VS Code) |
| Редактор | VS Code / JetBrains | Cursor |
| Модели | Ollama, OpenRouter, свой API | Встроенные + custom |
| Приватность | Полный контроль (Ollama) | Облако Cursor по умолчанию |

Если уже в Cursor — см. [cursor.md](cursor.md). Continue удобен, когда нужен обычный VS Code и свои модели.

## Полезные ссылки

| Ресурс | URL |
|--------|-----|
| Continue | [continue.dev](https://continue.dev/) |
| Ollama + Continue | [docs.continue.dev/guides/ollama-guide](https://docs.continue.dev/guides/ollama-guide) |
| OpenRouter в этой книге | [openrouter.md](openrouter.md) |
| OpenRouter + Continue | [docs … /openrouter](https://docs.continue.dev/customize/model-providers/top-level/openrouter) |
| OpenRouter models | [openrouter.ai/models](https://openrouter.ai/models) |
| Видео-обзор | [youtube.com/watch?v=QUGS3qg7h9Q](https://www.youtube.com/watch?v=QUGS3qg7h9Q) |
| Ollama в этой книге | [ollama.md](ollama.md) |

## Связанные разделы

| Раздел | Связь |
|--------|-------|
| [Ollama](ollama.md) | Локальные модели и API |
| [Cursor](cursor.md) | Альтернатива — AI IDE |
| [Claude](claude.md) | Облачные модели Anthropic (в т.ч. через OpenRouter) |
| [ИИ — обзор](README.md) | Сравнение инструментов |
