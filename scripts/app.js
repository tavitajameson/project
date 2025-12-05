(function () {


    function sortPlayersBy(field) {
        const copy = [...players].sort((a, b) => b.stats[field] - a.stats[field]);
        return copy;
    }


    function showTopFive() {
        const field = sortSelect ? sortSelect.value : 'ppg';
        const top5 = sortPlayersBy(field).slice(0, 5);
        const out = document.getElementById('statsOutput');
        if (out) out.innerHTML = top5.map(p => playerCard(p)).join('');
        attachFavListeners();
        lazyInit();
    }


    function lazyInit() {
        const lazyImages = document.querySelectorAll('img.lazy[data-src]');
        if ('IntersectionObserver' in window) {
            const io = new IntersectionObserver((entries, observer) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const img = entry.target; img.src = img.dataset.src; img.removeAttribute('data-src'); img.classList.remove('lazy'); observer.unobserve(img);
                    }
                });
            }, { rootMargin: '50px' });
            lazyImages.forEach(img => io.observe(img));
        } else {
            lazyImages.forEach(img => { img.src = img.dataset.src; img.classList.remove('lazy'); });
        }
    }


    function setupForm() {
        const form = document.getElementById('subscribeForm');
        if (!form) return;
        form.addEventListener('submit', e => {
            e.preventDefault();
            if (!form.checkValidity()) { form.reportValidity(); return; }
            const data = { name: form.name.value.trim(), email: form.email.value.trim(), team: form.team ? form.team.value : form.favTeam.value };
            const subs = JSON.parse(localStorage.getItem('courtside:subs') || '[]');
            subs.push(data); localStorage.setItem('courtside:subs', JSON.stringify(subs));
            const msg = document.getElementById('formMessage'); if (msg) msg.textContent = `Thanks ${data.name}! You've been subscribed.`;
            form.reset();
        });
    }


    function setYear() {
        const y = new Date().getFullYear();
        document.getElementById('year') && (document.getElementById('year').textContent = y);
        document.getElementById('year2') && (document.getElementById('year2').textContent = y);
        document.getElementById('year3') && (document.getElementById('year3').textContent = y);
    }


    function init() {
        setYear();
        renderFeatured();
        renderPlayers(players);
        populateTeamFilter();
        setupForm();
        if (playerSearch) playerSearch.addEventListener('input', debounce(handleSearch, 200));
        if (showTopBtn) showTopBtn.addEventListener('click', showTopFive);
    }


    function debounce(fn, delay = 150) { let t; return (...args) => { clearTimeout(t); t = setTimeout(() => fn.apply(this, args), delay); }; }


    document.addEventListener('DOMContentLoaded', init);


    window.CourtSide = { getFavorites: () => JSON.parse(localStorage.getItem(favoritesKey) || '[]') };
})();