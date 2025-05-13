// Typing animation
const phrases = [
  "Web Dev",
  "App Dev",
  "UI/UX Designer",
  "Full Stack"
];

let current = 0;
let charIndex = 0;
let isDeleting = false;
const animatedText = document.getElementById('animatedText');

function type() {
  const currentPhrase = phrases[current];
  const visibleText = isDeleting 
    ? currentPhrase.substring(0, charIndex--) 
    : currentPhrase.substring(0, charIndex++);

  animatedText.textContent = visibleText;

  if (!isDeleting && charIndex === currentPhrase.length) {
    isDeleting = true;
    setTimeout(type, 1000);
  } else if (isDeleting && charIndex === 0) {
    isDeleting = false;
    current = (current + 1) % phrases.length;
    setTimeout(type, 500);
  } else {
    setTimeout(type, isDeleting ? 50 : 100);
  }
}

type();

// Hamburger Menu Toggle
const menuToggle = document.getElementById('menu-toggle');
const navLinks = document.getElementById('nav-links');

menuToggle.addEventListener('click', () => {
  navLinks.classList.toggle('show');
});

// Dark Mode Toggle
const darkModeToggle = document.getElementById('dark-mode-toggle');

if (localStorage.getItem('darkMode') === 'enabled') {
  document.body.classList.add('dark-mode');
  darkModeToggle.textContent = 'light_mode';
}

darkModeToggle.addEventListener('click', () => {
  document.body.classList.toggle('dark-mode');
  if (document.body.classList.contains('dark-mode')) {
    darkModeToggle.textContent = 'light_mode';
    localStorage.setItem('darkMode', 'enabled');
  } else {
    darkModeToggle.textContent = 'dark_mode';
    localStorage.setItem('darkMode', 'disabled');
  }
});

// Search Toggle
const searchToggle = document.getElementById('search-toggle');
const searchBar = document.getElementById('search-bar');
const searchInput = document.getElementById('search-input');
const searchSubmit = document.getElementById('search-submit');

searchToggle.addEventListener('click', () => {
  searchBar.classList.toggle('active');
  if (searchBar.classList.contains('active')) {
    searchInput.focus();
  }
});

searchSubmit.addEventListener('click', () => {
  const query = searchInput.value.trim();
  if (query) {
    alert(`You searched for: ${query}`);
    searchBar.classList.remove('active');
  }
});

searchInput.addEventListener('keydown', (event) => {
  if (event.key === 'Enter') {
    event.preventDefault();
    const query = searchInput.value.trim();
    if (query) {
      alert(`You searched for: ${query}`);
      searchBar.classList.remove('active');
    }
  }
});

// Sidebar button functionality
const nextBtn = document.getElementById('next-btn');
const backBtn = document.getElementById('back-btn');
const downloadBtn = document.getElementById('download-btn');
const buyBtn = document.getElementById('buy-btn');

nextBtn.addEventListener('click', () => {
  window.scrollBy({ top: window.innerHeight, behavior: 'smooth' });
});

backBtn.addEventListener('click', () => {
  window.scrollBy({ top: -window.innerHeight, behavior: 'smooth' });
});

downloadBtn.addEventListener('click', () => {
  const link = document.createElement('a');
  link.href = 'your-file-link-here.pdf';
  link.download = 'Portfolio.pdf';
  link.click();
});

buyBtn.addEventListener('click', () => {
  window.location.href = 'https://your-buy-page-link.com';
});

// Skill Bars Animation
function animateSkillBars() {
  const skills = [
    { id: "uiux-progress", percentage: 90, label: "uiux-percentage" },
    { id: "webdev-progress", percentage: 85, label: "webdev-percentage" },
    { id: "appdev-progress", percentage: 75, label: "appdev-percentage" }
  ];

  skills.forEach(skill => {
    const progressElement = document.getElementById(skill.id);
    const percentageElement = document.getElementById(skill.label);

    // Reset
    progressElement.style.width = "0%";
    percentageElement.textContent = "0%";

    // Animate width
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        progressElement.style.width = skill.percentage + "%";
      });
    });

    // Animate percentage
    let currentPercentage = 0;
    const interval = setInterval(() => {
      if (currentPercentage < skill.percentage) {
        currentPercentage++;
        percentageElement.textContent = currentPercentage + "%";
      } else {
        clearInterval(interval);
      }
    }, 20);
  });
}

// Trigger animation when skill section comes into view
const skillSection = document.querySelector('.skill-bar');
const observer = new IntersectionObserver((entries, obs) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      animateSkillBars();
      obs.disconnect(); // Run only once
    }
  });
}, { threshold: 0.3 });

if (skillSection) {
  observer.observe(skillSection);
}
 // Function to animate numbers
 const countUp = (element, target) => {
  let current = 0;
  const increment = target / 100; // Controls speed of the animation

  const updateNumber = () => {
    if (current < target) {
      current += increment;
      element.textContent = Math.floor(current);
      requestAnimationFrame(updateNumber); // Recursively calls the function for smooth animation
    } else {
      element.textContent = target;
    }
  };

  updateNumber();
};

// When the document is ready, trigger the count-up for each element
window.addEventListener('DOMContentLoaded', () => {
  const stats = document.querySelectorAll('.stat-item .countup');
  stats.forEach(stat => {
    const target = parseInt(stat.dataset.target);
    countUp(stat, target);
  });
});
// Drop Down
document.addEventListener("DOMContentLoaded", function () {
  const dropdowns = document.querySelectorAll(".dropdown");

  dropdowns.forEach(dropdown => {
    const btn = dropdown.querySelector(".dropbtn");
    const menu = dropdown.querySelector(".dropdown-content");

    btn.addEventListener("click", (e) => {
      e.stopPropagation(); // Prevent body click
      // Toggle visibility
      const isOpen = menu.style.display === "block";
      document.querySelectorAll(".dropdown-content").forEach(dc => dc.style.display = "none");
      menu.style.display = isOpen ? "none" : "block";
    });

    // Allow link clicks inside dropdown
    menu.addEventListener("click", (e) => {
      e.stopPropagation();
    });
  });

  // Close all dropdowns on body click
  document.addEventListener("click", () => {
    document.querySelectorAll(".dropdown-content").forEach(dc => dc.style.display = "none");
  });
});