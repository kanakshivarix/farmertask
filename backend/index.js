import { renderEmailPDF } from "./renderEmail.js";

(async () => {
  await renderEmailPDF("knk", "kanak@gmail.com", "welcome.pdf");
})();
