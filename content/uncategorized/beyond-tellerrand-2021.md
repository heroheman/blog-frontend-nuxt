---
id: 63
title: "Beyond Tellerrand 2021"
slug: "beyond-tellerrand-2021"
description: "Dinge können zwei Dinge sein. "
createdAt: "2021-11-10T13:18:29.806Z"
updatedAt: "2021-12-09T11:03:06.284Z"
display_published_date: "2021-11-10T11:00:00.000Z"
draft: true
tags:
  - "Beyond Tellerrand"
  - "Düsseldorf"
  - "Harry Roberts"
  - "Hidde De Vries"
  - "HTML"
  - "Head"
  - "CSS"
  - "Performance"
  - "Web Semantic"
  - "Typography"
  - "Typographie"
  - "Variable Fonts"
  - "Examples"
  - "Conference"
  - "Webconference"
  - "Frontend Conference"
  - "Oauth"
  - "Zeroheight"
  - "Jeff Greenspan"
  - "Rob Draper"
  - "Marc Thiele"
  - "Capitol Theater"
  - "Düsseldorf"
  - "Review"
  - "Mir fallen keine Keywords mehr ein"
---

**Die Beyond Tellerrand ist die beste Konferenz zum Thema "*Dinge im Internet bauen*" die es (in Deutschland) gibt**. Punkt. 

Damit kann ich diesen Post auch abschliessen, denn eigentlich hatte ich garnicht vor auf dieser Seite noch groß zum Thema Webentwicklung zu schreiben. Wisst schon, "beruflich und privat trennen" und so Zeug. 

Aber da ich gerade auf der Zugrückfahrt bereits einen super langen Text für die firmeninterne Kommunikation geschrieben habe, dachte ich dass ich ja auch mal eine Ausnahme machen kann, ... "Ich hab den Text ja bereits". Also, alle die diesen Blog jetzt nur wegen meinen *super ausgereiften* und *handwerklich professionell ausgearbeiteten* Meinungen zu Science Fiction Büchern (wann bin ich eigentlich so nischig geworden?) lesen, sorry, heute nicht. 

<!--more-->

### Ein komplett überflüssiges Intro

