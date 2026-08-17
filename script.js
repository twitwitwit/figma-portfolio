/* ==========================================================================
   FRANCES MARGARETT PORTFOLIO — INTERACTION LOGIC
   Web Developer × UI Designer
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {

  /* --------------------------------------------------------------------------
     1. PRELOADER
     -------------------------------------------------------------------------- */
  const loaderWrapper = document.getElementById('loader-wrapper');

  if (loaderWrapper) {
    setTimeout(() => {
      loaderWrapper.classList.add('loader-finish');
      initTypingEffect();
    }, 1500);
  } else {
    initTypingEffect();
  }


  /* --------------------------------------------------------------------------
     2. TYPING EFFECT
     -------------------------------------------------------------------------- */
  function initTypingEffect() {
    const typeText = document.querySelector('.type-text');

    if (!typeText) return;

    const roles = [
      'Web Developer',
      'UI Designer',
      'BSIT Student',
      'PHP Developer',
      'Problem Solver'
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
  const navbar = document.getElementById('navbar');
  const scrollProgress = document.getElementById('scroll-progress');

  window.addEventListener('scroll', () => {

    if (navbar) {
      if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
      } else {
        navbar.classList.remove('scrolled');
      }
    }

    if (scrollProgress) {
      const scrollTop =
        document.documentElement.scrollTop || document.body.scrollTop;

      const scrollHeight =
        document.documentElement.scrollHeight -
        document.documentElement.clientHeight;

      const progress =
        scrollHeight > 0
          ? (scrollTop / scrollHeight) * 100
          : 0;

      scrollProgress.style.width = `${progress}%`;
    }
  });


  /* --------------------------------------------------------------------------
     4. MOBILE BURGER MENU
     -------------------------------------------------------------------------- */
  const burger = document.getElementById('burger-menu');
  const navList = document.querySelector('.nav-links');

  if (burger && navList) {

    const closeMobileNav = () => {
      navList.classList.remove('nav-active');
      burger.classList.remove('toggle');

      document.body.style.overflow = '';
    };

    burger.addEventListener('click', () => {

      const isOpen =
        navList.classList.toggle('nav-active');

      burger.classList.toggle('toggle', isOpen);

      document.body.style.overflow =
        isOpen ? 'hidden' : '';
    });

    navList.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', closeMobileNav);
    });

    window.addEventListener('resize', () => {
      if (window.innerWidth > 768) {
        closeMobileNav();
      }
    });
  }


  /* --------------------------------------------------------------------------
     5. ACTIVE SECTION NAVIGATION
     -------------------------------------------------------------------------- */
  const sections =
    document.querySelectorAll('section[id]');

  const navLinks =
    document.querySelectorAll('.nav-links a');

  if ('IntersectionObserver' in window) {

    const sectionObserver =
      new IntersectionObserver((entries) => {

        entries.forEach(entry => {

          if (entry.isIntersecting) {

            const id =
              entry.target.getAttribute('id');

            navLinks.forEach(link => {

              link.classList.remove('active');

              if (
                link.getAttribute('href') === `#${id}`
              ) {
                link.classList.add('active');
              }

            });
          }

        });

      }, {
        threshold: 0.3
      });

    sections.forEach(section => {
      sectionObserver.observe(section);
    });
  }


  /* --------------------------------------------------------------------------
     6. THEME TOGGLE
     -------------------------------------------------------------------------- */
  const themeBtn =
    document.getElementById('theme-btn');

  const html =
    document.documentElement;

  if (themeBtn) {

    const themeIcon =
      themeBtn.querySelector('i');

    const savedTheme =
      localStorage.getItem('theme') || 'dark';

    html.setAttribute(
      'data-theme',
      savedTheme
    );

    if (themeIcon) {
      themeIcon.className =
        savedTheme === 'dark'
          ? 'fas fa-moon'
          : 'fas fa-sun';
    }

    themeBtn.addEventListener('click', () => {

      const currentTheme =
        html.getAttribute('data-theme');

      const newTheme =
        currentTheme === 'dark'
          ? 'light'
          : 'dark';

      html.setAttribute(
        'data-theme',
        newTheme
      );

      localStorage.setItem(
        'theme',
        newTheme
      );

      if (themeIcon) {
        themeIcon.className =
          newTheme === 'dark'
            ? 'fas fa-moon'
            : 'fas fa-sun';
      }

      showToast(
        `Switched to ${newTheme.toUpperCase()} theme`
      );
    });
  }


  /* --------------------------------------------------------------------------
     7. ID CARD 3D EFFECT
     -------------------------------------------------------------------------- */
  const idCard3d =
    document.getElementById('id-card-3d');

  if (
    idCard3d &&
    window.matchMedia('(pointer: fine)').matches
  ) {

    window.addEventListener('mousemove', (e) => {

      const rect =
        idCard3d.getBoundingClientRect();

      const centerX =
        rect.left + rect.width / 2;

      const centerY =
        rect.top + rect.height / 2;

      const mouseX =
        e.clientX - centerX;

      const mouseY =
        e.clientY - centerY;

      const rotateX =
        (-mouseY / 20).toFixed(2);

      const rotateY =
        (mouseX / 20).toFixed(2);

      idCard3d.style.transform =
        `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    });

    idCard3d.addEventListener('mouseleave', () => {

      idCard3d.style.transform =
        'rotateX(0deg) rotateY(0deg)';
    });
  }


  /* --------------------------------------------------------------------------
     8. CUSTOM CURSOR
     -------------------------------------------------------------------------- */
  const cursorDot =
    document.querySelector('.cursor-dot');

  const cursorOutline =
    document.querySelector('.cursor-outline');

  if (
    cursorDot &&
    cursorOutline &&
    window.matchMedia('(pointer: fine)').matches
  ) {

    window.addEventListener('mousemove', (e) => {

      cursorDot.style.left =
        `${e.clientX}px`;

      cursorDot.style.top =
        `${e.clientY}px`;

      cursorOutline.animate(
        {
          left: `${e.clientX}px`,
          top: `${e.clientY}px`
        },
        {
          duration: 400,
          fill: 'forwards'
        }
      );
    });

    const interactiveElements =
      document.querySelectorAll(
        'a, button, .folder-tab, .skill-card, .project-card, .cert-card'
      );

    interactiveElements.forEach(element => {

      element.addEventListener(
        'mouseenter',
        () => {
          cursorOutline.classList.add(
            'cursor-hover'
          );
        }
      );

      element.addEventListener(
        'mouseleave',
        () => {
          cursorOutline.classList.remove(
            'cursor-hover'
          );
        }
      );
    });
  }


  /* --------------------------------------------------------------------------
     9. HERO PARTICLE CANVAS
     -------------------------------------------------------------------------- */
  const canvas =
    document.getElementById('hero-canvas');

  if (canvas) {

    const ctx =
      canvas.getContext('2d');

    let particles = [];

    function resizeCanvas() {

      const parent =
        canvas.parentElement;

      if (!parent) return;

      canvas.width =
        parent.offsetWidth;

      canvas.height =
        parent.offsetHeight;
    }

    resizeCanvas();

    window.addEventListener(
      'resize',
      resizeCanvas
    );


    class Particle {

      constructor() {

        this.x =
          Math.random() * canvas.width;

        this.y =
          Math.random() * canvas.height;

        this.size =
          Math.random() * 2 + 1;

        this.speedX =
          (Math.random() - 0.5) * 0.5;

        this.speedY =
          (Math.random() - 0.5) * 0.5;

        this.opacity =
          Math.random() * 0.5 + 0.2;
      }

      update() {

        this.x += this.speedX;
        this.y += this.speedY;

        if (
          this.x < 0 ||
          this.x > canvas.width
        ) {
          this.speedX *= -1;
        }

        if (
          this.y < 0 ||
          this.y > canvas.height
        ) {
          this.speedY *= -1;
        }
      }

      draw() {

        ctx.fillStyle =
          `rgba(0, 242, 254, ${this.opacity})`;

        ctx.beginPath();

        ctx.arc(
          this.x,
          this.y,
          this.size,
          0,
          Math.PI * 2
        );

        ctx.fill();
      }
    }


    function initParticles() {

      particles = [];

      /*
       * Fewer particles on small screens
       * for better mobile performance.
       */
      const divisor =
        window.innerWidth <= 768
          ? 45
          : 25;

      const count =
        Math.floor(
          canvas.width / divisor
        );

      for (let i = 0; i < count; i++) {
        particles.push(
          new Particle()
        );
      }
    }

    initParticles();

    window.addEventListener(
      'resize',
      initParticles
    );


    function animateParticles() {

      ctx.clearRect(
        0,
        0,
        canvas.width,
        canvas.height
      );

      particles.forEach((particle, index) => {

        particle.update();
        particle.draw();

        /*
         * Reduce connection calculations
         * on mobile devices.
         */
        const connectionDistance =
          window.innerWidth <= 768
            ? 90
            : 120;

        for (
          let j = index + 1;
          j < particles.length;
          j++
        ) {

          const second =
            particles[j];

          const dx =
            particle.x - second.x;

          const dy =
            particle.y - second.y;

          const distance =
            Math.sqrt(
              dx * dx + dy * dy
            );

          if (
            distance <
            connectionDistance
          ) {

            ctx.strokeStyle =
              `rgba(0, 242, 254, ${
                0.15 *
                (1 - distance / connectionDistance)
              })`;

            ctx.lineWidth = 0.5;

            ctx.beginPath();

            ctx.moveTo(
              particle.x,
              particle.y
            );

            ctx.lineTo(
              second.x,
              second.y
            );

            ctx.stroke();
          }
        }
      });

      requestAnimationFrame(
        animateParticles
      );
    }

    animateParticles();
  }


  /* --------------------------------------------------------------------------
     10. INTERACTIVE FOLDER TABS
     -------------------------------------------------------------------------- */
  const folderTabs =
    document.querySelectorAll(
      '.folder-tab'
    );

  const tabPanels =
    document.querySelectorAll(
      '.tab-panel'
    );

  folderTabs.forEach(tab => {

    tab.addEventListener('click', () => {

      const targetId =
        tab.getAttribute(
          'data-target'
        );

      folderTabs.forEach(item => {
        item.classList.remove(
          'active'
        );
      });

      tabPanels.forEach(panel => {
        panel.classList.remove(
          'active'
        );
      });

      tab.classList.add('active');

      const targetPanel =
        document.getElementById(
          targetId
        );

      if (targetPanel) {
        targetPanel.classList.add(
          'active'
        );
      }
    });
  });


  /* --------------------------------------------------------------------------
     11. SKILL BAR ANIMATION
     -------------------------------------------------------------------------- */
  const skillCards =
    document.querySelectorAll(
      '.skill-card'
    );

  if ('IntersectionObserver' in window) {

    const skillObserver =
      new IntersectionObserver(
        (entries) => {

          entries.forEach(entry => {

            if (!entry.isIntersecting) {
              return;
            }

            const card =
              entry.target;

            const fill =
              card.querySelector(
                '.progress-bar-fill'
              );

            const percent =
              card.querySelector(
                '.skill-percent'
              );

            if (!fill || !percent) {
              return;
            }

            const targetWidth =
              fill.getAttribute(
                'data-width'
              );

            const targetNumber =
              parseInt(
                percent.getAttribute(
                  'data-target'
                )
              ) || 0;

            fill.style.width =
              targetWidth;

            let count = 0;

            const duration = 1000;

            const interval =
              Math.max(
                10,
                duration / targetNumber
              );

            const counter =
              setInterval(() => {

                count++;

                percent.textContent =
                  `${count}%`;

                if (
                  count >= targetNumber
                ) {
                  clearInterval(
                    counter
                  );
                }

              }, interval);

            skillObserver.unobserve(
              card
            );
          });

        },
        {
          threshold: 0.4
        }
      );

    skillCards.forEach(card => {
      skillObserver.observe(card);
    });
  }


  /* --------------------------------------------------------------------------
     12. PROJECT MODAL
     -------------------------------------------------------------------------- */
  const projectModal =
    document.getElementById(
      'project-modal'
    );

  const closeModalBtn =
    document.getElementById(
      'close-modal'
    );

  const openModalBtns =
    document.querySelectorAll(
      '.open-modal-btn'
    );


  const projectData = {

    '1': {
      title: 'Inventory / Management System',

      badge: 'REAL CLIENT PROJECT',

      img: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?q=80&w=1000&auto=format&fit=crop',

      tags: [
        'PHP',
        'MySQL',
        'HTML',
        'CSS',
        'JavaScript',
        'CRUD'
      ],

      challenge:
        'The client needed a centralized digital system for managing products and related information while reducing manual management.',

      solution:
        'Developed web-based functionality for product management, categories, subcategories, image uploads, database operations, and administrative workflows.'
    },


    '2': {
      title: 'Coffee Shop POS System',

      badge: 'JAVA APPLICATION',

      img: 'https://images.unsplash.com/photo-1445116572660-236099ec97a0?q=80&w=1000&auto=format&fit=crop',

      tags: [
        'Java',
        'MySQL',
        'GUI',
        'Database'
      ],

      challenge:
        'A coffee shop concept needed a system capable of connecting transactions, product information, user interaction, and database operations.',

      solution:
        'Created a Point-of-Sale concept that combines a graphical user interface with application logic and MySQL database integration.'
    },


    '3': {
      title: 'Math Quiz Website',

      badge: 'WEB PROJECT',

      img: 'https://images.unsplash.com/photo-1509228468518-180dd4864904?q=80&w=1000&auto=format&fit=crop',

      tags: [
        'HTML',
        'CSS',
        'JavaScript',
        'Responsive'
      ],

      challenge:
        'Users needed an engaging and simple way to practice mathematical skills through an interactive web interface.',

      solution:
        'Built a responsive quiz website with interactive questions, user interaction, and JavaScript-based logic.'
    },


    '4': {
      title: 'Personal Portfolio',

      badge: 'UI / UX + WEB',

      img: 'https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?q=80&w=1000&auto=format&fit=crop',

      tags: [
        'Figma',
        'HTML',
        'CSS',
        'JavaScript',
        'Responsive Design'
      ],

      challenge:
        'A traditional résumé does not fully communicate how a developer thinks, designs, and builds digital experiences.',

      solution:
        'Designed an interactive portfolio focused on personal branding, project presentation, responsive design, and visual storytelling.'
    },


    '5': {
      title: 'Interactive Folder Interface',

      badge: 'FIGMA DESIGN EXPERIMENT',

      img: 'https://images.unsplash.com/photo-1558655146-9f40138edfeb?q=80&w=1000&auto=format&fit=crop',

      tags: [
        'Figma',
        'Components',
        'Prototype',
        'Interaction Design'
      ],

      challenge:
        'Explore a more engaging way to organize information and navigation inside a digital interface.',

      solution:
        'Created a folder-based interface concept using Figma components, interactive states, navigation, and micro-interactions.'
    },


    '6': {
      title: 'Wabi-Sabi Interface',

      badge: 'DESIGN EXPERIMENT',

      img: 'https://images.unsplash.com/photo-1494438639946-1ebd1d20bf85?q=80&w=1000&auto=format&fit=crop',

      tags: [
        'Figma',
        'UI Design',
        'Visual Experimentation',
        'Interaction Design'
      ],

      challenge:
        'Explore an interface philosophy that intentionally moves away from perfect symmetry and rigid visual structure.',

      solution:
        'Designed an experimental interface inspired by wabi-sabi, using imperfect layouts and creative visual elements to explore alternative interaction patterns.'
    }
  };


  openModalBtns.forEach(button => {

    button.addEventListener(
      'click',
      () => {

        const projectId =
          button.getAttribute(
            'data-project'
          );

        const data =
          projectData[projectId];

        if (
          !data ||
          !projectModal
        ) {
          return;
        }

        const title =
          document.getElementById(
            'modal-title'
          );

        const badge =
          document.getElementById(
            'modal-badge'
          );

        const image =
          document.getElementById(
            'modal-img'
          );

        const challenge =
          document.getElementById(
            'modal-challenge'
          );

        const solution =
          document.getElementById(
            'modal-solution'
          );

        if (title) {
          title.textContent =
            data.title;
        }

        if (badge) {
          badge.textContent =
            data.badge;
        }

        if (image) {
          image.src =
            data.img;
        }

        if (challenge) {
          challenge.textContent =
            data.challenge;
        }

        if (solution) {
          solution.textContent =
            data.solution;
        }


        const tagsContainer =
          document.getElementById(
            'modal-tags'
          );

        if (tagsContainer) {

          tagsContainer.innerHTML = '';

          data.tags.forEach(tag => {

            const span =
              document.createElement(
                'span'
              );

            span.textContent =
              tag;

            tagsContainer.appendChild(
              span
            );
          });
        }

        projectModal.classList.add(
          'active'
        );

        document.body.style.overflow =
          'hidden';
      }
    );
  });


  if (
    closeModalBtn &&
    projectModal
  ) {

    closeModalBtn.addEventListener(
      'click',
      () => {

        projectModal.classList.remove(
          'active'
        );

        document.body.style.overflow =
          '';
      }
    );


    projectModal.addEventListener(
      'click',
      (e) => {

        if (
          e.target === projectModal
        ) {

          projectModal.classList.remove(
            'active'
          );

          document.body.style.overflow =
            '';
        }
      }
    );
  }


  /* --------------------------------------------------------------------------
     13. CERTIFICATE FILTER
     -------------------------------------------------------------------------- */
  const certFilterBtns =
    document.querySelectorAll(
      '.cert-filter-btn'
    );

  const certCards =
    document.querySelectorAll(
      '.cert-card'
    );

  certFilterBtns.forEach(button => {

    button.addEventListener(
      'click',
      () => {

        const filter =
          button.getAttribute(
            'data-filter'
          );

        certFilterBtns.forEach(btn => {
          btn.classList.remove(
            'active'
          );
        });

        button.classList.add(
          'active'
        );


        certCards.forEach(card => {

          const category =
            card.getAttribute(
              'data-category'
            );

          if (
            filter === 'all' ||
            category === filter
          ) {

            card.style.display =
              'flex';

            card.style.animation =
              'fadeIn 0.4s ease forwards';

          } else {

            card.style.display =
              'none';
          }
        });
      }
    );
  });


  /* --------------------------------------------------------------------------
     14. CERTIFICATE MODAL
     -------------------------------------------------------------------------- */
  const certModal =
    document.getElementById(
      'cert-modal'
    );

  const closeCertModalBtn =
    document.getElementById(
      'close-cert-modal'
    );

  const certOkBtn =
    document.getElementById(
      'cert-modal-ok'
    );

  const certViewBtns =
    document.querySelectorAll(
      '.cert-view-btn'
    );


  const certData = {

    '1': {
      title:
        'NC II — Computer Systems Servicing',

      issuer:
        '[INSERT ISSUING ORGANIZATION]',

      date:
        '[INSERT DATE]',

      id:
        'CSS-NCII'
    },

    '2': {
      title:
        'Bookkeeping Certificate',

      issuer:
        '[INSERT ISSUING ORGANIZATION]',

      date:
        '[INSERT DATE]',

      id:
        'BOOKKEEPING'
    },

    '3': {
      title:
        'NC III Certificate',

      issuer:
        '[INSERT CERTIFICATION DETAILS]',

      date:
        'Previously obtained — currently expired',

      id:
        'NCIII'
    }
  };


  certViewBtns.forEach(button => {

    button.addEventListener(
      'click',
      () => {

        const certId =
          button.getAttribute(
            'data-cert'
          );

        const data =
          certData[certId];

        if (
          !data ||
          !certModal
        ) {
          return;
        }


        const title =
          document.getElementById(
            'cert-modal-title'
          );

        const issuer =
          document.getElementById(
            'cert-modal-issuer'
          );

        const date =
          document.getElementById(
            'cert-modal-date'
          );

        const id =
          document.getElementById(
            'cert-modal-id'
          );


        if (title) {
          title.textContent =
            data.title;
        }

        if (issuer) {
          issuer.textContent =
            data.issuer;
        }

        if (date) {
          date.textContent =
            data.date;
        }

        if (id) {
          id.textContent =
            data.id;
        }


        certModal.classList.add(
          'active'
        );

        document.body.style.overflow =
          'hidden';
      }
    );
  });


  function closeCertificateModal() {

    if (!certModal) return;

    certModal.classList.remove(
      'active'
    );

    document.body.style.overflow =
      '';
  }


  if (closeCertModalBtn) {
    closeCertModalBtn.addEventListener(
      'click',
      closeCertificateModal
    );
  }

  if (certOkBtn) {
    certOkBtn.addEventListener(
      'click',
      closeCertificateModal
    );
  }

  if (certModal) {

    certModal.addEventListener(
      'click',
      (e) => {

        if (
          e.target === certModal
        ) {
          closeCertificateModal();
        }
      }
    );
  }


  /* --------------------------------------------------------------------------
     15. TERMINAL
     -------------------------------------------------------------------------- */
  const terminalWindow =
    document.getElementById(
      'terminal-window'
    );

  const openTerminalBtn =
    document.getElementById(
      'open-terminal-btn'
    );

  const tMinBtn =
    document.getElementById(
      't-min-btn'
    );

  const tCloseBtn =
    document.getElementById(
      't-close-btn'
    );

  const tMaxBtn =
    document.getElementById(
      't-max-btn'
    );

  const terminalInput =
    document.getElementById(
      'terminal-input'
    );

  const terminalOutput =
    document.getElementById(
      'terminal-output'
    );


  if (
    openTerminalBtn &&
    terminalWindow
  ) {

    openTerminalBtn.addEventListener(
      'click',
      () => {

        terminalWindow.classList.toggle(
          'minimized'
        );

        if (
          !terminalWindow.classList.contains(
            'minimized'
          ) &&
          terminalInput
        ) {
          terminalInput.focus();
        }
      }
    );
  }


  if (
    tMinBtn &&
    terminalWindow
  ) {

    tMinBtn.addEventListener(
      'click',
      () => {

        terminalWindow.classList.toggle(
          'minimized'
        );
      }
    );
  }


  if (
    tCloseBtn &&
    terminalWindow
  ) {

    tCloseBtn.addEventListener(
      'click',
      () => {

        terminalWindow.classList.add(
          'minimized'
        );
      }
    );
  }


  if (
    tMaxBtn &&
    terminalOutput
  ) {

    tMaxBtn.addEventListener(
      'click',
      () => {

        terminalOutput.innerHTML =
          `<div class="t-line text-cyan">
             Terminal output cleared.
           </div>`;
      }
    );
  }


  if (
    terminalInput &&
    terminalOutput
  ) {

    terminalInput.addEventListener(
      'keydown',
      (e) => {

        if (e.key !== 'Enter') {
          return;
        }

        const command =
          terminalInput.value
            .trim()
            .toLowerCase();

        terminalInput.value = '';

        if (!command) {
          return;
        }

        appendTerminalLine(
          `frances@portfolio:~$ ${command}`,
          'text-yellow'
        );

        processCommand(command);
      }
    );
  }


  function appendTerminalLine(
    text,
    className = ''
  ) {

    if (!terminalOutput) {
      return;
    }

    const line =
      document.createElement(
        'div'
      );

    line.className =
      `t-line ${className}`;

    line.textContent =
      text;

    terminalOutput.appendChild(
      line
    );

    terminalOutput.scrollTop =
      terminalOutput.scrollHeight;
  }


  function processCommand(command) {

    switch (command) {

      case 'help':

        appendTerminalLine(
          'Available Commands:',
          'text-cyan'
        );

        appendTerminalLine(
          'about     - Displays Frances biography'
        );

        appendTerminalLine(
          'skills    - Shows technical skills'
        );

        appendTerminalLine(
          'projects  - Lists featured projects'
        );

        appendTerminalLine(
          'experience - Displays work experience'
        );

        appendTerminalLine(
          'education - Displays education'
        );

        appendTerminalLine(
          'certs     - Displays certifications'
        );

        appendTerminalLine(
          'contact   - Displays contact information'
        );

        appendTerminalLine(
          'theme     - Toggles light/dark mode'
        );

        appendTerminalLine(
          'clear     - Clears the terminal'
        );

        appendTerminalLine(
          'whoami    - Shows portfolio identity'
        );

        break;


      case 'about':

        appendTerminalLine(
          'Frances Margarett | Web Developer × UI Designer',
          'text-cyan'
        );

        appendTerminalLine(
          'BSIT student at Bestlink College of the Philippines.'
        );

        appendTerminalLine(
          'Focused on practical systems, web development, and UI design.'
        );

        break;


      case 'skills':

        appendTerminalLine(
          'Web: PHP, HTML, CSS, JavaScript'
        );

        appendTerminalLine(
          'Database: MySQL, phpMyAdmin'
        );

        appendTerminalLine(
          'Design: Figma, UI Design, Wireframing, Prototyping'
        );

        appendTerminalLine(
          'Tools: VS Code, Git, GitHub, XAMPP, FileZilla, NetBeans, IntelliJ IDEA'
        );

        break;


      case 'projects':

        appendTerminalLine(
          '1. Inventory / Management System'
        );

        appendTerminalLine(
          '2. Coffee Shop POS System'
        );

        appendTerminalLine(
          '3. Math Quiz Website'
        );

        appendTerminalLine(
          '4. Personal Portfolio'
        );

        appendTerminalLine(
          '5. Interactive Folder Interface'
        );

        appendTerminalLine(
          '6. Wabi-Sabi Interface'
        );

        break;


      case 'experience':

        appendTerminalLine(
          'Constech Asia Corporation',
          'text-cyan'
        );

        appendTerminalLine(
          'Role: System Developer / Developer'
        );

        appendTerminalLine(
          'Worked with PHP, MySQL, HTML, CSS, JavaScript, phpMyAdmin, XAMPP and FileZilla.'
        );

        break;


      case 'education':

        appendTerminalLine(
          'Bachelor of Science in Information Technology',
          'text-cyan'
        );

        appendTerminalLine(
          'Bestlink College of the Philippines'
        );

        appendTerminalLine(
          'Currently pursuing BSIT.'
        );

        break;


      case 'certs':

        appendTerminalLine(
          'NC II — Computer Systems Servicing'
        );

        appendTerminalLine(
          'Bookkeeping Certificate'
        );

        appendTerminalLine(
          'NC III Certificate — Previously obtained, currently expired'
        );

        break;


      case 'contact':

        appendTerminalLine(
          'Location: Caloocan City, Philippines'
        );

        appendTerminalLine(
          'Email: [YOUR EMAIL]'
        );

        appendTerminalLine(
          'GitHub: [YOUR GITHUB]'
        );

        appendTerminalLine(
          'LinkedIn: [YOUR LINKEDIN]'
        );

        break;


      case 'theme':

        if (themeBtn) {
          themeBtn.click();
        }

        appendTerminalLine(
          'Theme toggled.',
          'text-cyan'
        );

        break;


      case 'clear':

        terminalOutput.innerHTML =
          '';

        break;


      case 'whoami':

        appendTerminalLine(
          'Frances Margarett',
          'text-cyan'
        );

        appendTerminalLine(
          'Web Developer × UI Designer'
        );

        appendTerminalLine(
          'BSIT Student'
        );

        break;


      default:

        appendTerminalLine(
          `Command not recognized: '${command}'. Type 'help' for available commands.`,
          'text-muted'
        );
    }
  }


  /* --------------------------------------------------------------------------
     16. COPY EMAIL
     -------------------------------------------------------------------------- */
  const copyEmailBtn =
    document.getElementById(
      'copy-email-btn'
    );

  const emailText =
    document.getElementById(
      'email-text'
    );


  if (
    copyEmailBtn &&
    emailText
  ) {

    copyEmailBtn.addEventListener(
      'click',
      async () => {

        const email =
          emailText.textContent.trim();

        try {

          await navigator.clipboard.writeText(
            email
          );

          showToast(
            'Email address copied!'
          );

        } catch (error) {

          showToast(
            `Email: ${email}`
          );
        }
      }
    );
  }


  /* --------------------------------------------------------------------------
     17. TOAST NOTIFICATIONS
     -------------------------------------------------------------------------- */
  function showToast(message) {

    const container =
      document.getElementById(
        'toast-container'
      );

    if (!container) {
      return;
    }

    const toast =
      document.createElement(
        'div'
      );

    toast.className =
      'toast';

    toast.innerHTML =
      `<i class="fas fa-check-circle text-cyan"></i> ${message}`;

    container.appendChild(
      toast
    );

    setTimeout(() => {

      toast.style.opacity =
        '0';

      toast.style.transform =
        'translateY(20px)';

      setTimeout(() => {

        toast.remove();

      }, 300);

    }, 2800);
  }


  /* --------------------------------------------------------------------------
     18. CONTACT FORM FEEDBACK
     -------------------------------------------------------------------------- */
  const contactForm =
    document.getElementById(
      'contact-form'
    );

  const formFeedback =
    document.getElementById(
      'form-feedback'
    );


  if (contactForm) {

    contactForm.addEventListener(
      'submit',
      () => {

        if (formFeedback) {

          formFeedback.innerHTML =
            `<span class="text-cyan">
              <i class="fas fa-spinner fa-spin"></i>
              Transmitting message...
            </span>`;
        }
      }
    );
  }


  /* --------------------------------------------------------------------------
     19. ESC KEY — CLOSE MODALS / MENU
     -------------------------------------------------------------------------- */
  document.addEventListener(
    'keydown',
    (e) => {

      if (e.key !== 'Escape') {
        return;
      }

      if (
        projectModal &&
        projectModal.classList.contains(
          'active'
        )
      ) {

        projectModal.classList.remove(
          'active'
        );
      }

      if (
        certModal &&
        certModal.classList.contains(
          'active'
        )
      ) {

        certModal.classList.remove(
          'active'
        );
      }

      if (
        navList &&
        navList.classList.contains(
          'nav-active'
        )
      ) {

        navList.classList.remove(
          'nav-active'
        );

        if (burger) {
          burger.classList.remove(
            'toggle'
          );
        }
      }

      document.body.style.overflow =
        '';
    }
  );

});