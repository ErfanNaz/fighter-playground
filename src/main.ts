import { AnimatedSprite, Application, Texture } from 'pixi.js';
import * as ANIMATION_SETTINGS from './animation_setting';

globalThis.addEventListener('load', () => {
  // The application will create a renderer using WebGL, if possible,
  // with a fallback to a canvas render. It will also setup the ticker
  // and the root stage PIXI.Container
  const app = new Application({
    backgroundAlpha: 0,
  });

  let position = { x: 0, y: 0 };
  let currentAnimation: Animations = Animations.IDLE;
  let nextAnimation: Animations = currentAnimation;
  let isLocked: boolean = false;

  globalThis.addEventListener('keydown', (event) => {
    if (isLocked) {
      return
    }
    if (event.key === 'd') {
      position.x = position.x + 8;
      nextAnimation = Animations.WALK;
    }
    if (event.key === 'a') {
      position.x = position.x - 8;
      nextAnimation = Animations.WALK;
    }
    if (event.key === 'w') {
      position.y = position.y - 8;
      nextAnimation = Animations.WALK;
    }
    if (event.key === 's') {
      position.y = position.y + 8;
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
    if (isLocked) {
      return
    }
    nextAnimation = Animations.IDLE;
  });

  const stage = globalThis.document.getElementById('stage');

  // The application will create a canvas element for you that you
  // can then insert into the DOM
  stage!.appendChild(app.view);

  app.loader.add(['assets/fighter.json']).load((data) => {
    const frames = getAnimationFrames(Animations.SPIN)

    const player = new AnimatedSprite(frames);
    player.scale.x = 4;
    player.scale.y = 4;
    player.x = app.screen.width / 2;
    player.y = app.screen.height / 2;
    player.anchor.set(0.1);
    player.animationSpeed = 0.1;

    player.onLoop = () => {
      if(isLocked) {
        nextAnimation = Animations.IDLE
        isLocked = false;
      }
    }

    player.play();

    app.stage.addChild(player);

    app.stage.removeChild();

    app.ticker.add(() => {
      player.x = position.x;
      player.y = position.y;

      if (currentAnimation !== nextAnimation) {
        currentAnimation = nextAnimation;
        isLocked = nextAnimation !== Animations.IDLE && nextAnimation !== Animations.WALK


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
  UPPERCUT = 'uppercut'
}


function getAnimationFrames(anim: Animations) {
  const frameCount = ANIMATION_SETTINGS[anim].count;

  const frames: Texture[] = [];

  for (let i = 0; i <= frameCount; i++) {
    const fighter = Texture.from(`${anim}-${i}.png`);
    frames.push(fighter);
  }

  return frames
}

