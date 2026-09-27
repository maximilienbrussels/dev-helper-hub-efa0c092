# Beveiliging, foto's, deelvoorbeelden en naam Maxilien

## 1. Onderzoek en herstel foto-opslag (Scaleway)
- Elke plek in het beheerportaal doorlopen waar een foto wordt gekozen, vervangen of verwijderd: team, albums, producten, webshop-hero, diensten, Academy-dieren, pagina-inhoud, mediabibliotheek.
- Per plek nagaan: upload lukt, foto blijft na opslaan en herladen staan, oude foto wordt correct vervangen, fout geeft duidelijke melding.
- Gevonden fouten meteen herstellen; op het einde een overzicht per scherm (werkt / hersteld / niet testbaar).

## 2. Deelvoorbeelden en naam "Maxilien"
- Alle pagina's nakijken op titel, beschrijving, deelafbeelding en naam bij delen (WhatsApp, Facebook, e.a.).
- Overal dezelfde naam: **Maxilien** (ook "Maximilien Manager", "Maxilien Manager" e.d. gelijktrekken), in NL/FR/EN.
- Elke pagina met een eigen foto krijgt die als deelafbeelding (volledig webadres); anders een vaste Maxilien-deelafbeelding.
- Controle met een script dat per pagina de deelgegevens uitleest.

## 3. Passkeys werkend maken
- Registreren en inloggen met passkey testen en de oorzaak van het falen opsporen (domeininstelling, opslag, inlogscherm).
- Inloggen met passkey toevoegen/herstellen op het inlogscherm.

## 4. Tweestapsbeveiliging (2FA)
- **Beheerders verplicht:** na het instellen van hun wachtwoord (of bij de eerste login zonder 2FA) krijgen ze een scherm "Hoe wil je je account beveiligen?" en kunnen het portaal pas gebruiken na instellen.
- **Bezoekers optioneel:** zelf aan te zetten in hun account.
- Keuzes: passkey, authenticator-app (Google Authenticator e.d., met QR-code en herstelcodes), telefoonverificatie.
- **Telefoonverificatie:**
  - Landkeuze.
  - **België (+32):** telefoonnummer invullen, 6-cijferige code via je Android SMS-gateway, code invullen.
  - **Buitenland:** geen sms; het scherm toont een unieke 6-cijferige code en 4 knoppen (WhatsApp, Threema, Signal, Messenger) die een bericht "Verify my account with code: [CODE]" klaarzetten naar **+32 486 35 31 11**.
- **Verificatie-overzicht in het portaal:** lijst met openstaande buitenlandse aanvragen (naam, e-mail, land, code, tijdstip); met één klik goedkeuren of weigeren.
- Bij volgende logins vraagt de site de gekozen tweede stap.

## Technische details
- Opslag in de bestaande Neon-databank (nieuwe migratie): tabellen voor 2FA-instellingen per gebruiker (methode, versleuteld TOTP-geheim, telefoon, herstelcodes gehasht), eenmalige codes (gehasht, 10 min geldig, max 5 pogingen) en buitenlandse aanvragen (status pending/approved/rejected).
- SMS: serverfunctie POST naar `SMS_GATEWAY_URL` met `Authorization: Bearer SMS_GATEWAY_TOKEN`, body `{ "to", "message": "Uw verificatiecode is: 123456" }`; beide als geheime instelling, door jou in te vullen. Rate-limit via bestaande `email-guard`.
- TOTP met een pure JS-bibliotheek (werkt op de server-omgeving); QR via bestaande qrcode.react.
- Deep links: `wa.me/32486353111?text=`, `threema://compose?text=`, `sgnl://send?phone=` (Signal), `m.me/...` (Messenger heeft een gebruikersnaam nodig; zonder die opent enkel Messenger met het bericht gekopieerd).
- Sessie: na wachtwoord een tussentoestand "2FA nodig"; `_authenticated`-poort en `requireAuth` weigeren beheerders zonder voltooide tweede stap.
- Nieuwe portaalpagina "Verificaties" met eigen recht; tests voor codes, TOTP en de beheerdersplicht.

## Open punt
- Voor Messenger is een gebruikersnaam of paginanaam nodig (telefoonnummer werkt daar niet). Die vraag ik tijdens de bouw.
