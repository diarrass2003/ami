// script.js
// Personnalisation
const destinataires = "Mes Amis et Parents"; // 👉 change ici les destinataires
document.getElementById("name").textContent = destinataires + " 👨‍👩‍👧‍👦❤️";

// Année automatique
document.getElementById("year").textContent = new Date().getFullYear() + 1;

// Contrôle musique
const bgMusic = document.getElementById('bgMusic');
const musicToggle = document.getElementById('musicToggle');

musicToggle.addEventListener('click', () => {
    if (bgMusic.paused) {
        bgMusic.play();
        musicToggle.innerHTML = '<i class="fas fa-volume-up"></i>';
        musicToggle.style.boxShadow = '0 0 20px var(--accent-color)';
    } else {
        bgMusic.pause();
        musicToggle.innerHTML = '<i class="fas fa-volume-mute"></i>';
        musicToggle.style.boxShadow = 'none';
    }
});

// Message spécial
function showMessage() {
    const message = document.getElementById("specialMessage");
    message.classList.remove("hidden");
    message.style.display = "block";
    
    // Effet visuel
    message.style.animation = "none";
    setTimeout(() => {
        message.style.animation = "fadeIn 1s ease-out";
    }, 10);
    
    // Lancer les confettis
    launchConfetti();
}

// Compte à rebours amélioré
function updateCountdown() {
    const newYear = new Date(`January 1, ${new Date().getFullYear() + 1} 00:00:00`);
    const now = new Date();
    const diff = newYear - now;

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((diff / (1000 * 60)) % 60);
    const seconds = Math.floor((diff / 1000) % 60);

    // Animation des nombres
    animateNumber('days', days.toString().padStart(2, '0'));
    animateNumber('hours', hours.toString().padStart(2, '0'));
    animateNumber('minutes', minutes.toString().padStart(2, '0'));
    animateNumber('seconds', seconds.toString().padStart(2, '0'));
    
    // Effet spécial à certaines secondes
    if (seconds === 0) {
        createTimeEffect();
    }
}

function animateNumber(elementId, newValue) {
    const element = document.getElementById(elementId);
    if (element.textContent !== newValue) {
        element.style.transform = 'scale(1.2)';
        element.style.color = '#ff4081';
        setTimeout(() => {
            element.textContent = newValue;
            element.style.transform = 'scale(1)';
            element.style.color = '#ffd700';
        }, 150);
    }
}

function createTimeEffect() {
    const boxes = document.querySelectorAll('.time-box');
    boxes.forEach(box => {
        box.style.boxShadow = '0 0 20px gold';
        setTimeout(() => {
            box.style.boxShadow = 'none';
        }, 1000);
    });
}

setInterval(updateCountdown, 1000);
updateCountdown();

// Feux d'artifice améliorés
const canvas = document.getElementById("fireworks");
const ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const fireworks = [];
const particles = [];

class Firework {
    constructor() {
        this.x = Math.random() * canvas.width;
        this.y = canvas.height;
        this.targetY = Math.random() * canvas.height * 0.5;
        this.speed = 2 + Math.random() * 3;
        this.size = 3;
        this.color = `hsl(${Math.random() * 60 + 20}, 100%, 60%)`;
        this.reached = false;
    }
    
    update() {
        if (!this.reached) {
            this.y -= this.speed;
            if (this.y <= this.targetY) {
                this.reached = true;
                this.explode();
            }
        }
    }
    
    explode() {
        const particleCount = 100 + Math.random() * 100;
        for (let i = 0; i < particleCount; i++) {
            particles.push(new Particle(this.x, this.y, this.color));
        }
    }
    
    draw() {
        if (!this.reached) {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fillStyle = this.color;
            ctx.fill();
        }
    }
}

class Particle {
    constructor(x, y, color) {
        this.x = x;
        this.y = y;
        this.color = color;
        this.size = Math.random() * 3 + 1;
        this.speedX = Math.random() * 6 - 3;
        this.speedY = Math.random() * 6 - 3;
        this.life = 100;
        this.gravity = 0.05;
    }
    
    update() {
        this.x += this.speedX;
        this.y += this.speedY;
        this.speedY += this.gravity;
        this.life--;
        this.size *= 0.97;
    }
    
    draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.globalAlpha = this.life / 100;
        ctx.fill();
        ctx.globalAlpha = 1;
    }
}

