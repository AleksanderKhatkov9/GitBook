# 3. Activity и Intent

> Источник: [Metanit — глава 5](https://metanit.com/java/android/) · [Activities](https://developer.android.com/guide/components/activities)

## Activity

**Activity** — экран (или часть UI) с жизненным циклом. Главные колбэки:

| Метод | Когда |
|-------|--------|
| `onCreate` | Создание, `setContentView` |
| `onStart` / `onResume` | Становится видимой / в фокусе |
| `onPause` / `onStop` | Уходит на задний план |
| `onDestroy` | Уничтожение |

Не выполняйте долгую работу на главном потоке в этих методах.

## AndroidManifest.xml

Каждая Activity объявляется в манифесте. Лаунчер:

```xml
<activity
    android:name=".MainActivity"
    android:exported="true">
    <intent-filter>
        <action android:name="android.intent.action.MAIN" />
        <category android:name="android.intent.category.LAUNCHER" />
    </intent-filter>
</activity>
```

Разрешения (`uses-permission`) и `application`-атрибуты тоже живут здесь.

## Intent

**Intent** — намерение: открыть экран, передать данные, вызвать системное действие.

Явный переход на другую Activity:

```java
Intent intent = new Intent(this, DetailActivity.class);
intent.putExtra("id", 42);
startActivity(intent);
```

Чтение:

```java
int id = getIntent().getIntExtra("id", -1);
```

Для сложных объектов — `Parcelable` / сериализация (см. Metanit 5.4–5.5). Результат назад: `ActivityResultLauncher` (современный API) вместо устаревшего `startActivityForResult`.

## Implicit Intent

Запрос к системе / другим приложениям:

```java
Intent share = new Intent(Intent.ACTION_SEND);
share.setType("text/plain");
share.putExtra(Intent.EXTRA_TEXT, "Hello");
startActivity(Intent.createChooser(share, "Share"));
```

## Связь с архитектурой

Для крупных приложений экраны часто делают на **Fragment** + Navigation Component, а состояние держат в **ViewModel**. Базовый Activity+Intent — фундамент; дальше см. [Списки и фрагменты](lists-fragments.md) и [App architecture](https://developer.android.com/topic/architecture).
