(function ($) {
  $(function () {
    //  open and close nav
    $("#navbar-toggle").click(function () {
      $("nav ul").slideToggle();
    });

    // Hamburger toggle
    $("#navbar-toggle").on("click", function () {
      this.classList.toggle("active");
    });

    // If a link has a dropdown, add sub menu toggle.
    $("nav ul li a:not(:only-child)").click(function (e) {
      $(this).siblings(".navbar-dropdown").slideToggle("slow");

      // Close dropdown when select another dropdown
      $(".navbar-dropdown").not($(this).siblings()).hide("slow");
      e.stopPropagation();
    });

    // Click outside the dropdown will remove the dropdown class
    $("html").click(function () {
      $(".navbar-dropdown").hide();
    });
  });
})(jQuery);

const counters = document.querySelectorAll(".counter");
counters.forEach((counter) => {
  counter.innerHTML = 0;

  const updateCounter = () => {
    const targetCount = +counter.getAttribute("data-target");
    const startingCount = Number(counter.innerHTML);

    let incr;

    if (targetCount == 12) {
      incr = 1;
      if (startingCount < targetCount) {
        counter.innerHTML = `${Math.round(startingCount + incr)}`;
        setTimeout(updateCounter, 150);
      } else {
        counter.innerHTML = targetCount;
      }
    } else {
      incr = targetCount / 100;
      if (startingCount < targetCount) {
        counter.innerHTML = `${Math.round(startingCount + incr)}`;
        setTimeout(updateCounter, 25);
      } else {
        counter.innerHTML = `${targetCount}+`;
      }
    }
  };
  updateCounter();
});

// Map Code
let mapOptions = {
  center: [18.979, 72.949],
  zoom: 10,
};

let map = new L.map("map", mapOptions);

let layer = new L.TileLayer(
  "http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
);
map.addLayer(layer);

let marker = new L.Marker([51.958, 9.141]);
marker.addTo(map);
