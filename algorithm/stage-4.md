# 4. Продвинутый уровень

> Источник: [algorithm-practice](https://github.com/dmitryburov/algorithm-practice) · [LeetCode](https://leetcode.com/)

**Срок:** недели 21–36+ (3–6 месяцев)  
**Цель:** решать Medium/Hard задачи, готовиться к собеседованиям.

## Сложные алгоритмы

| Тема | Алгоритмы | Применение |
|------|-----------|------------|
| Обход графов | BFS, DFS | Компоненты, острова, лабиринты |
| Кратчайший путь | Дейкстра, Беллман–Форд, A* | Карты, маршруты |
| DP | Knapsack, LCS, LIS | Оптимизация, подпоследовательности |
| Графы | Union-Find, топологическая сортировка | Связность, зависимости |
| Строки | KMP, Rabin–Karp | Поиск подстроки |

## BFS — обход в ширину

```php
<?php

function bfs(array $graph, int $start): array
{
    $visited = [$start => true];
    $queue = [$start];
    $order = [];

    while (!empty($queue)) {
        $node = array_shift($queue);
        $order[] = $node;

        foreach ($graph[$node] ?? [] as $neighbor) {
            if (!isset($visited[$neighbor])) {
                $visited[$neighbor] = true;
                $queue[] = $neighbor;
            }
        }
    }

    return $order;
}
```

## DFS — обход в глубину

```php
<?php

function dfs(array $graph, int $node, array &$visited, array &$order): void
{
    $visited[$node] = true;
    $order[] = $node;

    foreach ($graph[$node] ?? [] as $neighbor) {
        if (!isset($visited[$neighbor])) {
            dfs($graph, $neighbor, $visited, $order);
        }
    }
}
```

## Hard задачи (примеры)

| Задача | Тема |
|--------|------|
| [Trapping Rain Water](https://leetcode.com/problems/trapping-rain-water/) | Two pointers / stack |
| [Minimum Window Substring](https://leetcode.com/problems/minimum-window-substring/) | Sliding window |
| [N-Queens](https://leetcode.com/problems/n-queens/) | Backtracking |
| [Word Ladder II](https://leetcode.com/problems/word-ladder-ii/) | BFS + восстановление пути |
| [Regular Expression Matching](https://leetcode.com/problems/regular-expression-matching/) | DP |

## Подготовка к собеседованию

| Навык | Как тренировать |
|-------|-----------------|
| Объяснение вслух | Решайте задачу, проговаривая шаги |
| Оценка сложности | O(n), O(n log n) — для времени и памяти |
| Edge cases | Пустой ввод, один элемент, overflow |
| Чистый код | Имена переменных, без лишней магии |

## Рекомендуемый порядок тем

1. BFS / DFS на деревьях и графах
2. DP: climbing stairs → knapsack → LCS
3. Sliding window (Hard)
4. Union-Find
5. Топологическая сортировка

## Видео

- [algorithm-practice — README](https://github.com/dmitryburov/algorithm-practice?tab=readme-ov-file)
- [YouTube — плейлист](https://www.youtube.com/watch?v=QSQA8i4QsLY&list=PL_5NbJ27RRd1NHQnLAZkfZE00JFfz-qND&index=2)

## Чеклист этапа

- [ ] 20+ Medium задач
- [ ] 5+ Hard задач
- [ ] BFS и DFS реализованы с нуля
- [ ] 1+ задача на DP (knapsack или LCS)

[← Вернуться к оглавлению](README.md)
