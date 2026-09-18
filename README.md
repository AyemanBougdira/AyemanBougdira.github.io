# AyemanBougdira.github.io

Personal portfolio — experience, project demos, certifications and reading list. Plain HTML/CSS/JS,
no build step, deployed via GitHub Pages.

## Structure

```
index.html                 Single-page site (About, Experience, Projects, Skills, Demos, Certifications, Books, Contact)
assets/css/style.css       Styles, light/dark theme via CSS variables
assets/js/main.js          Language toggle (EN/FR), theme toggle, mobile nav, scroll reveal
assets/img/                Favicon + avatar
assets/videos/             Demo video files (see assets/videos/README.md)
assets/certificates/       Certificate files/links (see assets/certificates/README.md)
assets/books/               Book cover images (see assets/books/README.md)
assets/cv/                 CV PDF for the "Download CV" button
```

## Editing content

All text lives directly in `index.html`. Bilingual strings are on a single element via two attributes:

```html
<h2 data-en="Experience" data-fr="Expérience">Experience</h2>
```

`assets/js/main.js` swaps `textContent` between `data-en`/`data-fr` based on the selected language — edit
both attributes when changing copy. Placeholder sections (video demos, certificates, books) are clearly
marked; see the `README.md` in each `assets/` subfolder for how to fill them in.

## Local preview

```bash
python3 -m http.server 8000
# open http://localhost:8000
```

## Deploy to GitHub Pages

1. Create a GitHub repo named exactly `AyemanBougdira.github.io`.
2. Push this repo to it:
   ```bash
   git remote add origin git@github.com:AyemanBougdira/AyemanBougdira.github.io.git
   git push -u origin main
   ```
3. In the repo Settings → Pages, set the source to "Deploy from a branch", branch `main`, folder `/ (root)`.
4. The site will be live at `https://AyemanBougdira.github.io` within a minute or two.
