// ==== CẤU HÌNH GỬI LEAD VỀ GOOGLE SHEET =========================
// Dán URL Web App sau khi deploy Apps Script (xem google-sheet/HUONG-DAN.md)
const LEAD_ENDPOINT = 'https://script.google.com/macros/s/AKfycbxShFL2_wKOV2pXRT60X9ugNH2459bjzCI6yGnhTCoJlYK_pm960NypAQPHWXUScutSFA/exec';
// ================================================================

// ==== TRACKING SU KIEN (Google tag AW-18239610105) ==============
function track(name, params){
  if (typeof gtag === 'function') gtag('event', name, params || {});
}
document.addEventListener('click', function(e){
  var a = e.target.closest ? e.target.closest('a') : null;
  if (!a) return;
  if ((a.getAttribute('href') || '').indexOf('tel:') === 0) track('phone_call', {link_text: 'sticky/footer'});
  else if (a.classList.contains('qz-cta')) track('contact_zalo');
  else if (a.classList.contains('qm-cta')) track('contact_messenger');
});
// ================================================================

// Countdown
(function(){
  const target = new Date('2026-07-05T09:00:00+07:00').getTime();
  function tick(){
    // Guard: countdown markup may not exist on every page/section — bail out safely
    // instead of throwing (a past bug here broke every script below it: counters,
    // mobile nav, form submit, gallery modal).
    // Bind theo [data-cd] để hỗ trợ nhiều countdown (hero + form) cùng lúc
    const els = document.querySelectorAll('[data-cd]');
    if(!els.length) return;
    const now = Date.now(), diff = Math.max(0, target - now);
    const v = {
      d: Math.floor(diff/86400000),
      h: Math.floor((diff%86400000)/3600000),
      m: Math.floor((diff%3600000)/60000),
      s: Math.floor((diff%60000)/1000)
    };
    els.forEach(el => { el.textContent = String(v[el.dataset.cd] ?? 0).padStart(2,'0'); });
  }
  tick(); setInterval(tick,1000);
})();

// Counter animation
(function(){
  const counters = document.querySelectorAll('.count');
  const io = new IntersectionObserver(entries=>{
    entries.forEach(e=>{
      if(!e.isIntersecting) return;
      const el = e.target, to = +el.dataset.to;
      let cur=0; const step=Math.ceil(to/60);
      const t=setInterval(()=>{
        cur=Math.min(cur+step,to);
        el.textContent=cur;
        if(cur>=to) clearInterval(t);
      },24);
      io.unobserve(el);
    });
  },{threshold:.5});
  counters.forEach(c=>io.observe(c));
})();

// Sticky nav
window.addEventListener('scroll',()=>{
  document.getElementById('navbar').classList.toggle('scrolled',window.scrollY>60);
});

// Mobile nav
const menuBtn=document.getElementById('menuBtn');
const mobileNav=document.getElementById('mobileNav');
const closeNav=document.getElementById('closeNav');
menuBtn.addEventListener('click',()=>mobileNav.classList.add('open'));
closeNav.addEventListener('click',()=>mobileNav.classList.remove('open'));
document.querySelectorAll('.close-nav-link').forEach(el=>{
  el.addEventListener('click',()=>mobileNav.classList.remove('open'));
});

