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
    const frames: any[] = [];

    for (let i = 0; i < 4; i++) {
      const fighter = Texture.from(`idle-${i}.png`);
      frames.push(fighter);
    }

    const anim = new AnimatedSprite(frames);
    anim.x = app.screen.width / 2;
    anim.y = app.screen.height / 2;
    anim.anchor.set(0.5);
    anim.animationSpeed = 100;
    anim.play();

    app.stage.addChild(anim);

    /* app.ticker.add(() => {
      anim.rotation += 0.01;
    }); */
  });
});
