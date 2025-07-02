
# Vouchly – Build Testimonial Pages in minutes

![Vouchly Banner](https://vouchly.kakoty.me/og-image.png)


**Live App**: ([text](https://vouchly.kakoty.me))

---

**Vouchly** is a testimonial collection platform designed to help creators and businesses collect powerful video and text testimonials and embed them seamlessly on their websites.

This tool allows you to approve, feature, and display testimonials in a customizable, embeddable wall — just like Testimonial.to — but with your own brand and full control.

---

## ✨ Features

- 📥 Public form to collect **video** or **text** testimonials  
- 🔒 Admin dashboard for **approving**, **rejecting**, and **featuring** submissions  
- 🧱 Embed wall builder with **select & preview** functionality  
- 📜 Auto-generated **embed script** for use on external sites  
- 🎬 **Ads Free** Video testimonials
- ⚡️ Optimized delivery via optional **CloudFront CDN**  
- 🔐 Authentication via **NextAuth (credentials-based)**  
- 🎨 Clean, responsive UI built with **Tailwind CSS** and **Shadcn UI**

---

## 🌐 Embedding Testimonials

Once you've created an embed wall from the dashboard:

1. Copy the generated `<script>` tag  
2. Paste it into the HTML of any external site

```html
<script type="text/javascript" src="https://cdn.vouchly.kakoty.me/js/iframeResizer.min.js"></script>
<iframe id="review-wall-7d39dab1-00a9-477d-a0a1-73160ea07676" src="https://vouchly.kakoty.me//embadedwall/7d39dab1-00a9-477d-a0a1-73160ea07676" frameborder="0" scrolling="no" width="100%"></iframe>
<script>window.addEventListener("load", function () {iFrameResize({ log: false, checkOrigin: false }, "#review-wall-7d39dab1-00a9-477d-a0a1-73160ea07676")})</script>
```

This will inject a responsive iframe showing your selected testimonials. It auto-adjusts height using `iframe-resizer`.

---
## 🛡️ License

Private project. All rights reserved © 2025 [Animesh Kakoty](https://github.com/kakotyanimesh)
