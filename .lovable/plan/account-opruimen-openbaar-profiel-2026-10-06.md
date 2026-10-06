# Account opruimen + openbaar profiel

## 1. Bluesky koppelen herstellen
Bij "Koppelen" in de accountinstellingen krijgt de server nu geen Bluesky-naam mee. Daardoor mislukt het koppelen altijd. Na de herstelling opent "Koppelen" eerst een venstertje waarin je je Bluesky-naam invult (bv. `naam.bsky.social`), net zoals bij Mastodon. Daarna start het koppelen.

## 2. Account eenvoudiger
- **"Mijn Hooi"** wordt de enige plek voor je spaarpad. De voortgangsbalk, de volgende beloning en je recente hooi staan dan mooi uitgewerkt op die ene pagina. De knop "Bekijk je badges & spaarpad" verdwijnt.
- **Het tabblad "Badges" en de Trofeeënkast** verdwijnen uit je account. Je badges en certificaten krijgen een nieuwe plek op je openbare profiel.
- Bij **Instellingen** komt een nieuw blok **"Openbaar profiel"** (zie punt 3).

## 3. Openbaar profiel (nieuw)
- Elke gebruiker krijgt een eigen pagina op een willekeurig, onraadbaar adres, bijvoorbeeld `/u/k7m2xq9p`. Dat adres bestaat uit cijfers en letters zonder verwarrende tekens.
- **Bovenaan:** je naam (of "Boerderijvriend" als je die niet wil tonen), je avatar, het aantal volgers en wie je volgt, en een knop "Volgen".
- **Tijdlijn**, van nieuw naar oud:
  - behaalde Academy-certificaten, met een link naar de controlepagina van het certificaat;
  - nieuwe badges;
  - spaarpad-mijlpalen.
- **Badges & certificaten:** een overzicht van alles wat je behaalde (dit vervangt de Trofeeënkast).
- **Privacy, aan te passen in je instellingen:**
  - profiel openbaar of privé (standaard **privé**, je zet het zelf aan);
  - per onderdeel aan of uit: tijdlijn, badges, certificaten, spaarpad en volgers.
  - Een privéprofiel toont een neutrale melding "Dit profiel is privé".
- **Volgen:** ingelogde gebruikers kunnen openbare profielen volgen en ontvolgen.
- Er wordt nooit een e-mailadres, telefoonnummer of adres getoond. Zoekmachines krijgen een "noindex"-label, tenzij je profiel openbaar is.
- Het profiel bestaat in het Nederlands, Frans en Engels, volgens de taal in het adres.

## 4. Voorbereid voor later (nu nog niet gebouwd)
- **Gebruikersnaam via rout.be:** er komt alvast plaats voor een gekozen naam. Wanneer dat platform klaar is, kan je profiel ook op `/u/<naam>` staan, en volgt je naam bij ons automatisch je naam op rout.be. Het willekeurige adres blijft altijd werken.
- **Berichten vanuit Bluesky of Mastodon:** de tijdlijn kan straks ook zulke berichten tonen, die je automatisch of met de hand overneemt of verwijdert. Dit bouw ik in een volgende stap.

## Testen
- Bluesky koppelen tot aan het doorsturen naar Bluesky.
- Account in de browser met een tijdelijk testaccount:
  - Mijn Hooi toont het spaarpad;
  - de badges-knop en het tabblad Badges zijn weg;
  - het blok Openbaar profiel werkt.
- Het profiel bekijken:
  - privé en openbaar;
  - onderdelen uitzetten;
  - volgen en ontvolgen met een tweede testaccount;
  - een onbestaand adres toont "niet gevonden".
- De testaccounts verwijder ik daarna weer.

## Technische details
- `ConnectedAccounts.tsx`: provider `bluesky` → `BlueskyHandleDialog` → `startOAuth("bluesky", returnPath, handle, { link: true })`.
- Migratie `0045_public_profiles.sql` (live uitvoeren, idempotent):
  - `app_public_profiles` (user_id pk/fk, public_id text unique, 10 tekens uit `[a-z2-9]`, username text unique null, username_source text null, is_public bool default false, show_timeline/badges/certificates/hooi/follows bool default true, bio text, created_at, updated_at);
  - `app_follows` (follower_id, followee_id, created_at, pk(follower_id, followee_id), check follower ≠ followee).
- `src/lib/public-profile.functions.ts`:
  - `getMyProfileSettings` en `updateMyProfileSettings` (requireAuth; maakt de profielrij en het public_id bij het eerste gebruik);
  - `getPublicProfile(id)`: publiek; geeft enkel een DTO met velden die zichtbaar mogen zijn. De tijdlijn komt uit de bestaande bronnen (certificaten, badges/hoefjes, spaarpad), samengevoegd en gesorteerd op datum, met een limiet van 50;
  - `follow` en `unfollow` (requireAuth; alleen voor openbare profielen; rate-limit).
- Route `src/routes/$lang.u.$id.tsx` (data-only SSR met een eigen `head()`: titel en beschrijving met de getoonde naam, bij een privéprofiel `noindex`).
- `account.tsx`:
  - tab `badges` weg (een oude link `?tab=badges` wordt doorgestuurd naar het profiel);
  - de knop `viewBadges` weg;
  - het spaarpad uit `pass.tsx` wordt een gedeelde component in het tabblad Mijn Hooi;
  - de Trofeeënkast verhuist naar een profielcomponent.
- De rout.be-koppeling en het overnemen van Bluesky/Mastodon-berichten komen in een aparte, latere fase. Het schema voorziet al in `username` en `username_source`.
