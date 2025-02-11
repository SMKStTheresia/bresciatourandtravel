// (uno) menu navbar scroll ke kiri
const menu = document.getElementById('menu');
let lastScrollTop = 0;

window.addEventListener('scroll', function() {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

    if (scrollTop > lastScrollTop) {
        // Scrolling down
        menu.style.transform = 'translate(-5%, -50%)'; // Move menu out of view to the right
    } else {
        // Scrolling up
        menu.style.transform = 'translate(-50%, -50%)'; // Bring menu back to center
    }
});

//carousel img page-2 (matt)
document.addEventListener('DOMContentLoaded', function() {
    const imageList = document.querySelector('.image-list');
    const scrollbarThumb = document.querySelector('.scrollbar-thumb');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    const cardWidth = 320; // Width of each card including margin
    let currentIndex = 0;
    const totalCards = document.querySelectorAll('.card-wrapper').length;
    
    // Set initial width of scrollbar thumb
    const containerWidth = document.querySelector('.carousel-container').offsetWidth;
    const scrollbarWidth = (containerWidth / (totalCards * cardWidth)) * document.querySelector('.scrollbar-container').offsetWidth;
    scrollbarThumb.style.width = `${scrollbarWidth}px`;

    function updateCarousel(index) {
      // Ensure index is within bounds
      currentIndex = Math.max(0, Math.min(index, totalCards - 3));
      const translateX = -currentIndex * cardWidth;
      imageList.style.transform = `translateX(${translateX}px)`;
  
      // Update scrollbar position
      const scrollbarContainer = document.querySelector('.scrollbar-container');
      const maxScroll = scrollbarContainer.offsetWidth - scrollbarThumb.offsetWidth;
      const scrollPosition = (currentIndex / (totalCards - 3)) * maxScroll;
      scrollbarThumb.style.transform = `translateX(${scrollPosition}px)`;
  }

    // Auto scroll function
    function autoScroll() {
      currentIndex = (currentIndex + 1) % totalCards;
      updateCarousel(currentIndex);
    }

    // Start auto scroll
    let interval = setInterval(autoScroll, 4000);

    // Pause auto scroll on hover
    imageList.addEventListener('mouseenter', () => clearInterval(interval));
    imageList.addEventListener('mouseleave', () => {
      interval = setInterval(autoScroll, 4000);
    });

    // Button controls
    // Button controls
prevBtn.addEventListener('click', () => {
  clearInterval(interval);
  currentIndex = (currentIndex - 1 + totalCards) % totalCards; // Wrap around if needed
  updateCarousel(currentIndex);
});

nextBtn.addEventListener('click', () => {
  clearInterval(interval);
  // If the current index is the last image, reset to the first
  if (currentIndex >= totalCards - 3) {
      currentIndex = 0; // Go back to the first image
  } else {
      currentIndex++; // Move to the next image
  }
  updateCarousel(currentIndex);
}); 

    // Manual scrolling with scrollbar
    let isDragging = false;
    let startX;
    let scrollStartX;

    scrollbarThumb.addEventListener('mousedown', (e) => {
      isDragging = true;
      startX = e.clientX;
      scrollStartX = scrollbarThumb.offsetLeft;
    });

    document.addEventListener('mousemove', (e) => {
      if (!isDragging) return;
      
      const delta = e.clientX - startX;
      const scrollbarContainer = document.querySelector('.scrollbar-container');
      const maxScroll = scrollbarContainer.offsetWidth - scrollbarThumb.offsetWidth;
      
      let newPosition = scrollStartX + delta;
      newPosition = Math.max(0, Math.min(newPosition, maxScroll));
      
      const scrollPercentage = newPosition / maxScroll;
      currentIndex = Math.max(0, Math.min(Math.round(scrollPercentage * (totalCards - 1)), totalCards - 1));
      
      updateCarousel(currentIndex);
    });

    document.addEventListener('mouseup', () => {
      isDragging = false;
    });
  });
//end kode carousel (matt)

// Hamburger Menu
document.addEventListener('DOMContentLoaded', function() {
    const hamburger = document.querySelector('.hamburger-menu');
    const mobileMenu = document.querySelector('.mobile-menu');

    hamburger.addEventListener('click', function() {
        hamburger.classList.toggle('active');
        mobileMenu.classList.toggle('active');
    });

    // Close menu when clicking a link
    document.querySelectorAll('.mobile-menu a').forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            mobileMenu.classList.remove('active');
        });
    });

    // Close menu when clicking outside
    document.addEventListener('click', function(e) {
        if (!mobileMenu.contains(e.target) && !hamburger.contains(e.target)) {
            hamburger.classList.remove('active');
            mobileMenu.classList.remove('active');
        }
    });
});

    // Ensure hidden services are hidden on page load
    document.addEventListener('DOMContentLoaded', function() {
        const hiddenServices = document.querySelector('.hidden-p3');
        hiddenServices.style.display = 'none'; // Ensure it's hidden initially
    });

    document.getElementById('see-more-btn').addEventListener('click', function() {
        const hiddenServices = document.querySelector('.hidden-p3');
        if (hiddenServices.style.display === 'grid') {
            hiddenServices.style.display = 'none';
            this.textContent = 'See More';
        } else {
            hiddenServices.style.display = 'grid';
            this.textContent = 'See Less';
        }
    });