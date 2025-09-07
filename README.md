# CSS Parking - Igrica za učenje CSS transformacija

Ovo je web aplikacija koja kroz igricu parkiranja automobila uči korisnike CSS transformacijama.

## Tehnologije

### Backend
- Laravel - PHP framework za backend
- Sanctum - Autentifikacija
- MySQL - Baza podataka

### Frontend
- React - JavaScript biblioteka za korisnički interfejs
- Tailwind CSS - CSS framework za stilizovanje
- Axios - HTTP klijent za API pozive

## Funkcionalnosti

- Registracija i prijava - Korisnici mogu da se registruju i prijave
- Prelaženje nivoa - Igrač mora da parkira auto koristeći CSS transformacije
- Leaderboard - Tabela najboljih rezultata po nivou
- Admin dashboard - Administratorski panel za upravljanje korisnicima
- Nivo dizajner - Administratori mogu da kreiraju nove nivoe
- Keširanje - Brži pristup podacima kroz server-side i client-side keširanje

## Pokretanje projekta

### Preduslovi
- PHP 8.4+
- Composer
- Node.js i npm
- MySQL

### Koraci za pokretanje

1. Kloniraj repozitorijum:
``` bash
    git clone https://github.com/elab-development/internet-tehnologije-2024-projekat-css-parking_2021_0189.git
```
2. Instaliraj PHP dependences:
``` bash
    composer install
```
3. Kopiraj .env fajl i podesi bazu podataka:
``` bash
    cp .env.example .env
```
4. Generiši aplikativni ključ:
``` bash
    php artisan key:generate
```
5. Pokreni migracije:
``` bash
    php artisan migrate --seed
```
6. Instaliraj JavaScript dependences:
``` bash
    npm install
```
7. Pokreni backend server:
``` bash
    php artisan serve
```
8. Pokreni frontend dev server:
``` bash
    npm start
```
9. Aplikacija je dostupna na http://localhost:3000 za frontend i http://localhost:8000 za backend.
