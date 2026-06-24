# 2. Алгоритмы и структуры данных

> Источник: [algorithm-practice](https://github.com/dmitryburov/algorithm-practice)

**Срок:** недели 3–8 (1–2 месяца)  
**Цель:** знать и уметь писать руками основные алгоритмы.

## Сортировки

Изучите по порядку — от простых к эффективным:

| Алгоритм | Сложность (средняя) | Когда учить |
|----------|---------------------|-------------|
| Пузырьковая | O(n²) | Понимание swap и вложенных циклов |
| Выбором | O(n²) | Поиск минимума в неотсортированной части |
| Вставками | O(n²) | Эффективна на почти отсортированных данных |
| Quicksort | O(n log n) | Divide and conquer, pivot |
| Merge sort | O(n log n) | Стабильная, рекурсия + слияние |

```php
<?php

function bubbleSort(array $arr): array
{
    $n = count($arr);
    for ($i = 0; $i < $n - 1; $i++) {
        for ($j = 0; $j < $n - $i - 1; $j++) {
            if ($arr[$j] > $arr[$j + 1]) {
                [$arr[$j], $arr[$j + 1]] = [$arr[$j + 1], $arr[$j]];
            }
        }
    }
    return $arr;
}
```

## Поиск

| Алгоритм | Сложность | Условие |
|----------|-----------|---------|
| Линейный | O(n) | Любой массив |
| Бинарный | O(log n) | **Отсортированный** массив |

```php
<?php

function binarySearch(array $arr, int $target): int
{
    $left = 0;
    $right = count($arr) - 1;

    while ($left <= $right) {
        $mid = intdiv($left + $right, 2);
        if ($arr[$mid] === $target) {
            return $mid;
        }
        if ($arr[$mid] < $target) {
            $left = $mid + 1;
        } else {
            $right = $mid - 1;
        }
    }

    return -1;
}
```

## Структуры данных

| Структура | Операции | Применение |
|-----------|----------|------------|
| Стек (Stack) | push, pop — LIFO | Скобки, undo, DFS |
| Очередь (Queue) | enqueue, dequeue — FIFO | BFS, задачи по порядку |
| Deque | push/pop с обоих концов | Sliding window |
| Связный список | insert, delete, traverse | LeetCode list-задачи |
| Хэш-таблица | O(1) lookup | Two Sum, дубликаты |
| BST | insert, search, delete | Упорядоченные данные |

### Стек на PHP

```php
<?php

class Stack
{
    private array $items = [];

    public function push(mixed $value): void
    {
        $this->items[] = $value;
    }

    public function pop(): mixed
    {
        return array_pop($this->items);
    }

    public function isEmpty(): bool
    {
        return empty($this->items);
    }
}
```

## Паттерны на массивах и строках

| Паттерн | Суть | Пример задачи |
|---------|------|---------------|
| Two pointers | Два индекса с разных сторон | Палиндром, пара с суммой |
| Sliding window | Подмассив фиксированной/переменной длины | Max sum subarray |
| Hash map | Подсчёт / поиск за O(1) | Дубликаты, частота символов |

## Чеклист этапа

- [ ] Реализованы 3 простые сортировки и quicksort или merge sort
- [ ] Бинарный поиск написан без подсказок
- [ ] Реализованы стек и очередь
- [ ] Решена 1 задача на two pointers

## Следующий шаг

[3. Практика Easy → Medium](stage-3.md)
