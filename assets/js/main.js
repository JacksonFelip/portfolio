let scene, camera, renderer, particles;

function initBackground() {
    const canvas = document.getElementById('bg-canvas');
            scene = new THREE.Scene();
            camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
            renderer = new THREE.WebGLRenderer({ canvas: canvas, alpha: true });
            renderer.setSize(window.innerWidth, window.innerHeight);
            
            // Create particles
            const geometry = new THREE.BufferGeometry();
            const positions = [];
            const colors = [];
            
            for (let i = 0; i < 1000; i++) {
                positions.push((Math.random() - 0.5) * 2000);
                positions.push((Math.random() - 0.5) * 2000);
                positions.push((Math.random() - 0.5) * 2000);
                
                colors.push(Math.random());
                colors.push(Math.random() * 0.5 + 0.5);
                colors.push(1);
            }
            
            geometry.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
            geometry.setAttribute('color', new THREE.Float32BufferAttribute(colors, 3));
            
            const material = new THREE.PointsMaterial({
                size: 3,
                vertexColors: true,
                transparent: true,
                opacity: 0.8
            });
            
            particles = new THREE.Points(geometry, material);
            scene.add(particles);
            
            camera.position.z = 1000;
            
            animate();
        }
        
        function animate() {
            requestAnimationFrame(animate);
            
            particles.rotation.x += 0.0005;
            particles.rotation.y += 0.001;
            
            renderer.render(scene, camera);
        }
        
        // Navbar scroll effect
        window.addEventListener('scroll', () => {
            const navbar = document.getElementById('navbar');
            if (window.scrollY > 100) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        });
        
        // Smooth scrolling
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });
        
        // Scroll animations
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                }
            });
        }, observerOptions);
        
        document.querySelectorAll('.fade-in').forEach(el => {
            observer.observe(el);
        });
        
        // Skill bars animation
        const skillObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const progressBars = entry.target.querySelectorAll('.skill-progress');
                    progressBars.forEach(bar => {
                        const width = bar.style.width;
                        bar.style.width = '0%';
                        setTimeout(() => {
                            bar.style.width = width;
                        }, 200);
                    });
                }
            });
        }, observerOptions);
        
        document.querySelectorAll('.skill-category').forEach(el => {
            skillObserver.observe(el);
        });
        
        // Form submission
        document.getElementById('contactForm').addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Simulate form submission
            const button = this.querySelector('button[type="submit"]');
            const originalText = button.innerHTML;
            
            button.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Enviando...';
            button.disabled = true;
            
            setTimeout(() => {
                button.innerHTML = '<i class="fas fa-check"></i> Mensagem Enviada!';
                button.style.background = 'linear-gradient(135deg, #10b981 0%, #059669 100%)';
                
                setTimeout(() => {
                    button.innerHTML = originalText;
                    button.disabled = false;
                    button.style.background = '';
                    this.reset();
                }, 3000);
            }, 2000);
        });
        
        function sendMail(event) {
            event.preventDefault();
            
            const btn = document.querySelector('button[type="submit"]');
            const originalText = btn.innerHTML;
            btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Enviando...';
            btn.disabled = true;

            const templateParams = {
                from_name: document.getElementById('name').value,
                from_email: document.getElementById('email').value,
                message: document.getElementById('message').value
            };

            emailjs.send('service_4d7lkpb', 'template_3qbya0v', templateParams)
                .then(function(response) {
                    showFeedback('success', 'Mensagem enviada com sucesso! Retornarei em breve.');
                    document.getElementById('contact-form').reset();
                }, function(error) {
                    showFeedback('error', 'Erro ao enviar mensagem. Por favor, tente novamente.');
                })
                .finally(() => {
                    btn.innerHTML = originalText;
                    btn.disabled = false;
                });

            return false;
        }

        function showFeedback(type, message) {
            const feedback = document.createElement('div');
            feedback.className = `form-${type}`;
            feedback.textContent = message;
            
            const form = document.getElementById('contact-form');
            const existingFeedback = form.querySelector('.form-success, .form-error');
            if (existingFeedback) {
                existingFeedback.remove();
            }
            
            form.appendChild(feedback);
            feedback.style.display = 'block';
            
            setTimeout(() => {
                feedback.style.opacity = '0';
                setTimeout(() => feedback.remove(), 300);
            }, 5000);
        }
        
        // Typing effect for hero title
        function typeWriter(element, text, speed = 100) {
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
        
        // Initialize everything when page loads
        window.addEventListener('load', () => {
            initBackground();
            
            // Add typing effect to hero title
            setTimeout(() => {
                const heroTitle = document.querySelector('.hero-title');
                const originalText = heroTitle.textContent;
                typeWriter(heroTitle, originalText, 150);
            }, 500);
        });
        
        // Resize handler
        window.addEventListener('resize', () => {
            if (camera && renderer) {
                camera.aspect = window.innerWidth / window.innerHeight;
                camera.updateProjectionMatrix();
                renderer.setSize(window.innerWidth, window.innerHeight);
            }
        });
        
        // Project cards hover effect
        document.querySelectorAll('.project-card').forEach(card => {
            card.addEventListener('mouseenter', function() {
                this.style.transform = 'translateY(-10px) scale(1.02)';
            });
            
            card.addEventListener('mouseleave', function() {
                this.style.transform = 'translateY(0) scale(1)';
            });
        });
        
        // Add parallax effect to floating elements
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            const parallaxElements = document.querySelectorAll('.floating-element');
            
            parallaxElements.forEach((element, index) => {
                const speed = 0.5 + (index * 0.1);
                const yPos = -(scrolled * speed);
                element.style.transform = `translateY(${yPos}px)`;
            });
        });
        
        // Add glitch effect to hero title on hover
        document.querySelector('.hero-title').addEventListener('mouseenter', function() {
            this.style.animation = 'none';
            this.style.textShadow = '2px 0 #ff0000, -2px 0 #00ffff';
            
            setTimeout(() => {
                this.style.textShadow = '';
            }, 200);
        });
        
        // Console easter egg
        console.log(`
        ╔══════════════════════════════════════╗
        ║                                      ║
        ║         Jackson Oliveira             ║
        ║   Desenvolvedor e Analista de Dados  ║
        ║                                      ║
        ║  Obrigado por visitar meu portfólio! ║
        ║                                      ║
        ╚══════════════════════════════════════╝
        
        🚀 Interessado em trabalhar juntos?
        📧 Entre em contato: cmte.jackson@hotmail.com
        💼 GitHub: github.com/JacksonFelip
    `);