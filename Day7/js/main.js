document.addEventListener("DOMContentLoaded", () => {
    // Load components
    loadComponent("header-container", "components/header.html", () => {
      // Set active nav link based on current page
      const currentPage = window.location.pathname.split("/").pop()
      if (currentPage === "index.html" || currentPage === "") {
        document.getElementById("nav-home").classList.add("active")
      } else if (currentPage === "about.html") {
        document.getElementById("nav-about").classList.add("active")
      } else if (currentPage === "products.html") {
        document.getElementById("nav-products").classList.add("active")
      } else if (currentPage === "gallery.html") {
        document.getElementById("nav-gallery").classList.add("active")
      } else if (currentPage === "partners.html") {
        document.getElementById("nav-partners").classList.add("active")
      } else if (currentPage === "contact.html") {
        document.getElementById("nav-contact").classList.add("active")
      }
    })
  
    loadComponent("footer-container", "components/footer.html")
    loadComponent("modal-container", "components/login-modal.html")
  
    // Initialize any page-specific scripts
    initPageSpecificScripts()
  })
  
  // Function to load HTML components
  function loadComponent(containerId, componentUrl, callback) {
    const container = document.getElementById(containerId)
    if (!container) return
  
    fetch(componentUrl)
      .then((response) => response.text())
      .then((html) => {
        container.innerHTML = html
        if (callback) callback()
      })
      .catch((error) => {
        console.error("Error loading component:", error)
        container.innerHTML = '<div class="alert alert-danger">Error loading component</div>'
      })
  }
  
  // Initialize page-specific scripts
  function initPageSpecificScripts() {
    const currentPage = window.location.pathname.split("/").pop()
  
    // Gallery page
    if (currentPage === "gallery.html") {
      initGalleryFilters()
    }
  
    // Contact page
    if (currentPage === "contact.html") {
      initContactForm()
    }
  }
  
  // Gallery filters
  function initGalleryFilters() {
    // Wait for components to load
    setTimeout(() => {
      const filterButtons = document.querySelectorAll("[data-filter]")
      const galleryItems = document.querySelectorAll(".gallery-item")
  
      if (!filterButtons.length || !galleryItems.length) return
  
      filterButtons.forEach((button) => {
        button.addEventListener("click", function () {
          // Remove active class from all buttons
          filterButtons.forEach((btn) => btn.classList.remove("active"))
          // Add active class to clicked button
          this.classList.add("active")
  
          const filterValue = this.getAttribute("data-filter")
  
          galleryItems.forEach((item) => {
            if (filterValue === "all" || item.getAttribute("data-category") === filterValue) {
              item.closest(".col-6").style.display = "block"
            } else {
              item.closest(".col-6").style.display = "none"
            }
          })
        })
      })
  
      // Image lightbox
      const galleryImages = document.querySelectorAll(".gallery-item img")
      const modalImage = document.getElementById("modalImage")
      const imageModalLabel = document.getElementById("imageModalLabel")
  
      if (galleryImages.length && modalImage && imageModalLabel) {
        galleryImages.forEach((img) => {
          img.addEventListener("click", function () {
            modalImage.src = this.src
            const title = this.closest(".gallery-item").querySelector(".card-title").textContent
            imageModalLabel.textContent = title
            // Initialize Bootstrap Modal
            const imageModalElement = document.getElementById("imageModal")
            const imageModal = new bootstrap.Modal(imageModalElement)
            imageModal.show()
          })
        })
      }
    }, 500)
  }
  
  // Contact form
  function initContactForm() {
    // Wait for components to load
    setTimeout(() => {
      const contactForm = document.getElementById("contactForm")
  
      if (!contactForm) return
  
      contactForm.addEventListener("submit", (event) => {
        event.preventDefault()
  
        // Simple form validation
        const firstName = document.getElementById("firstName").value
        const lastName = document.getElementById("lastName").value
        const email = document.getElementById("email").value
        const message = document.getElementById("message").value
  
        if (firstName && lastName && email && message) {
          // In a real application, you would send this data to a server
          alert("Thank you for your message! We will get back to you soon.")
          contactForm.reset()
        } else {
          alert("Please fill in all required fields.")
        }
      })
    }, 500)
  }
  
  