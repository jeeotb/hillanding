// Countdown
(function(){
  const target = new Date('2026-07-05T09:00:00+07:00').getTime();
  function tick(){
    const now = Date.now(), diff = target - now;
    if(diff <= 0){
      ['cd-d','cd-h','cd-m','cd-s'].forEach(id => document.getElementById(id).textContent='00');
      return;
    }
    const d = Math.floor(diff/86400000);
    const h = Math.floor((diff%86400000)/3600000);
    const m = Math.floor((diff%3600000)/60000);
    const s = Math.floor((diff%60000)/1000);
    document.getElementById('cd-d').textContent = String(d).padStart(2,'0');
    document.getElementById('cd-h').textContent = String(h).padStart(2,'0');
    document.getElementById('cd-m').textContent = String(m).padStart(2,'0');
    document.getElementById('cd-s').textContent = String(s).padStart(2,'0');
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

  setErr(name,'err-name',name.value.trim().length<2);
  setErr(phone,'err-phone',!/^(0[35789])\d{8}$/.test(phone.value.replace(/\s/g,'')));
  if(email.value.trim()){
    setErr(email,'err-email',!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value));
  } else { email.classList.remove('err'); document.getElementById('err-email').classList.remove('show'); }

  if(!ok) return;

  const code='HI-'+Math.floor(10000+Math.random()*90000);
  document.getElementById('t-name').textContent=name.value.trim();
  document.getElementById('t-code').textContent='#'+code;
  document.getElementById('modal').classList.add('open');
  this.reset();
});

document.getElementById('modalClose').addEventListener('click',()=>{
  document.getElementById('modal').classList.remove('open');
});
document.getElementById('modal').addEventListener('click',function(e){
  if(e.target===this) this.classList.remove('open');
});

