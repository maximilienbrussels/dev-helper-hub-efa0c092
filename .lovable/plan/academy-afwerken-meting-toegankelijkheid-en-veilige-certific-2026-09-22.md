# Academy afwerken: meting, toegankelijkheid en veilige certificaatverificatie

De statistiekpagina, de anonieme metingtabellen en de handtekeningmodule staan er al. Dit plan maakt het geheel af.

## 1. Quiz meet mee

- Bij de start van een examen wordt een anonieme poging aangemaakt (dier, leeftijdsspoor, taal, aantal vragen). Geen naam, geen account.
- Elke beantwoorde vraag telt mee: positie, ronde en juist/fout, zodat de pagina "Academy-resultaten" slagingspercentages, gemiddelde scores en afhaakmomenten toont.
- Bij het einde wordt de poging afgesloten als geslaagd of niet geslaagd.
- Meting is nooit blokkerend: faalt ze, dan merkt de deelnemer er niets van.

## 2. Toegankelijke quiz, zonder het speelse te verliezen

- Antwoorden kiesbaar met pijltjes en cijfertoetsen, Enter bevestigt, overal een zichtbare focusring.
- Schermlezers: voortgang en vraag worden aangekondigd; een rustige meldregio zegt "juist" of "fout" met de uitleg; bij een nieuwe vraag springt de focus naar de vraagtekst.
- Juist/fout nooit alleen via kleur: altijd ook icoon en tekst; feedbackkleuren en badges naar contrastwaarden die aan AA voldoen.
- Wie beperkte beweging heeft ingesteld, krijgt een rustige variant: statisch vinkje en badge zonder animatie in plaats van confetti. Geluid blijft optioneel.

## 3. Delen pas na het certificaat

- Op het scherm waar de cursist zijn naam invult verdwijnt de deelknop; daar staat enkel "Certificaat aanmaken".
- Delen, downloaden, printen en de verificatielink verschijnen pas nadat het certificaat bestaat.

## 4. Scannen en verifiëren

- De QR-code op elk certificaat krijgt een door de server ondertekende controlewaarde. Een zelfgemaakte link of een aangepast nummer valideert niet.
- De verificatiepagina toont bij een geldige, ondertekende scan het echte certificaatbeeld met de gegevens, een duidelijke "geldig"-status en een downloadknop voor een pdf met watermerk "geverifieerd exemplaar". De QR staat daar nog enkel als klein extra element, niet in de plaats van het certificaat.
- Handmatig ingetypte nummers blijven werken en tonen de gegevens, maar worden gemarkeerd als niet via QR ondertekend.
- Nieuwe knop "Scan QR-code" op de verificatiepagina: camera in de browser met toestemming, automatische controle, en het bestaande invulveld als terugval.
- Onbekende of geknoeide codes geven een neutrale melding die niets verklapt.

## Technisch

- `academy-quiz.tsx`: `startPoging` / `logAntwoord` / `finishPoging` aanroepen; poging-id in component-state; toetsenbord- en aria-werk in hetzelfde bestand (roving tabindex, `aria-live="polite"`, focus op vraagkop), reduced-motion via bestaande media-query-helper.
- Certificaatuitgifte (`submitExamen`) roept `signCertCodeSafe` aan en bewaart de handtekening; QR-waarde wordt `/verifieer/<code>?s=<hmac>`. Bestaande certificaten blijven geldig via de huidige tokencontrole.
- `verifieer.$code.tsx`: leest `?s=` uit de zoekparameters, geeft die mee aan `verifyCertificaat(ByCode)` (al ondersteund), en rendert bij `ondertekend` het bestaande `CertificateFront`-component; QR-scanner client-only via BarcodeDetector met lichte fallbackbibliotheek.
- Nieuw secret `CERT_QR_SECRET` toevoegen (nu valt de code terug op een bestaand secret).
- Tests: handtekeningvalidatie inclusief geknoeide code, statistiekaggregatie en het toetsenbordgedrag van de quiz.
