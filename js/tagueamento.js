// Define a função global ga

(function (i, s, o, g, r, a, m) {
    i["GoogleAnalyticsObject"] = r; i[r] = i[r] || function () {
        (i[r].q = i[r].q || []).push(arguments)
    }, i[r].l = 1 * new Date(); a = s.createElement(o),
        m = s.getElementsByTagName(o)[0]; a.async = 1; a.src = g; m.parentNode.insertBefore(a, m)
})(window, document, "script", "https://www.google-analytics.com/analytics.js", "ga");


// Configura tracker e envia pageview

ga("create", "UA-219135896-1", "auto");
ga("send", "pageview");


// Associa labels a elementos

let labels = document.getElementsByTagName("label");
for (label of labels) {
    if (label.htmlFor != '') {
         let elem = document.getElementById(label.htmlFor);
         if (elem)
            elem.label = label;         
    }
}


// Envia eventos do menu

document.querySelector(".menu-lista-contato").onclick = () => {
    ga("send", "event", "menu", "entre_em_contato", "link_externo");
}

document.querySelector(".menu-lista-download").onclick = () => {
    ga("send", "event", "menu", "download_pdf", "download_pdf");
}


// Envia eventos de clique no formulário

let formContato = document.querySelector("form.contato")

for (input of formContato.querySelectorAll("input")) {

    input.onchange = () => {
        ga("send", "event", "contato", input.label.textContent, "preencheu");
    };
}

// ga('send', 'event', [eventCategory], [eventAction], [eventLabel], [eventValue], [fieldsObject]);