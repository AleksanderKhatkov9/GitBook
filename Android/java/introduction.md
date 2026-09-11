# 1. Введение

> Источник: [Metanit — Глава 1](https://metanit.com/java/android/) · [developer.android.com](https://developer.android.com/develop)

## Установка

См. [Установка Android Studio](../installation.md): SDK, эмулятор, первый запуск.

## Первый проект (Java)

1. **File → New → New Project → Empty Views Activity**
2. Language: **Java**
3. Minimum SDK — по целевым устройствам
4. Дождитесь Gradle Sync
5. **Run ▶**

Структура модуля `app` (упрощённо):

```
app/
├── src/main/
│   ├── java/.../MainActivity.java
│   ├── res/
│   │   ├── layout/activity_main.xml
│   │   ├── values/strings.xml
│   │   └── ...
│   └── AndroidManifest.xml
└── build.gradle.kts
```

| Файл | Роль |
|------|------|
| `MainActivity.java` | Точка входа UI-экрана |
| `activity_main.xml` | Разметка экрана |
| `AndroidManifest.xml` | Компоненты приложения, разрешения |
| `build.gradle.kts` | Зависимости, SDK, applicationId |

## Activity и layout

В `onCreate` разметка подключается через `setContentView`:

```java
public class MainActivity extends AppCompatActivity {
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        TextView title = findViewById(R.id.title);
        title.setText("Hello, Android");
    }
}
```

XML (`res/layout/activity_main.xml`) описывает дерево View; id из XML доступны как `R.id.*`.

## Design / Code

В Android Studio у layout есть режимы **Design**, **Split**, **Code**. ConstraintLayout — основной контейнер для современных View-экранов (см. [Layout и виджеты](ui-layouts.md)).

## Дальше

- [Layout и виджеты](ui-layouts.md)
- [Activity и Intent](activity-intent.md)
- Сборка: [build.md](../build.md)
