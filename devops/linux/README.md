# Linux

Документация по Linux: команды, администрирование, серверы.

## Базовые команды

### Навигация и работа с каталогами


| Команда | Описание                           |
| ------- | ---------------------------------- |
| `pwd`   | Показывает текущую директорию      |
| `ls`    | Список файлов и папок в директории |
| `cd`    | Переход между папками              |
| `mkdir` | Создаёт новую директорию           |
| `rmdir` | Удаляет пустую директорию          |


### Работа с файлами


| Команда         | Описание                                   |
| --------------- | ------------------------------------------ |
| `touch`         | Создаёт пустой файл                        |
| `cp`            | Копирует файл или каталог                  |
| `mv`            | Перемещает или переименовывает файлы/папки |
| `rm`            | Удаляет файл (`rm -r` — для папки)         |
| `cat`           | Показывает содержимое файла                |
| `less` / `more` | Постраничный просмотр текста               |


### Просмотр информации


| Команда  | Описание                                |
| -------- | --------------------------------------- |
| `man`    | Справка по команде                      |
| `echo`   | Выводит текст или переменные в терминал |
| `uname`  | Информация об ОС                        |
| `whoami` | Имя текущего пользователя               |


### Права и суперпользователь


| Команда | Описание                                  |
| ------- | ----------------------------------------- |
| `chmod` | Изменяет права доступа к файлам           |
| `sudo`  | Выполнить команду от имени администратора |


### Поиск и другие полезные команды


| Команда   | Описание                 |
| --------- | ------------------------ |
| `find`    | Поиск файлов в системе   |
| `grep`    | Поиск строк в текстах    |
| `history` | История введённых команд |
| `clear`   | Очистить экран терминала |


## Основные команды

```bash
# Файлы и папки
ls -la
cd /var/www
mkdir project
cp file.txt backup/
mv old.txt new.txt
rm -rf folder/

# Права
chmod 755 script.sh
chown www-data:www-data storage/

# Процессы
ps aux
top
kill -9 <pid>

# Сеть
curl https://example.com
ping google.com
netstat -tulpn
```

## Пакетный менеджер (Ubuntu/Debian)

```bash
sudo apt update          # обновить список пакетов
sudo apt upgrade         # обновить установленные пакеты
sudo apt install nginx php-fpm mysql-server
```

## Сервисы (systemd)

```bash
sudo systemctl start nginx
sudo systemctl enable nginx
sudo systemctl status nginx
sudo systemctl restart php8.3-fpm
```

## Менеджер процессов PM2

### Запуск нового процесса

```bash
pm2 start npm --name marketis.site -- run start
pm2 status
```

Пример вывода `pm2 status`:

```
┌────┬────────────────────┬──────────┬──────┬───────────┬──────────┬──────────┐
│ id │ name               │ mode     │ ↺    │ status    │ cpu      │ memory   │
├────┼────────────────────┼──────────┼──────┼───────────┼──────────┼──────────┤
│ 0  │ frontend           │ fork     │ 61   │ online    │ 0%       │ 63.8mb   │
│ 7  │ marketis.site      │ fork     │ 1    │ online    │ 0%       │ 64.2mb   │
└────┴────────────────────┴──────────┴──────┴───────────┴──────────┴──────────┘
```

Удалить процесс по id:

```bash
pm2 delete 3
```

### Основная сборка проекта

```bash
npm run build
pm2 restart all
```

## Место на диске

Свободное место на диске:

```bash
df -h
```

Распределение занятого пространства по каталогам:

```bash
ncdu
```

## SSH

```bash
ssh user@192.168.1.100
scp file.txt user@server:/home/user/
```

## Ошибка 505

Когда места на сервере достаточно (`df -h` показывает ~70% занято), перезапустите веб-сервисы:

```bash
sudo systemctl restart nginx
sudo systemctl restart php8.2-fpm
```

При проблемах с PHP-FPM 8.2 перезагрузите:

- `nginx`
- `php8.2-fpm`

## Ошибка 502

**Итог:** проблема была в OOM-kill → PHP-FPM падал → Nginx отдавал 502. Swap + перезапуск PHP-FPM это исправили.

### Добавить swap (если его нет)

```bash
free -h | grep Swap
```

Если `Swap: 0B`:

```bash
sudo fallocate -l 2G /swapfile
sudo chmod 600 /swapfile
sudo mkswap /swapfile
sudo swapon /swapfile
echo '/swapfile none swap sw 0 0' | sudo tee -a /etc/fstab
free -h
```

## Полезные ссылки

- [Linux Journey](https://linuxjourney.com/)
- [Explain Shell](https://explainshell.com/) — разбор команд
- [Базовые команды Linux (видео)](https://www.youtube.com/watch?v=ZjTYY0FYgqA&list=PLd2_Os8Cj3t_iBeaZq0F1M9A9nvEQdlJB&index=4)



## Параметр --max-depth=1 ограничивает глубину обхода каталогов одним уровнем.

```bash
Каталоги с файлами сайтов:
root@server-ikkuup:~# du -h --max-depth=1 /var/www/
960M /var/www/BZRMarketisSite
```