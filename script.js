// Smooth scroll for navigation + support normal link
document.querySelectorAll('.nav-link').forEach(link => {
  link.addEventListener('click', function(e) {
    const href = this.getAttribute('href');
    
    // ถ้า href ไม่ได้ขึ้นต้นด้วย # (เช่น about.html, index.html) ให้เปลี่ยนหน้า
    if (!href || !href.startsWith("#")) {
      // ให้ browser ทำงานตามปกติ (เปลี่ยนหน้า)
      return;
    }
    
    // ถ้าเป็น anchor (#) ให้ smooth scroll และเปลี่ยน active state
    e.preventDefault();
    // Remove active class from all links
    document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));
    // Add active class to clicked link
    this.classList.add('active');
    // Smooth scroll to section
    const targetSection = document.querySelector(href);
    if (targetSection) {
      targetSection.scrollIntoView({ behavior: 'smooth' });
    }
  });
});


// Add parallax effect to hero banner
window.addEventListener('scroll', () => {
  const scrolled = window.pageYOffset;
  const hero = document.querySelector('.hero-banner');
  if (hero) {
    hero.style.transform = `translateY(${scrolled * 0.5}px)`;
  }
});


// Card คลิกเพื่อเปิดลิงก์ + แยกจัดการ Gmail
document.querySelectorAll('.content-card').forEach(card => {
  const isGmailCard = card.classList.contains('gmail-card');
  // ป้องกัน text selection (ยกเว้น Gmail)
  if (!isGmailCard) {
    card.addEventListener('selectstart', function(e) {
      e.preventDefault();
    });
  }
  // ป้องกัน context menu (ยกเว้น Gmail)
  if (!isGmailCard) {
    card.addEventListener('contextmenu', function(e) {
      e.preventDefault();
    });
  }
  // Hover effect
  card.addEventListener('mouseenter', function() {
    this.style.zIndex = '100';
  });
  card.addEventListener('mouseleave', function() {
    this.style.zIndex = '1';
  });
  // คลิกครั้งเดียว (Single Click) - เปิดลิงก์ทันที
  card.addEventListener('click', function(e) {
    // ถ้าคลิกที่ text ใน Gmail card ให้ข้าม (เพื่อให้คัดลอกได้)
    if (isGmailCard && (e.target.classList.contains('gmail-text') || e.target.closest('.gmail-text'))) {
      return;
    }
    if (this.tagName === 'A') return;
    const link = this.getAttribute('data-link') ||
                 this.querySelector('a')?.getAttribute('href');
    if (link && link !== '#') {
      // Animation feedback
      this.style.transform = 'scale(1.02)';
      this.style.boxShadow = '0 0 50px #ff6ba9ff, 0 0 80px #6ec1e4ff';
      setTimeout(() => {
        window.open(link, '_blank');
        this.style.transform = '';
        this.style.boxShadow = '';
      }, 120);
    }
  });
  // ดับเบิลคลิก (Double Click) - เปิดลิงก์ (backup)
  card.addEventListener('dblclick', function(e) {
    if (!isGmailCard) {
      e.preventDefault(); // ป้องกันการคัดลอก (ยกเว้น Gmail)
    }
    if (this.tagName === 'A') {
      const url = this.getAttribute('href');
      if (url && url !== '#') {
        window.open(url, '_blank');
      }
      return;
    }
    const link = this.getAttribute('data-link') ||
                 this.querySelector('a')?.getAttribute('href');
    if (link && link !== '#') {
      window.open(link, '_blank');
    }
  });
});


// Animate elements on scroll
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
    }
  });
}, observerOptions);

document.querySelectorAll('.content-section').forEach(section => {
  section.style.opacity = '0';
  section.style.transform = 'translateY(30px)';
  section.style.transition = 'all 0.6s ease';
  observer.observe(section);
});

// Add typing effect to bio (optional)
function typeWriter(element, text, speed = 50) {
  let i = 0;
  element.innerHTML = '';
  function type() {
    if (i < text.length) {
      element.innerHTML += text.charAt(i);
      i++;
      setTimeout(type, speed);
    }
  }
  type();
}

// Easter egg: Click logo 5 times for surprise
let clickCount = 0;
const logoElement = document.querySelector('.logo');
if (logoElement) {
  logoElement.addEventListener('click', () => {
    clickCount++;
    if (clickCount === 5) {
      document.body.style.animation = 'rainbow 2s ease infinite';
      setTimeout(() => {
        document.body.style.animation = '';
        clickCount = 0;
      }, 5000);
    }
  });
}

const style = document.createElement('style');
style.innerHTML = `
  @keyframes rainbow {
    0% { filter: hue-rotate(0deg); }
    100% { filter: hue-rotate(360deg); }
  }
`;
document.head.appendChild(style);


// Update Current Time every second
function updateCurrentTime() {
  const timeElement = document.getElementById('current-time');
  if (timeElement) {
    const now = new Date();
    const options = {
      weekday: 'short',
      year: 'numeric',
      month: 'short',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false
    };
    timeElement.textContent = now.toLocaleString('en-US', options);
  }
}
updateCurrentTime();
setInterval(updateCurrentTime, 1000);

// Scroll to top when page loads
window.addEventListener('load', () => {
  window.scrollTo(0, 0);
});

// ==========================================
// Real-time Age Calculator
// ==========================================
function updateAge() {
  const birthDate = new Date('2009-10-29T00:00:00+07:00'); // 29 ตุลาคม 2552 เที่ยงคืน (UTC+7)
  const now = new Date();
  // คำนวณความแตกต่าง (milliseconds)
  const diff = now - birthDate;
  // แปลงเป็น ปี เดือน วัน ชั่วโมง นาที วินาที
  const seconds = Math.floor(diff / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);
  const years = Math.floor(days / 365.25);
  // คำนวณเศษที่เหลือ
  const remainingDays = Math.floor(days - (years * 365.25));
  const remainingHours = hours % 24;
  const remainingMinutes = minutes % 60;
  const remainingSeconds = seconds % 60;
  // อัปเดต DOM
  const ageElement = document.querySelector('#age-value');
  if (ageElement) {
    ageElement.textContent = `${years} years ${remainingDays} days ${remainingHours}:${String(remainingMinutes).padStart(2, '0')}:${String(remainingSeconds).padStart(2, '0')}`;
  }
}
updateAge();
setInterval(updateAge, 1000);
