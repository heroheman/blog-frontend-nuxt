---
id: 1378
title: "whathaveidone - a git-based TUI for forgetful software developers"
slug: "whathaveidone-a-git-based-tui-for-forgetful-software-developers"
description: "I wrote a TUI that shows and summarizes your commits in the terminal—optionally with AI! Less detective work, more coding."
createdAt: "2025-07-14T09:50:56.553Z"
updatedAt: "2025-07-21T08:55:25.675Z"
display_published_date: "2025-07-13T22:00:00.000Z"
draft: true
tags:
  - "git commit summary tool"
  - "AI standup assistant"
  - "developer productivity CLI"
  - "terminal git summary"
  - "daily standup automation"
  - "Rust TUI git tool"
  - "time tracking for developers"
  - "project activity summary"
  - "open source git reporting"
  - "customizable AI commit summary"
  - "Gemini AI integration"
  - "developer workflow analytics"
  - "command line git report"
  - "software engineering productivity"
  - "whathaveidone tool"
category_id: 2
---

_**Note**: A <a href="https://www.flore.nz/blog/whathaveidone-a-git-based-tui-for-forgetful-software-developers/#german">German translation</a> can be found below_

As a software developer, I keep running into the same problem: the next day, I often have no idea what I actually did just that morning. Maybe it’s just me – but I doubt I’m the only one who, when standup or timesheet time rolls around, suddenly has to play detective. Tickets, commits, calendars – everything gets combed through just to answer that one question: *What did I actually do?* All I want is to write code, not write reports.

![WhatHaveIDone - TUI Screenshot](https://res.cloudinary.com/dlsll9dkn/image/upload/v1752486215/whathaveidone_screenshot_943adde52d.jpg)

The funny thing is: I’m already tracking my time – with GIT! So I built myself a little tool: [**whathaveidone**](https://github.com/heroheman/whathaveidone). It shows you all your Git commits for any time period right in your terminal, whether for a single project or all at once. Written in [Rust](https://www.rust-lang.org/) and powered by [Ratatui](https://ratatui.rs/) for a slick TUI – fully keyboard-controlled and packed with options.

[![*Note: This is from a previous version and the UI/UX might differ from the current version.*](https://asciinema.org/a/l58gl6wettdA3x4eLD4jCkWkq.svg)](https://asciinema.org/a/l58gl6wettdA3x4eLD4jCkWkq)


 

**AI summary? Totally optional!**  
With a single keystroke, you get an AI summary of your commits (Google Gemini). But you don’t have to – if you prefer reading yourself, that’s cool too.

### Some Examples & Use Cases

- **Quick Standup:**  
  ```bash
  whathaveidone today --lang english
  ```
  Shows all today’s commits and a snappy summary (choose English or German).

- **Weekly review for multiple projects:**  
  You don't want to write `whathaveidone` all the time? You can just write `whid`.
  ```bash
  whid week --model gemini-2.0-pro
  ```
  Switch the AI model for even better summaries.

- **Custom prompt for personalized reports:**  
  ```bash
  whathaveidone --prompt myprompt.txt --from 2024-07-01 --to 2024-07-07
  ```
  Use your own prompt templates and pick any date range.

- **Detailed view:**  
  Hit `d` in the commit view for a full "git log"-style overview.

For more examples, check the [whathaveidone github repository](https://github.com/heroheman/whathaveidone)

### What’s next?

- Stats & analytics about your own commits
- Integration with [Olama](https://github.com/ollama/ollama)
- Even more default prompts

---

**Feedback? Suggestions? Ideas?**  
Hit me up on [Mastodon](https://norden.social/@florenz), [Bluesky](https://bsky.app/profile/flore.nz), [GitHub](https://github.com/heroheman/whathaveidone)
If you like the project, I’d also be super happy about a star on GitHub ⭐️

More info & installation:  
- [GitHub: heroheman/whathaveidone](https://github.com/heroheman/whathaveidone)  
- [Crates.io: whathaveidone](https://crates.io/crates/whathaveidone)

<!--more-->
---
<a id="german"></a>

Als Softwareentwickler stolpere ich immer wieder über dasselbe Problem: Am nächsten Tag habe ich oft keine Ahnung mehr, was ich eigentlich noch am Vormittag gemacht habe. Vielleicht geht das nur mir so – aber ich bezweifle, dass ich der Einzige bin, der beim Standup oder bei der Zeiterfassung plötzlich zum Detektiv werden muss. Tickets, Commits, Kalender – alles wird durchforstet, nur um diese eine Frage zu beantworten: *Was habe ich eigentlich gemacht?* Ich will doch einfach nur coden, nicht Berichte schreiben.

Das Lustige ist: Eigentlich erfasse ich meine Zeit ja schon – mit GIT! Also habe ich mir ein kleines Tool gebaut: [**whathaveidone**](https://github.com/heroheman/whathaveidone). Das zeigt dir alle deine Git-Commits für beliebige Zeiträume direkt im Terminal an, egal ob für ein einzelnes Projekt oder alle zusammen. Geschrieben in [Rust](https://www.rust-lang.org/) und mit [Ratatui](https://ratatui.rs/) für eine schicke TUI – komplett per Tastatur bedienbar und mit jeder Menge Optionen.

[![*Hinweis: Das ist eine ältere Version, UI/UX können inzwischen anders aussehen.*](https://asciinema.org/a/l58gl6wettdA3x4eLD4jCkWkq.svg)](https://asciinema.org/a/l58gl6wettdA3x4eLD4jCkWkq)

**AI-Zusammenfassung? Komplett optional!**  
Mit einem Tastendruck bekommst du eine AI-Zusammenfassung deiner Commits (Google Gemini) – musst du aber nicht! Wer lieber selbst liest, kann das natürlich auch machen.

### Ein paar Beispiele & Usecases

- **Schnelles Standup:**  
  ```bash
  whathaveidone today --lang german
  ```
  Zeigt alle heutigen Commits und eine knackige Zusammenfassung (auf Deutsch oder Englisch).

- **Wochenrückblick für mehrere Projekte:**  
  Keine Lust, immer `whathaveidone` zu tippen? Einfach `whid` schreiben!
  ```bash
  whid week --model gemini-2.0-pro
  ```
  Wechsle das AI-Modell für noch bessere Zusammenfassungen.

- **Eigener Prompt für individuelle Reports:**  
  ```bash
  whathaveidone --prompt myprompt.txt --from 2024-07-01 --to 2024-07-07
  ```
  Nutze eigene Prompt-Templates und wähle beliebige Zeiträume.

- **Detaillierte Ansicht:**  
  Drücke `d` in der Commit-Ansicht für einen vollständigen "git log"-Style Überblick.

Für mehr Beispiele schau im [whathaveidone GitHub-Repository](https://github.com/heroheman/whathaveidone) vorbei.

### Was kommt als Nächstes?

- Statistiken & Auswertungen zu deinen Commits
- Integration mit [Olama](https://github.com/ollama/ollama)
- Noch mehr praktische Default-Prompts

---

**Feedback? Wünsche? Ideen?**  
Melde dich gerne auf [Mastodon](https://norden.social/@florenz), [Bluesky](https://bsky.app/profile/flore.nz), [GitHub](https://github.com/heroheman/whathaveidone) – oder schick eine Brieftaube!  
Und wenn dir das Projekt gefällt, freue ich mich riesig über einen Stern auf GitHub ⭐️

Mehr Infos & Installation:  
- [GitHub: heroheman/whathaveidone](https://github.com/heroheman/whathaveidone)  
- [Crates.io: whathaveidone](https://crates.io/crates/whathaveidone)