// Form
document.getElementById('reg-form').addEventListener('submit',function(e){
  e.preventDefault();
  const name=document.getElementById('f-name');
  const phone=document.getElementById('f-phone');
  const email=document.getElementById('f-email');
  let ok=true;

  function setErr(input,errId,cond){
    const msg=document.getElementById(errId);
    if(cond){input.classList.add('err');msg.classList.add('show');ok=false;}
    else{input.classList.remove('err');msg.classList.remove('show');}
  }

  const segment=document.getElementById('f-segment');
  const status=document.getElementById('f-status');

  setErr(name,'err-name',name.value.trim().length<2);
  setErr(phone,'err-phone',!/^(0[35789])\d{8}$/.test(phone.value.replace(/\s/g,'')));
  if(email.value.trim()){
    setErr(email,'err-email',!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value));
  } else { email.classList.remove('err'); document.getElementById('err-email').classList.remove('show'); }
  if(segment) setErr(segment,'err-segment',segment.value==='');
  if(status) setErr(status,'err-status',status.value==='');

  if(!ok) return;

  const code='HI-'+Math.floor(10000+Math.random()*90000);

  // Gửi lead về Google Sheet qua Apps Script
  const btn=this.querySelector('.form-submit');
  const btnText=btn.innerHTML;
  btn.disabled=true;btn.innerHTML='Đang gửi đăng ký...';

  const qs=new URLSearchParams(location.search);
  const payload=new URLSearchParams({
    code:code,
    name:name.value.trim(),
    phone:phone.value.replace(/\s/g,''),
    email:email.value.trim(),
    segment:segment?segment.options[segment.selectedIndex].text:'',
    status:status?status.options[status.selectedIndex].text:'',
    utm_source:qs.get('utm_source')||'',
    utm_medium:qs.get('utm_medium')||'',
    utm_campaign:qs.get('utm_campaign')||'',
    utm_content:qs.get('utm_content')||'',
    page:location.href
  });

  const showTicket=()=>{
    track('generate_lead', {method: 'form_dang_ky', segment: segment ? segment.value : ''});
    btn.disabled=false;btn.innerHTML=btnText;
    document.getElementById('t-name').textContent=name.value.trim();
    document.getElementById('t-code').textContent='#'+code;
    document.getElementById('modal').classList.add('open');
    this.reset();
  };

  if(!LEAD_ENDPOINT){
    console.warn('[HI] LEAD_ENDPOINT chưa cấu hình — lead KHÔNG được lưu vào Sheet!');
    showTicket();
    return;
  }
  fetch(LEAD_ENDPOINT,{method:'POST',mode:'no-cors',body:payload})
    .then(showTicket)
    .catch(()=>{
      btn.disabled=false;btn.innerHTML=btnText;
      alert('Không gửi được đăng ký. Vui lòng thử lại hoặc gọi hotline 0869.83.05.51');
    });
});

document.getElementById('modalClose').addEventListener('click',()=>{
  document.getElementById('modal').classList.remove('open');
});
document.getElementById('modal').addEventListener('click',function(e){
  if(e.target===this) this.classList.remove('open');
});

