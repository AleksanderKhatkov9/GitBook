# 2. Layout и виджеты

> Источник: [Metanit — главы 2–3](https://metanit.com/java/android/) · [UI guides](https://developer.android.com/guide/topics/ui)

## Layout в XML

Разметка хранится в `res/layout/`. Корневой контейнер задаёт расположение детей.

| Контейнер | Когда использовать |
|-----------|-------------------|
| **ConstraintLayout** | Основной выбор: гибкие связи между виджетами |
| **LinearLayout** | Ряд или колонка |
| **FrameLayout** | Наложение / простой контейнер для Fragment |
| **ScrollView** | Прокрутка длинного содержимого |

Размеры: `match_parent`, `wrap_content`, или dp (`16dp`). Отступы: `android:layout_margin`, `android:padding`.

## ConstraintLayout (идея)

Виджеты крепятся к родителю или друг к другу (`app:layout_constraint*`). Цепочки (`chain`) выравнивают группы элементов.

```xml
<TextView
    android:id="@+id/title"
    android:layout_width="wrap_content"
    android:layout_height="wrap_content"
    android:text="@string/app_name"
    app:layout_constraintTop_toTopOf="parent"
    app:layout_constraintStart_toStartOf="parent"
    app:layout_constraintEnd_toEndOf="parent" />
```

## Основные виджеты

| Виджет | Назначение |
|--------|------------|
| `TextView` | Текст |
| `EditText` | Ввод |
| `Button` | Нажатие |
| `CheckBox` / `RadioButton` | Выбор |
| `ImageView` | Изображение |
| `RecyclerView` | Списки (см. [Списки](lists-fragments.md)) |

Обработка клика в Java:

```java
Button btn = findViewById(R.id.btnOk);
btn.setOnClickListener(v -> {
    Toast.makeText(this, "OK", Toast.LENGTH_SHORT).show();
});
```

## Ресурсы

| Тип | Папка / файл |
|-----|----------------|
| Строки | `res/values/strings.xml` |
| Цвета | `res/values/colors.xml` |
| Размеры | `res/values/dimens.xml` |
| Картинки | `res/drawable/`, `res/mipmap/` |

В коде: `getString(R.string.app_name)`, в XML: `@string/app_name`.

## Стили и темы

Темы задаются в `themes.xml` и манифесте (`android:theme`). Стили переиспользуют атрибуты виджетов — см. главы 8 у Metanit.

## Compose vs Views

Официально UI рекомендуется строить на **Jetpack Compose** (Kotlin). Этот раздел описывает **View + XML** — базу многих существующих приложений и курса Metanit на Java.

Compose: [developer.android.com — Compose](https://developer.android.com/develop/ui/compose)
