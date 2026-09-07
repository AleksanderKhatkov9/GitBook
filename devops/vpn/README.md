# VPN Gate

> Сайт: [vpngate.net](https://www.vpngate.net/en/) · Скачать клиент: [Download VPN Gate Client](https://www.vpngate.net/en/download.aspx)

**VPN Gate** — академический проект Университета Цукубы (Япония): публичные VPN-реле на базе [SoftEther VPN](http://www.softether.org/). Бесплатно, без регистрации. Удобен, когда нужно обойти блокировки или сменить исходящий IP при разработке и доступе к сервисам.

## Зачем разработчику

| Сценарий | Пример |
|----------|--------|
| Блокировки / цензура | Сайт или API недоступен из вашей сети |
| Гео-ограничения | Контент или сервис только из другой страны |
| Проверка гео | Как выглядит сайт/API с IP другой страны |
| Обход корпоративного/провайдерского фильтра | Доступ к документации, npm, GitHub и т.п. |

## Скачать клиент (Windows)

Официальная страница: **[Download VPN Gate Client](https://www.vpngate.net/en/download.aspx)**.

1. Скачайте **SoftEther VPN Client + VPN Gate Client Plugin** (ZIP).
2. Распакуйте архив и запустите установщик `vpngate-client-...`.
3. В мастере выберите компонент **SoftEther VPN Client**.
4. После установки на рабочем столе появится иконка SoftEther VPN Client.

Файлы подписаны (GlobalSign / Symantec). Языки: English, Japanese, Simplified Chinese. ОС: Windows (x86 / x64), включая Windows 7–10 и Server.

Альтернативы, если основной сервер недоступен:

| Источник | Ссылка |
|----------|--------|
| Официальный download | [vpngate.net/en/download.aspx](https://www.vpngate.net/en/download.aspx) |
| CNET Download.com | зеркало на странице Download |
| Зеркала сайта | [Mirror Sites](https://www.vpngate.net/en/sites.aspx) |

Подробная установка и подключение: [How to Install and Use (SoftEther)](https://www.vpngate.net/en/howto_softether.aspx).

## Подключение (SoftEther + VPN Gate Plugin)

1. Откройте **SoftEther VPN Client**.
2. Дважды щёлкните **VPN Gate Public VPN Relay Servers**.
3. В списке выберите сервер и нажмите **Connect to the VPN Server**.
4. При выборе TCP/UDP — обычно сначала пробуйте TCP.
5. При успешном подключении появится сообщение об установке VPN.

Проверка:

```bash
ipconfig /all
tracert 8.8.8.8
```

Пока VPN активен, виртуальный адаптер получает адрес из блока `10.211.*`, а маршрут в интернет идёт через шлюз VPN (часто `10.211.254.254`). На [главной VPN Gate](https://www.vpngate.net/en/) видно текущий внешний IP и страну.

## Другие способы подключения

Клиент SoftEther — только Windows. На других устройствах:

| Способ | Платформы | Документация |
|--------|-----------|--------------|
| **L2TP/IPsec** | Windows, Mac, iOS, Android (встроенный VPN) | [howto_l2tp](https://www.vpngate.net/en/howto_l2tp.aspx) |
| **OpenVPN** | Desktop / mobile с OpenVPN-клиентом | [howto_openvpn](https://www.vpngate.net/en/howto_openvpn.aspx) |
| **MS-SSTP** | Windows | [howto_sstp](https://www.vpngate.net/en/howto_sstp.aspx) |

Конфиги и параметры серверов — на [списке публичных серверов](https://www.vpngate.net/en/) (кнопки OpenVPN / L2TP у каждого узла).

## SoftEther VPN Server

Отдельно можно поставить [SoftEther VPN Server](http://www.softether.org/) (Windows, Linux, macOS, FreeBSD, Solaris) и при желании включить **VPN Gate Service**, чтобы ваш ПК стал релеером проекта. По умолчанию Relay Service в клиенте **выключен** — включать вручную.

## Важно

- Используйте **последнюю** версию клиента; при странных ошибках файрвола государства обновляйте клиент и пробуйте [зеркала](https://www.vpngate.net/en/sites.aspx).
- Антивирус иногда блокирует VPN-функции ОС — добавьте клиент/установщик в исключения.
- SoftEther ставится как **системная служба** Windows: работает в фоне после закрытия GUI. Отключить/остановить можно через «Службы».
- Публичные реле — волонтёрские: скорость и стабильность зависят от сервера; при обрыве выберите другой из списка.
- Соблюдайте [локальные законы](https://www.vpngate.net/en/about_us.aspx#comply) и [Anti-Abuse Policy](https://www.vpngate.net/en/about_abuse.aspx). Не используйте VPN для незаконной активности.

## Полезные ссылки

| Ресурс | URL |
|--------|-----|
| Скачать клиент | [vpngate.net/en/download.aspx](https://www.vpngate.net/en/download.aspx) |
| Список серверов | [vpngate.net/en/](https://www.vpngate.net/en/) |
| Как подключаться | [howto.aspx](https://www.vpngate.net/en/howto.aspx) |
| SoftEther VPN | [softether.org](http://www.softether.org/) |
| Исходники SoftEther | [GitHub SoftEtherVPN](https://github.com/SoftEtherVPN/SoftEtherVPN/) |
| О проекте | [about.aspx](https://www.vpngate.net/en/about.aspx) |