// Gallery Carousel Logic
const galleryData = {
  'the-ten-1pn-concept-1': {
    title: 'The Ten - 1PN - Concept 1',
    subtitle: 'Khám phá không gian thiết kế độc bản',
    images: [
      { url: './assets/images/THE TEN - 1PN - CONCEPT 1/A_View01.webp', title: 'The Ten - 1PN - Concept 1', desc: 'Thiết kế 3D thực tế thi công' },
      { url: './assets/images/THE TEN - 1PN - CONCEPT 1/A_View03.webp', title: 'The Ten - 1PN - Concept 1', desc: 'Thiết kế 3D thực tế thi công' },
      { url: './assets/images/THE TEN - 1PN - CONCEPT 1/A_View05.webp', title: 'The Ten - 1PN - Concept 1', desc: 'Thiết kế 3D thực tế thi công' },
      { url: './assets/images/THE TEN - 1PN - CONCEPT 1/A_View10.webp', title: 'The Ten - 1PN - Concept 1', desc: 'Thiết kế 3D thực tế thi công' },
      { url: './assets/images/THE TEN - 1PN - CONCEPT 1/A_View17.webp', title: 'The Ten - 1PN - Concept 1', desc: 'Thiết kế 3D thực tế thi công' }
    ]
  },
  'the-ten-1pn-concept-2': {
    title: 'The Ten - 1PN - Concept 2',
    subtitle: 'Khám phá không gian thiết kế độc bản',
    images: [
      { url: './assets/images/THE TEN - 1PN - CONCEPT 2/A_View01.webp', title: 'The Ten - 1PN - Concept 2', desc: 'Thiết kế 3D thực tế thi công' },
      { url: './assets/images/THE TEN - 1PN - CONCEPT 2/A_View03.webp', title: 'The Ten - 1PN - Concept 2', desc: 'Thiết kế 3D thực tế thi công' },
      { url: './assets/images/THE TEN - 1PN - CONCEPT 2/A_View04.webp', title: 'The Ten - 1PN - Concept 2', desc: 'Thiết kế 3D thực tế thi công' },
      { url: './assets/images/THE TEN - 1PN - CONCEPT 2/A_View11.webp', title: 'The Ten - 1PN - Concept 2', desc: 'Thiết kế 3D thực tế thi công' },
      { url: './assets/images/THE TEN - 1PN - CONCEPT 2/A_View15.webp', title: 'The Ten - 1PN - Concept 2', desc: 'Thiết kế 3D thực tế thi công' }
    ]
  },
  'the-ten-1pn-concept-3': {
    title: 'The Ten - 1PN - Concept 3',
    subtitle: 'Khám phá không gian thiết kế độc bản',
    images: [
      { url: './assets/images/THE TEN - 1PN - CONCEPT 3/A_View02.webp', title: 'The Ten - 1PN - Concept 3', desc: 'Thiết kế 3D thực tế thi công' },
      { url: './assets/images/THE TEN - 1PN - CONCEPT 3/A_View03.webp', title: 'The Ten - 1PN - Concept 3', desc: 'Thiết kế 3D thực tế thi công' },
      { url: './assets/images/THE TEN - 1PN - CONCEPT 3/A_View04.webp', title: 'The Ten - 1PN - Concept 3', desc: 'Thiết kế 3D thực tế thi công' },
      { url: './assets/images/THE TEN - 1PN - CONCEPT 3/A_View07.webp', title: 'The Ten - 1PN - Concept 3', desc: 'Thiết kế 3D thực tế thi công' },
      { url: './assets/images/THE TEN - 1PN - CONCEPT 3/A_View15.webp', title: 'The Ten - 1PN - Concept 3', desc: 'Thiết kế 3D thực tế thi công' }
    ]
  },
  'the-ten-2pn-concept-1': {
    title: 'The Ten - 2PN - Concept 1',
    subtitle: 'Khám phá không gian thiết kế độc bản',
    images: [
      { url: './assets/images/THE TEN - 2PN - CONCEPT 1/A_View03.webp', title: 'The Ten - 2PN - Concept 1', desc: 'Thiết kế 3D thực tế thi công' },
      { url: './assets/images/THE TEN - 2PN - CONCEPT 1/A_View06.webp', title: 'The Ten - 2PN - Concept 1', desc: 'Thiết kế 3D thực tế thi công' },
      { url: './assets/images/THE TEN - 2PN - CONCEPT 1/A_View09.webp', title: 'The Ten - 2PN - Concept 1', desc: 'Thiết kế 3D thực tế thi công' },
      { url: './assets/images/THE TEN - 2PN - CONCEPT 1/A_View14.webp', title: 'The Ten - 2PN - Concept 1', desc: 'Thiết kế 3D thực tế thi công' },
      { url: './assets/images/THE TEN - 2PN - CONCEPT 1/A_View22.webp', title: 'The Ten - 2PN - Concept 1', desc: 'Thiết kế 3D thực tế thi công' }
    ]
  },
  'the-ten-2pn-concept-2': {
    title: 'The Ten - 2PN - Concept 2',
    subtitle: 'Khám phá không gian thiết kế độc bản',
    images: [
      { url: './assets/images/THE TEN - 2PN - CONCEPT 2/A_View01.webp', title: 'The Ten - 2PN - Concept 2', desc: 'Thiết kế 3D thực tế thi công' },
      { url: './assets/images/THE TEN - 2PN - CONCEPT 2/A_View02.webp', title: 'The Ten - 2PN - Concept 2', desc: 'Thiết kế 3D thực tế thi công' },
      { url: './assets/images/THE TEN - 2PN - CONCEPT 2/A_View07.webp', title: 'The Ten - 2PN - Concept 2', desc: 'Thiết kế 3D thực tế thi công' },
      { url: './assets/images/THE TEN - 2PN - CONCEPT 2/A_View16.webp', title: 'The Ten - 2PN - Concept 2', desc: 'Thiết kế 3D thực tế thi công' },
      { url: './assets/images/THE TEN - 2PN - CONCEPT 2/A_View21.webp', title: 'The Ten - 2PN - Concept 2', desc: 'Thiết kế 3D thực tế thi công' }
    ]
  },
  'the-ten-2pn-concept-3': {
    title: 'The Ten - 2PN - Concept 3',
    subtitle: 'Khám phá không gian thiết kế độc bản',
    images: [
      { url: './assets/images/THE TEN - 2PN - CONCEPT 3/A_View03.webp', title: 'The Ten - 2PN - Concept 3', desc: 'Thiết kế 3D thực tế thi công' },
      { url: './assets/images/THE TEN - 2PN - CONCEPT 3/A_View04.webp', title: 'The Ten - 2PN - Concept 3', desc: 'Thiết kế 3D thực tế thi công' },
      { url: './assets/images/THE TEN - 2PN - CONCEPT 3/A_View05.webp', title: 'The Ten - 2PN - Concept 3', desc: 'Thiết kế 3D thực tế thi công' },
      { url: './assets/images/THE TEN - 2PN - CONCEPT 3/A_View17.webp', title: 'The Ten - 2PN - Concept 3', desc: 'Thiết kế 3D thực tế thi công' },
      { url: './assets/images/THE TEN - 2PN - CONCEPT 3/A_View24.webp', title: 'The Ten - 2PN - Concept 3', desc: 'Thiết kế 3D thực tế thi công' }
    ]
  },
  'the-ten-3pn': {
    title: 'The Ten - 3PN',
    subtitle: 'Khám phá không gian thiết kế độc bản',
    images: [
      { url: './assets/images/THE TEN - 3PN/1.webp', title: 'The Ten - 3PN', desc: 'Thiết kế 3D thực tế thi công' },
      { url: './assets/images/THE TEN - 3PN/4.webp', title: 'The Ten - 3PN', desc: 'Thiết kế 3D thực tế thi công' },
      { url: './assets/images/THE TEN - 3PN/9.webp', title: 'The Ten - 3PN', desc: 'Thiết kế 3D thực tế thi công' },
      { url: './assets/images/THE TEN - 3PN/10.webp', title: 'The Ten - 3PN', desc: 'Thiết kế 3D thực tế thi công' },
      { url: './assets/images/THE TEN - 3PN/15.webp', title: 'The Ten - 3PN', desc: 'Thiết kế 3D thực tế thi công' },
      { url: './assets/images/THE TEN - 3PN/16.webp', title: 'The Ten - 3PN', desc: 'Thiết kế 3D thực tế thi công' }
    ]
  },

  // ── CHÍNH SÁCH CHO THUÊ LẠI THEO PHÂN KHÚC ──
  'policy-1pn': {
    type: 'policy',
    segment: '1pn',
    title: 'Căn Hộ 1 Phòng Ngủ',
    subtitle: 'Chính sách cho thuê lại từ Chủ Đầu Tư Becamex Tokyu',
    aptType: 'Căn hộ 1 Phòng Ngủ',
    price: '25.000.000đ/tháng',
    images: [
      { url: './assets/images/THE TEN - 1PN - CONCEPT 1/A_View01.webp', title: 'Căn Hộ 1 Phòng Ngủ', desc: 'Thiết kế 3D thực tế thi công' },
      { url: './assets/images/THE TEN - 1PN - CONCEPT 1/A_View03.webp', title: 'Căn Hộ 1 Phòng Ngủ', desc: 'Thiết kế 3D thực tế thi công' },
      { url: './assets/images/THE TEN - 1PN - CONCEPT 1/A_View05.webp', title: 'Căn Hộ 1 Phòng Ngủ', desc: 'Thiết kế 3D thực tế thi công' },
      { url: './assets/images/THE TEN - 1PN - CONCEPT 1/A_View10.webp', title: 'Căn Hộ 1 Phòng Ngủ', desc: 'Thiết kế 3D thực tế thi công' },
      { url: './assets/images/THE TEN - 1PN - CONCEPT 1/A_View17.webp', title: 'Căn Hộ 1 Phòng Ngủ', desc: 'Thiết kế 3D thực tế thi công' }
    ]
  },
  'policy-2pn': {
    type: 'policy',
    segment: '2pn',
    title: 'Căn Hộ 2 Phòng Ngủ',
    subtitle: 'Chính sách cho thuê lại từ Chủ Đầu Tư Becamex Tokyu',
    aptType: 'Căn hộ 2 Phòng Ngủ',
    price: '32.500.000đ/tháng',
    images: [
      { url: './assets/images/THE TEN - 2PN - CONCEPT 1/A_View03.webp', title: 'Căn Hộ 2 Phòng Ngủ', desc: 'Thiết kế 3D thực tế thi công' },
      { url: './assets/images/THE TEN - 2PN - CONCEPT 1/A_View06.webp', title: 'Căn Hộ 2 Phòng Ngủ', desc: 'Thiết kế 3D thực tế thi công' },
      { url: './assets/images/THE TEN - 2PN - CONCEPT 1/A_View09.webp', title: 'Căn Hộ 2 Phòng Ngủ', desc: 'Thiết kế 3D thực tế thi công' },
      { url: './assets/images/THE TEN - 2PN - CONCEPT 1/A_View14.webp', title: 'Căn Hộ 2 Phòng Ngủ', desc: 'Thiết kế 3D thực tế thi công' },
      { url: './assets/images/THE TEN - 2PN - CONCEPT 1/A_View22.webp', title: 'Căn Hộ 2 Phòng Ngủ', desc: 'Thiết kế 3D thực tế thi công' }
    ]
  },
  'policy-3pn': {
    type: 'policy',
    segment: '3pn',
    title: 'Căn Hộ 3 Phòng Ngủ (128m²)',
    subtitle: 'Chính sách cho thuê lại từ Chủ Đầu Tư Becamex Tokyu',
    aptType: 'Căn hộ 3 Phòng Ngủ (128m²)',
    price: '38.000.000đ/tháng',
    images: [
      { url: './assets/images/THE TEN - 3PN/1.webp', title: 'Căn Hộ 3 Phòng Ngủ (128m²)', desc: 'Thiết kế 3D thực tế thi công' },
      { url: './assets/images/THE TEN - 3PN/4.webp', title: 'Căn Hộ 3 Phòng Ngủ (128m²)', desc: 'Thiết kế 3D thực tế thi công' },
      { url: './assets/images/THE TEN - 3PN/9.webp', title: 'Căn Hộ 3 Phòng Ngủ (128m²)', desc: 'Thiết kế 3D thực tế thi công' },
      { url: './assets/images/THE TEN - 3PN/10.webp', title: 'Căn Hộ 3 Phòng Ngủ (128m²)', desc: 'Thiết kế 3D thực tế thi công' },
      { url: './assets/images/THE TEN - 3PN/15.webp', title: 'Căn Hộ 3 Phòng Ngủ (128m²)', desc: 'Thiết kế 3D thực tế thi công' }
    ]
  },
};
let currentSlideIdx = 0;
let currentProject = null;

