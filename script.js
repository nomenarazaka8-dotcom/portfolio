// Le lightbox fonctionne désormais en CSS pur (:target), donc plus besoin
// de JS pour l'ouvrir/fermer. On garde juste un petit bonus UX :
// fermer le lightbox avec la touche "Échap".

document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && window.location.hash) {
        history.replaceState(null, "", window.location.pathname + window.location.search);
    }
});