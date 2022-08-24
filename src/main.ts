import { AnimatedSprite, Application, Texture } from 'pixi.js';
import * as ANIMATION_SETTINGS from './animation_setting';

globalThis.addEventListener('load', () => {
  // The application will create a renderer using WebGL, if possible,
  // with a fallback to a canvas render. It will also setup the ticker
  // and the root stage PIXI.Container
  const app = new Application({
    backgroundAlpha: 0,
  });

  const stage = globalThis.document.getElementById('stage');

  // The application will create a canvas element for you that you
  // can then insert into the DOM
  stage!.appendChild(app.view);

  app.loader.add(['assets/fighter.json']).load((data) => {
    const frames = getAnimation(Animations.MID_KICK)

    const anim = new AnimatedSprite(frames);
    anim.scale.x = 4;
    anim.scale.y = 4;
    anim.x = app.screen.width / 2;
    anim.y = app.screen.height / 2;
    anim.anchor.set(0.5);
    anim.animationSpeed = .100;
    anim.play();

    app.stage.addChild(anim);


    /* app.ticker.add(() => {
      anim.rotation += 0.01;
    }); */
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


function getAnimation(anim: Animations) {
  const frameCount = ANIMATION_SETTINGS[anim].count;

  const frames: Texture[] = [];

  for (let i = 0; i <= frameCount; i++) {
    const fighter = Texture.from(`${anim}-${i}.png`);
    frames.push(fighter);
  }

  return frames
}
