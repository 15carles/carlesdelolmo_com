"use client";

import React from 'react';
import {
  NotFoundRunnerGame,
  type RunnerGameSnapshot,
} from '@/lib/notFoundRunnerGame';

const INITIAL_SNAPSHOT: RunnerGameSnapshot = {
  score: 0,
  bestScore: 0,
  status: 'idle',
};

function isJumpKey(code: string) {
  return code === 'Space' || code === 'ArrowUp' || code === 'KeyW';
}

function isDuckKey(code: string) {
  return code === 'ArrowDown' || code === 'KeyS';
}

function isTextEntryTarget(target: EventTarget | null) {
  if (!(target instanceof HTMLElement)) {
    return false;
  }

  const tagName = target.tagName.toLowerCase();
  return tagName === 'input' || tagName === 'textarea' || target.isContentEditable;
}

export default function NotFoundRunnerGameCanvas() {
  const canvasRef = React.useRef<HTMLCanvasElement | null>(null);
  const gameRef = React.useRef<NotFoundRunnerGame | null>(null);
  const [snapshot, setSnapshot] = React.useState(INITIAL_SNAPSHOT);

  React.useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) {
      return;
    }

    const game = new NotFoundRunnerGame(canvas, {
      onUpdate: setSnapshot,
    });
    gameRef.current = game;

    const handleResize = () => {
      game.resize();
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (isTextEntryTarget(event.target)) {
        return;
      }

      if (isJumpKey(event.code)) {
        event.preventDefault();
        game.jump();
      }

      if (isDuckKey(event.code)) {
        event.preventDefault();
        game.interact();
        game.setDuck(true);
      }
    };

    const handleKeyUp = (event: KeyboardEvent) => {
      if (isDuckKey(event.code)) {
        event.preventDefault();
        game.setDuck(false);
      }
    };

    window.addEventListener('resize', handleResize);
    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
      game.destroy();
      gameRef.current = null;
    };
  }, []);

  const handleCanvasInteraction = () => {
    gameRef.current?.jump();
  };

  const helperText =
    snapshot.status === 'idle'
      ? 'Espacio / clic para saltar · Flecha abajo o S para agacharte'
      : snapshot.status === 'game-over'
        ? 'Perdiste. Pulsa espacio o haz clic para intentarlo de nuevo.'
        : 'Juego activo: Espacio, flecha arriba o W para saltar. Flecha abajo o S para agacharte.';

  return (
    <section className="not-found-game" aria-label="Mini-juego de la página 404">
      <div className="not-found-game__hud" aria-live="polite">
        <p className="not-found-game__score">
          Puntuación: <strong>{snapshot.score}</strong>
        </p>
        <p className="not-found-game__score">
          Récord: <strong>{snapshot.bestScore}</strong>
        </p>
      </div>

      <canvas
        ref={canvasRef}
        className="not-found-game__canvas"
        role="img"
        aria-label="Juego de obstáculos estilo runner"
        onPointerDown={handleCanvasInteraction}
      />

      <p className="not-found-game__hint">{helperText}</p>
    </section>
  );
}