function animateFireworks() {
    ctx.fillStyle = 'rgba(10, 10, 42, 0.1)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    // Nouveau feu d'artifice occasionnellement
    if (Math.random() < 0.03) {
        fireworks.push(new Firework());
    }
    
    // Mettre à jour et dessiner les feux d'artifice
    fireworks.forEach((fw, index) => {
        fw.update();
        fw.draw();
        if (fw.reached && particles.length === 0) {
            fireworks.splice(index, 1);
        }
    });
    
    // Mettre à jour et dessiner les particules
    particles.forEach((p, index) => {
        p.update();
        p.draw();
        if (p.life <= 0 || p.size < 0.5) {
            particles.splice(index, 1);
        }
    });
    
    requestAnimationFrame(animateFireworks);
}

// Redimensionner le canvas
window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});

// Démarrer l'animation
animateFireworks();

// Confettis
function launchConfetti() {
    const container = document.getElementById('confetti-container');
    const colors = ['#ff4081', '#536dfe', '#ffd700', '#00e5ff', '#76ff03'];
    
    for (let i = 0; i < 150; i++) {
        const confetti = document.createElement('div');
        confetti.className = 'confetti';
        confetti.style.cssText = `
            position: fixed;
            width: 10px;
            height: 10px;
            background: ${colors[Math.floor(Math.random() * colors.length)]};
            top: -20px;
            left: ${Math.random() * 100}vw;
            border-radius: ${Math.random() > 0.5 ? '50%' : '0'};
            animation: confetti-fall ${2 + Math.random() * 3}s linear forwards;
            z-index: 1000;
        `;
        
        document.styleSheets[0].insertRule(`
            @keyframes confetti-fall-${i} {
                0% {
                    transform: translateY(0) rotate(0deg);
                    opacity: 1;
                }
                100% {
                    transform: translateY(100vh) rotate(${360 + Math.random() * 360}deg);
                    opacity: 0;
                }
            }
        `);
        
        confetti.style.animation = `confetti-fall-${i} ${2 + Math.random() * 3}s linear forwards`;
        container.appendChild(confetti);
        
        // Supprimer après l'animation
        setTimeout(() => {
            confetti.remove();
        }, 5000);
    }
}

// Changer le thème
function changeTheme() {
    const themes = [
        {primary: '#ff4081', secondary: '#536dfe', accent: '#ffd700'},
        {primary: '#00e5ff', secondary: '#2979ff', accent: '#76ff03'},
        {primary: '#ff6f00', secondary: '#d500f9', accent: '#ffea00'},
        {primary: '#1de9b6', secondary: '#304ffe', accent: '#ff9100'}
    ];
    
    const randomTheme = themes[Math.floor(Math.random() * themes.length)];
    
    document.documentElement.style.setProperty('--primary-color', randomTheme.primary);
    document.documentElement.style.setProperty('--secondary-color', randomTheme.secondary);
    document.documentElement.style.setProperty('--accent-color', randomTheme.accent);
    
    // Animation de transition
    document.body.style.transition = 'background 0.5s ease';
    setTimeout(() => {
        document.body.style.transition = '';
    }, 500);
}

// Partager les vœux
function shareWishes() {
    const wishes = `🎆 Bonne Année ${new Date().getFullYear() + 1} ! 🎆\n\nÀ vous ${destinataires} 👨‍👩‍👧‍👦❤️\n\nQue cette nouvelle année nous apporte\n❤️ Amour, 🤍 Paix, 🌟 Réussite et 🏆 Succès\n\n🙏 Que Dieu vous bénisse abondamment !\n🥂 Bonne et Heureuse Année à tous !`;
    
    if (navigator.share) {
        navigator.share({
            title: 'Mes vœux pour la nouvelle année',
            text: wishes,
            url: window.location.href
        });
    } else {
        navigator.clipboard.writeText(wishes).then(() => {
            alert('Vœux copiés dans le presse-papier ! 📋');
        });
    }
}

// Effets au chargement
window.addEventListener('load', () => {
    // Petit délai pour l'effet d'entrée
    setTimeout(() => {
        document.querySelector('.card').style.opacity = '1';
        document.querySelector('.card').style.transform = 'translateY(0)';
    }, 300);
    
    // Lancer quelques confettis initiaux
    setTimeout(launchConfetti, 1000);
});