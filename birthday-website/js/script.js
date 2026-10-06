// Countdown Timer for Home Page
const countdownEl = document.getElementById('countdown-timer');
if (countdownEl) {
    // Set birthday to tomorrow for demonstration
    const birthday = new Date();
    birthday.setDate(birthday.getDate() + 1);
    
    function updateCountdown() {
        const now = new Date();
        const diff = birthday - now;
        
        if (diff <= 0) {
            countdownEl.innerHTML = "It's your birthday! 🎉";
            return;
        }
        
        const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((diff % (1000 * 60)) / 1000);
        
        countdownEl.innerHTML = `${hours}h ${minutes}m ${seconds}s`;
    }
    
    setInterval(updateCountdown, 1000);
    updateCountdown();
}

// Gallery Upload Feature
const imageUpload = document.getElementById('image-upload');
const galleryGrid = document.getElementById('gallery-grid');

if (imageUpload && galleryGrid) {
    // Load saved images
    const savedImages = JSON.parse(localStorage.getItem('birthdayGallery')) || [];
    savedImages.forEach(src => addImageToGrid(src));

    imageUpload.addEventListener('change', function(e) {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function(event) {
                const src = event.target.result;
                addImageToGrid(src);
                
                // Save to localStorage
                savedImages.push(src);
                localStorage.setItem('birthdayGallery', JSON.stringify(savedImages));
            };
            reader.readAsDataURL(file);
        }
    });

    function addImageToGrid(src) {
        const img = document.createElement('img');
        img.src = src;
        galleryGrid.appendChild(img);
    }
}

// Messages Wall Feature
const messageForm = document.getElementById('message-form');
const messageInput = document.getElementById('message-input');
const messageWall = document.getElementById('message-wall');

if (messageForm && messageWall) {
    // Load saved messages
    const savedMessages = JSON.parse(localStorage.getItem('birthdayMessages')) || [];
    savedMessages.forEach(msg => addMessageToWall(msg));

    messageForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const msg = messageInput.value.trim();
        if (msg) {
            addMessageToWall(msg);
            
            // Save to localStorage
            savedMessages.push(msg);
            localStorage.setItem('birthdayMessages', JSON.stringify(savedMessages));
            
            messageInput.value = '';
        }
    });

    function addMessageToWall(msg) {
        const note = document.createElement('div');
        note.className = 'sticky-note fade-in';
        note.textContent = msg;
        messageWall.appendChild(note);
    }
}

// Quiz Logic
const quizContainer = document.getElementById('quiz-area');
if (quizContainer) {
    const questions = [
        { q: "What is her favorite color?", options: ["Pink", "Blue", "Black", "Yellow"], answer: 0 },
        { q: "What is her favorite food?", options: ["Pizza", "Pasta", "Sushi", "Burger"], answer: 1 },
        { q: "Which movie does she love the most?", options: ["Titanic", "Inception", "The Notebook", "Avatar"], answer: 2 }
    ];
    
    let currentQ = 0;
    let score = 0;
    
    function loadQuestion() {
        if (currentQ >= questions.length) {
            quizContainer.innerHTML = `<h3>Quiz Completed!</h3><p>Your score: ${score}/${questions.length}</p>`;
            return;
        }
        
        const q = questions[currentQ];
        let html = `<div class="question"><h4>${currentQ + 1}. ${q.q}</h4><div class="options">`;
        q.options.forEach((opt, i) => {
            html += `<button onclick="checkAnswer(${i})">${opt}</button>`;
        });
        html += `</div></div>`;
        quizContainer.innerHTML = html;
    }
    
    window.checkAnswer = function(index) {
        if (index === questions[currentQ].answer) {
            score++;
        }
        currentQ++;
        loadQuestion();
    };
    
    loadQuestion();
}

// Surprise Confetti and Cake
const cake = document.getElementById('birthday-cake');
if (cake) {
    cake.addEventListener('click', function() {
        this.innerHTML = "🎂"; // blown out candles
        startConfetti();
        const msg = document.createElement('h2');
        msg.textContent = "YAY! Happy Birthday!";
        msg.className = "fade-in";
        msg.style.marginTop = "20px";
        this.parentNode.appendChild(msg);
    });
}

// Simple Confetti Animation
function startConfetti() {
    const canvas = document.getElementById('confetti');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    
    const particles = [];
    for(let i=0; i<100; i++) {
        particles.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height - canvas.height,
            r: Math.random() * 6 + 2,
            d: Math.random() * 10 + 2,
            color: `hsl(${Math.random() * 360}, 100%, 50%)`,
            tilt: Math.floor(Math.random() * 10) - 10,
            tiltAngle: 0,
            tiltAngleInc: (Math.random() * 0.07) + 0.05
        });
    }
    
    function draw() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        for(let i=0; i<particles.length; i++) {
            let p = particles[i];
            ctx.beginPath();
            ctx.lineWidth = p.r;
            ctx.strokeStyle = p.color;
            ctx.moveTo(p.x + p.tilt + p.r, p.y);
            ctx.lineTo(p.x + p.tilt, p.y + p.tilt + p.r);
            ctx.stroke();
        }
        update();
        requestAnimationFrame(draw);
    }
    
    function update() {
        for(let i=0; i<particles.length; i++) {
            let p = particles[i];
            p.tiltAngle += p.tiltAngleInc;
            p.y += (Math.cos(p.tiltAngle) + p.d + p.r / 2) / 2;
            p.tilt = Math.sin(p.tiltAngle) * 15;
            
            if (p.y > canvas.height) {
                p.x = Math.random() * canvas.width;
                p.y = -10;
            }
        }
    }
    
    draw();
}
