
// $(document).ready(function () {
//   $('.navbar-light .dmenu').hover(function () {
//           $(this).find('.sm-menu').first().stop(true, true).slideDown(150);
//       }, function () {
//           $(this).find('.sm-menu').first().stop(true, true).slideUp(105)
//       });
//   }); 
   
//       $(document).ready(function() {
//     $(".megamenu").on("click", function(e) {
//       e.stopPropagation();
//     });
//   });


// number count for stats, using jQuery animate

const counters = document.querySelectorAll('.value');
const speed = 200;

counters.forEach( counter => {
   const animate = () => {
      const value = +counter.getAttribute('akhi');
      const data = +counter.innerText;
     
      const time = value / speed;
     if(data < value) {
          counter.innerText = Math.ceil(data + time);
          setTimeout(animate, 1);
        }else{
          counter.innerText = value;
        }
     
   }
   
   animate();
});


// Slider js
$('.owl-carousel.version-1').owlCarousel({
    loop:true,
    margin:15,
    responsiveClass:true,
    responsive:{
        0:{
            items:2,
            nav:true
        },
        600:{
            items:3,
            nav:false
        },
        1000:{
            items:4,
            nav:true
        }
    }
});

// Slider version 2
$('.owl-carousel.version-2').owlCarousel({
    loop:true,
    margin:15,
    center: true,
    responsiveClass:true,
    responsive:{
        0:{
            items:1,
            nav:true
        },
        600:{
            items:2,
            nav:false
        },
        1000:{
            items:3,
            nav:true
        }
    }
})



// accordion
const accSingleTriggers = document.querySelectorAll('.js-acc-single-trigger');

accSingleTriggers.forEach(trigger => trigger.addEventListener('click', toggleAccordion));

function toggleAccordion() {
  const items = document.querySelectorAll('.js-acc-item');
  const thisItem = this.parentNode;

  items.forEach(item => {
    if (thisItem == item) {
      thisItem.classList.toggle('is-open');
      return;
    }
    item.classList.remove('is-open');
  });
}