function openGalleryModal(projectId) {
  const modal = document.getElementById('galleryModal');
  const thumbsContainer = document.getElementById('galleryThumbnails');
  const priceBar = document.getElementById('galleryPriceBar');
  const ctaBtn = document.getElementById('galleryModalCta');

  if(!galleryData[projectId]) return;
  currentProject = galleryData[projectId];
  currentSlideIdx = 0;

  // Set Header
  document.getElementById('galleryModalTitle').textContent = currentProject.title;
  document.getElementById('galleryModalSubtitle').textContent = currentProject.subtitle;

  // Price bar — only shown for pricing-segment (policy) entries
  if(priceBar){
    if(currentProject.type === 'policy'){
      document.getElementById('gpType').textContent = currentProject.aptType;
      document.getElementById('gpPrice').textContent = currentProject.price;
      priceBar.classList.add('show');
    } else {
      priceBar.classList.remove('show');
    }
  }

  // CTA copy depends on entry type — always stays on-page (scrolls to form, never navigates away)
  if(ctaBtn){
    ctaBtn.textContent = currentProject.type === 'policy'
      ? 'Đăng Ký Tư Vấn Phân Khúc Này →'
      : 'Thích Phong Cách Này? Đăng Ký Tư Vấn →';
  }

  // Clear old thumbnails
  thumbsContainer.innerHTML = '';

  // Create Thumbnails
  currentProject.images.forEach((imgObj, i) => {
    const thumb = document.createElement('img');
    thumb.className = `gallery-thumbnail ${i === 0 ? 'active' : ''}`;
    thumb.src = imgObj.url;
    thumb.onclick = () => renderSlide(i);
    thumbsContainer.appendChild(thumb);
  });

  // Preload toàn bộ ảnh của album ngay khi mở modal → chuyển ảnh gần như tức thì
  currentProject.images.forEach((imgObj) => {
    const pre = new Image();
    pre.decoding = 'async';
    pre.src = imgObj.url;
  });

  // Render first slide
  renderSlide(0);

  modal.classList.add('show');
}

