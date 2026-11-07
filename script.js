const $ = (s, r=document) => r.querySelector(s);
const sleep = ms => new Promise(r => setTimeout(r, ms));
const calm = matchMedia('(prefers-reduced-motion: reduce)').matches;
(async function boot(){
  const el = $('#boot'), log = $('#bootlog');
  let skipped = false;
  const finish = () => { el.classList.add('done'); document.body.classList.add('ready'); startHandshakeOnView(); };
  el.addEventListener('click', () => { skipped = true; });
  const lines = [
    ['BIOS v6.9.0 ... memory check 65536K', ''],
    ['loading kernel modules [programmer] [artist] [cybersec: loading...]', ''],
    ['mounting /dev/creativity ........ OK', 'ok'],
    ['starting firewall ............... OK', 'ok'],
    ['WARNING: unusually high caffeine levels detected', 'warn'],
    ['authenticating guest ............ GRANTED', 'ok'],
    ['> launching akshat.exe', '']
  ];
  if (calm) { finish(); return; }
  for (const [t, c] of lines) {
    if (skipped) break;
    const p = document.createElement('p'); p.className = c; log.appendChild(p);
    for (const ch of t) { if (skipped) { p.textContent = t; break; } p.textContent += ch; await sleep(9); }
    await sleep(150);
  }
  if (!skipped) await sleep(350);
  finish();
})();
(async function typer(){
  const roles = ['Programmer', 'Artist', 'Cyber Security Enthusiast'];
  const out = $('#typed');
  if (calm) { out.textContent = roles.join(' | '); return; }
  let i = 0;
  while (true) {
    const w = roles[i++ % roles.length];
    for (let k = 1; k <= w.length; k++) { out.textContent = w.slice(0, k); await sleep(80); }
    await sleep(1400);
    for (let k = w.length; k >= 0; k--) { out.textContent = w.slice(0, k); await sleep(35); }
    await sleep(250);
  }
})();
(function rain(){
  const c = $('#rain'), x = c.getContext('2d');
  const chars = '01アイウエオカキクケコ<>/{}[];$#%&=+*ABCDEF';
  let w, h, cols, drops;
  const size = 16;
  function resize(){ w = c.width = innerWidth; h = c.height = innerHeight; cols = Math.ceil(w / size); drops = Array.from({length: cols}, () => Math.random() * -50); }
  resize(); addEventListener('resize', resize);
  setInterval(() => {
    x.fillStyle = 'rgba(4,6,10,.12)'; x.fillRect(0, 0, w, h);
    x.fillStyle = '#39ff88'; x.font = size + 'px monospace';
    drops.forEach((d, i) => {
      x.fillText(chars[Math.random() * chars.length | 0], i * size, d * size);
      drops[i] = (d * size > h && Math.random() > .975) ? 0 : d + 1;
    });
  }, 55);
})();
const glow = $('#glow');
addEventListener('pointermove', e => { glow.style.transform = `translate(${e.clientX}px,${e.clientY}px)`; });
document.querySelectorAll('.tilt,.ph').forEach(card => {
  if (calm) return;
  card.addEventListener('pointermove', e => {
    const r = card.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width - .5, py = (e.clientY - r.top) / r.height - .5;
    card.style.transform = `perspective(900px) rotateY(${px * 5}deg) rotateX(${-py * 5}deg)`;
  });
  card.addEventListener('pointerleave', () => { card.style.transform = ''; });
});
const io = new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } }), {threshold: .15});
document.querySelectorAll('.reveal').forEach(el => io.observe(el));
function startHandshakeOnView(){
  const box = $('#hs'), nodes = $('#nodes'), st = $('#chanst');
  const steps = [
    ['> initiating TLS 1.3 handshake...', 0],
    ['> exchanging keys ........ <span class="ok">done</span>', 0],
    ['> verifying identity ...... <span class="ok">akshat@budhori</span>', 0],
    ['> channel open. choose a node:', 0]
  ];
  const go = async () => {
    for (const [t] of steps) { box.innerHTML += (calm ? '' : '') + t + '\n'; await sleep(calm ? 0 : 550); }
    nodes.classList.add('live'); st.textContent = 'SECURE'; st.style.color = 'var(--green)';
  };
  new IntersectionObserver((es, o) => { if (es[0].isIntersecting) { o.disconnect(); go(); } }, {threshold: .4}).observe($('.chan'));
}

const phIo = new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) { e.target.classList.add('in'); phIo.unobserve(e.target); } }), {threshold: .12});
document.querySelectorAll('.ph').forEach((p, i) => { p.style.setProperty('--d', (i % 3) * 140 + 'ms'); phIo.observe(p); });
