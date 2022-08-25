import { AnimatedSprite, Application, Texture } from 'pixi.js';
import * as ANIMATION_SETTINGS from './animation_setting';

const defaultKeys = { left: false, up: false, right: false, down: false };

globalThis.addEventListener('load', () => {
  // The application will create a renderer using WebGL, if possible,
  // with a fallback to a canvas render. It will also setup the ticker
  // and the root stage PIXI.Container
  const app = new Application({
    backgroundAlpha: 0,
  });

  let keys = defaultKeys;
  let currentAnimation: Animations = Animations.IDLE;
  let nextAnimation: Animations = currentAnimation;
  let isLocked: boolean = false;

  globalThis.addEventListener('keydown', (event) => {
    if (isLocked) {
      return;
    }
    if (event.key === 'd') {
      keys.right = true;
      nextAnimation = Animations.WALK;
    }
    if (event.key === 'a') {
      keys.left = true;
      nextAnimation = Animations.WALK;
    }
    if (event.key === 'w') {
      keys.up = true;
      nextAnimation = Animations.WALK;
    }
    if (event.key === 's') {
      keys.down = true;
      nextAnimation = Animations.WALK;
    }
    if (event.key === 'j') {
      nextAnimation = Animations.SHORYUKEN;
    }
    if (event.key === 'k') {
      nextAnimation = Animations.POWER_SHOT;
    }
    if (event.key === 'l') {
      nextAnimation = Animations.AXE_KICK;
    }
    if (event.code === 'Space') {
      nextAnimation = Animations.JUMP;
    }
  });
  globalThis.addEventListener('keyup', (event) => {
    if (event.key === 'd') {
      keys.right = false;
    }
    if (event.key === 'a') {
      keys.left = false;
    }
    if (event.key === 'w') {
      keys.up = false;
    }
    if (event.key === 's') {
      keys.down = false;
    }
    if (!isLocked) {
      nextAnimation = Animations.IDLE;
    }
  });

  const stage = document.getElementById('stage');

  // The application will create a canvas element for you that you
  // can then insert into the DOM
  stage!.appendChild(app.view);

  app.loader.add(['assets/fighter.json']).load((data) => {
    const frames = getAnimationFrames(Animations.SPIN);
    const baseScale = 4;

    const player = new AnimatedSprite(frames);
    player.scale.x = baseScale;
    player.scale.y = baseScale;
    player.x = app.screen.width / 2;
    player.y = app.screen.height / 2;
    player.anchor.set(0.5);
    player.animationSpeed = 0.2;
    player.play();

    app.stage.addChild(player);

    player.onLoop = () => {
      if (isLocked) {
        nextAnimation = Animations.IDLE;
        keys = defaultKeys;
      }
    };

    globalThis.addEventListener('keydown', (event) => {
      if (event.key === 'p') {
        if (player.playing) {
          player.stop();
        } else {
          player.play();
        }
      }
    });

    app.ticker.add(() => {
      if (!isLocked) {
        if (keys.left) {
          player.x = player.x + -4;
          player.scale.x = -baseScale;
        }
        if (keys.up) {
          player.y = player.y + -4;
        }
        if (keys.right) {
          player.x = player.x + 4;
          player.scale.x = baseScale;
        }
        if (keys.down) {
          player.y = player.y + 4;
        }
      }

      if (currentAnimation !== nextAnimation) {
        currentAnimation = nextAnimation;
        isLocked = nextAnimation !== Animations.IDLE && nextAnimation !== Animations.WALK && nextAnimation !== Animations.JUMP;

        player.textures = getAnimationFrames(currentAnimation);
        player.play();
      }
    });
  });
});

enum Animations {
  IDLE = 'idle',
  WALK = 'walk',
  JUMP = 'jump',
  SPIN = 'spin',
  DEAD = 'dead',
  POWER_SHOT = 'power_shot',
  FAST_SHOT = 'fast_shot',
  FLYING_KICK = 'flying_kick',
  SHORYUKEN = 'shoryuken',
  ONE_TWO_COMBO = 'one_two_combo',
  LOW_KICK = 'low_kick',
  MID_KICK = 'mid_kick',
  HIGH_KICK = 'high_kick',
  AXE_KICK = 'axe_kick',
  TWO_SIDE_ATTACK = 'two_side_attack',
  ROUND_KICK = 'round_kick',
  UPPERCUT = 'uppercut',
}

function getAnimationFrames(anim: Animations) {
  const frameCount = ANIMATION_SETTINGS[anim].count;

  const frames: Texture[] = [];

  for (let i = 0; i <= frameCount; i++) {
    const fighter = Texture.from(`${anim}-${i}.png`);
    frames.push(fighter);
  }

  return frames;
}
