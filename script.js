"use strict";

// Cabeçalho: mantém o efeito ao rolar do site original.
const header = document.getElementById("header");
if (header) {
    const ajustarCabecalho = () => header.classList.toggle("scroll", window.scrollY > 50);
    window.addEventListener("scroll", ajustarCabecalho, { passive: true });
    ajustarCabecalho();

    // Menu acessível para telas pequenas; links normais continuam como fallback.
    const nav = header.querySelector("nav");
    if (nav) {
        if (!nav.id) nav.id = "menu-principal";
        const botao = document.createElement("button");
        botao.type = "button";
        botao.className = "menu-toggle";
        botao.setAttribute("aria-label", "Abrir menu de navegação");
        botao.setAttribute("aria-controls", nav.id);
        botao.setAttribute("aria-expanded", "false");
        botao.innerHTML = '<span class="menu-toggle__barras" aria-hidden="true"><span></span><span></span><span></span></span><span class="menu-toggle__texto">Menu</span>';
        header.insertBefore(botao, nav);
        header.classList.add("tem-menu-mobile");

        const fecharMenu = () => {
            header.classList.remove("menu-aberto");
            botao.setAttribute("aria-expanded", "false");
            botao.setAttribute("aria-label", "Abrir menu de navegação");
        };
        botao.addEventListener("click", () => {
            const aberto = header.classList.toggle("menu-aberto");
            botao.setAttribute("aria-expanded", String(aberto));
            botao.setAttribute("aria-label", aberto ? "Fechar menu de navegação" : "Abrir menu de navegação");
        });
        nav.querySelectorAll("a").forEach(link => link.addEventListener("click", fecharMenu));
        document.addEventListener("keydown", e => { if (e.key === "Escape") fecharMenu(); });
        window.addEventListener("resize", () => { if (window.innerWidth > 768) fecharMenu(); }, { passive: true });
    }
}

// Atualiza automaticamente a próxima data do calendário cadastrada no HTML.
// NÃO inventa resultados nem declara uma etapa realizada sem confirmação.
const etapas = Array.from(document.querySelectorAll(".gt3-etapa"));
if (etapas.length) {
    const hoje = new Date();
    hoje.setHours(0, 0, 0, 0);
    const registros = etapas.map(elemento => {
        const valor = elemento.querySelector("time")?.getAttribute("datetime");
        const data = /^\d{4}-\d{2}-\d{2}$/.test(valor || "") ? new Date(`${valor}T00:00:00`) : null;
        return { elemento, data };
    });
    const proxima = registros.find(reg => reg.data && reg.data >= hoje);
    registros.forEach(({ elemento, data }) => {
        if (!data) return;
        const realizada = elemento.dataset.realizada === "true";
        const jaPassou = data < hoje;
        elemento.classList.toggle("concluida", realizada);
        elemento.classList.toggle("passada", jaPassou && !realizada);
        elemento.classList.toggle("proxima", !jaPassou && proxima?.elemento === elemento);
        let etiqueta = elemento.querySelector("small");
        if (!etiqueta) {
            etiqueta = document.createElement("small");
            elemento.appendChild(etiqueta);
        }
        if (realizada) etiqueta.textContent = elemento.dataset.resultados === "true" ? "Resultados disponíveis" : "Realizada";
        else if (jaPassou) etiqueta.textContent = "Resultado pendente";
        else if (proxima?.elemento === elemento) etiqueta.textContent = "Próxima etapa";
        else if (elemento.dataset.final === "true") etiqueta.textContent = "Final";
        else etiqueta.textContent = "";
    });
}
