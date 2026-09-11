# 6. Корутины и Flow

> Источник: [Metanit — главы 8–9](https://metanit.com/kotlin/tutorial/) · [Coroutines guide](https://kotlinlang.org/docs/coroutines-guide.html) · [Android coroutines](https://developer.android.com/kotlin/coroutines)

Корутины — способ писать асинхронный код без callback-ада. На Android это стандарт для сети, БД и Work поверх главного потока.

## Зависимости (модуль app)

```kotlin
dependencies {
    implementation("org.jetbrains.kotlinx:kotlinx-coroutines-android:1.9.0")
}
```

Версию сверяйте с актуальным BOM / документацией.

## launch и async

```kotlin
lifecycleScope.launch {
    val data = withContext(Dispatchers.IO) {
        loadFromNetwork()
    }
    // снова Main — обновить UI
    textView.text = data
}
```

| API | Назначение |
|-----|------------|
| `launch` | «fire and forget», возвращает `Job` |
| `async` / `await` | параллельный результат (`Deferred`) |
| `withContext` | смена диспетчера |
| `Dispatchers.Main` | UI |
| `Dispatchers.IO` | сеть / диск |
| `Dispatchers.Default` | CPU-задача |

На Android предпочитайте **lifecycle-aware** scope: `lifecycleScope`, `viewModelScope` — отмена при уничтожении экрана / ViewModel.

## Отмена

```kotlin
val job = lifecycleScope.launch { /* ... */ }
job.cancel()
```

`suspend`-функции должны поддерживать кооперативную отмену (`ensureActive`, cancellable API).

## Flow (асинхронные потоки)

```kotlin
fun ticks(): Flow<Int> = flow {
    var i = 0
    while (true) {
        emit(i++)
        delay(1000)
    }
}

lifecycleScope.launch {
    ticks()
        .map { "tick $it" }
        .collect { Log.d("Flow", it) }
}
```

Операции: `map`, `filter`, `take`, `combine`, `reduce` / `fold` — см. Metanit гл. 9.

На Android часто: `StateFlow` / `SharedFlow` в ViewModel → UI (Compose `collectAsStateWithLifecycle` или Views).

## Практика

- Не блокируйте `Dispatchers.Main`
- Сеть и Room — `IO` + `suspend` DAO
- UI-состояние — один поток правды в ViewModel

Дальше: [Kotlin в Android](android.md)
