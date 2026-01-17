// Shared JavaScript functions for the gaming website

// Utility function to create a glowing effect on elements
function addGlowEffect(element, color) {
    element.style.boxShadow = `0 0 10px ${color}, 0 0 20px ${color}, 0 0 30px ${color}`;
}

// Utility function to remove glow effect
function removeGlowEffect(element) {
    element.style.boxShadow = '';
}

// Create a retro terminal style text effect
function typewriterEffect(element, text, speed = 50) {
    let i = 0;
    element.textContent = '';
    
    function type() {
        if (i < text.length) {
            element.textContent += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    
    type();
}

// Create a cyberpunk style notification
function showNotification(message, type = 'info') {
    // Remove existing notification
    const existingNotification = document.querySelector('.cyber-notification');
    if (existingNotification) {
        existingNotification.remove();
    }
    
    // Create new notification
    const notification = document.createElement('div');
    notification.className = `cyber-notification cyber-notification-${type}`;
    
    // Set notification styles
    notification.style.position = 'fixed';
    notification.style.top = '20px';
    notification.style.right = '20px';
    notification.style.padding = '15px 20px';
    notification.style.borderRadius = '8px';
    notification.style.fontFamily = 'Orbitron, sans-serif';
    notification.style.fontWeight = 'bold';
    notification.style.letterSpacing = '1px';
    notification.style.zIndex = '10000';
    notification.style.maxWidth = '300px';
    notification.style.transform = 'translateX(120%)';
    notification.style.transition = 'transform 0.5s ease';
    
    // Set colors based on type
    let bgColor, textColor, borderColor;
    switch(type) {
        case 'success':
            bgColor = 'rgba(0, 255, 157, 0.1)';
            textColor = '#00ff9d';
            borderColor = '#00ff9d';
            break;
        case 'error':
            bgColor = 'rgba(255, 0, 128, 0.1)';
            textColor = '#ff0080';
            borderColor = '#ff0080';
            break;
        case 'warning':
            bgColor = 'rgba(255, 215, 0, 0.1)';
            textColor = '#ffd700';
            borderColor = '#ffd700';
            break;
        default: // info
            bgColor = 'rgba(15, 240, 252, 0.1)';
            textColor = '#0ff0fc';
            borderColor = '#0ff0fc';
    }
    
    notification.style.backgroundColor = bgColor;
    notification.style.color = textColor;
    notification.style.border = `2px solid ${borderColor}`;
    notification.style.boxShadow = `0 0 15px ${borderColor}`;
    
    notification.textContent = message;
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 10);
    
    // Animate out after 3 seconds
    setTimeout(() => {
        notification.style.transform = 'translateX(120%)';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.remove();
            }
        }, 500);
    }, 3000);
}

// Create a back button for game pages
function createBackButton() {
    const backButton = document.createElement('button');
    backButton.className = 'cyber-button cyber-button-secondary back-button';
    backButton.innerHTML = `
        <span class="button-content">
            <i class="fas fa-arrow-left button-icon"></i>
            <span class="button-text">BACK TO MENU</span>
        </span>
        <span class="button-glow"></span>
    `;
    
    backButton.addEventListener('click', function() {
        this.classList.add('clicked');
        setTimeout(() => {
            window.location.href = 'game-menu.html';
        }, 300);
    });
    
    // Add hover effects
    backButton.addEventListener('mouseenter', function() {
        this.classList.add('hover');
    });
    
    backButton.addEventListener('mouseleave', function() {
        this.classList.remove('hover');
    });
    
    return backButton;
}