Als ich früher (tm) immer von der Beyond Tellerrand geschrieben und zusammengefasst habe, konnte ich immer auf einen alten Artikel verweisen, um das Event nicht nochmal erklären zu müssen. Da ich aber den Blog [resettet](https://www.flore.nz/blog/reboot) habe und die alten Artikel irgendwo lokal in einem Ordner liegen, geht das wohl nicht mehr. Also hier nochmal die BT Conf *Origin Story* oder so: 

Wie der Konferenzname suggeriert geht es schonmal nicht monothematisch zu und das Thema "Frontend Entwicklung" ist nur ein Rahmen der aber auch nur das Thema grob vorschlägt. Neben dem Themen Design, Entwicklung, Typographie kann es so auch mal um ethische Themen gehen, wie [Mike Monteros einstündiger Rant über Twitter](https://youtu.be/ZGsYHws-hbc) und dem Umgang mit einem bestimmten orangefarbigen Präsidenten. 

Ich selber besuche die Konferenz jetzt seit ca. 2012 und habe noch kein Jahr gedacht, "*Das war jetzt ja Mal nix*". Eigentlich immer das Gegenteil. Und vermutlich werde ich noch sehr lange an [Josh Brewers Vortrag über Photoshop](https://youtu.be/NaTQVQvI0fA) denken, der, als er merkte dass es bereits einen sehr ähnlichen Beitrag direkt vor ihm gab, kurzerhand eine Gitarre besorgte und seinen sang. Inkl. *Catchy Hookline*. Ich hab irgendwann aufgehört mich vorab mit dem Themen und Sprechern zu beschäftigen und lasse es einfach auf mich zu kommen. Wie ein gutes Festival.

*Der Intro Text ist jetzt etwas lang geworden, sitze aber jetzt noch mindestens zwei Stunden im Zug. Und schreibe am Smartphone, bitte also alle Fehler nicht beachten 🥺.*

Jeder der jetzt denkt: "*Junge komm zum Punkt*"... Jetzt kommt der Punkt. Mit den zwei nerdigsten Themen direkt als Einstieg. 

### Performance und Semantik: Harry und Hidde

####  Harry Roberts - Get Your <HEAD> Straight 
*Das hier sind straight-up meine Notizen zu den Talk, Wer die Wörter kennt, kann sich glücklich schätzen, werde aber nicht grossartig erklären. Später im Text wird es besser.*

Der erste Talk an Tag 1 kam von **[Harry Roberts](https://csswizardry.com/)**, behandelt den *HEAD* Tag, was dort herein gehört, in welcher Reihenfolge und was nicht. Da HTML *line-by-line* geparsed wird, ist der *HEAD* Bereich ist der größte *Render-Blocking* Bereich im Browser. Also: Generell alles rauswerfen was nicht unmittelbar wichtig ist.

Interessant auch, da ich dachte dass man ja sonst aus Performancegründen eher ein CDN nutzt: Laut Roberts ist es am besten so gut wie alles wenn möglich selbst zu hosten. Und Redirects beim laden vermeiden, zB *import jquery@latest*

Eine *Meta Content Security Policy* (CSP) kann den Browser Preload Scanner ausschalten, d.h. dass das Laden bis zu 4 Sekunden langsamer sein kann. 

![Harry Roberts / CSS Wizardry, Beyond Tellerrand 2021. Ich saß ziemlich weit hinten, aber glaubt mir, er ist es.](https://res.cloudinary.com/dlsll9dkn/image/upload/v1636549430/PXL_20211108_100935922_36b88eccc0.jpg)


**Die optimale HEAD Reihenfolge** ist laut Roberts:

- **Meta**: Alles was dem Browser direkt sagt wie die Seite gerendert werde soll. Charset, Viewport, etc

- **Title**: Dem User direkt den Seitentitel zeigem anstatt der URL

- **Synchronous JS / CSS**: Javascript VOR CSS laden, da CSS Javascript blicken kann. Aber: Sync JS kann @import im CSS blockieren. Idealerweise vermeiden. Ladeersparnis von bis zu 2 Sekunden alleine durch Reihenfolge.

- **SEO / Social** wie Opengraph, Twitter, Keywords und alle weiteren am Ende laden, die meisten Applikationen machen sowieso einen vollen GET

Schlussendlich gab es noch ein [Bookmarklet](https://csswizardry.com/ct/) dass seinen gesamten Talk zusammenfasst.  Kann dann so aussehen:

![Wenn mir wer sagen kann wie ich innerhalb von Nuxt die JS und CSS Anordnung anpassen kann, dann wäre es schon fast perfekt.](https://res.cloudinary.com/dlsll9dkn/image/upload/v1636549316/Bildschirmfoto_2021_11_10_um_12_28_36_5c5fee233e.png)


#### Hidde De Vries - Semantics and how to geht them right
Und weiter gehts mit Websemantik, ein Vortrag von [Hidde de Vries](https://hidde.blog). Websemantik ist so ein Thema, dass alle immer furchtbar langweilig finden und ich dann wieder super spannend und kleine <3 in den Augen bekomme. Hier heute etwas "philosophisch", etwas "Sender-Empfänger" und "Common Namespace" und anschliessend viele Beispiele wie man Designsystems und Markup strukturieren kann (generell viel mehr und öfter "*role*" verwenden). Und - wie man es nicht macht - hier eine tolle Seite dazu: [HTMHell](https://www.htmhell.dev/)
 
Links zum Thema: 
[Heading Structures are Tables of Contents](https://hiddedevries.nl/en/blog/2018-09-01-heading-structures-are-tables-of-contents)
[More Accessible Defaults please](https://hiddedevries.nl/en/blog/2020-03-01-more-accessible-defaults-please) 
[Complete Guide Accessible Frontend Components](https://www.smashingmagazine.com/2021/03/complete-guide-accessible-front-end-components/) (Der Link hat so ziemlich alles)

Auch dabei: Wie man mit CSS die Semantik in HTML auch wieder stören kann. So kann ein Icon in einem ::before/::after screenreader stören, wenn man es bspw. in einem Button verwendet. ^[Hab ich zumindest so verstanden, es kann auch komplett anders herum sein. Das Wifi des Zuges gibt mir aber nicht die Möglichkeit das zu überprüfen. Und wenn dieser Text bei Veröffentlichung hier immer noch steht, habe ich es vermutlich vergessen zu checken.]

Da direkt davor das Thema Note-Sketching von *Eva-Lotta Lamm* kam, hab ich hier tatsächlich viel mitgeschrieben, hänge ich mal ungefiltert an.

![Hidde de Vries - Semantics - and my ugly handwriting, featuring poor color choice](https://res.cloudinary.com/dlsll9dkn/image/upload/v1636550368/photo_2021_11_10_14_18_51_656fad3ba1.jpg)


### Variable Fonts - Bianca und Ulrike

Ich hab jetzt eigentlich alles was ich DIREKT irgendwo praktisch anwenden, schon in Textform gebracht. Geh ich mal zusammenfassend zu den Themen wo ich *beyond* den *tellerrand* geguckt habe. 

Zum einen: Es gab 2 Talks zum Thema *Variable Fonts*. Der eine war von [Bianca Berning](https://bberning.com/), der ging eher um das Potential und Möglichkeiten, der andere von [Ulrike Rausch](https://liebefonts.com/), da ging es direkt um Fancy Beispiele. 
Kurz zusammengefasst: Mit Variable Fonts könnte man sich zukünftig ersparen mehrere Fonts einzubetten, sondern kann eine Font nehmen und diese direkt anpassen. Mit CSS, und zwar weit über font-style und font-weight hinaus - sofern die Font es unterstützt. 
https://play.typedetail.com/

Und noch zwei VF Seiten die Eigenschaften von VF zeigen können
https://fontdrop.info/
https://wakamaifondue.com/beta/

Und bei Ulrike ging es dann um zum einen um Handwritten Fonts die verschiedene Variationen für einen handgeschriebenen Buchstaben beinhalten. Hängengebliegen ist: Sie konnte mit einem Schieberegler von Schönschrift auf Doktor transformen. Oder auch Animationen, [alles möglich](https://www.instagram.com/p/CCB2DxkCzui/). 

Falls ihr heute nur einen Link klicken könnt, dann soll es doch bitte [dieser hier](https://www.typearture.com/variable-fonts/
) sein - sehr beeindruckend. Und dann realisieren dass es sich um eine Schriftart handelt.  

![Ich war so beeindruckt dass ich den Screenshot mit Pfeilen und Kreisen versehen habe!!!111](https://res.cloudinary.com/dlsll9dkn/image/upload/v1636551372/Bildschirmfoto_2021_11_10_um_14_34_11_c124ef7c5d.png)

### Und der Rest

*Und ich sitze immer noch im Zug, ^[Anmerkung von mir aus der Zukunft, ich weiss dass ich das hier jetzt zum dritten Mal schreibe, finde es aber aus irgendeinen Grund interssant, dass ich diese Information immer wieder für total wichtig gehalten habe. Generell habe ich sehr wenig editiert, auch wenn ich es hätte tun sollen. Aber Authentizität ist auch mal nett. Oder?], genieße die Verspätung, während ich dass hier auf meinem Handy tippe. Die Finger blutig, das Hirn sowieso etwas Matsch, ich fasse mich jetzt etwas kürzer.* ^[Vermutlich hätte ich dass schon viel früher hätte machen sollen, aber die [*Sunk Cost Fallacy*](https://thedecisionlab.com/biases/the-sunk-cost-fallacy/) zwingt mich dazu, den Text jetzt größtenteils so zu lassen wie er jetzt ist. Sorry.]

**Also um was ging sonst noch so?**
- **[Eva Lotta Lamm](https://www.evalotta.net/)** hat mal wieder einen Vortrag über *Sketchnotes* gemacht, war glaub schon das dritte Mal dass ich ich so etwas von ihr auf einer Konferenz gehört habe, aber leider werde ich, im Gegensatz zu der Qualität ihrer Sessions, nicht besser. Trotzdem habe ich nach ihrem Talk viel mehr mitgeschrieben und etwas versucht zu *sketchen* - ich würde es selbst nicht so nennen, größtenteils hatte ich noch Probleme die wichtigen von den unwichtigen Informationen zu trennen, aber hey - its something und erleichtert mir das Tippen gerade.
- **Julia Racsko** über "Attentitve Design" war genau das Gegenteil von dem was der Titel versprochen hat. Mir persönlich ging es am Ende so dass ich nicht genau wusste worum es am Ende genau ging, welche Probleme sie lösen wollte. Nur dass sie Dinge gerne mit vielen Linien visualisiert. Was aber irgendwie ein ziemlich abgefahrener Style war.
- **Titus Dittmann**. Gründer von *Titus Skateboards*. War irgendwas von "Alter Weisser Mann erzählt vom Krieg" und "Ich bin so total Anti-Establishment, dass ich genau dass geworden bin" - bloss leider in (wenig) unreflektiert. Dazu etwas *Boomer Mentalität* und *Kalendersprüche* und eine Spur zuviel Narzissmus. Ausserdem *Flexing* über mafiöse Kartell Strukturen die er in den 90ern scheinbar bei Titus gemacht hat, sowie *1001 Steuertricks*, tief aus der Grauzone.  *Und einen Kickflip gabs auch nicht*. Will aber nicht nur meckern, vielleicht hab ich mir etwas zuviel versprochen, an einer Stelle konnte ich als Neu-Skate/Longboarder sogar auch relaten - und zwar dass die Eigenmotivation sich etwas neues beizubringen ein enormer Motivationsfaktor ist, insbesondere wenn es dann klappt und die Glückshormone fliessen. ^[Aber ich kann es selber nicht auf andere Dinge ausserhalb meines Privatlebens anwenden. Wenn mir jemand sagen kann wie ich Erfolgserlebnisse auf selbstgesteckte Ziele setzen UND und dass dann auch beruflich anwenden kann, bitte schreibt mir!] 
- Angeblich hat Mark Zuckerberg zu **Jeff Greenspan** gesagt dass er ihm Lösungen zu Problemen gibt, die er nicht hätte, als er ihn vorgeschlagen hat eine *Opposite* Funktion für Facebook zu implementieren um den Nutzern Meinungen ausserhalb der eigenen *Bubble* und Ansichten zu zeigen. Und auch ansonsten war es ein sehr amüsanter Talk. Greenspan selber ist Aktivist, Künstler, Consultant und jetzt auch Comedian. Ein unglaublich guter "End of Day 1" Talk, der weiter ging als ein typischer Comedian Standup, sondern auch Ängste und Herausforderungen in dieser Industrie behandelt.

![Jeff Greenspan](https://res.cloudinary.com/dlsll9dkn/image/upload/v1636547562/PXL_20211108_190332343_e4615528ea.jpg)

- **Aaron Pareck** hat dann halt noch mal OAUTH auf einem Low-Level erklärt. Und gezeigt wie schnell man scheinbar bspw mit *Phishing* an die Passwörter von Apple Nutzern kommen könnte und nicht unbedingt der Heilsbringer sein muss, im Vergleich zu einem Standard Login aber Vorteile bringt. 
- **Matthias Stahl** hat gezeigt wie er Daten in Charts visualisiert, ohne dass sie ein "Lonely Chart" werden, d.h. einfach existieren ohne dass sich jemand für sie interessiert. Dabei ging es um seinen Ansatz Daten mit einer Story und Emotionen zu verbinden. Weiss aber nicht ob *Kindersterblichkeit* ein so gutes Beispiel ist. Andererseits hat es be [Hans Rosling](https://www.flore.nz/blog/factfulness-hans-rosling) auch als Paradebeispiel funktioniert. 
- [**Molly Watt**](https://www.mollywatt.com/) ist größtenteils Blind und Taub (*[Usher Syndrom](https://de.wikipedia.org/wiki/Usher-Syndrom)*) und Expertin für Accessibility (A11y). Gab einen Einblick wie sie das Netz wahrnimmt und dass immer noch so wenig Seiten auf richtige Semantik und A11y setzen. Und dass somit eine sehr große Gruppe an Menschen ausgeschlossen wird, u.a. mit Beispielen dass ihre Eltern eine größere Schriftgröße im iPhone hätten als sie selbst oder, obwohl JEDER Pinch-to-zoom auf einem Smartphone nutzt und es einfach super nützlich ist, manche Webseiten dieses nicht erlauben. Ausserdem sollte man den TAB Key mehr nutzen. Fühle mich nach solchen A11y Vorträgen immer etwas schuldig und halte mir jedesmal vor Augen wo ein A11y Feature aus Zeit/Kostengründen nicht umgesetzt wurde. 

Ich glaub ich hab jetzt alle durch. 

**Ansonsten hab ich noch....** , 
.... dank eines Superteams von Nerds aus dem Bereichen (Comic, Film, Musik, Videospiel und Design) noch das Quiz von [ZeroHeight](https://twitter.com/zeroheight) gewonnen. Und bin jetzt Besitzer [eines Buches von Mike Monteiro](https://amzn.to/3n3Qqhw) (dass ist der dem ich ganz am Anfang dieses monolithischen Textes bereits erwähnt hatte). Es wurden sehr viele *Fistbumps* an diesem Abend verteilt. 

![Rechts - Bevor man sich mit Design beschäftigt hat. Links - Nachdem man sich mit Design beschäftigt hat. Und merken: Beim nächsten Mal richtig herum aufstellen](https://res.cloudinary.com/dlsll9dkn/image/upload/v1636554612/PXL_20211108_210448477_dfa3ec03aa.jpg)

.... [ein Custom Poster von **Rob Draper**](http://www.robdraper.co.uk/your-words-my-hands ) bekommen, der auf dem Event Poster gegen eine Spende gemacht hat. Auf meinem steht "Make Your Own Kind of Music" ^[Der Titel dieses [unglaublich guten Bangers von Mama Cass Elliot](https://www.youtube.com/watch?v=SbSM02_1k34) und auf ewig verewigt[ in dieser ikonischen Szene aus LOST](https://www.youtube.com/watch?v=Qky7zaS5eTM). Remember Lost?] und hängt jetzt über meinen Plattenspieler und MPC.


![Rob Draper - Your Word My Hands - es sind über 4500 Euro durch die Poster gespendet worden.](https://res.cloudinary.com/dlsll9dkn/image/upload/v1636554487/PXL_20211109_160221372_3eba7d15d2.jpg)

... einige neue Menschen kennengelernt und war - auch wenn es nach 1,5 Jahren Covid komisch war, wieder unter so vielen Menschen zu sein - sehr froh da zu sein. 


![Team Dangerous Halfknowledge - v.l.n.r. -  Ich (cool), coole Person mit Bart, coole Person mit Scheitel 🔥, coole Person mit Switch (im Foto ohne Switch), coole Person aus Brem'Nord, coole Person aus Australien, coole Person mit Büchern, coole Person die aus manchen Dingen zwei Dinge macht.](https://res.cloudinary.com/dlsll9dkn/image/upload/v1636554308/PXL_20211108_210147221_c3a2c3389d.jpg)

Mein Zug ist gleich in Bremen und bin jetzt auch durch. Falls ihr bis zum Ende durchgehalten, Glückwunsch und Gratulation an euer Ausdauervermögen, vermutlich hab ich den Text nicht probegelesen ^[Und Marc, falls du das liest: Schön dass die Beyond Tellerrand wieder stattgefunden hat. Danke für deine Mühe. Man kann die Liebe die hier hereingeflossen ist durchaus spüren, insbesondere in der kurzen Zeit. Und jetzt hau' endlich die Videos alle auf YouTube :)]

*Gerade gesehen dass der Hauptbahnhof in Bremen neue Anzeigetafeln hat. Interessant.*


#### Update, 23.11.2021:
Marc hat einen [Wrap Up Blogpost](https://beyondtellerrand.com/blog/wrap-up-and-coverage-for-dusseldorf-2021) geschrieben. Mit Links zu allen Videomitschnitten, Talks und Slides, sowie Behind-the-scenes Infos, Transcripts, Fotos und Coverage Artikeln (*Danke fur den Backlink*!). 
