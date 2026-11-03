  // The hero video plays on its own (muted, with controls to pause it), except for visitors who ask for reduced motion.
  (function(){
    var v = document.getElementById('hero-video');
    if (!v || !window.matchMedia || !window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    v.removeAttribute('autoplay'); v.pause();
  })();
  // Whereabout demonstrations: one player at a time, chosen with the switch.
  (function(){
    var seg = document.querySelector('#whereabout-demos .seg');
    if (!seg) return;
    var buttons = seg.querySelectorAll('button');
    function show(id){
      buttons.forEach(function(b){
        var on = b.dataset.demo === id;
        b.setAttribute('aria-pressed', on ? 'true' : 'false');
        var fig = document.getElementById(b.dataset.demo);
        if (!on){ var v = fig.querySelector('video'); if (v && !v.paused) v.pause(); }
        fig.hidden = !on;
      });
    }
    buttons.forEach(function(b){ b.addEventListener('click', function(){ show(b.dataset.demo); }); });
    seg.hidden = false;
    show('demo-spaces');
  })();
  // Preselect the contact topic from the link that brought the visitor here (contact/?topic=beta).
  (function(){
    var sel = document.getElementById('f-interest');
    if (!sel || !window.URLSearchParams) return;
    var topics = {beta: 'Joining the iOS beta', whereabout: 'Whereabout', pilot: 'Piloting at my organization', press: 'Press'};
    var t = new URLSearchParams(location.search).get('topic');
    if (t && topics[t]) sel.value = topics[t];
  })();
  // GitHub Pages has no form backend, so sending composes an email instead.
  // (On a *.netlify.app deploy, Netlify Forms handles the POST natively and this is skipped.)
  (function(){
    var form = document.querySelector('form[name="contact"]');
    if (!form) return;
    if (/\.netlify\.app$/.test(location.hostname)) return;
    form.addEventListener('submit', function(e){
      e.preventDefault();
      var v = function(id){ var el = document.getElementById(id); return el ? el.value.trim() : ''; };
      var subject = '[apex-ai.site] ' + (v('f-interest') || 'Message');
      var body = 'Name: ' + v('f-name') + '\nEmail: ' + v('f-email') + '\nInterested in: ' + v('f-interest') + '\n\n' + v('f-message');
      var note = document.getElementById('preview-note');
      if (note){
        note.style.display = 'block';
        note.textContent = 'Your email application will open with this message addressed to magedshoman@apex-ai.site.';
      }
      location.href = 'mailto:magedshoman@apex-ai.site?subject=' + encodeURIComponent(subject) + '&body=' + encodeURIComponent(body);
    });
  })();
