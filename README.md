# El Pollo Loco

A fun and engaging 2D side-scrolling platformer game built with HTML5 Canvas and JavaScript. Play as Pepe, a brave character on a mission to collect coins and bottles while fighting against chickens and the ultimate boss chicken!

## Game Features

- **Side-scrolling Adventure**: Explore a vibrant world with multiple background layers
- **Character Actions**: Walk, jump, and throw bottles at enemies
- **Enemy Variety**: Fight against normal chickens, small chicks, and a challenging end boss
- **Collectibles**: Gather coins and bottles throughout your journey
- **Status Bars**: Track your health, collected coins, bottles, and boss health
- **Audio Experience**: Immersive sound effects and background music
- **Responsive Design**: Mobile-friendly controls with on-screen buttons
- **Game States**: Start screen, game over, and victory screens

## How to Play

### Desktop Controls
- **Arrow Keys**: Move left/right and jump
- **Space Bar** or **D Key**: Throw bottles at enemies
- **Numpad 0**: Alternative action key

### Mobile Controls
- Use the on-screen control buttons:
  - **Left/Right buttons**: Move character
  - **Jump button**: Make Pepe jump
  - **Action button**: Throw bottles

### Objective
1. Navigate through the level by walking and jumping
2. Collect coins and bottles scattered throughout the world
3. Defeat enemies by throwing bottles at them
4. Reach and defeat the end boss chicken to win the game
5. Avoid taking damage from enemies to preserve your health

## Getting Started

### Prerequisites
- A modern web browser that supports HTML5 Canvas
- No additional installations required

### Installation
1. Clone this repository:
   ```bash
   git clone https://github.com/b-rich-dev/el_pollo_loco.git
   ```
2. Navigate to the project directory:
   ```bash
   cd el_pollo_loco
   ```
3. Open `index.html` in your web browser or serve it using a local web server

### Playing Online
Simply open the `index.html` file in any modern web browser to start playing immediately.

## Project Structure

```
el_pollo_loco/
├── index.html              # Main game entry point
├── main.js                 # Game initialization and menu logic
├── style.css               # Main stylesheet
├── js/
│   ├── game.js             # Core game logic and controls
│   ├── portrait-blocker.js # Screen orientation handling
│   └── templates.js        # HTML templates
├── levels/
│   └── level1.js           # Level configuration
├── modals/                 # Game object classes
│   ├── character.class.js
│   ├── world.class.js
│   └── ...
├── styles/                 # CSS stylesheets
└── assets/
    ├── audio/              # Sound effects and music
    ├── img/                # Game sprites and images
    └── fonts/              # Custom fonts
```

## Game Objects

### Character Classes
- **Character**: The main player character (Pepe)
- **Chicken**: Standard enemy chickens
- **Chicks**: Smaller, faster enemies
- **Endboss**: The final boss chicken
- **ThrowableObject**: Bottles that can be thrown

### Game Elements
- **Coins**: Collectible currency
- **Bottles**: Collectible ammunition
- **StatusBar**: UI elements showing game state
- **BackgroundObject**: Environmental elements
- **Cloud**: Moving background elements

## Technical Features

- **Object-Oriented Design**: Built with ES6 classes and modular architecture
- **Canvas Rendering**: Smooth 2D graphics using HTML5 Canvas
- **Animation System**: Sprite-based character and enemy animations
- **Collision Detection**: Precise collision handling between game objects
- **Sound Management**: Comprehensive audio system with mute functionality
- **Mobile Support**: Touch controls and responsive design
- **Game State Management**: Proper handling of game states and transitions

## Audio

The game features a rich audio experience including:
- Background music
- Character movement sounds
- Enemy sound effects
- Collision and interaction sounds
- Victory and defeat audio cues

Audio can be muted using the in-game mute button.

## Mobile Compatibility

The game is fully playable on mobile devices with:
- Touch-friendly on-screen controls
- Responsive design that adapts to different screen sizes
- Optimized performance for mobile browsers

## Deployment with `up.bat`

The `up.bat` script combines Git commit and FTP upload in a single step.

### Prerequisites

1. **Install git-ftp**:
   ```bash
   # Windows (via Chocolatey)
   choco install git-ftp

   # or manually: https://github.com/git-ftp/git-ftp
   ```

2. **Configure FTP credentials** (one-time setup):
   ```bash
   git config git-ftp.url "ftp://your-domain.com/public_html"
   git config git-ftp.user "ftp-username"
   git config git-ftp.password "ftp-password"
   ```

3. **Initialize git-ftp** on first use (if files are already on the server):
   ```bash
   git ftp init
   # or if the server is already up to date:
   git ftp catchup
   ```

### Usage

Run from the project folder:
```bat
up.bat "Your commit message"
```

The script automatically runs:
1. `git pull` - fetch the latest changes
2. `git add .` - stage all changes
3. `git commit -m "..."` - commit with your message
4. `git push` - push to GitHub
5. `git ftp push` - upload changed files to the server via FTP

### Note

The folders `assets/img/1_editables/` and `gitignore/` are excluded from tracking and upload via `.gitignore` and `.git-ftp-ignore`.

---

## Development

### Technologies Used
- **HTML5**: Canvas for game rendering
- **CSS3**: Styling and responsive design
- **JavaScript (ES6+)**: Game logic and object-oriented programming
- **Web Audio API**: Sound management

### Browser Support
- Chrome (recommended)
- Firefox
- Safari
- Edge
- Mobile browsers (iOS Safari, Chrome Mobile)

## License

This project is part of a learning exercise and is intended for educational purposes.

## Contributing

This is a learning project, but suggestions and improvements are welcome! Feel free to:
1. Fork the repository
2. Create a feature branch
3. Submit a pull request

## Future Enhancements

Potential improvements for future versions:
- Additional levels and environments
- New enemy types and abilities
- Power-ups and special items
- Save game progress
- High score system

---

**Have fun playing El Pollo Loco!**

*Made with love using HTML5 Canvas and JavaScript*