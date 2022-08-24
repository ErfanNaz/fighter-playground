import { Application, Sprite } from 'pixi.js';

globalThis.addEventListener('load', () => {
  // The application will create a renderer using WebGL, if possible,
  // with a fallback to a canvas render. It will also setup the ticker
  // and the root stage PIXI.Container
  const app = new Application({
    backgroundAlpha: 0
  });

  const stage = globalThis.document.getElementById('stage');

  // The application will create a canvas element for you that you
  // can then insert into the DOM
  stage!.appendChild(app.view);

  app.loader.add('assets/fihgter.json').load((data) => {
    const sheet = app.loader.resources["assets/fihgter.json"];
    const fighter = new Sprite((sheet as any).textures["fighter.png"]);

    app.stage.addChild(fighter);
  });

  // load the texture we need
  /* app.loader.add('bunny', 'assets/fighter.png').load((loader, resources) => {
    // This creates a texture from a 'bunny.png' image
    const bunny = new Sprite(resources.bunny.texture);

    // Setup the position of the bunny
    bunny.x = app.renderer.width / 2;
    bunny.y = app.renderer.height / 2;

    // Rotate around the center
    bunny.anchor.x = 0.5;
    bunny.anchor.y = 0.5;

    // Add the bunny to the scene we are building
    app.stage.addChild(bunny);

    // Listen for frame updates
    app.ticker.add(() => {
      // each frame we spin the bunny around a bit
      bunny.rotation += 0.01;
    });
  }); */
});