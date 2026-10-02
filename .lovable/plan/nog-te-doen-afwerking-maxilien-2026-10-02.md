# Nog te doen: afwerking Maxilien

## Wat er nu open staat

1. **Sms komt niet aan op de gsm**
   De sms-dienst neemt het bericht aan, maar het blijft op "wachten" staan: de gsm haalt het niet op. Op de gsm nakijken: SMS Gateway-app open, "Cloud server" aan, batterijbesparing voor de app uit. Daarna één test-sms opnieuw versturen en de volledige stap "telefoon koppelen" op de pagina Account beveiligen doorlopen.

2. **Naam Maxilien overal gelijktrekken**
   Op 14 plaatsen in het beheerportaal staat nog "Ferme du Parc" in de paginatitels. Die gaan naar "Maxilien". Ook alle publieke pagina's nalopen op titel, beschrijving en deelafbeelding (wat je ziet als je een link deelt via WhatsApp, Facebook enz.), zodat elke pagina een eigen, correcte titel, tekst en afbeelding heeft.

3. **Foto's wijzigen en opslaan in het beheer**
   Per beheerscherm (producten, dieren/bewoners, fotoalbums, team, site-afbeeldingen, academy) testen dat een foto uploaden, vervangen en opslaan echt bewaard wordt in de foto-opslag (Scaleway) en daarna overal goed getoond wordt. Fouten herstellen waar ze opduiken.

4. **Beheerscherm Verificaties nakijken in de browser**
   Het nieuwe scherm (goedkeuren met één klik) doorlopen met een buitenlandse testaanvraag en daarna opruimen.

5. **Messenger**
   Wacht op je Messenger-gebruikersnaam of paginanaam. Tot dan opent de knop Messenger en staat het bericht klaar om te plakken.

## Technische details

- Deelvoorbeelden: elke route-`head()` controleren op unieke title/description/og:*, og:image alleen met een absolute https-URL; `PAGE_META` in `portal-routes.ts` aanpassen.
- Foto-opslag: de upload-serverfuncties en de schermen die ze gebruiken nalopen; met Playwright per scherm een upload testen (testbestanden achteraf verwijderen).
- Sms: status opvolgen via de gateway; geen code-aanpassing nodig tenzij de gsm het bericht weigert.