// Cuộn từ thẻ "Phân Khúc Căn Hộ" xuống đúng sub-heading tương ứng
// trong section "Dự Án Nội Thất Tiêu Biểu" (trừ hao chiều cao navbar cố định).
function scrollToGallery(targetId) {
  const el = document.getElementById(targetId);
  if (!el) return;
  const nav = document.getElementById('navbar');
  const offset = (nav ? nav.offsetHeight : 70) + 20;
  const top = el.getBoundingClientRect().top + window.pageYOffset - offset;
  window.scrollTo({ top, behavior: 'smooth' });
}

function closeGalleryModal() {
  const modal = document.getElementById('galleryModal');
  modal.classList.remove('show');
}

// Modal CTA → always stays in-page: closes modal and scrolls to the form,
// pre-selecting the "phân khúc quan tâm" field if opened from a policy card.
function goToConsultFromModal(){
  const segment = (currentProject && currentProject.segment) ? currentProject.segment : '';
  closeGalleryModal();
  const segmentSelect = document.getElementById('f-segment');
  if(segment && segmentSelect){
    segmentSelect.value = segment;
  }
  const formSection = document.getElementById('form-section');
  if(formSection) formSection.scrollIntoView({behavior:'smooth'});
}

// Partnership video facade — loads the iframe only on click (faster initial page load)
// Works with any embeddable video URL (Google Drive preview, YouTube embed, Vimeo, etc.)
// via data-embed-src on the button.
document.querySelectorAll('.video-facade').forEach(function(btn){
  btn.addEventListener('click', function(){
    const wrap = btn.closest('.partnership-video-wrap');
    const embedSrc = btn.dataset.embedSrc;
    if(!wrap || !embedSrc) return;
    const iframe = document.createElement('iframe');
    iframe.src = embedSrc;
    iframe.allow = 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture';
    iframe.allowFullscreen = true;
    iframe.setAttribute('loading','lazy');
    wrap.innerHTML = '';
    wrap.appendChild(iframe);
  });
});

