import { AnimatedSprite, Application, Sprite, Texture } from 'pixi.js';

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

  globalThis.addEventListener('keydown', (event) => {
    if (event.isComposing || event.key === 'd') {
      position.x = position.x + 8;
      nextAnimation = Animations.WALK;
    }
    if (event.isComposing || event.key === 'a') {
      position.x = position.x - 8;
      nextAnimation = Animations.WALK;
    }
    if (event.isComposing || event.key === 'w') {
      position.y = position.y - 8;
      nextAnimation = Animations.WALK;
    }
    if (event.isComposing || event.key === 's') {
      position.y = position.y + 8;
      nextAnimation = Animations.WALK;
    }
  });
  globalThis.addEventListener('keyup', (event) => {
    nextAnimation = Animations.IDLE;
  });

  const stage = globalThis.document.getElementById('stage');

  // The application will create a canvas element for you that you
  // can then insert into the DOM
  stage!.appendChild(app.view);

  app.loader.add(['assets/fighter.json']).load((data) => {
    const frames = getAnimationFrames(Animations.IDLE);

    const anim = new AnimatedSprite(frames);
    anim.scale.x = 4;
    anim.scale.y = 4;
    anim.x = app.screen.width / 2;
    anim.y = app.screen.height / 2;
    anim.anchor.set(0.1);
    anim.animationSpeed = 0.1;
    anim.play();

    app.stage.addChild(anim);

    app.stage.removeChild();

    app.ticker.add(() => {
      anim.x = position.x;
      anim.y = position.y;

      if (currentAnimation !== nextAnimation) {
        currentAnimation = nextAnimation;
        anim.textures = getAnimationFrames(currentAnimation);
        anim.play();
      }
    });
  });
});

enum Animations {
  IDLE = 'idle',
  WALK = 'walk',
}

function getAnimationFrames(anim: Animations) {
  let frameName = 'idle',
    frameCount = 0;
  switch (anim) {
    case Animations.IDLE:
      frameName = 'idle';
      frameCount = 4;
      break;
    case Animations.WALK:
      frameName = 'walk';
      frameCount = 8;
      break;
  }

  const frames: Texture[] = [];

  for (let i = 0; i < frameCount; i++) {
    const fighter = Texture.from(`${frameName}-${i}.png`);
    frames.push(fighter);
  }

  return frames;
}

