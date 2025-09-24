---
id: 26
title: "Blog: Technik Update"
slug: "blog-technik-update"
description: "Bye Netlify CMS, Hello Strapi"
createdAt: "2021-06-09T08:56:51.886Z"
updatedAt: "2021-12-09T10:46:10.205Z"
display_published_date: "2021-06-09T09:00:00.000Z"
draft: true
tags:
  - "Meta"
  - "Blog"
  - "Strapi"
  - "Nuxt"
  - "Netlify"
  - "Netlify CMS"
  - "Heroku"
  - "Webhooks"
category_id: 2
---

Vor ca. einem halben Jahr startete ich die [Neuauflage dieses Blogs](https://www.flore.nz/blog/reboot), Fokus weg von Webentwicklungsthemen ^[Übrigens - die Inhalte meines alten Blog finden sich noch in[ meinem Git Repository](https://bitbucket.org/flrnz/freelance/src/master/content/blog/).] und mehr Alltagsdinge - was sich bisher nur in Buchreviews und gelegentlicher Musik manifestiert hat. Meine Wahl damals war [Netlify CMS](https://www.netlifycms.org/) - ein Entscheidung die ich relativ schnell bereut habe. Die NCMS UI war schrecklich, der Editorial Workflow war mühsam und zeitraubend und dann wurden Daten im Firefox am Ende scheibar nie richtig angezeigt. Kurz: Das Bloggen hat damit keinen Spass gemacht. 

Deswegen habe ich in den letzten Tagen etwas gebastelt und Netlify CMS am Ende komplett weggelassen. Dieser Blog benutzt jetzt Strapi als Headless CMS, gehostet auf [Heroku](https://heroku.com), hat eine MongoDB Datenbank und Bilder liegen bei [Cloudinary](https://cloudinary.com/invites/lpov9zyyucivvxsnalc5/f9v5k6m8h6bmd7huykaa?kind=twitter&t=started ). Das ganze basiert auf diesem Blogbeitrag von [Chris Wray](https://chriswray.dev/posts/how-i-hosted-my-strapi-cms-driven-website-for-free) und ich finde es großartig! *Schon weil es mich nichts kostet :)*

Und das Frontend ist weiterhin das gleiche - basierend auf [Nuxt.js](https://nuxtjs.org/), gehostet bei [Netlify](https://www.netlify.com/). Und es ist weiterhin komplett statisch! Dank Webhooks.

Starte ich das Strapi Backend auf Heroku und veröffentliche dort einen Post, kann ich mithilfe von [Webhooks direkt einen statischen Build bei Netlify triggern](https://chriswray.dev/posts/triggering-a-deploy-in-netlify-automatically-after-updating-content-in-strapi). Und dieser Build dauert - im Gegensatz zu Netlify CMS, wo jegliche Änderung 2-3 Builds und insgesamt 5-10 Minuten dauerte - nur noch 30-60 Sekunden. 

Hier und da ruckelt es noch im Frontend, aber es funktioniert erstmal. Sorry auch an die RSS Leute, ich dürfte in den letzen 24h sehr viel Doppelposts in eure Feeds gekippt haben. 

Im übrigen habe ich einige Artikel "nachgereicht", welche sich während meiner Umbauphase angesammelt haben. 

**Update**
Ich habe Apollo/GraphQL durch Rest in Strapi ausgetauscht, leider gab es immer wieder einen Query Request der den Heroku Server aufwecken musste, was zu enormen Ladezeiten geführt hat. Ausserdem hab ich das Layout angepasst. Manche sagen es ist besser. Manche nicht. Mal gucken. Dieser Blog wird eine ewige Baustelle sein.

