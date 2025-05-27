# 🐤 Flappy Bird Game (React)

A simple Flappy Bird clone built using **React** with functional components and hooks. Control a bird that jumps through pipes using spacebar or click/tap. Avoid collisions and see how long you can survive!

## 🚀 Features

* Built using **React + Hooks**
* Simple physics and gravity system
* Procedurally generated pipes
* Collision detection
* Score tracking
* Restart after game over
* Click and keyboard controls
* Responsive layout with CSS styling


## 🛠️ Tech Stack

* **React** (with Hooks)
* **CSS** for game styling
* **JavaScript** (no external game libraries)

## 📂 Project Structure

```
flappy-bird-react/
├── public/
│   └── index.html
├── src/
│   ├── App.css         # Game styles
│   └── App.jsx         # Main FlappyBird component
├── package.json
└── README.md
```

## 🕹️ Controls

* **Spacebar** or **Mouse Click / Tap** to jump
* **SPACE or Click** again after Game Over to restart

## 🧠 Game Logic Summary

* The bird is affected by gravity and moves up on jump.
* Pipes spawn at random heights and move leftwards.
* Collision occurs when the bird hits a pipe or the ground.
* Score increases each time the bird passes a pipe successfully.

## 💻 Getting Started

### 1. Clone the repo

```bash
git clone https://github.com/your-username/flappy-bird-react.git
cd flappy-bird-react
```

### 2. Install dependencies

```bash
npm install
```

### 3. Run the app

```bash
npm run dev    # or `npm start` if using Create React App
```

The game should now be running at [http://localhost:3000](http://localhost:3000)

## 🧪 Customization Tips

* 🎨 Modify styles in `App.css` for visual changes
* 🐤 Tune game constants (gravity, speed, jump strength) at the top of `App.jsx`
* 📱 Make it mobile-friendly with responsive CSS media queries


## 📝 License

This project is open-source and free to use. No official affiliation with the original Flappy Bird creators.



# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
