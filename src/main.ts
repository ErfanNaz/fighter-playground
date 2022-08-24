import { AnimatedSprite, Application, Sprite, Texture } from 'pixi.js';

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
    const frames = getAnimation(Animations.SPIN)

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
  POWER_SHOT = 'power_shot'
}

function getAnimation(anim: Animations) {
  let frameName = 'idle', frameCount = 0;
  switch (anim) {
    case Animations.IDLE:
      frameName = 'idle';
      frameCount = 4;
      break;
    case Animations.WALK:
      frameName = 'walk';
      frameCount = 8;
      break;
    case Animations.JUMP:
      frameName = 'jump';
      frameCount = 8;
      break;
      
    case Animations.SPIN:
      frameName = 'spin';
      frameCount = 9;
      break;
      
    case Animations.DEAD:
      frameName = 'dead';
      frameCount = 8;
      break;
      
    case Animations.POWER_SHOT:
      frameName = 'power_shot';
      frameCount = 6;
      break;
  }

  const frames: Texture[] = [];

  for (let i = 0; i < frameCount; i++) {
    const fighter = Texture.from(`${frameName}-${i}.png`);
    frames.push(fighter);
  }

  return frames
}