// Create a score display element
function createScoreDisplay(player1Name = "PLAYER 1", player2Name = "PLAYER 2") {
    const scoreContainer = document.createElement('div');
    scoreContainer.className = 'score-container';
    
    // Styles for score container
    scoreContainer.style.display = 'flex';
    scoreContainer.style.justifyContent = 'space-between';
    scoreContainer.style.alignItems = 'center';
    scoreContainer.style.padding = '15px 25px';
    scoreContainer.style.backgroundColor = 'rgba(17, 17, 34, 0.8)';
    scoreContainer.style.borderRadius = '15px';
    scoreContainer.style.border = '2px solid rgba(15, 240, 252, 0.3)';
    scoreContainer.style.boxShadow = '0 0 20px rgba(15, 240, 252, 0.2)';
    scoreContainer.style.marginBottom = '20px';
    scoreContainer.style.fontFamily = 'Orbitron, sans-serif';
    
    // Create player 1 score
    const player1Score = document.createElement('div');
    player1Score.className = 'player-score player-1';
    player1Score.innerHTML = `
        <div class="player-name" style="color: #0ff0fc; font-size: 1.1rem; letter-spacing: 1px; margin-bottom: 5px;">${player1Name}</div>
        <div class="player-score-value" style="font-size: 2rem; font-weight: bold; color: #ffffff;">0</div>
    `;
    
    // Create vs separator
    const vsSeparator = document.createElement('div');
    vsSeparator.className = 'vs-separator';
    vsSeparator.innerHTML = `
        <div style="color: #ff00ff; font-size: 1.5rem; font-weight: bold; text-shadow: 0 0 10px #ff00ff;">VS</div>
    `;
    
    // Create player 2 score
    const player2Score = document.createElement('div');
    player2Score.className = 'player-score player-2';
    player2Score.innerHTML = `
        <div class="player-name" style="color: #ff00ff; font-size: 1.1rem; letter-spacing: 1px; margin-bottom: 5px;">${player2Name}</div>
        <div class="player-score-value" style="font-size: 2rem; font-weight: bold; color: #ffffff;">0</div>
    `;
    
    // Append elements
    scoreContainer.appendChild(player1Score);
    scoreContainer.appendChild(vsSeparator);
    scoreContainer.appendChild(player2Score);
    
    return scoreContainer;
}

// Initialize a game page with common elements
function initializeGamePage(gameTitle) {
    // Set page title
    document.title = `${gameTitle} | R4H1 GAMING ZONE`;
    
    // Create back button container
    const backButtonContainer = document.createElement('div');
    backButtonContainer.style.position = 'absolute';
    backButtonContainer.style.top = '20px';
    backButtonContainer.style.left = '20px';
    backButtonContainer.style.zIndex = '100';
    
    const backButton = createBackButton();
    backButtonContainer.appendChild(backButton);
    
    // Add to page
    document.body.appendChild(backButtonContainer);
    
    // Create game title
    const titleContainer = document.createElement('div');
    titleContainer.style.textAlign = 'center';
    titleContainer.style.marginTop = '30px';
    titleContainer.style.marginBottom = '30px';
    
    const titleElement = document.createElement('h1');
    titleElement.className = 'neon-text';
    titleElement.textContent = gameTitle;
    titleElement.style.fontFamily = 'Orbitron, sans-serif';
    titleElement.style.fontSize = '2.5rem';
    titleElement.style.letterSpacing = '3px';
    titleElement.style.textShadow = '0 0 15px #0ff0fc';
    
    titleContainer.appendChild(titleElement);
    document.body.insertBefore(titleContainer, document.body.firstChild);
    
    // Create game container
    const gameContainer = document.createElement('div');
    gameContainer.id = 'game-container';
    gameContainer.style.maxWidth = '800px';
    gameContainer.style.margin = '0 auto';
    gameContainer.style.padding = '20px';
    
    // Insert game container after title
    titleContainer.insertAdjacentElement('afterend', gameContainer);
    
    return gameContainer;
}

// Create a game status display
function createStatusDisplay() {
    const statusDisplay = document.createElement('div');
    statusDisplay.id = 'game-status';
    statusDisplay.style.padding = '15px';
    statusDisplay.style.backgroundColor = 'rgba(17, 17, 34, 0.8)';
    statusDisplay.style.borderRadius = '10px';
    statusDisplay.style.border = '1px solid rgba(0, 255, 157, 0.3)';
    statusDisplay.style.boxShadow = '0 0 15px rgba(0, 255, 157, 0.2)';
    statusDisplay.style.marginTop = '20px';
    statusDisplay.style.fontFamily = 'Orbitron, sans-serif';
    statusDisplay.style.fontSize = '1.2rem';
    statusDisplay.style.textAlign = 'center';
    statusDisplay.style.color = '#00ff9d';
    statusDisplay.style.letterSpacing = '1px';
    statusDisplay.textContent = 'Game Started';
    
    return statusDisplay;
}

