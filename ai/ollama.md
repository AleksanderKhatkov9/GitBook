# Ollama

> Сайт: [ollama.com](https://ollama.com/) · Документация: [github.com/ollama/ollama](https://github.com/ollama/ollama)

**Ollama** — запуск open-source LLM **локально** (или через облако Ollama). Модели скачиваются на диск; можно работать офлайн и не отправлять код на сторонние серверы.

## Установка

### Windows / macOS / Linux

Скачайте установщик с [ollama.com/download](https://ollama.com/download) или в терминале (Linux/macOS):

```bash
curl -fsSL https://ollama.com/install.sh | sh
```

Проверка:

```bash
ollama --version
```

## Базовые команды

```bash
# Скачать и запустить модель в чате
ollama run llama3.2

# Только скачать модель
ollama pull llama3.2

# Список локальных моделей
ollama list

# Удалить модель
ollama rm llama3.2

# Запуск API-сервера (по умолчанию http://localhost:11434)
ollama serve
```

В чате: `/bye` — выход, `/clear` — очистить контекст.

## Популярные модели

| Модель | Размер (ориентир) | Для чего |
|--------|-------------------|----------|
| `llama3.2` | 1–3B | Быстрые ответы, слабое железо |
| `llama3.1` | 8B | Баланс качества и скорости |
| `mistral` | 7B | Код, рассуждения |
| `codellama` | 7–13B | Генерация кода |
| `qwen2.5-coder` | 7B | Код, мультиязычность |
| `deepseek-r1` | 7–8B | Задачи с рассуждением |
| `nomic-embed-text` | — | Embeddings (RAG) |

Выбор зависит от RAM/VRAM. Для 8 GB RAM — модели 7B в квантизации; для 16 GB+ — 8–13B комфортнее.

```bash
ollama pull qwen2.5-coder:7b
ollama run qwen2.5-coder:7b
```

## API (OpenAI-compatible)

Ollama поднимает REST API на **порт 11434**. Удобно подключать Cursor, скрипты, другие клиенты.

### Chat

```bash
curl http://localhost:11434/api/chat -d '{
  "model": "llama3.2",
  "messages": [
    {"role": "user", "content": "Explain Laravel migrations in 3 sentences"}
  ],
  "stream": false
}'
```

### Generate (один промпт)

```bash
curl http://localhost:11434/api/generate -d '{
  "model": "llama3.2",
  "prompt": "Write a PHP function to validate email",
  "stream": false
}'
```

### Из PHP / JavaScript

Base URL: `http://localhost:11434/v1` — совместимость с OpenAI SDK (частичная).

## Modelfile — свой system prompt

Создайте `Modelfile`:

```
FROM llama3.2

SYSTEM """
You are a senior Laravel developer.
Answer briefly. Use PHP 8.2+ syntax.
Always mention security when relevant.
"""

PARAMETER temperature 0.3
```

Сборка и запуск:

```bash
ollama create laravel-dev -f Modelfile
ollama run laravel-dev
```

## Интеграция с Continue (VS Code)

Open-source расширение **Continue** + локальный Ollama — чат, правки и autocomplete без облака.

Пошаговый `config.yaml`, OpenRouter и гибридный стек: **[Continue](continue.md)**.

Кратко:

```bash
ollama pull qwen2.5-coder:7b
ollama pull qwen2.5-coder:1.5b
```

В `%USERPROFILE%\.continue\config.yaml` — `provider: ollama`, `apiBase: http://localhost:11434`.

## Интеграция с Cursor

1. Запустите `ollama serve`.
2. В **Cursor → Settings → Models** добавьте OpenAI-compatible endpoint:
   - Base URL: `http://localhost:11434/v1`
   - API Key: `ollama` (любое значение, Ollama не проверяет)
   - Model name: как в `ollama list` (например `llama3.2`)

3. Выберите эту модель в Chat или Agent.

> Не все функции Agent одинаково хорошо работают с локальными моделями — для сложных задач может понадобиться облачная модель.

## Ollama для английского

Тот же чат с ролью репетитора — см. [ИИ: грамматика и речь](../english/ai-practice.md).

```bash
ollama run llama3.2
```

Первое сообщение в чате:

```
You are my English tutor. Level A2-B1. Correct my grammar.
Explain rules in Russian when I ask. Keep answers short.
```

## Docker

```bash
docker run -d -v ollama:/root/.ollama -p 11434:11434 --name ollama ollama/ollama
docker exec -it ollama ollama run llama3.2
```

## Ограничения

| Плюс | Минус |
|------|-------|
| Данные остаются локально | Качество ниже топовых облачных моделей |
| Бесплатно (железо своё) | Нужны RAM/диск |
| Офлайн | Медленнее на слабом CPU без GPU |
| API для автomation | Нет встроенного IDE-агента как в Cursor |

## Полезные ссылки

- [Библиотека моделей](https://ollama.com/library)
- [Ollama GitHub](https://github.com/ollama/ollama/blob/main/docs/api.md)

## Следующий шаг

[Continue](continue.md) — VS Code + Ollama / OpenRouter · [Cursor](cursor.md) — AI-редактор с Agent и MCP.
