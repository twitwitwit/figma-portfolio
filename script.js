/* ==========================================================================
   FRANCES MARGARETT PORTFOLIO — INTERACTION LOGIC
   Web Developer × UI Designer
   ========================================================================== */

document.addEventListener("DOMContentLoaded", () => {
  /* --------------------------------------------------------------------------
     1. PRELOADER
     -------------------------------------------------------------------------- */
  const loaderWrapper = document.getElementById("loader-wrapper");

  if (loaderWrapper) {
    setTimeout(() => {
      loaderWrapper.classList.add("loader-finish");
      initTypingEffect();
    }, 1500);
  } else {
    initTypingEffect();
  }

  /* --------------------------------------------------------------------------
     2. TYPING EFFECT
     -------------------------------------------------------------------------- */
  function initTypingEffect() {
    const typeText = document.querySelector(".type-text");

    if (!typeText) return;

    const roles = [
      "Web Developer",
      "UI Designer",
      "BSIT Student",
      "PHP Developer",
      "Problem Solver",
    ];

    let roleIndex = 0;
    let charIndex = 0;
    let isDeleting = false;

    function type() {
      const currentRole = roles[roleIndex];

      if (isDeleting) {
        charIndex--;
        typeText.textContent = currentRole.substring(0, charIndex);
      } else {
        charIndex++;
        typeText.textContent = currentRole.substring(0, charIndex);
      }

      let speed = isDeleting ? 45 : 85;

      if (!isDeleting && charIndex === currentRole.length) {
        speed = 1800;
        isDeleting = true;
      }

      if (isDeleting && charIndex === 0) {
        isDeleting = false;
        roleIndex = (roleIndex + 1) % roles.length;
        speed = 400;
      }

      setTimeout(type, speed);
    }

    type();
  }

  /* --------------------------------------------------------------------------
     3. NAVIGATION
     -------------------------------------------------------------------------- */
  const navbar = document.getElementById("navbar");
  const scrollProgress = document.getElementById("scroll-progress");

  window.addEventListener("scroll", () => {
    if (navbar) {
      if (window.scrollY > 50) {
        navbar.classList.add("scrolled");
      } else {
        navbar.classList.remove("scrolled");
      }
    }

    if (scrollProgress) {
      const scrollTop =
        document.documentElement.scrollTop || document.body.scrollTop;

      const scrollHeight =
        document.documentElement.scrollHeight -
        document.documentElement.clientHeight;

      const progress = scrollHeight > 0 ? (scrollTop / scrollHeight) * 100 : 0;

      scrollProgress.style.width = `${progress}%`;
    }
  });

  /* --------------------------------------------------------------------------
     4. MOBILE BURGER MENU
     -------------------------------------------------------------------------- */
  const burger = document.getElementById("burger-menu");
  const navList = document.querySelector(".nav-links");

  if (burger && navList) {
    const closeMobileNav = () => {
      navList.classList.remove("nav-active");
      burger.classList.remove("toggle");

      document.body.style.overflow = "";
    };

    burger.addEventListener("click", () => {
      const isOpen = navList.classList.toggle("nav-active");

      burger.classList.toggle("toggle", isOpen);

      document.body.style.overflow = isOpen ? "hidden" : "";
    });

    navList.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", closeMobileNav);
    });

    window.addEventListener("resize", () => {
      if (window.innerWidth > 768) {
        closeMobileNav();
      }
    });
  }

  /* --------------------------------------------------------------------------
     5. ACTIVE SECTION NAVIGATION
     -------------------------------------------------------------------------- */
  const sections = document.querySelectorAll("section[id]");

  const navLinks = document.querySelectorAll(".nav-links a");

  if ("IntersectionObserver" in window) {
    const sectionObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const id = entry.target.getAttribute("id");

            navLinks.forEach((link) => {
              link.classList.remove("active");

              if (link.getAttribute("href") === `#${id}`) {
                link.classList.add("active");
              }
            });
          }
        });
      },
      {
        threshold: 0.3,
      },
    );

    sections.forEach((section) => {
      sectionObserver.observe(section);
    });
  }

  /* --------------------------------------------------------------------------
     6. THEME TOGGLE
     -------------------------------------------------------------------------- */
  const themeBtn = document.getElementById("theme-btn");

  const html = document.documentElement;

  if (themeBtn) {
    const themeIcon = themeBtn.querySelector("i");

    const savedTheme = localStorage.getItem("theme") || "dark";

    html.setAttribute("data-theme", savedTheme);

    if (themeIcon) {
      themeIcon.className =
        savedTheme === "dark" ? "fas fa-moon" : "fas fa-sun";
    }

    themeBtn.addEventListener("click", () => {
      const currentTheme = html.getAttribute("data-theme");

      const newTheme = currentTheme === "dark" ? "light" : "dark";

      html.setAttribute("data-theme", newTheme);

      localStorage.setItem("theme", newTheme);

      if (themeIcon) {
        themeIcon.className =
          newTheme === "dark" ? "fas fa-moon" : "fas fa-sun";
      }

      showToast(`Switched to ${newTheme.toUpperCase()} theme`);
    });
  }

  /* --------------------------------------------------------------------------
     7. ID CARD 3D EFFECT
     -------------------------------------------------------------------------- */
  const idCard3d = document.getElementById("id-card-3d");

  if (idCard3d && window.matchMedia("(pointer: fine)").matches) {
    window.addEventListener("mousemove", (e) => {
      const rect = idCard3d.getBoundingClientRect();

      const centerX = rect.left + rect.width / 2;

      const centerY = rect.top + rect.height / 2;

      const mouseX = e.clientX - centerX;

      const mouseY = e.clientY - centerY;

      const rotateX = (-mouseY / 20).toFixed(2);

      const rotateY = (mouseX / 20).toFixed(2);

      idCard3d.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    });

    idCard3d.addEventListener("mouseleave", () => {
      idCard3d.style.transform = "rotateX(0deg) rotateY(0deg)";
    });
  }

  /* --------------------------------------------------------------------------
     8. CUSTOM CURSOR
     -------------------------------------------------------------------------- */
  const cursorDot = document.querySelector(".cursor-dot");

  const cursorOutline = document.querySelector(".cursor-outline");

  if (
    cursorDot &&
    cursorOutline &&
    window.matchMedia("(pointer: fine)").matches
  ) {
    window.addEventListener("mousemove", (e) => {
      cursorDot.style.left = `${e.clientX}px`;

      cursorDot.style.top = `${e.clientY}px`;

      cursorOutline.animate(
        {
          left: `${e.clientX}px`,
          top: `${e.clientY}px`,
        },
        {
          duration: 400,
          fill: "forwards",
        },
      );
    });

    const interactiveElements = document.querySelectorAll(
      "a, button, .folder-tab, .skill-card, .project-card, .cert-card",
    );

    interactiveElements.forEach((element) => {
      element.addEventListener("mouseenter", () => {
        cursorOutline.classList.add("cursor-hover");
      });

      element.addEventListener("mouseleave", () => {
        cursorOutline.classList.remove("cursor-hover");
      });
    });
  }

  /* --------------------------------------------------------------------------
     9. HERO PARTICLE CANVAS
     -------------------------------------------------------------------------- */
  const canvas = document.getElementById("hero-canvas");

  if (canvas) {
    const ctx = canvas.getContext("2d");

    let particles = [];

    function resizeCanvas() {
      const parent = canvas.parentElement;

      if (!parent) return;

      canvas.width = parent.offsetWidth;

      canvas.height = parent.offsetHeight;
    }

    resizeCanvas();

    window.addEventListener("resize", resizeCanvas);

    class Particle {
      constructor() {
        this.x = Math.random() * canvas.width;

        this.y = Math.random() * canvas.height;

        this.size = Math.random() * 2 + 1;

        this.speedX = (Math.random() - 0.5) * 0.5;

        this.speedY = (Math.random() - 0.5) * 0.5;

        this.opacity = Math.random() * 0.5 + 0.2;
      }

      update() {
        this.x += this.speedX;
        this.y += this.speedY;

        if (this.x < 0 || this.x > canvas.width) {
          this.speedX *= -1;
        }

        if (this.y < 0 || this.y > canvas.height) {
          this.speedY *= -1;
        }
      }

      draw() {
        ctx.fillStyle = `rgba(0, 242, 254, ${this.opacity})`;

        ctx.beginPath();

        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);

        ctx.fill();
      }
    }

    function initParticles() {
      particles = [];

      const divisor = window.innerWidth <= 768 ? 45 : 25;

      const count = Math.floor(canvas.width / divisor);

      for (let i = 0; i < count; i++) {
        particles.push(new Particle());
      }
    }

    initParticles();

    window.addEventListener("resize", initParticles);

    function animateParticles() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.forEach((particle, index) => {
        particle.update();
        particle.draw();

        const connectionDistance = window.innerWidth <= 768 ? 90 : 120;

        for (let j = index + 1; j < particles.length; j++) {
          const second = particles[j];

          const dx = particle.x - second.x;

          const dy = particle.y - second.y;

          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < connectionDistance) {
            ctx.strokeStyle = `rgba(0, 242, 254, ${
              0.15 * (1 - distance / connectionDistance)
            })`;

            ctx.lineWidth = 0.5;

            ctx.beginPath();

            ctx.moveTo(particle.x, particle.y);

            ctx.lineTo(second.x, second.y);

            ctx.stroke();
          }
        }
      });

      requestAnimationFrame(animateParticles);
    }

    animateParticles();
  }

  /* --------------------------------------------------------------------------
     10. INTERACTIVE FOLDER TABS
     -------------------------------------------------------------------------- */
  const folderTabs = document.querySelectorAll(".folder-tab");

  const tabPanels = document.querySelectorAll(".tab-panel");

  folderTabs.forEach((tab) => {
    tab.addEventListener("click", () => {
      const targetId = tab.getAttribute("data-target");

      folderTabs.forEach((item) => {
        item.classList.remove("active");
      });

      tabPanels.forEach((panel) => {
        panel.classList.remove("active");
      });

      tab.classList.add("active");

      const targetPanel = document.getElementById(targetId);

      if (targetPanel) {
        targetPanel.classList.add("active");
      }
    });
  });

  /* --------------------------------------------------------------------------
     11. SKILL BAR ANIMATION
     -------------------------------------------------------------------------- */
  const skillCards = document.querySelectorAll(".skill-card");

  if ("IntersectionObserver" in window) {
    const skillObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) {
            return;
          }

          const card = entry.target;

          const fill = card.querySelector(".progress-bar-fill");

          const percent = card.querySelector(".skill-percent");

          if (!fill || !percent) {
            return;
          }

          const targetWidth = fill.getAttribute("data-width");

          const targetNumber =
            parseInt(percent.getAttribute("data-target")) || 0;

          fill.style.width = targetWidth;

          let count = 0;

          const duration = 1000;

          const interval = Math.max(10, duration / targetNumber);

          const counter = setInterval(() => {
            count++;

            percent.textContent = `${count}%`;

            if (count >= targetNumber) {
              clearInterval(counter);
            }
          }, interval);

          skillObserver.unobserve(card);
        });
      },
      {
        threshold: 0.4,
      },
    );

    skillCards.forEach((card) => {
      skillObserver.observe(card);
    });
  }

  /* --------------------------------------------------------------------------
     11. PROJECTS
     -------------------------------------------------------------------------- */

  const projectsGrid = document.getElementById("projects-grid");

  const viewAllProjectsBtn = document.getElementById("view-all-projects");

  const projectModal = document.getElementById("project-modal");

  const closeProjectModalBtn = document.getElementById("close-project-modal");

  const projectData = {
    1: {
      title: "eAssist PH",

      badge: "WEB APPLICATION",

      img: "images/eassist-ph.png",

      tags: ["PHP", "MySQL", "HTML", "CSS", "JavaScript"],

      challenge:
        "People often have difficulty finding reliable emergency hotline information and understanding the requirements and procedures for important documents.",

      solution:
        "Developed eAssist PH as a centralized information platform containing Philippine emergency hotlines, document requirements, and step-by-step guides.",
    },

    2: {
      title: "eResponde",

      badge: "WEB APPLICATION",

      img: "images/eresponde.png",

      tags: ["PHP", "MySQL", "HTML", "CSS", "JavaScript"],

      challenge:
        "People need a fast and accessible way to report crimes, fires, and other emergencies when immediate assistance is needed.",

      solution:
        "Developed eResponde as a web-based emergency reporting platform where users can submit reports for crimes, fires, and emergency assistance.",
    },

    3: {
      title: "Sari App",

      badge: "MOBILE APPLICATION",

      img: "images/sari-app.jpg",

      tags: ["Java", "Mobile", "Barcode", "Inventory", "Database"],

      challenge:
        "Sari-sari store owners often manage product prices, inventory, and expiration dates manually.",

      solution:
        "Created a mobile application that scans product barcodes, displays purchase and selling prices, manages inventory, and helps monitor product expiration dates.",
    },

    4: {
      title: "eLibrary",

      badge: "WEB APPLICATION",

      img: "images/elibrary.jpg",

      tags: ["PHP", "MySQL", "HTML", "CSS", "JavaScript"],

      challenge:
        "A library needs an organized digital system for managing books, users, and library records.",

      solution:
        "Developed a digital library management system for organizing library resources and managing common borrowing and record-keeping workflows.",
    },

    5: {
      title: "Wedding Invitation & RSVP Generator",

      badge: "WEB APPLICATION",

      img: "images/wedding-invitation.jpg",

      tags: ["HTML", "CSS", "JavaScript", "RSVP", "Responsive Design"],

      challenge:
        "Event organizers need an easy way to create digital invitations while keeping track of the people they invited and their RSVP responses.",

      solution:
        "Designed a wedding invitation generator that allows creators to build digital invitations and track RSVP responses from invited guests.",
    },

    6: {
      title: "Wabi-Sabi Interface",

      badge: "DESIGN EXPERIMENT",

      img: "images/wabi-sabi.jpg",

      tags: [
        "Figma",
        "UI Design",
        "Visual Experimentation",
        "Interaction Design",
      ],

      challenge:
        "Explore an interface philosophy that intentionally moves away from perfect symmetry and rigid visual structure.",

      solution:
        "Designed an experimental interface inspired by wabi-sabi, using imperfect layouts and creative visual elements to explore alternative interaction patterns.",
    },
  };

  let showingAllProjects = false;

  function renderProjects() {
    if (!projectsGrid) {
      return;
    }

    const allProjects = Object.entries(projectData);

    const visibleProjects = showingAllProjects
      ? allProjects
      : allProjects.slice(0, 3);

    projectsGrid.innerHTML = "";

    visibleProjects.forEach(([id, project]) => {
      const card = document.createElement("article");

      card.className = "project-card";

      card.innerHTML = `

          <div class="project-img-container">

            <img
              src="${project.img}"
              alt="${project.title}"
              class="project-img"
            >


            <div class="project-overlay">

              <div class="project-overlay-content">

                <span class="overlay-tag">
                  ${project.badge}
                </span>


                <p>
                  ${project.challenge}
                </p>


                <button
                  class="project-btn open-modal-btn"
                  data-project="${id}"
                  type="button"
                >

                  View Project

                  <i class="fas fa-arrow-right"></i>

                </button>

              </div>

            </div>

          </div>


          <div class="project-info">

            <div class="project-header-row">

              <h3>
                ${project.title}
              </h3>


              <span class="project-type-badge">

                ${project.badge}

              </span>

            </div>


            <p class="project-summary">

              ${project.solution}

            </p>


            <div class="project-tags">

              ${project.tags.map((tag) => `<span>${tag}</span>`).join("")}

            </div>

          </div>

        `;

      projectsGrid.appendChild(card);
    });

    if (viewAllProjectsBtn) {
      viewAllProjectsBtn.innerHTML = showingAllProjects
        ? `
              Show Featured Projects

              <i class="fas fa-chevron-up"></i>
            `
        : `
              View All Projects

              <i class="fas fa-arrow-right"></i>
            `;
    }
  }

  renderProjects();

  if (viewAllProjectsBtn) {
    viewAllProjectsBtn.addEventListener("click", () => {
      showingAllProjects = !showingAllProjects;

      renderProjects();
    });
  }

  /* --------------------------------------------------------------------------
     PROJECT MODAL
     -------------------------------------------------------------------------- */

  if (projectsGrid && projectModal) {
    projectsGrid.addEventListener("click", (event) => {
      const button = event.target.closest(".open-modal-btn");

      if (!button) {
        return;
      }

      const projectId = button.getAttribute("data-project");

      const project = projectData[projectId];

      if (!project) {
        return;
      }

      const title = document.getElementById("modal-title");

      const badge = document.getElementById("modal-badge");

      const image = document.getElementById("modal-img");

      const challenge = document.getElementById("modal-challenge");

      const solution = document.getElementById("modal-solution");

      const tags = document.getElementById("modal-tags");

      if (title) {
        title.textContent = project.title;
      }

      if (badge) {
        badge.textContent = project.badge;
      }

      if (image) {
        image.src = project.img;

        image.alt = project.title;
      }

      if (challenge) {
        challenge.textContent = project.challenge;
      }

      if (solution) {
        solution.textContent = project.solution;
      }

      if (tags) {
        tags.innerHTML = project.tags
          .map((tag) => `<span>${tag}</span>`)
          .join("");
      }

      projectModal.classList.add("active");

      document.body.style.overflow = "hidden";
    });
  }

  function closeProjectModal() {
    if (!projectModal) {
      return;
    }

    projectModal.classList.remove("active");

    document.body.style.overflow = "";
  }

  if (closeProjectModalBtn) {
    closeProjectModalBtn.addEventListener("click", closeProjectModal);
  }

  if (projectModal) {
    projectModal.addEventListener("click", (event) => {
      if (event.target === projectModal) {
        closeProjectModal();
      }
    });
  }

  /* --------------------------------------------------------------------------
     12. CERTIFICATE FILTER & PREVIEW MODAL LOGIC
     -------------------------------------------------------------------------- */

  const certModal = document.getElementById("cert-modal");

  const closeCertModalBtn = document.getElementById("close-cert-modal");

  const certOkBtn = document.getElementById("cert-modal-ok");

  const certsGrid = document.getElementById("certs-grid");

  const viewAllCertsBtn = document.getElementById("education-cert-btn");

  const certCountBadge = document.getElementById("cert-count-badge");

  const certData = {
    1: {
      title: "Certificate of Participation — From Idea to App",

      category: "professional",

      issuer: "NCBA - ISOOC COUNCIL",

      date: "September 21, 2025",

      id: "CERT_01",

      image: "images/certificates/idea_to_app.png",

      description:
        "FROM IDEA TO APP: DEMYSTIFYING WEB AND DIGITAL MARKETING",
    },

    2: {
      title: "Certificate of Recognition — 1st Place Web-Based Math Quiz Game",

      category: "achievement",

      issuer: "Bestlink College of the Philippines",

      date: "March 25, 2026",

      id: "MATH-QUIZ",

      image: "images/certificates/quiz_cert.png",

      description:
        "Certificate of Recognition for achieving First Place in the Web-Based Math Quiz Game Project with an average of 93.8.",
    },

    3: {
      title: "Certificate of Participation — CHAINQUEST: Blockchain Development Code Camp",

      category: "technical",

      issuer: "Bestlink College of the Philippines — College of Computer Studies",

      date: "July 29, 2025",

      id: "CHAINQUEST-2025",

      image: "images/certificates/chainquest.jpg",

      description: "Certificate of participation in CHAINQUEST: Blockchain Development Code Camp, organized by the College of Computer Studies in partnership with Web3 Bulacan.",
    },

    4: {
      title: "Your Fourth Certificate",

      category: "professional",

      issuer: "[INSERT ISSUING ORGANIZATION]",

      date: "[INSERT DATE]",

      id: "CERT-004",

      image: "images/certificates/certificate-4.jpg",

      description: "Description of your fourth certification.",
    },
  };

  let showingAllCerts = false;

  /* --------------------------------------------------------------------------
     RENDER CERTIFICATES
     -------------------------------------------------------------------------- */

  function renderCertificates() {
    if (!certsGrid) {
      return;
    }

    const allCertificates = Object.entries(certData);

    const visibleCertificates = showingAllCerts
      ? allCertificates
      : allCertificates.slice(0, 3);

    certsGrid.innerHTML = "";

    visibleCertificates.forEach(([id, cert]) => {
      const card = document.createElement("article");

      card.className = "cert-card";

      card.setAttribute("data-category", cert.category);

      card.innerHTML = `

          <div class="cert-header">

            <div class="cert-icon-badge">

              <i class="fas fa-certificate"></i>

            </div>


            <span class="cert-status-tag verified">

              <i class="fas fa-circle-check"></i>

              Credential

            </span>

          </div>


          <div class="cert-body">

            <span class="cert-issuer">

              ${cert.issuer}

            </span>


            <h3 class="cert-title">

              ${cert.title}

            </h3>


            <p class="cert-desc">

              ${cert.description}

            </p>


            <div class="cert-meta">

              <span>

                <i class="fas fa-calendar"></i>

                ${cert.date}

              </span>


              <span>

                <i class="fas fa-fingerprint"></i>

                ${cert.id}

              </span>

            </div>

          </div>


          <div class="cert-footer">

            <button
              class="cert-view-btn"
              data-cert="${id}"
              type="button"
            >

              <i class="fas fa-eye"></i>

              View Certificate

            </button>

          </div>

        `;

      certsGrid.appendChild(card);
    });

    /* ------------------------------------------------------------------------
       UPDATE CERTIFICATE COUNT
       ------------------------------------------------------------------------ */

    if (certCountBadge) {
      certCountBadge.textContent = `${allCertificates.length} ${
        allCertificates.length === 1 ? "CERT" : "CERTS"
      }`;
    }

    /* ------------------------------------------------------------------------
       UPDATE VIEW ALL BUTTON
       ------------------------------------------------------------------------ */

    if (viewAllCertsBtn) {
      viewAllCertsBtn.disabled = false;

      viewAllCertsBtn.classList.remove("is-disabled");

      if (showingAllCerts) {
        viewAllCertsBtn.innerHTML = `

          Show Featured Certifications

          <i class="fas fa-chevron-up"></i>

        `;
      } else {
        viewAllCertsBtn.innerHTML = `

          View All Certifications

          <i class="fas fa-arrow-right"></i>

        `;
      }
    }
  }

  renderCertificates();

  /* --------------------------------------------------------------------------
     VIEW ALL CERTIFICATIONS
     -------------------------------------------------------------------------- */

  if (viewAllCertsBtn) {
    viewAllCertsBtn.addEventListener("click", () => {
      showingAllCerts = !showingAllCerts;

      renderCertificates();
    });
  }

  /* --------------------------------------------------------------------------
     CERTIFICATE FILTER
     -------------------------------------------------------------------------- */

  const certFilterBtns = document.querySelectorAll(".cert-filter-btn");

  certFilterBtns.forEach((button) => {
    button.addEventListener("click", () => {
      const filter = button.getAttribute("data-filter");

      certFilterBtns.forEach((btn) => {
        btn.classList.remove("active");
      });

      button.classList.add("active");

      const certCards = document.querySelectorAll(".cert-card");

      certCards.forEach((card) => {
        const category = card.getAttribute("data-category");

        if (filter === "all" || category === filter) {
          card.style.display = "flex";

          card.style.animation = "fadeIn 0.4s ease forwards";
        } else {
          card.style.display = "none";
        }
      });
    });
  });

  /* --------------------------------------------------------------------------
   CERTIFICATE VIEWER
   -------------------------------------------------------------------------- */

  /*
   * Create the certificate viewer automatically.
   * This means you do NOT need to change the HTML modal.
   */

  let certificateViewer = document.getElementById("certificate-viewer");

  /* --------------------------------------------------------------------------
   CREATE VIEWER
   -------------------------------------------------------------------------- */

  if (!certificateViewer) {
    certificateViewer = document.createElement("div");

    certificateViewer.id = "certificate-viewer";

    certificateViewer.className = "certificate-viewer";

    certificateViewer.innerHTML = `

    <div class="certificate-viewer-backdrop">

      <div class="certificate-viewer-content">

        <button
          type="button"
          class="certificate-viewer-close"
          aria-label="Close certificate"
        >
          <i class="fas fa-times"></i>
        </button>


        <div class="certificate-viewer-header">

          <span class="certificate-viewer-badge">
            CERTIFICATE
          </span>

          <h2
            class="certificate-viewer-title"
            id="certificate-viewer-title"
          >
          </h2>

          <p
            class="certificate-viewer-issuer"
            id="certificate-viewer-issuer"
          >
          </p>

        </div>


        <div class="certificate-viewer-image-wrap">

          <img
            id="certificate-viewer-image"
            class="certificate-viewer-image"
            src=""
            alt="Certificate"
          >

        </div>


        <div class="certificate-viewer-info">

          <div>

            <span>DATE</span>

            <strong
              id="certificate-viewer-date"
            >
            </strong>

          </div>


          <div>

            <span>CREDENTIAL ID</span>

            <strong
              id="certificate-viewer-id"
            >
            </strong>

          </div>

        </div>

      </div>

    </div>

  `;

    document.body.appendChild(certificateViewer);
  }

  /* --------------------------------------------------------------------------
   VIEW CERTIFICATE
   -------------------------------------------------------------------------- */

  if (certsGrid) {
    certsGrid.addEventListener("click", (event) => {
      const button = event.target.closest(".cert-view-btn");

      if (!button) {
        return;
      }

      const certId = button.getAttribute("data-cert");

      const certificate = certData[certId];

      if (!certificate) {
        console.error("Certificate not found:", certId);

        return;
      }

      const title = document.getElementById("certificate-viewer-title");

      const issuer = document.getElementById("certificate-viewer-issuer");

      const image = document.getElementById("certificate-viewer-image");

      const date = document.getElementById("certificate-viewer-date");

      const id = document.getElementById("certificate-viewer-id");

      if (title) {
        title.textContent = certificate.title;
      }

      if (issuer) {
        issuer.textContent = certificate.issuer;
      }

      if (image) {
        image.src = certificate.image;

        image.alt = certificate.title;
      }

      if (date) {
        date.textContent = certificate.date;
      }

      if (id) {
        id.textContent = certificate.id;
      }

      certificateViewer.classList.add("active");

      document.body.style.overflow = "hidden";
    });
  }

  /* --------------------------------------------------------------------------
   CLOSE CERTIFICATE VIEWER
   -------------------------------------------------------------------------- */

  function closeCertificateViewer() {
    if (!certificateViewer) {
      return;
    }

    certificateViewer.classList.remove("active");

    document.body.style.overflow = "";
  }

  const certificateCloseButton = certificateViewer.querySelector(
    ".certificate-viewer-close",
  );

  if (certificateCloseButton) {
    certificateCloseButton.addEventListener("click", closeCertificateViewer);
  }

  const certificateBackdrop = certificateViewer.querySelector(
    ".certificate-viewer-backdrop",
  );

  if (certificateBackdrop) {
    certificateBackdrop.addEventListener("click", (event) => {
      if (event.target === certificateBackdrop) {
        closeCertificateViewer();
      }
    });
  }

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      closeCertificateViewer();
    }
  });

  /* --------------------------------------------------------------------------
     15. TERMINAL
     -------------------------------------------------------------------------- */

  const terminalWindow = document.getElementById("terminal-window");

  const openTerminalBtn = document.getElementById("open-terminal-btn");

  const tMinBtn = document.getElementById("t-min-btn");

  const tCloseBtn = document.getElementById("t-close-btn");

  const tMaxBtn = document.getElementById("t-max-btn");

  const terminalInput = document.getElementById("terminal-input");

  const terminalOutput = document.getElementById("terminal-output");

  if (openTerminalBtn && terminalWindow) {
    openTerminalBtn.addEventListener("click", () => {
      terminalWindow.classList.toggle("minimized");

      if (!terminalWindow.classList.contains("minimized") && terminalInput) {
        terminalInput.focus();
      }
    });
  }

  if (tMinBtn && terminalWindow) {
    tMinBtn.addEventListener("click", () => {
      terminalWindow.classList.toggle("minimized");
    });
  }

  if (tCloseBtn && terminalWindow) {
    tCloseBtn.addEventListener("click", () => {
      terminalWindow.classList.add("minimized");
    });
  }

  if (tMaxBtn && terminalOutput) {
    tMaxBtn.addEventListener("click", () => {
      terminalOutput.innerHTML = `

          <div class="t-line text-cyan">

            Terminal output cleared.

          </div>

        `;
    });
  }

  if (terminalInput && terminalOutput) {
    terminalInput.addEventListener("keydown", (e) => {
      if (e.key !== "Enter") {
        return;
      }

      const command = terminalInput.value.trim().toLowerCase();

      terminalInput.value = "";

      if (!command) {
        return;
      }

      appendTerminalLine(`frances@portfolio:~$ ${command}`, "text-yellow");

      processCommand(command);
    });
  }

  function appendTerminalLine(text, className = "") {
    if (!terminalOutput) {
      return;
    }

    const line = document.createElement("div");

    line.className = `t-line ${className}`;

    line.textContent = text;

    terminalOutput.appendChild(line);

    terminalOutput.scrollTop = terminalOutput.scrollHeight;
  }

  function processCommand(command) {
    switch (command) {
      case "help":
        appendTerminalLine("Available Commands:", "text-cyan");

        appendTerminalLine("about     - Displays Frances biography");

        appendTerminalLine("skills    - Shows technical skills");

        appendTerminalLine("projects  - Lists featured projects");

        appendTerminalLine("experience - Displays work experience");

        appendTerminalLine("education - Displays education");

        appendTerminalLine("certs     - Displays certifications");

        appendTerminalLine("contact   - Displays contact information");

        appendTerminalLine("theme     - Toggles light/dark mode");

        appendTerminalLine("clear     - Clears the terminal");

        appendTerminalLine("whoami    - Shows portfolio identity");

        break;

      case "about":
        appendTerminalLine(
          "Frances Margarett | Web Developer × UI Designer",
          "text-cyan",
        );

        appendTerminalLine(
          "BSIT student at Bestlink College of the Philippines.",
        );

        appendTerminalLine(
          "Focused on practical systems, web development, and UI design.",
        );

        break;

      case "skills":
        appendTerminalLine("Web: PHP, HTML, CSS, JavaScript");

        appendTerminalLine("Database: MySQL, phpMyAdmin");

        appendTerminalLine(
          "Design: Figma, UI Design, Wireframing, Prototyping",
        );

        appendTerminalLine(
          "Tools: VS Code, Git, GitHub, XAMPP, FileZilla, NetBeans, IntelliJ IDEA",
        );

        break;

      case "projects":
        appendTerminalLine("1. eAssist PH");

        appendTerminalLine("2. eResponde");

        appendTerminalLine("3. Sari App");

        appendTerminalLine("4. eLibrary");

        appendTerminalLine("5. Wedding Invitation & RSVP Generator");

        appendTerminalLine("6. Wabi-Sabi Interface");

        break;

      case "experience":
        appendTerminalLine("Constech Asia Corporation", "text-cyan");

        appendTerminalLine("Role: System Developer / Developer");

        appendTerminalLine(
          "Worked with PHP, MySQL, HTML, CSS, JavaScript, phpMyAdmin, XAMPP and FileZilla.",
        );

        break;

      case "education":
        appendTerminalLine(
          "Bachelor of Science in Information Technology",
          "text-cyan",
        );

        appendTerminalLine("Bestlink College of the Philippines");

        appendTerminalLine("Currently pursuing BSIT.");

        break;

      case "certs":
        appendTerminalLine("NC II — Computer Systems Servicing");

        appendTerminalLine("Bookkeeping Certificate");

        appendTerminalLine(
          "NC III Certificate — Previously obtained, currently expired",
        );

        break;

      case "contact":
        appendTerminalLine("Location: Caloocan City, Philippines");

        appendTerminalLine("Email: [YOUR EMAIL]");

        appendTerminalLine("GitHub: [YOUR GITHUB]");

        appendTerminalLine("LinkedIn: [YOUR LINKEDIN]");

        break;

      case "theme":
        if (themeBtn) {
          themeBtn.click();
        }

        appendTerminalLine("Theme toggled.", "text-cyan");

        break;

      case "clear":
        terminalOutput.innerHTML = "";

        break;

      case "whoami":
        appendTerminalLine("Frances Margarett", "text-cyan");

        appendTerminalLine("Web Developer × UI Designer");

        appendTerminalLine("BSIT Student");

        break;

      default:
        appendTerminalLine(
          `Command not recognized: '${command}'. Type 'help' for available commands.`,
          "text-muted",
        );
    }
  }

  /* --------------------------------------------------------------------------
     16. COPY EMAIL
     -------------------------------------------------------------------------- */

  const copyEmailBtn = document.getElementById("copy-email-btn");

  const emailText = document.getElementById("email-text");

  if (copyEmailBtn && emailText) {
    copyEmailBtn.addEventListener("click", async () => {
      const email = emailText.textContent.trim();

      try {
        await navigator.clipboard.writeText(email);

        showToast("Email address copied!");
      } catch (error) {
        showToast(`Email: ${email}`);
      }
    });
  }

  /* --------------------------------------------------------------------------
     17. TOAST NOTIFICATIONS
     -------------------------------------------------------------------------- */

  function showToast(message) {
    const container = document.getElementById("toast-container");

    if (!container) {
      return;
    }

    const toast = document.createElement("div");

    toast.className = "toast";

    toast.innerHTML = `

      <i class="fas fa-check-circle text-cyan"></i>

      ${message}

    `;

    container.appendChild(toast);

    setTimeout(() => {
      toast.style.opacity = "0";

      toast.style.transform = "translateY(20px)";

      setTimeout(() => {
        toast.remove();
      }, 300);
    }, 2800);
  }

  /* --------------------------------------------------------------------------
     18. CONTACT FORM FEEDBACK
     -------------------------------------------------------------------------- */

  const contactForm = document.getElementById("contact-form");

  const formFeedback = document.getElementById("form-feedback");

  if (contactForm) {
    contactForm.addEventListener("submit", () => {
      if (formFeedback) {
        formFeedback.innerHTML = `

            <span class="text-cyan">

              <i class="fas fa-spinner fa-spin"></i>

              Transmitting message...

            </span>

          `;
      }
    });
  }

  /* --------------------------------------------------------------------------
     19. ESC KEY — CLOSE MODALS / MENU
     -------------------------------------------------------------------------- */

  document.addEventListener("keydown", (e) => {
    if (e.key !== "Escape") {
      return;
    }

    if (projectModal && projectModal.classList.contains("active")) {
      projectModal.classList.remove("active");
    }

    if (certModal && certModal.classList.contains("active")) {
      certModal.classList.remove("active");
    }

    if (navList && navList.classList.contains("nav-active")) {
      navList.classList.remove("nav-active");

      if (burger) {
        burger.classList.remove("toggle");
      }
    }

    document.body.style.overflow = "";
  });
});