// Gallery Carousel Logic
const galleryData = {
  'showroom': {
    title: 'Showroom',
    subtitle: 'Khám phá không gian thiết kế độc bản',
    images: [
      { url: './assets/images/showroom/img1.jpg', title: 'Showroom', desc: 'Hình ảnh thực tế dự án' },
      { url: './assets/images/showroom/img2.jpg', title: 'Showroom', desc: 'Hình ảnh thực tế dự án' },
      { url: './assets/images/showroom/img3.jpg', title: 'Showroom', desc: 'Hình ảnh thực tế dự án' },
      { url: './assets/images/showroom/img4.jpg', title: 'Showroom', desc: 'Hình ảnh thực tế dự án' },
      { url: './assets/images/showroom/img5.jpg', title: 'Showroom', desc: 'Hình ảnh thực tế dự án' },
      { url: './assets/images/showroom/img6.jpg', title: 'Showroom', desc: 'Hình ảnh thực tế dự án' },
      { url: './assets/images/showroom/img7.jpg', title: 'Showroom', desc: 'Hình ảnh thực tế dự án' },
      { url: './assets/images/showroom/img8.jpg', title: 'Showroom', desc: 'Hình ảnh thực tế dự án' }
    ]
  },
  '1_ngu_concept_01_22_05_2026': {
    title: 'Thiết kế 3D 1 Ngủ - THE TEN',
    subtitle: 'Khám phá không gian thiết kế độc bản',
    images: [
      { url: './assets/images/1_ngu_concept_01_22_05_2026/img1.jpg', title: 'Thiết kế 3D 1 Ngủ - THE TEN', desc: 'Hình ảnh thực tế dự án' },
      { url: './assets/images/1_ngu_concept_01_22_05_2026/img2.jpg', title: 'Thiết kế 3D 1 Ngủ - THE TEN', desc: 'Hình ảnh thực tế dự án' },
      { url: './assets/images/1_ngu_concept_01_22_05_2026/img3.jpg', title: 'Thiết kế 3D 1 Ngủ - THE TEN', desc: 'Hình ảnh thực tế dự án' },
      { url: './assets/images/1_ngu_concept_01_22_05_2026/img4.jpg', title: 'Thiết kế 3D 1 Ngủ - THE TEN', desc: 'Hình ảnh thực tế dự án' },
      { url: './assets/images/1_ngu_concept_01_22_05_2026/img5.jpg', title: 'Thiết kế 3D 1 Ngủ - THE TEN', desc: 'Hình ảnh thực tế dự án' },
      { url: './assets/images/1_ngu_concept_01_22_05_2026/img6.jpg', title: 'Thiết kế 3D 1 Ngủ - THE TEN', desc: 'Hình ảnh thực tế dự án' },
      { url: './assets/images/1_ngu_concept_01_22_05_2026/img7.jpg', title: 'Thiết kế 3D 1 Ngủ - THE TEN', desc: 'Hình ảnh thực tế dự án' },
      { url: './assets/images/1_ngu_concept_01_22_05_2026/img8.jpg', title: 'Thiết kế 3D 1 Ngủ - THE TEN', desc: 'Hình ảnh thực tế dự án' }
    ]
  },
  '1_ngu_concept_02_22_05_2026': {
    title: 'Thiết kế 3D 1 Ngủ - Chị Trúc THE TEN',
    subtitle: 'Khám phá không gian thiết kế độc bản',
    images: [
      { url: './assets/images/1_ngu_concept_02_22_05_2026/img1.jpg', title: 'Thiết kế 3D 1 Ngủ - Chị Trúc THE TEN', desc: 'Hình ảnh thực tế dự án' },
      { url: './assets/images/1_ngu_concept_02_22_05_2026/img2.jpg', title: 'Thiết kế 3D 1 Ngủ - Chị Trúc THE TEN', desc: 'Hình ảnh thực tế dự án' },
      { url: './assets/images/1_ngu_concept_02_22_05_2026/img3.jpg', title: 'Thiết kế 3D 1 Ngủ - Chị Trúc THE TEN', desc: 'Hình ảnh thực tế dự án' },
      { url: './assets/images/1_ngu_concept_02_22_05_2026/img4.jpg', title: 'Thiết kế 3D 1 Ngủ - Chị Trúc THE TEN', desc: 'Hình ảnh thực tế dự án' },
      { url: './assets/images/1_ngu_concept_02_22_05_2026/img5.jpg', title: 'Thiết kế 3D 1 Ngủ - Chị Trúc THE TEN', desc: 'Hình ảnh thực tế dự án' },
      { url: './assets/images/1_ngu_concept_02_22_05_2026/img6.jpg', title: 'Thiết kế 3D 1 Ngủ - Chị Trúc THE TEN', desc: 'Hình ảnh thực tế dự án' },
      { url: './assets/images/1_ngu_concept_02_22_05_2026/img7.jpg', title: 'Thiết kế 3D 1 Ngủ - Chị Trúc THE TEN', desc: 'Hình ảnh thực tế dự án' },
      { url: './assets/images/1_ngu_concept_02_22_05_2026/img8.jpg', title: 'Thiết kế 3D 1 Ngủ - Chị Trúc THE TEN', desc: 'Hình ảnh thực tế dự án' }
    ]
  },
  '2_ngu_concept_01_22_05_2026': {
    title: 'Thiết kế 3D 2 Ngủ - Chị Trúc THE TEN',
    subtitle: 'Khám phá không gian thiết kế độc bản',
    images: [
      { url: './assets/images/2_ngu_concept_01_22_05_2026/img1.jpg', title: 'Thiết kế 3D 2 Ngủ - Chị Trúc THE TEN', desc: 'Hình ảnh thực tế dự án' },
      { url: './assets/images/2_ngu_concept_01_22_05_2026/img2.jpg', title: 'Thiết kế 3D 2 Ngủ - Chị Trúc THE TEN', desc: 'Hình ảnh thực tế dự án' },
      { url: './assets/images/2_ngu_concept_01_22_05_2026/img3.jpg', title: 'Thiết kế 3D 2 Ngủ - Chị Trúc THE TEN', desc: 'Hình ảnh thực tế dự án' },
      { url: './assets/images/2_ngu_concept_01_22_05_2026/img4.jpg', title: 'Thiết kế 3D 2 Ngủ - Chị Trúc THE TEN', desc: 'Hình ảnh thực tế dự án' },
      { url: './assets/images/2_ngu_concept_01_22_05_2026/img5.jpg', title: 'Thiết kế 3D 2 Ngủ - Chị Trúc THE TEN', desc: 'Hình ảnh thực tế dự án' },
      { url: './assets/images/2_ngu_concept_01_22_05_2026/img6.jpg', title: 'Thiết kế 3D 2 Ngủ - Chị Trúc THE TEN', desc: 'Hình ảnh thực tế dự án' },
      { url: './assets/images/2_ngu_concept_01_22_05_2026/img7.jpg', title: 'Thiết kế 3D 2 Ngủ - Chị Trúc THE TEN', desc: 'Hình ảnh thực tế dự án' },
      { url: './assets/images/2_ngu_concept_01_22_05_2026/img8.jpg', title: 'Thiết kế 3D 2 Ngủ - Chị Trúc THE TEN', desc: 'Hình ảnh thực tế dự án' }
    ]
  },
  'chi_nuong_hakura': {
    title: 'Thiết kế 3D Chị Nương | Hakura',
    subtitle: 'Khám phá không gian thiết kế độc bản',
    images: [
      { url: './assets/images/chi_nuong_hakura/img1.jpg', title: 'Thiết kế 3D Chị Nương | Hakura', desc: 'Hình ảnh thực tế dự án' },
      { url: './assets/images/chi_nuong_hakura/img2.jpg', title: 'Thiết kế 3D Chị Nương | Hakura', desc: 'Hình ảnh thực tế dự án' },
      { url: './assets/images/chi_nuong_hakura/img3.jpg', title: 'Thiết kế 3D Chị Nương | Hakura', desc: 'Hình ảnh thực tế dự án' },
      { url: './assets/images/chi_nuong_hakura/img4.jpg', title: 'Thiết kế 3D Chị Nương | Hakura', desc: 'Hình ảnh thực tế dự án' },
      { url: './assets/images/chi_nuong_hakura/img5.jpg', title: 'Thiết kế 3D Chị Nương | Hakura', desc: 'Hình ảnh thực tế dự án' },
      { url: './assets/images/chi_nuong_hakura/img6.jpg', title: 'Thiết kế 3D Chị Nương | Hakura', desc: 'Hình ảnh thực tế dự án' },
      { url: './assets/images/chi_nuong_hakura/img7.jpg', title: 'Thiết kế 3D Chị Nương | Hakura', desc: 'Hình ảnh thực tế dự án' },
      { url: './assets/images/chi_nuong_hakura/img8.jpg', title: 'Thiết kế 3D Chị Nương | Hakura', desc: 'Hình ảnh thực tế dự án' }
    ]
  },
  'chi_dieu_the_nest': {
    title: 'Thiết kế 3D - Chị Diệu The Nest',
    subtitle: 'Khám phá không gian thiết kế độc bản',
    images: [
      { url: './assets/images/chi_dieu_the_nest/img1.jpg', title: 'Thiết kế 3D - Chị Diệu The Nest', desc: 'Hình ảnh thực tế dự án' },
      { url: './assets/images/chi_dieu_the_nest/img2.jpg', title: 'Thiết kế 3D - Chị Diệu The Nest', desc: 'Hình ảnh thực tế dự án' },
      { url: './assets/images/chi_dieu_the_nest/img3.jpg', title: 'Thiết kế 3D - Chị Diệu The Nest', desc: 'Hình ảnh thực tế dự án' },
      { url: './assets/images/chi_dieu_the_nest/img4.jpg', title: 'Thiết kế 3D - Chị Diệu The Nest', desc: 'Hình ảnh thực tế dự án' },
      { url: './assets/images/chi_dieu_the_nest/img5.jpg', title: 'Thiết kế 3D - Chị Diệu The Nest', desc: 'Hình ảnh thực tế dự án' },
      { url: './assets/images/chi_dieu_the_nest/img6.jpg', title: 'Thiết kế 3D - Chị Diệu The Nest', desc: 'Hình ảnh thực tế dự án' },
      { url: './assets/images/chi_dieu_the_nest/img7.jpg', title: 'Thiết kế 3D - Chị Diệu The Nest', desc: 'Hình ảnh thực tế dự án' },
      { url: './assets/images/chi_dieu_the_nest/img8.jpg', title: 'Thiết kế 3D - Chị Diệu The Nest', desc: 'Hình ảnh thực tế dự án' }
    ]
  },
  'can_ho_orchard_hill_sycamore': {
    title: 'Thiết kế 3D căn hộ ORCHARD HILL sycamore',
    subtitle: 'Khám phá không gian thiết kế độc bản',
    images: [
      { url: './assets/images/can_ho_orchard_hill_sycamore/img1.jpg', title: 'Thiết kế 3D căn hộ ORCHARD HILL sycamore', desc: 'Hình ảnh thực tế dự án' },
      { url: './assets/images/can_ho_orchard_hill_sycamore/img2.jpg', title: 'Thiết kế 3D căn hộ ORCHARD HILL sycamore', desc: 'Hình ảnh thực tế dự án' },
      { url: './assets/images/can_ho_orchard_hill_sycamore/img3.jpg', title: 'Thiết kế 3D căn hộ ORCHARD HILL sycamore', desc: 'Hình ảnh thực tế dự án' },
      { url: './assets/images/can_ho_orchard_hill_sycamore/img4.jpg', title: 'Thiết kế 3D căn hộ ORCHARD HILL sycamore', desc: 'Hình ảnh thực tế dự án' },
      { url: './assets/images/can_ho_orchard_hill_sycamore/img5.jpg', title: 'Thiết kế 3D căn hộ ORCHARD HILL sycamore', desc: 'Hình ảnh thực tế dự án' },
      { url: './assets/images/can_ho_orchard_hill_sycamore/img6.jpg', title: 'Thiết kế 3D căn hộ ORCHARD HILL sycamore', desc: 'Hình ảnh thực tế dự án' },
      { url: './assets/images/can_ho_orchard_hill_sycamore/img7.jpg', title: 'Thiết kế 3D căn hộ ORCHARD HILL sycamore', desc: 'Hình ảnh thực tế dự án' },
      { url: './assets/images/can_ho_orchard_hill_sycamore/img8.jpg', title: 'Thiết kế 3D căn hộ ORCHARD HILL sycamore', desc: 'Hình ảnh thực tế dự án' }
    ]
  },
  'the_glory': {
    title: 'Thiết kế 3D căn hộ Glory',
    subtitle: 'Khám phá không gian thiết kế độc bản',
    images: [
      { url: './assets/images/the_glory/img1.jpg', title: 'Thiết kế 3D căn hộ Glory', desc: 'Hình ảnh thực tế dự án' },
      { url: './assets/images/the_glory/img2.jpg', title: 'Thiết kế 3D căn hộ Glory', desc: 'Hình ảnh thực tế dự án' },
      { url: './assets/images/the_glory/img3.jpg', title: 'Thiết kế 3D căn hộ Glory', desc: 'Hình ảnh thực tế dự án' },
      { url: './assets/images/the_glory/img4.jpg', title: 'Thiết kế 3D căn hộ Glory', desc: 'Hình ảnh thực tế dự án' },
      { url: './assets/images/the_glory/img5.jpg', title: 'Thiết kế 3D căn hộ Glory', desc: 'Hình ảnh thực tế dự án' },
      { url: './assets/images/the_glory/img6.jpg', title: 'Thiết kế 3D căn hộ Glory', desc: 'Hình ảnh thực tế dự án' },
      { url: './assets/images/the_glory/img7.jpg', title: 'Thiết kế 3D căn hộ Glory', desc: 'Hình ảnh thực tế dự án' },
      { url: './assets/images/the_glory/img8.jpg', title: 'Thiết kế 3D căn hộ Glory', desc: 'Hình ảnh thực tế dự án' }
    ]
  },
  'orchard_grand': {
    title: 'ORCHARD GRAND',
    subtitle: 'Khám phá không gian thiết kế độc bản',
    images: [
      { url: './assets/images/orchard_grand/img1.jpg', title: 'ORCHARD GRAND', desc: 'Hình ảnh thực tế dự án' },
      { url: './assets/images/orchard_grand/img2.jpg', title: 'ORCHARD GRAND', desc: 'Hình ảnh thực tế dự án' },
      { url: './assets/images/orchard_grand/img3.jpg', title: 'ORCHARD GRAND', desc: 'Hình ảnh thực tế dự án' },
      { url: './assets/images/orchard_grand/img4.jpg', title: 'ORCHARD GRAND', desc: 'Hình ảnh thực tế dự án' },
      { url: './assets/images/orchard_grand/img5.jpg', title: 'ORCHARD GRAND', desc: 'Hình ảnh thực tế dự án' },
      { url: './assets/images/orchard_grand/img6.jpg', title: 'ORCHARD GRAND', desc: 'Hình ảnh thực tế dự án' },
      { url: './assets/images/orchard_grand/img7.jpg', title: 'ORCHARD GRAND', desc: 'Hình ảnh thực tế dự án' },
      { url: './assets/images/orchard_grand/img8.jpg', title: 'ORCHARD GRAND', desc: 'Hình ảnh thực tế dự án' }
    ]
  },
};
let currentSlideIdx = 0;
let currentProject = null;

function openGalleryModal(projectId) {
  const modal = document.getElementById('galleryModal');
  const thumbsContainer = document.getElementById('galleryThumbnails');
  
  if(!galleryData[projectId]) return;
  currentProject = galleryData[projectId];
  currentSlideIdx = 0;
  
  // Set Header
  document.getElementById('galleryModalTitle').textContent = currentProject.title;
  document.getElementById('galleryModalSubtitle').textContent = currentProject.subtitle;
  
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
  
  // Render first slide
  renderSlide(0);
  
  modal.classList.add('show');
}

function closeGalleryModal() {
  const modal = document.getElementById('galleryModal');
  modal.classList.remove('show');
}

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
