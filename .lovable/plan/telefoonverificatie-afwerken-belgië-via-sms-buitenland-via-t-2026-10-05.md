# Telefoonverificatie afwerken: België via sms, buitenland via Telegram

## Wat de gebruiker straks ziet

Op de pagina "Account beveiligen", bij de keuze **Telefoon**:

- **België (+32):** gsm-nummer invullen, code per sms krijgen en invullen. Dit blijft zoals het nu is.
- **Ander land:** één duidelijke knop **"Verifieer via Telegram"**. Die opent een gesprek met @Maximiliebot. Je tikt op Start en daarna op **"Verify My Phone Number"**. De pagina ziet binnen ongeveer 1,5 seconde dat het gelukt is en stuurt je meteen door.
- Er verschijnt een korte uitleg in 3 stappen en een wachtmelding. Bij een verlopen link toont de pagina "Nieuwe link".
- Wie al via Telegram geverifieerd is, ziet bij het aanmelden ook de knop "Bevestig via Telegram".

## Wat verdwijnt

- De oude manier voor buitenland: zelf een code maken en via WhatsApp, Threema, Signal of Messenger versturen, en dan wachten op goedkeuring door een beheerder.
- Het beheerscherm **"Verificaties"**, waar je zulke aanvragen goedkeurde. Dat scherm is niet meer nodig.
- Alles wat met WhatsApp en Green-API te maken heeft.

## Backend

- **Probleem dat ik gevonden heb:** de databank aanvaardt op dit moment alleen de verificatiesoorten "sms" en "intl". Een Telegram-aanvraag zou geweigerd worden. Ik voeg een migratie toe die ook "telegram" toelaat. Die migratie voegt ook de kolom toe waarin het Telegram-gesprek wordt bijgehouden.
- **Webhook voor de bot:**
  - De bot krijgt een geheime sleutel, zodat alleen echte berichten van Telegram aanvaard worden.
  - Bij `/start <token>` toont de bot de deelknop.
  - Bij een gedeeld contact controleert de webhook dat het je **eigen** nummer is. Daarna wordt het nummer genormaliseerd, krijgt de aanvraag in Neon de status "verified" (goedgekeurd), en verdwijnt de knop uit Telegram.
  - Bij het aanmelden moet het nummer hetzelfde zijn als het nummer dat eerder gekoppeld werd.
- **Telegram aanmelden:** ik geef Telegram het vaste adres van de site door, zodat berichten aan de bot daar aankomen.
- De foutmelding bij de webhook verdwijnt: die kwam doordat de route nog niet geregistreerd was. Ik kijk dat na met een typecontrole.

## Testen

1. Typecontrole en build.
2. De webhook rechtstreeks aanroepen:
   - zonder geheime sleutel moet hij weigeren;
   - met sleutel en een nep-`/start` krijg je de melding "verlopen";
   - een contact van iemand anders wordt geweigerd.
3. Een testaanvraag in de databank zetten, een gedeeld contact nabootsen, en nakijken dat de status naar "verified" springt en het nummer opgeslagen is.
4. Bij Telegram nakijken (`getWebhookInfo`) dat het adres van de site er staat zonder fouten.
5. De pagina in de browser doorlopen met een tijdelijk testaccount: keuzescherm, België en buitenland, de Telegram-knop, de wachtmelding en het automatisch doorsturen (met een nagebootste goedkeuring). Ik maak schermafbeeldingen en kijk de opmaak en de teksten na. Daarna ruim ik het testaccount op.

De echte stap in de Telegram-app (zelf je contact delen) kan ik niet uitvoeren. Die probeer jij met je eigen toestel.

## Technische details

- Migratie `0044_mfa_telegram.sql`:
  - `drop constraint if exists` op de controle van `kind`;
  - een nieuwe controle `kind in ('sms','intl','telegram')`;
  - `add column if not exists tg_chat_id bigint`.
  - De migratie wordt live uitgevoerd. Dezelfde aanpassing komt ook in `ensureMfaSchema`.
- `beveiliging.tsx`:
  - `IntlFlow` wordt `TelegramFlow`: `startTelegramVerification`, de knop opent de link via `window.open`, en polling met `checkTelegramVerification` elke 1500 ms. Het opruimen bij het verlaten van de pagina blijft. Bij "approved" volgt `onDone(token)`, dat doorstuurt.
  - `messengerLink`, `APPS` en `startIntl`/`checkIntl` worden verwijderd. `VerifyStep` kiest `fixed` op basis van `phone_method`.
- `getMfaStatus` geeft ook `phoneMethod` terug.
- `VerificationsPage` wordt verwijderd, samen met de verwijzingen in de routes, de navigatie en de vertalingen. Ook `listIntlRequests` en `decideIntlRequest` worden verwijderd. Wie al met de oude manier ("intl") gekoppeld is, moet opnieuw koppelen via Telegram.
- Webhook registreren met `setWebhook` naar `https://project--d6cca73e-de15-45fc-9940-e028466b0661-dev.lovable.app/api/public/telegram/webhook`, met `secret_token` (sha256 van de verbindingssleutel) en `allowed_updates: ["message"]`. Na publicatie of bij een eigen domein moet dit adres opnieuw ingesteld worden.
