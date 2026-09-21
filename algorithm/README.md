# Алгоритмы и подготовка к собеседованиям

План подготовки на PHP: от синтаксиса и базовых алгоритмов до задач LeetCode Easy / Medium / Hard.

| Ресурс | Ссылка |
|--------|--------|
| План | [algorithm-practice — leetcode/1](https://github.com/dmitryburov/algorithm-practice/blob/master/leetcode/1/README.md) |
| Решения (пример) | [doocs/leetcode — Remove Duplicates from Sorted Array](https://github.com/doocs/leetcode/blob/main/solution/0000-0099/0026.Remove%20Duplicates%20from%20Sorted%20Array/README_EN.md) |
| Репозиторий | [dmitryburov/algorithm-practice](https://github.com/dmitryburov/algorithm-practice) |
| ООП | [code.mu — ООП](https://code.mu/ru/php/book/oop/) · [ООП в GitBook](../Backend/php/OOP/README.md) |

## Как пользоваться

1. Идите по этапам **по порядку** — каждый опирается на предыдущий.
2. Пишите решения **сами**, затем сверяйтесь с разбором.
3. Храните код в своём репозитории (например `php-algorithms`) и коммитьте каждую задачу.
4. На этапе 2–3 параллельно повторяйте [ООП](../Backend/php/OOP/README.md) — на собеседованиях спрашивают и алгоритмы, и ООП.

```bash
php solution.php
```

## Этапы обучения

| Этап | Срок | Цель |
|------|------|------|
| [1. Базовые навыки](stage-1.md) | 2–3 недели | Синтаксис PHP, простые алгоритмы |
| [2. Алгоритмы и структуры данных](stage-2.md) | 1–2 месяца | Сортировки, поиск, структуры данных |
| [3. Практика Easy → Medium](stage-3.md) | 2–3 месяца | LeetCode, 1 задача в день |
| [4. Продвинутый уровень](stage-4.md) | 3–6 месяцев | Medium/Hard, графы, DP, собеседования |

**Итого:** ориентировочно 6–12 месяцев при регулярной практике.

## Примерный график

| Период | Фокус |
|--------|--------|
| 1-й месяц | Базовые задачи + сортировки |
| 2–3-й месяц | Структуры данных + Easy LeetCode |
| 4–5-й месяц | Medium + динамическое программирование |
| 6+ месяц | Hard + графы |

## Что знать на каждом этапе

| Этап | Темы |
|------|------|
| 1 | Массивы, строки, циклы, рекурсия; разворот, палиндром, факториал, Фибоначчи |
| 2 | Сортировки, бинарный поиск, стек, очередь, связный список, дерево, хеш-таблица |
| 3 | Two Sum, связные списки, Kadane, one-pass, простой DP; темп — 1 задача в день |
| 4 | BFS/DFS, кратчайшие пути, DP (knapsack, LCS), Union-Find, строковые алгоритмы |

## Инструменты

| Инструмент | Назначение |
|------------|------------|
| PHP CLI | `php file.php` — запуск решений |
| GitHub | Свой репозиторий для решений (`php-algorithms` или аналог) |
| [LeetCode](https://leetcode.com/) | Задачи (язык: **PHP**) |
| [algorithm-practice](https://github.com/dmitryburov/algorithm-practice) | Готовый план и примеры |

## Советы по практике

- Сначала 15–20 минут **без** подсказок, потом разбор.
- Не копируйте готовые функции (`array_reverse` и т.п.) на первом проходе — пишите руками.
- После решения запишите сложность: **время** и **память** (Big O).
- Повторяйте старые задачи через 1–2 недели — иначе быстро забываются.

## Видео и материалы

- [algorithm-practice — README](https://github.com/dmitryburov/algorithm-practice?tab=readme-ov-file)
- [YouTube — плейлист по алгоритмам](https://www.youtube.com/watch?v=QSQA8i4QsLY&list=PL_5NbJ27RRd1NHQnLAZkfZE00JFfz-qND&index=2)

## ООП

Перед или параллельно с этапом 2 полезно пройти ООП:

| Ресурс | Описание |
|--------|----------|
| [code.mu — ООП в PHP](https://code.mu/ru/php/book/oop/) | Самоучитель |
| [ООП в GitBook](../Backend/php/OOP/README.md) | Классы, наследование, трейты |
| [Паттерны проектирования](../Backend/php/patterns/README.md) | Factory, Strategy, Observer |

## Связанные разделы

| Раздел | Зачем |
|--------|--------|
| [PHP](../Backend/php/README.md) | Синтаксис и основы языка |
| [ООП](../Backend/php/OOP/README.md) | Классы для собеседований |
| [SOLID](../Backend/php/SOLID/README.md) | Принципы проектирования |
| [Курсы — LeetCode / Codewars](../courses/free/README.md) | Дополнительная практика |
| [Собеседования](../interview/README.md) | Вопросы PHP Core + MySQL |
| [Карьера](../career/README.md) | Поиск работы после подготовки |
