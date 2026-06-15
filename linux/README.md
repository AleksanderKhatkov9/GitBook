# Linux

Документация по Linux: команды, администрирование, серверы.

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
sudo apt update
sudo apt upgrade
sudo apt install nginx php-fpm mysql-server
```

## Сервисы (systemd)

```bash
sudo systemctl start nginx
sudo systemctl enable nginx
sudo systemctl status nginx
sudo systemctl restart php8.3-fpm
```

## SSH

```bash
ssh user@192.168.1.100
scp file.txt user@server:/home/user/
```

## Полезные ссылки

- [Linux Journey](https://linuxjourney.com/)
- [Explain Shell](https://explainshell.com/) — разбор команд