function renderSlide(idx) {
  const mainImg = document.getElementById('galleryMainImage');
  const thumbs = document.querySelectorAll('.gallery-thumbnail');
  const counter = document.getElementById('galleryCounter');
  const title = document.getElementById('galleryImgTitle');
  const desc = document.getElementById('galleryImgDesc');
  
  if(!mainImg || !currentProject) return;
  
  // Update state
  if(thumbs[currentSlideIdx]) thumbs[currentSlideIdx].classList.remove('active');
  currentSlideIdx = idx;
  if(thumbs[currentSlideIdx]) {
    thumbs[currentSlideIdx].classList.add('active');
    thumbs[currentSlideIdx].scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
  }
  
  // Update UI
  const slideData = currentProject.images[currentSlideIdx];
  mainImg.decoding = 'async';
  mainImg.src = slideData.url;
  counter.textContent = `${currentSlideIdx + 1} / ${currentProject.images.length}`;
  title.textContent = slideData.title;
  desc.textContent = slideData.desc;
}

function nextSlide() {
  if(!currentProject) return;
  const nextIdx = (currentSlideIdx + 1) % currentProject.images.length;
  renderSlide(nextIdx);
}

function prevSlide() {
  if(!currentProject) return;
  const prevIdx = (currentSlideIdx - 1 + currentProject.images.length) % currentProject.images.length;
  renderSlide(prevIdx);
}

// Close modal when clicking outside content
document.addEventListener('click', function(e) {
  const modal = document.getElementById('galleryModal');
  if (e.target === modal) {
    closeGalleryModal();
  }
});

// Keyboard Navigation for Gallery Modal
document.addEventListener('keydown', function(e) {
  const modal = document.getElementById('galleryModal');
  if (modal.classList.contains('show')) {
    if (e.key === 'ArrowRight') nextSlide();
    if (e.key === 'ArrowLeft') prevSlide();
    if (e.key === 'Escape') closeGalleryModal();
  }
});
