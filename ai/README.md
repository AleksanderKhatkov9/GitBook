# ИИ в разработке

> Инструменты: [Ollama](ollama.md) · [Continue](continue.md) · [OpenRouter](openrouter.md) · [Cursor](cursor.md) · [Claude](claude.md) · [Kiro](kiro.md) · [ChatGPT для английского](../english/ai-practice.md)

Обзор инструментов с ИИ для разработки: локальные модели, AI-редакторы и agentic IDE. Раздел дополняет [AI в Laravel](../Backend/laravel/ai.md) (Laravel Boost, MCP).

## Сравнение

| Инструмент | Тип | Где работает | Сильные стороны |
|------------|-----|--------------|-----------------|
| **Ollama** | Локальный / облачный LLM | Терминал, API, сторонние клиенты | Приватность, офлайн, свои модели |
| **Continue** | Open-source AI в IDE | VS Code / JetBrains | Ollama + OpenRouter, свой `config.yaml` |
| **OpenRouter** | API-шлюз к моделям | Облако, любой клиент | Один ключ → Claude, GPT, Gemini… |
| **Cursor** | AI IDE (форк VS Code) | Редактор + Agent + терминал | Контекст проекта, Agent, Rules, MCP |
| **Claude** | Чат + Claude Code (агент) | Браузер, приложения, терминал / IDE | Модели Anthropic, крупные рефакторинги, хуки |
| **Kiro** | Agentic IDE (Code OSS) | IDE + CLI | Spec-driven: requirements → design → tasks |
| ChatGPT | Веб / приложение | Браузер, голос | Универсальный чат, английский |

## Когда что использовать

```
Быстрый вопрос по коду в проекте     → Cursor (Chat / Agent)
VS Code + свои модели (Ollama/OR)    → Continue
Много облачных моделей, один ключ    → OpenRouter
Крупный рефакторинг / агент в CLI    → Claude Code
Фича по плану: spec → код → тесты   → Kiro
Приватные данные, офлайн            → Ollama (+ Continue)
Английская грамматика и речь         → ChatGPT / Ollama / Cursor Chat
Laravel + схема БД + Artisan         → Cursor + Laravel Boost (MCP)
```

## Типичный стек

| Задача | Инструмент |
|--------|------------|
| Ежедневная разработка | **Cursor** (+ Tab / `Ctrl+K`) |
| VS Code без Cursor | **Continue** + Ollama / OpenRouter |
| Длинные агентские задачи | **Claude Code** |
| Крупная фича с ТЗ | **Kiro** (specs) |
| Локальные эксперименты, CI без облака | **Ollama** |
| Репетитор английского | [ai-practice.md](../english/ai-practice.md) |

Ollama можно подключить к **Continue**, **Cursor** и **Kiro** (OpenAI-compatible API). Claude Code удобно совмещать с Cursor: агент в терминале, автодополнение в редакторе.

## Разделы

| Документ | Содержание |
|----------|------------|
| [Ollama](ollama.md) | Установка, модели, API, интеграция |
| [Continue](continue.md) | VS Code: Ollama, OpenRouter, `config.yaml` |
| [OpenRouter](openrouter.md) | Аккаунт, ключ, Models, API, Continue |
| [Cursor](cursor.md) | Agent, Chat, Rules, MCP, Laravel |
| [Claude](claude.md) | Claude, Claude Code, CLAUDE.md, хуки, GitHub |
| [Kiro](kiro.md) | Specs, Hooks, Steering, CLI |

## Общие принципы

1. **Контекст** — давайте ИИ файлы проекта, а не только вопрос в вакууме.
2. **Правила** — `.cursor/rules`, `CLAUDE.md` / хуки Claude Code, steering в Kiro, system prompt в Ollama.
3. **Проверка** — тесты, code review, линтер; ИИ может ошибаться.
4. **Безопасность** — не отправляйте секреты (.env, ключи) в облако без нужды; для чувствительного — Ollama локально.

## Связанные разделы

| Раздел | Связь |
|--------|-------|
| [AI в Laravel](../Backend/laravel/ai.md) | Boost, MCP, guidelines |
| [English — ИИ](../english/ai-practice.md) | Грамматика и речь через ChatGPT / Cursor / Ollama |
| [Git](../git/README.md) | Коммиты, PR после правок от агента |
