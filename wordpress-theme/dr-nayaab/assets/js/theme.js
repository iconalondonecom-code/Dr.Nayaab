/* Dr. Nayaab theme — vanilla JS: header state, mobile nav, reveal, enquiry list */
(function () {
  "use strict";

  var STORAGE_KEY = "dr-nayaab-enquiry-list";
  var cfg = window.drNayaab || {};

  /* ---------------------------------------------------------------- header */
  var header = document.querySelector(".site-header");
  function onScroll() {
    if (!header) return;
    header.classList.toggle("is-scrolled", window.scrollY > 24);
  }
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  var toggle = document.querySelector(".menu-toggle");
  var mobileNav = document.querySelector(".mobile-nav");
  if (toggle && mobileNav) {
    toggle.addEventListener("click", function () {
      mobileNav.classList.add("is-open");
      document.body.style.overflow = "hidden";
    });
    mobileNav.querySelectorAll("[data-close-nav], a").forEach(function (el) {
      el.addEventListener("click", function () {
        mobileNav.classList.remove("is-open");
        document.body.style.overflow = "";
      });
    });
  }

  /* --------------------------------------------------------------- reveals */
  var reveals = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window && reveals.length) {
    var io = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            io.unobserve(entry.target);
          }
        });
      },
      { rootMargin: "0px 0px -10% 0px" }
    );
    reveals.forEach(function (el) {
      io.observe(el);
    });
  } else {
    reveals.forEach(function (el) {
      el.classList.add("is-visible");
    });
  }

  /* --------------------------------------------------------- enquiry list */
  function read() {
    try {
      var raw = window.localStorage.getItem(STORAGE_KEY);
      var parsed = raw ? JSON.parse(raw) : [];
      return Array.isArray(parsed) ? parsed : [];
    } catch (e) {
      return [];
    }
  }
  function write(list) {
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(list));
    } catch (e) {
      /* storage unavailable */
    }
  }

  var items = read();

  function countEl() {
    return document.querySelectorAll(".enquiry-count");
  }

  function syncCount() {
    countEl().forEach(function (el) {
      el.textContent = String(items.length);
      el.classList.toggle("is-visible", items.length > 0);
    });
    document.querySelectorAll(".enquiry-btn[data-product-id]").forEach(function (btn) {
      var added = items.some(function (i) {
        return String(i.id) === String(btn.dataset.productId);
      });
      btn.classList.toggle("is-added", added);
      btn.querySelector(".enquiry-btn-label").textContent = added
        ? btn.dataset.labelAdded || "Added to Enquiry"
        : btn.dataset.labelAdd || "Add to Enquiry";
    });
  }

  function renderDrawer() {
    var body = document.querySelector(".drawer-body");
    var textarea = document.querySelector("#ef-products");
    if (body) {
      if (!items.length) {
        body.innerHTML = '<p class="drawer-empty">Your enquiry list is empty. Browse the portfolio and add the products relevant to your market.</p>';
      } else {
        body.innerHTML = items
          .map(function (i) {
            return (
              '<div class="drawer-item">' +
              (i.image ? '<img src="' + i.image + '" alt="" loading="lazy">' : "") +
              '<div style="flex:1"><strong>' +
              i.name +
              "</strong>" +
              (i.meta ? '<div class="small">' + i.meta + "</div>" : "") +
              "</div>" +
              '<button type="button" class="drawer-remove" data-remove="' +
              i.id +
              '">Remove</button>' +
              "</div>"
            );
          })
          .join("");
      }
    }
    if (textarea && items.length && !textarea.value) {
      textarea.value = items
        .map(function (i) {
          return i.name;
        })
        .join(", ");
    }
    var hidden = document.querySelector('input[name="dn_products"]');
    if (hidden) {
      hidden.value = items
        .map(function (i) {
          return i.name;
        })
        .join(", ");
    }
  }

  document.addEventListener("click", function (e) {
    var addBtn = e.target.closest(".enquiry-btn[data-product-id]");
    if (addBtn) {
      e.preventDefault();
      var id = String(addBtn.dataset.productId);
      var exists = items.some(function (i) {
        return String(i.id) === id;
      });
      if (exists) {
        items = items.filter(function (i) {
          return String(i.id) !== id;
        });
      } else {
        items.push({
          id: id,
          name: addBtn.dataset.productName || "",
          meta: addBtn.dataset.productMeta || "",
          image: addBtn.dataset.productImage || "",
        });
        openDrawer();
      }
      write(items);
      syncCount();
      renderDrawer();
      return;
    }

    var removeBtn = e.target.closest("[data-remove]");
    if (removeBtn) {
      items = items.filter(function (i) {
        return String(i.id) !== String(removeBtn.dataset.remove);
      });
      write(items);
      syncCount();
      renderDrawer();
      return;
    }

    if (e.target.closest(".enquiry-toggle")) {
      e.preventDefault();
      openDrawer();
      return;
    }
    if (e.target.closest("[data-close-drawer]") || e.target.classList.contains("drawer-overlay")) {
      closeDrawer();
      return;
    }
    if (e.target.closest("[data-clear-enquiry]")) {
      items = [];
      write(items);
      syncCount();
      renderDrawer();
    }
  });

  function openDrawer() {
    var d = document.querySelector(".drawer");
    var o = document.querySelector(".drawer-overlay");
    renderDrawer();
    if (d) d.classList.add("is-open");
    if (o) o.classList.add("is-open");
  }
  function closeDrawer() {
    var d = document.querySelector(".drawer");
    var o = document.querySelector(".drawer-overlay");
    if (d) d.classList.remove("is-open");
    if (o) o.classList.remove("is-open");
  }

  /* --------------------------------------------------- WhatsApp enquiry */
  document.querySelectorAll("[data-whatsapp]").forEach(function (link) {
    link.addEventListener("click", function () {
      var base = cfg.whatsapp || "https://wa.me/919998569923";
      var msg = link.dataset.whatsapp || cfg.whatsappMessage || "";
      if (!link.dataset.static) {
        link.setAttribute("href", base + "?text=" + encodeURIComponent(msg));
      }
    });
  });

  /* -------------------------------------------------------- product gallery */
  var thumbs = document.querySelectorAll(".gallery-thumbs button");
  var mainImg = document.querySelector(".gallery-main img");
  thumbs.forEach(function (btn) {
    btn.addEventListener("click", function () {
      if (!mainImg) return;
      mainImg.src = btn.dataset.full;
      thumbs.forEach(function (b) {
        b.classList.remove("is-active");
      });
      btn.classList.add("is-active");
    });
  });

  /* ------------------------------------------------------- product filters */
  var chips = document.querySelectorAll("[data-filter]");
  var searchInput = document.querySelector("[data-product-search]");
  function applyFilter() {
    var active = document.querySelector("[data-filter].is-active");
    var term = (searchInput && searchInput.value ? searchInput.value : "").toLowerCase().trim();
    var slug = active ? active.dataset.filter : "all";
    document.querySelectorAll("[data-product-item]").forEach(function (item) {
      var matchCat = slug === "all" || (item.dataset.categories || "").split(" ").indexOf(slug) > -1;
      var matchTerm = !term || (item.dataset.search || "").toLowerCase().indexOf(term) > -1;
      item.style.display = matchCat && matchTerm ? "" : "none";
    });
  }
  chips.forEach(function (chip) {
    chip.addEventListener("click", function () {
      chips.forEach(function (c) {
        c.classList.remove("is-active");
      });
      chip.classList.add("is-active");
      applyFilter();
    });
  });
  if (searchInput) searchInput.addEventListener("input", applyFilter);

  syncCount();
  renderDrawer();
})();
