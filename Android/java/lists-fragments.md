# 4. Списки и фрагменты

> Источник: [Metanit — главы 7, 10](https://metanit.com/java/android/) · [Fragments](https://developer.android.com/guide/fragments)

## RecyclerView

Современный список (вместо устаревшего `ListView` для новых экранов):

1. Зависимость `recyclerview` в Gradle
2. `RecyclerView` в layout
3. `Adapter` + `ViewHolder`
4. `LayoutManager` (`LinearLayoutManager`, `GridLayoutManager`)

Идея ViewHolder: кэшировать `findViewById`, не искать виджеты на каждый `bind`.

```java
public class ItemAdapter extends RecyclerView.Adapter<ItemAdapter.VH> {
    private final List<String> items;

    public ItemAdapter(List<String> items) { this.items = items; }

    static class VH extends RecyclerView.ViewHolder {
        final TextView text;
        VH(View itemView) {
            super(itemView);
            text = itemView.findViewById(R.id.text);
        }
    }

    @Override
    public VH onCreateViewHolder(ViewGroup parent, int viewType) {
        View v = LayoutInflater.from(parent.getContext())
                .inflate(R.layout.item_row, parent, false);
        return new VH(v);
    }

    @Override
    public void onBindViewHolder(VH holder, int position) {
        holder.text.setText(items.get(position));
    }

    @Override
    public int getItemCount() { return items.size(); }
}
```

В Activity:

```java
RecyclerView list = findViewById(R.id.list);
list.setLayoutManager(new LinearLayoutManager(this));
list.setAdapter(new ItemAdapter(Arrays.asList("A", "B", "C")));
```

## Fragment

**Fragment** — переиспользуемая часть UI внутри Activity (таблетки, вкладки, master-detail).

Жизненный цикл связан с хостом, но имеет свои колбэки (`onCreateView`, `onViewCreated`, …). Транзакции:

```java
getSupportFragmentManager()
    .beginTransaction()
    .replace(R.id.container, new ListFragment())
    .addToBackStack(null)
    .commit();
```

Контейнер — обычно `FragmentContainerView` / `FrameLayout` в layout Activity.

Для навигации между экранами предпочтителен [Navigation Component](https://developer.android.com/guide/navigation).

## ViewPager2 и TabLayout

Несколько страниц / вкладок — Metanit гл. 17, официально: [ViewPager2](https://developer.android.com/guide/navigation/navigation-swipe-view-2).

## Дальше

- [Данные](data.md) — сохранение и SQLite
- Официально: [background work](https://developer.android.com/guide/background) вместо устаревшего `AsyncTask`
