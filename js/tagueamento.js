// Define a função global ga, tracker e envia pageview
const setGAPageview = () => {
    (function (i, s, o, g, r, a, m) {
        i["GoogleAnalyticsObject"] = r; i[r] = i[r] || function () {
            (i[r].q = i[r].q || []).push(arguments)
        }, i[r].l = 1 * new Date(); a = s.createElement(o),
            m = s.getElementsByTagName(o)[0]; a.async = 1; a.src = g; m.parentNode.insertBefore(a, m)
    })(window, document, "script", "https://www.google-analytics.com/analytics.js", "ga");

    ga("create", "UA-219135896-1", "auto");
    ga("send", "pageview");

}


// Associa labels a elementos
const setLabels = () => {
    let labels = document.getElementsByTagName("label");
    for (label of labels) {
        if (label.htmlFor != '') {
            let elem = document.getElementById(label.htmlFor);
            if (elem)
                elem.label = label;         
        };
    };
};


// Envia eventos do menu
const setEventsMenu = () => {

    document.querySelector(".menu-lista-contato").onclick = () => {
        ga("send", "event", "menu", "entre_em_contato", "link_externo");
    };

    document.querySelector(".menu-lista-download").onclick = () => {
        ga("send", "event", "menu", "download_pdf", "download_pdf");
    };
};


// Envia eventos de clique no formulário
const setEventsContato = () => {

    setLabels()
    let formContato = document.querySelector("form.contato");
    for (let input of formContato.querySelectorAll("input")) {

        input.onchange = () => {
            ga("send", "event", "contato", input.label.textContent, "preencheu");
        };
    };

    // Popup
    const mutationCallback = (mutationsList) => {
        for (const mutation of mutationsList) {
            mutation.type == "attributes" &&
            mutation.attributeName == "class" &&
            mutation.target.classList.contains("lightbox-open") &&
            ga("send", "event", "contato", "enviado", "enviado");
        };
    };
    
    const observer = new MutationObserver(mutationCallback)
    observer.observe(document.body, { attributes: true })
};


// Envia eventos de clique em Análise
const setEventsAnalise = () => {

    for (let card of document.querySelectorAll(".card-montadoras")) {
        console.log(card)
        card.onclick = () => {
            ga("send", "event", "analise", "ver_mais", card.getAttribute("data-name"));
        };
    };
}

const main = () => {

    setGAPageview()
    setEventsMenu()

    const eventosPaginas = {
        "/sobre": setEventsContato,
        "/analise": setEventsAnalise
    }

    let pagina = window.location.pathname

    pagina == '/' || eventosPaginas[pagina]()
}

main()
