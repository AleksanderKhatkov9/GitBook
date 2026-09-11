# 5. Коллекции

> Источник: [Metanit — глава 7](https://metanit.com/kotlin/tutorial/) · [Collections](https://kotlinlang.org/docs/collections-overview.html)

## Изменяемые и неизменяемые

| Тип | Read-only | Mutable |
|-----|-----------|---------|
| Список | `List` | `MutableList` |
| Множество | `Set` | `MutableSet` |
| Словарь | `Map` | `MutableMap` |

```kotlin
val list = listOf(1, 2, 3)
val mut = mutableListOf(1, 2)
mut.add(3)

val map = mapOf("a" to 1, "b" to 2)
```

Read-only интерфейс не гарантирует immutability объекта целиком, но задаёт контракт API.

## Типичные операции

```kotlin
val nums = listOf(4, 1, 3, 2, 4)

nums.filter { it > 2 }
nums.map { it * 10 }
nums.distinct().sorted()
nums.groupBy { it % 2 }
nums.sum()
nums.take(2)
nums.firstOrNull { it > 10 }
```

## Sequence

Ленивые цепочки — для больших данных / дорогих шагов:

```kotlin
val result = nums.asSequence()
    .filter { it > 1 }
    .map { it * 2 }
    .toList()
```

Отличие от `Iterable`: промежуточные коллекции не создаются на каждом шаге, пока нет терминальной операции.

## На Android

- UI-списки: `List` моделей → `RecyclerView` / LazyColumn (Compose)
- Реактивность: `StateFlow` / `Flow` часто несут `List` состояний
- Не мутируйте список, на который уже подписан адаптер — создавайте новый или используйте `DiffUtil` / immutable state
