# Academy: volledige proefrit van quiz tot certificaat

Het enige open punt is de echte doorloop in de drie talen. Dat doe ik zelf, met een testaccount, zodat je niets hoeft af te leggen.

## 1. Testaccount
- Een apart testaccount aanmaken (duidelijk herkenbaar, bv. "Testcursist Academy"), zodat echte cursisten niet geraakt worden.

## 2. Proefrit per taal (NL, FR, EN)
- 16+-quiz volledig afleggen, enkel met het toetsenbord.
- Nakijken: voortgang, drie rondes, groen/rood met tekst, schermlezermeldingen.
- Certificaat aanmaken: de deelknop mag pas daarna verschijnen.
- De QR-link van het certificaat openen: het certificaat zelf moet zichtbaar zijn met "geldig" en een pdf met watermerk.
- Een aangepaste link proberen: die moet geweigerd worden.
- Kids-quiz: diploma verschijnt, zonder persoonsgegevens op de server.

## 3. Resultatenoverzicht
- Als beheerder "Academy-resultaten" openen en nakijken dat de pogingen per dier, leeftijd en taal verschijnen.

## 4. Opruimen
- De testcertificaten en testpogingen weer verwijderen, zodat je cijfers en de nummering van certificaten zuiver blijven.
- Wat ik onderweg vind, meteen herstellen. Daarna de takenlijst afvinken.

## Technisch
- Playwright op localhost:8080. Voor de juiste antwoorden lees ik de database uit: `correcte_optie_index` en de permutatie via `optiePermutatie(sessie, …)`.
- Testgebruiker via de lokale auth-flow. Opruimen via gerichte DELETE's op `certificaten`, `academy_pogingen` en de `academy_vraag_stats`-tellers van de testrun.
- Na verwijdering `volgnummer` controleren, zodat er geen gaten ontstaan voor echte certificaten.
