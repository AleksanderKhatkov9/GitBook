# OpenRouter

> Сайт: [openrouter.ai](https://openrouter.ai/) · Модели: [openrouter.ai/models](https://openrouter.ai/models) · Quickstart: [docs/quickstart](https://openrouter.ai/docs/quickstart)

**OpenRouter** — единый API к сотням LLM (Claude, GPT, Gemini, Qwen и др.): один ключ, один endpoint, выбор модели по slug с каталога.

```
Continue / Cursor / свой код
    → OpenRouter API (один ключ)
        → anthropic/… | openai/… | google/… | …
```

## 1. Регистрация и баланс

1. [openrouter.ai](https://openrouter.ai/) → **Sign in** (Google / GitHub / email).
2. **Settings → Credits** — пополните баланс (без кредитов платные модели не отвечают).
3. При желании задайте лимит расходов на ключ.

Часть моделей в каталоге — **free** (лимиты ниже, чем у платных).

## 2. API-ключ

1. [openrouter.ai/settings/keys](https://openrouter.ai/settings/keys) → **Create Key**.
2. Скопируйте `sk-or-v1-…` (показывается один раз).
3. Храните **не в git**:

| Где | Путь |
|-----|------|
| Continue (глобально) | `%USERPROFILE%\.continue\.env` (Windows) / `~/.continue/.env` |
| Continue (проект) | `.continue/.env` |
| Скрипты / CI | переменная `OPENROUTER_API_KEY` |

```env
OPENROUTER_API_KEY=sk-or-v1-...
```

В IDE Continue **не читает** `export` из PowerShell — нужен файл `.env` (см. [FAQs Continue](https://docs.continue.dev/faqs)).

## 3. Выбор модели — [Models](https://openrouter.ai/models)

1. Откройте **[openrouter.ai/models](https://openrouter.ai/models)**.
2. Фильтры: провайдер, цена, контекст, Coding / tool use.
3. В карточке скопируйте **Model ID** (slug), например:
   - `anthropic/claude-sonnet-4`
   - `openai/gpt-4.1-mini`
   - `google/gemini-2.5-flash`
   - `qwen/qwen3-coder`
4. Смотрите **Input / Output price** ($/M tokens) и размер контекста.

| Поле на сайте | Зачем |
|---------------|--------|
| **Model ID** | Значение `model` в API / `config.yaml` |
| **Context** | Сколько кода/чата в один запрос |
| **Pricing** | Стоимость |
| **Supported parameters** | tools, vision — нужно ли для Agent |
| **Providers** | Кто обслуживает запрос (fallback) |

Список через API:

```bash
curl https://openrouter.ai/api/v1/models -H "Authorization: Bearer %OPENROUTER_API_KEY%"
```

В PowerShell:

```powershell
$env:OPENROUTER_API_KEY = "sk-or-v1-..."
curl https://openrouter.ai/api/v1/models -H "Authorization: Bearer $env:OPENROUTER_API_KEY"
```

## 4. Проверка ключа (curl)

[Quickstart](https://openrouter.ai/docs/quickstart):

```bash
curl https://openrouter.ai/api/v1/chat/completions ^
  -H "Content-Type: application/json" ^
  -H "Authorization: Bearer %OPENROUTER_API_KEY%" ^
  -d "{\"model\": \"openai/gpt-4.1-mini\", \"messages\": [{\"role\": \"user\", \"content\": \"Say hi in one word\"}]}"
```

В ответе — `choices[0].message.content`.

| Код | Причина |
|-----|---------|
| `401` | Неверный ключ |
| `402` | Нет кредитов — [пополнить](https://openrouter.ai/settings/credits) |
| `404` | Неверный Model ID |

## 5. Подключение в Continue (VS Code)

Полный гайд по расширению: [Continue](continue.md). Документация Continue: [OpenRouter provider](https://docs.continue.dev/customize/model-providers/top-level/openrouter).

В `config.yaml` (`Continue: Open Config`) — точный slug с [Models](https://openrouter.ai/models):

```yaml
name: OpenRouter
version: 1.0.0
schema: v1

models:
  - name: Claude via OpenRouter
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

  - name: GPT-4.1 Mini
    provider: openrouter
    model: openai/gpt-4.1-mini
    apiBase: https://openrouter.ai/api/v1
    apiKey: ${{ secrets.OPENROUTER_API_KEY }}
    roles:
      - chat
      - edit
```

Сохранить → выбрать модель в Continue → **Reload config** при необходимости.

`capabilities: [tool_use]` — для Agent; не все модели в каталоге поддерживают tools.

Опционально отключить сжатие длинных промптов:

```yaml
    requestOptions:
      extraBodyProperties:
        transforms: []
```

Гибрид с локальным Ollama (autocomplete локально, чат в облаке) — в [continue.md](continue.md).

## 6. Прямой вызов API (без IDE)

OpenAI-совместимый endpoint: `https://openrouter.ai/api/v1`.

```bash
curl https://openrouter.ai/api/v1/chat/completions ^
  -H "Authorization: Bearer %OPENROUTER_API_KEY%" ^
  -H "Content-Type: application/json" ^
  -d "{\"model\": \"anthropic/claude-sonnet-4\", \"messages\": [{\"role\": \"user\", \"content\": \"Explain Laravel middleware\"}]}"
```

Или OpenAI SDK с `baseURL: https://openrouter.ai/api/v1` — см. [quickstart](https://openrouter.ai/docs/quickstart).

Смена модели = другой `model` (slug), ключ тот же.

## Устранение проблем

| Симптом | Что проверить |
|---------|----------------|
| `401` | Ключ в `.env`, Reload config |
| `402` | [Credits](https://openrouter.ai/settings/credits) |
| `404` | Model ID с [Models](https://openrouter.ai/models) |
| Ключ «не виден» в Continue | Файл `~/.continue/.env`, не только shell |
| Agent не работает | `capabilities: [tool_use]` или другая модель с tools |

## Полезные ссылки

| Ресурс | URL |
|--------|-----|
| OpenRouter | [openrouter.ai](https://openrouter.ai/) |
| Каталог моделей | [openrouter.ai/models](https://openrouter.ai/models) |
| Quickstart | [docs/quickstart](https://openrouter.ai/docs/quickstart) |
| Continue + OpenRouter | [docs.continue.dev … /openrouter](https://docs.continue.dev/customize/model-providers/top-level/openrouter) |
| Continue в этой книге | [continue.md](continue.md) |
| Ollama (локально) | [ollama.md](ollama.md) |

## Связанные разделы

| Раздел | Связь |
|--------|-------|
| [Continue](continue.md) | VS Code + config.yaml |
| [Ollama](ollama.md) | Локальные модели без облака |
| [Claude](claude.md) | Модели Anthropic напрямую |
| [ИИ — обзор](README.md) | Сравнение инструментов |
