document.addEventListener("DOMContentLoaded", function() {
    const container = document.querySelector('.container');
    const startContainer = document.getElementById('startContainer');
    const startButton = document.getElementById('startButton');
    const videoContainer = document.getElementById('videoContainer');
    const hbdContainer = document.getElementById('hbdContainer');
    const cakeContainer = document.getElementById('cakeContainer');
    const wishContainer = document.getElementById('wishContainer');
    const restartContainer = document.getElementById('restartContainer');
    const restartButton = document.getElementById('restartButton');
    const wishElement = document.getElementById('wish');
    const video = document.getElementById('birthdayVideo');
    const audio = document.getElementById('birthdaySong');
    const wishes = [
        "Semoga bahagia selalu yaaaaa",
        "Suksess,, sehat sehat terus cantikk",
        "Semoga semua mimpi bisa kegapaii, aaminnn",
        "Lebih baik dan lebih lebih kedepannya",
        "Lakuin sesukamu,, ini lagi hari kamu",
        "I LOVE YOU"
    ];

    let wishIndex = 0;
    let clickCount = 0;

    function showWish() {
        if (wishIndex < wishes.length) {
            wishElement.textContent = wishes[wishIndex];
            wishIndex++;
            setTimeout(showWish, 3000);  // Adjust the duration each wish is shown (in milliseconds)
        } else {
            wishElement.textContent = "";
            restartContainer.style.display = "block";  // Show restart button after wishes
        }
    }

    function startAnimation() {
        startContainer.style.display = "none";
        videoContainer.style.display = "block";
        video.play();
    }

    function createConfetti() {
        const numConfetti = 100;

        for (let i = 0; i < numConfetti; i++) {
            const confetti = document.createElement('div');
            confetti.classList.add('confetti');
            confetti.style.left = Math.random() * 100 + 'vw';
            confetti.style.backgroundColor = getRandomColor();
            confetti.style.animationDelay = Math.random() * 5 + 's';
            container.appendChild(confetti);
        }
    }

    function getRandomColor() {
        const colors = ['#ff0000', '#ff8c00', '#ffd700', '#00ff00', '#00ced1', '#1e90ff', '#ff69b4', '#8a2be2'];
        return colors[Math.floor(Math.random() * colors.length)];
    }

    function moveButton(button) {
        const containerWidth = startContainer.offsetWidth;
        const containerHeight = startContainer.offsetHeight;
        const newX = Math.random() * (containerWidth - button.offsetWidth);
        const newY = Math.random() * (containerHeight - button.offsetHeight);
        button.style.transform = `translate(${newX}px, ${newY}px)`;
    }

    startButton.addEventListener('click', function() {
        clickCount++;
        if (clickCount < 4) {
            moveButton(startButton);
        } else {
            startAnimation();
        }
    });

    video.addEventListener('ended', function() {
        videoContainer.style.display = "none";
        hbdContainer.style.display = "block";
        audio.play(); 
        setTimeout(() => {
            hbdContainer.style.display = "none";
            cakeContainer.style.display = "block";
            setTimeout(() => {
                cakeContainer.style.display = "none";
                createConfetti();  // Create confetti when the cake animation ends
                wishContainer.style.display = "block";
                showWish();
            }, 3000);  // Show cake for 3 seconds
        }, 3000);  // Show "Happy Birthday" for 3 seconds
    });

    restartButton.addEventListener('click', function() {
        restartContainer.style.display = "none";
        wishContainer.style.display = "none";
        wishIndex = 0;  // Reset wish index
        container.querySelectorAll('.confetti').forEach(confetti => confetti.remove());  // Remove confetti
        startContainer.style.display = "block";
        clickCount = 0;
        moveButton(startButton);  // Move the button to a new position
    });
});
