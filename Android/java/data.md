# 5. Данные

> Источник: [Metanit — главы 14–16](https://metanit.com/java/android/) · [Data and files](https://developer.android.com/guide/topics/data)

## SharedPreferences

Простые ключ–значение (настройки, флаги):

```java
SharedPreferences prefs = getSharedPreferences("app", MODE_PRIVATE);
prefs.edit().putBoolean("dark", true).apply();

boolean dark = prefs.getBoolean("dark", false);
```

Для typed DataStore / Preference UI см. Jetpack Preference и актуальные guides на developer.android.com.

## Файлы

Внутреннее хранилище приложения:

```java
try (FileOutputStream out = openFileOutput("note.txt", MODE_PRIVATE)) {
    out.write("hello".getBytes(StandardCharsets.UTF_8));
}
```

Внешнее / медиа — через scoped storage и Storage Access Framework; не пишите произвольно на «общую» карту без разрешений и новых API.

## SQLite

Встроенная БД. Классика: `SQLiteOpenHelper` + `SQLiteDatabase` (Metanit гл. 16).

Современный подход для приложений — **Room** (обёртка над SQLite):

```kotlin
// предпочтительно Kotlin + Room; в Java Room тоже доступен
@Entity
data class User(@PrimaryKey val id: Int, val name: String)
```

Официально: [Save data using Room](https://developer.android.com/training/data-storage/room)

Паттерн: Model → Repository → UI (Activity / ViewModel), без SQL в Activity.

## Сеть и JSON

- HTTP: не `HttpURLConnection` «в лоб» на UI-потоке; используйте фоновые механизмы / библиотеки (OkHttp, Retrofit)
- JSON: `org.json` или Moshi / Gson
- Долгие задачи: [WorkManager](https://developer.android.com/topic/libraries/architecture/workmanager), корутины (Kotlin)

Metanit гл. 12, 22 — учебный минимум; для продакшена ориентируйтесь на [Connectivity](https://developer.android.com/guide/topics/connectivity) и архитектуру Google.

## Сборка после изменений

```bash
gradlew.bat assembleDebug
adb install -r app/build/outputs/apk/debug/app-debug.apk
```

См. [Сборка проекта](../build.md).