// Create a responsive grid for games
function createGameGrid(rows, cols, cellSize = 80) {
    const gridContainer = document.createElement('div');
    gridContainer.className = 'game-grid';
    
    // Calculate total size
    const totalWidth = cols * cellSize + (cols - 1) * 10;
    
    // Style the grid container
    gridContainer.style.display = 'grid';
    gridContainer.style.gridTemplateColumns = `repeat(${cols}, ${cellSize}px)`;
    gridContainer.style.gridTemplateRows = `repeat(${rows}, ${cellSize}px)`;
    gridContainer.style.gap = '10px';
    gridContainer.style.justifyContent = 'center';
    gridContainer.style.margin = '0 auto';
    gridContainer.style.width = `${totalWidth}px`;
    
    // Create grid cells
    for (let i = 0; i < rows * cols; i++) {
        const cell = document.createElement('div');
        cell.className = 'grid-cell';
        cell.dataset.index = i;
        
        // Style the cell
        cell.style.backgroundColor = 'rgba(17, 17, 34, 0.9)';
        cell.style.border = '2px solid rgba(15, 240, 252, 0.3)';
        cell.style.borderRadius = '8px';
        cell.style.display = 'flex';
        cell.style.alignItems = 'center';
        cell.style.justifyContent = 'center';
        cell.style.fontSize = `${cellSize * 0.6}px`;
        cell.style.fontWeight = 'bold';
        cell.style.cursor = 'pointer';
        cell.style.transition = 'all 0.3s ease';
        
        // Hover effect
        cell.addEventListener('mouseenter', function() {
            this.style.borderColor = '#0ff0fc';
            this.style.boxShadow = '0 0 15px rgba(15, 240, 252, 0.5)';
            this.style.transform = 'scale(1.05)';
        });
        
        cell.addEventListener('mouseleave', function() {
            this.style.borderColor = 'rgba(15, 240, 252, 0.3)';
            this.style.boxShadow = 'none';
            this.style.transform = 'scale(1)';
        });
        
        gridContainer.appendChild(cell);
    }
    
    return gridContainer;
}

// Add keyboard controls helper
function addKeyboardControls(keyMap) {
    document.addEventListener('keydown', function(event) {
        const action = keyMap[event.key];
        if (action) {
            action();
            event.preventDefault();
        }
    });
}

// Mobile touch controls helper
function addTouchControls(element, onTap, onSwipe) {
    let touchStartX, touchStartY, touchEndX, touchEndY;
    
    element.addEventListener('touchstart', function(event) {
        touchStartX = event.changedTouches[0].screenX;
        touchStartY = event.changedTouches[0].screenY;
        event.preventDefault();
    });
    
    element.addEventListener('touchend', function(event) {
        touchEndX = event.changedTouches[0].screenX;
        touchEndY = event.changedTouches[0].screenY;
        
        // Check for tap (minimal movement)
        if (Math.abs(touchEndX - touchStartX) < 10 && Math.abs(touchEndY - touchStartY) < 10) {
            if (onTap) onTap(event);
        } 
        // Check for swipe
        else if (onSwipe) {
            const deltaX = touchEndX - touchStartX;
            const deltaY = touchEndY - touchStartY;
            onSwipe(deltaX, deltaY);
        }
        
        event.preventDefault();
    });
}

// Export functions for use in other files
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        addGlowEffect,
        removeGlowEffect,
        typewriterEffect,
        showNotification,
        createBackButton,
        createScoreDisplay,
        initializeGamePage,
        createStatusDisplay,
        createGameGrid,
        addKeyboardControls,
        addTouchControls
    };
      }
