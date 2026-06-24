# 3. Практика Easy → Medium

> Источник: [algorithm-practice](https://github.com/dmitryburov/algorithm-practice) · [LeetCode](https://leetcode.com/)

**Срок:** недели 9–20 (2–3 месяца)  
**Цель:** научиться решать задачи Easy/Medium на LeetCode (PHP).

## Темп

- **1 задача в день**
- **5–7 задач в неделю**
- Сначала 15–20 минут без подсказок, затем разбор решения

## Easy (~100 задач)

| Задача | Тема |
|--------|------|
| [Two Sum](https://leetcode.com/problems/two-sum/) | Hash map |
| [Merge Two Sorted Lists](https://leetcode.com/problems/merge-two-sorted-lists/) | Связный список |
| [Maximum Subarray](https://leetcode.com/problems/maximum-subarray/) | Kadane |
| [Best Time to Buy and Sell Stock](https://leetcode.com/problems/best-time-to-buy-and-sell-stock/) | One pass |
| [Plus One](https://leetcode.com/problems/plus-one/) | Массив |
| [Climbing Stairs](https://leetcode.com/problems/climbing-stairs/) | DP |

### Пример: Two Sum

```php
<?php

function twoSum(array $nums, int $target): array
{
    $map = [];

    foreach ($nums as $i => $num) {
        $need = $target - $num;
        if (array_key_exists($need, $map)) {
            return [$map[$need], $i];
        }
        $map[$num] = $i;
    }

    return [];
}
```

## Medium (~50 задач)

| Задача | Тема |
|--------|------|
| [3Sum](https://leetcode.com/problems/3sum/) | Two pointers |
| [Longest Substring Without Repeating Characters](https://leetcode.com/problems/longest-substring-without-repeating-characters/) | Sliding window |
| [Container With Most Water](https://leetcode.com/problems/container-with-most-water/) | Two pointers |
| [Group Anagrams](https://leetcode.com/problems/group-anagrams/) | Hash map |
| [Product of Array Except Self](https://leetcode.com/problems/product-of-array-except-self/) | Prefix product |
| [Binary Tree Level Order Traversal](https://leetcode.com/problems/binary-tree-level-order-traversal/) | BFS |
| [Word Search](https://leetcode.com/problems/word-search/) | DFS / backtracking |

## Как решать задачу

1. **Прочитать** условие, привести 2–3 примера
2. **Brute force** — наивное решение и его сложность
3. **Оптимизация** — hash map, two pointers, DP
4. **Код** — чистый PHP, понятные имена
5. **Тесты** — edge cases: пустой массив, один элемент, дубликаты
6. **Разбор** — чужое решение на LeetCode Discuss

## Шаблон решения

```php
<?php

class Solution
{
    public function solve(/* params */)
    {
        // 1. edge cases
        // 2. основная логика
        // 3. return
    }
}

// Локальный тест
$s = new Solution();
var_dump($s->solve(/* test input */));
```

## Чеклист этапа

- [ ] 30+ Easy задач
- [ ] 15+ Medium задач
- [ ] Ведётся лог в GitHub (дата, задача, сложность, паттерн)

## Следующий шаг

[4. Продвинутый уровень](stage-4.md)
