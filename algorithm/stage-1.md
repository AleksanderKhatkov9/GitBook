# 1. Базовые навыки (разминка)

> Источник: [algorithm-practice](https://github.com/dmitryburov/algorithm-practice/blob/master/leetcode/1/README.md)

**Срок:** недели 1–2 (2–3 недели)  
**Цель:** уверенно владеть синтаксисом PHP и базовыми алгоритмами.

## Что повторить в PHP

| Тема | Что знать |
|------|-----------|
| Массивы | `array_push`, `array_pop`, индексы, ассоциативные массивы |
| Строки | `strlen`, `str_split`, конкатенация, сравнение |
| Циклы | `for`, `while`, `foreach` |
| Рекурсия | базовый случай, уменьшение задачи |

## Простые задачи

Решите **без** готовых функций вроде `array_reverse` (на первом проходе):

| Задача | Подсказка |
|--------|-----------|
| Разворот строки | Два указателя или цикл с конца |
| Разворот массива | Swap элементов с двух сторон |
| Палиндром | Сравнить строку с развёрнутой |
| Факториал | Рекурсия и цикл `for` |
| Фибоначчи | Рекурсия + мемоизация |
| Сумма массива | Один проход |
| Максимум массива | Один проход |

## Примеры

### Разворот массива

```php
<?php

function reverseArray(array $arr): array
{
    $left = 0;
    $right = count($arr) - 1;

    while ($left < $right) {
        [$arr[$left], $arr[$right]] = [$arr[$right], $arr[$left]];
        $left++;
        $right--;
    }

    return $arr;
}
```

### Факториал

```php
<?php

function factorial(int $n): int
{
    if ($n <= 1) {
        return 1;
    }
    return $n * factorial($n - 1);
}

function factorialIterative(int $n): int
{
    $result = 1;
    for ($i = 2; $i <= $n; $i++) {
        $result *= $i;
    }
    return $result;
}
```

### Палиндром

```php
<?php

function isPalindrome(string $s): bool
{
    $s = strtolower(preg_replace('/[^a-z0-9]/', '', $s));
    return $s === strrev($s);
}
```

## Инструменты

```bash
# Запуск решения
php solution.php

# Структура репозитория
php-algorithms/
├── stage-1/
│   ├── reverse-array.php
│   └── palindrome.php
└── README.md
```

## Чеклист этапа

- [ ] 5+ задач решены без подсказок
- [ ] Есть рекурсивное и итеративное решение факториала
- [ ] Код в GitHub-репозитории `php-algorithms`

## Следующий шаг

[2. Алгоритмы и структуры данных](stage-2.md)
