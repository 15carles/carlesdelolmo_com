export type RunnerGameStatus = 'idle' | 'running' | 'game-over';

export interface RunnerGameSnapshot {
  score: number;
  bestScore: number;
  status: RunnerGameStatus;
}

interface RunnerGameOptions {
  onUpdate?: (snapshot: RunnerGameSnapshot) => void;
}

interface Obstacle {
  x: number;
  y: number;
  width: number;
  height: number;
}

const BASE_WIDTH = 760;
const BASE_HEIGHT = 220;
const GRAVITY = 0.9;
const BASE_SPEED = 6.5;

export class NotFoundRunnerGame {
  private canvas: HTMLCanvasElement;
  private ctx: CanvasRenderingContext2D;
  private onUpdate?: (snapshot: RunnerGameSnapshot) => void;

  private status: RunnerGameStatus = 'idle';
  private score = 0;
  private bestScore = 0;
  private speed = BASE_SPEED;
  private obstacleTimer = 0;
  private obstacleCooldown = 1100;
  private obstacles: Obstacle[] = [];
  private playerY = 0;
  private playerVelocity = 0;
  private isDucking = false;
  private width = BASE_WIDTH;
  private height = BASE_HEIGHT;
  private groundY = 0;
  private rafId: number | null = null;
  private lastFrame = 0;
  private lastPublishedScore = -1;
  private lastPublishedStatus: RunnerGameStatus = 'idle';

  constructor(canvas: HTMLCanvasElement, options: RunnerGameOptions = {}) {
    const context = canvas.getContext('2d');
    if (!context) {
      throw new Error('No se pudo inicializar el contexto 2D del canvas.');
    }

    this.canvas = canvas;
    this.ctx = context;
    this.onUpdate = options.onUpdate;
    this.resize();
    this.resetState();
    this.renderFrame();
    this.publishSnapshot(true);
  }

  public resize() {
    const bounds = this.canvas.getBoundingClientRect();
    const measuredWidth = bounds.width > 0 ? bounds.width : BASE_WIDTH;
    this.width = Math.max(280, Math.min(BASE_WIDTH, measuredWidth));
    this.height = this.width < 520 ? 200 : BASE_HEIGHT;
    this.groundY = this.height - 36;

    const ratio = window.devicePixelRatio || 1;
    this.canvas.width = Math.floor(this.width * ratio);
    this.canvas.height = Math.floor(this.height * ratio);
    this.ctx.setTransform(ratio, 0, 0, ratio, 0, 0);

    if (this.playerY === 0 || this.status !== 'running') {
      this.playerY = this.groundY;
    }

    this.renderFrame();
  }

  public interact() {
    if (this.status === 'idle') {
      this.start();
    }
  }

  public jump() {
    if (this.status === 'idle') {
      this.start();
    }

    if (this.status === 'game-over') {
      this.restart();
    }

    if (this.status !== 'running') {
      return;
    }

    if (this.isOnGround()) {
      this.playerVelocity = this.isDucking ? -11.5 : -14.5;
      this.isDucking = false;
    }
  }

  public setDuck(isDucking: boolean) {
    if (this.status === 'idle' && isDucking) {
      this.start();
    }

    this.isDucking = isDucking;

    if (isDucking && this.playerVelocity < 0) {
      // Acelera caída para que el control de agacharse sea útil en obstáculos aéreos.
      this.playerVelocity += 1.2;
    }
  }

  public destroy() {
    if (this.rafId !== null) {
      cancelAnimationFrame(this.rafId);
      this.rafId = null;
    }
  }

  private start() {
    if (this.status === 'running') {
      return;
    }

    this.status = 'running';
    this.lastFrame = performance.now();
    this.publishSnapshot(true);
    this.rafId = requestAnimationFrame(this.tick);
  }

  private restart() {
    this.resetState();
    this.status = 'running';
    this.lastFrame = performance.now();
    this.publishSnapshot(true);
    this.rafId = requestAnimationFrame(this.tick);
  }

  private resetState() {
    this.score = 0;
    this.speed = BASE_SPEED;
    this.obstacleTimer = 0;
    this.obstacleCooldown = 1100;
    this.obstacles = [];
    this.playerVelocity = 0;
    this.playerY = this.groundY;
    this.isDucking = false;
  }

  private tick = (time: number) => {
    if (this.status !== 'running') {
      return;
    }

    const delta = Math.min(34, time - this.lastFrame || 16.67);
    this.lastFrame = time;

    this.update(delta);
    this.renderFrame();
    this.publishSnapshot();

    if (this.status === 'running') {
      this.rafId = requestAnimationFrame(this.tick);
    } else {
      this.rafId = null;
    }
  };

  private update(delta: number) {
    const step = delta / 16.67;

    this.score += delta * 0.018;
    this.speed = Math.min(14, BASE_SPEED + this.score * 0.012);

    this.playerVelocity += GRAVITY * step;
    this.playerY += this.playerVelocity * step;

    if (this.playerY >= this.groundY) {
      this.playerY = this.groundY;
      this.playerVelocity = 0;
    }

    this.obstacleTimer += delta;
    if (this.obstacleTimer >= this.obstacleCooldown) {
      this.spawnObstacle();
      this.obstacleTimer = 0;
      this.obstacleCooldown = 900 + Math.random() * 700;
    }

    this.obstacles = this.obstacles
      .map((obstacle) => ({
        ...obstacle,
        x: obstacle.x - this.speed * step,
      }))
      .filter((obstacle) => obstacle.x + obstacle.width > -10);

    if (this.detectCollision()) {
      this.status = 'game-over';
      this.bestScore = Math.max(this.bestScore, Math.floor(this.score));
      this.publishSnapshot(true);
    }
  }

  private spawnObstacle() {
    const isAirObstacle = this.score > 80 && Math.random() > 0.65;

    if (isAirObstacle) {
      const width = 34 + Math.random() * 16;
      const height = 20 + Math.random() * 10;
      this.obstacles.push({
        x: this.width + 20,
        y: this.groundY - 36,
        width,
        height,
      });
      return;
    }

    const width = 18 + Math.random() * 20;
    const height = 24 + Math.random() * 30;
    this.obstacles.push({
      x: this.width + 20,
      y: this.groundY,
      width,
      height,
    });
  }

  private detectCollision() {
    const playerWidth = this.getPlayerWidth();
    const playerHeight = this.getPlayerHeight();
    const playerX = this.getPlayerX() + 4;
    const playerTop = this.playerY - playerHeight + 3;
    const playerBox = {
      left: playerX,
      right: playerX + playerWidth - 8,
      top: playerTop,
      bottom: playerTop + playerHeight - 6,
    };

    return this.obstacles.some((obstacle) => {
      const obstacleTop = obstacle.y - obstacle.height;
      const obstacleBox = {
        left: obstacle.x + 2,
        right: obstacle.x + obstacle.width - 2,
        top: obstacleTop + 2,
        bottom: obstacle.y - 2,
      };

      return (
        playerBox.left < obstacleBox.right &&
        playerBox.right > obstacleBox.left &&
        playerBox.top < obstacleBox.bottom &&
        playerBox.bottom > obstacleBox.top
      );
    });
  }

  private renderFrame() {
    this.ctx.clearRect(0, 0, this.width, this.height);

    this.drawGround();
    this.drawPlayer();
    this.drawObstacles();
    this.drawScore();

    if (this.status === 'idle') {
      this.drawOverlay('Pulsa espacio o haz clic para empezar');
    } else if (this.status === 'game-over') {
      this.drawOverlay('Game Over · Espacio o clic para reiniciar');
    }
  }

  private drawGround() {
    this.ctx.save();
    this.ctx.strokeStyle = 'rgba(8, 145, 178, 0.6)';
    this.ctx.lineWidth = 2;
    this.ctx.setLineDash([8, 8]);
    this.ctx.beginPath();
    this.ctx.moveTo(0, this.groundY + 1);
    this.ctx.lineTo(this.width, this.groundY + 1);
    this.ctx.stroke();
    this.ctx.restore();
  }

  private drawPlayer() {
    const width = this.getPlayerWidth();
    const height = this.getPlayerHeight();
    const x = this.getPlayerX();
    const y = this.playerY - height;
    const radius = this.isDucking ? 8 : 12;

    this.ctx.save();
    this.ctx.fillStyle = '#5a67d8';
    this.roundRect(x, y, width, height, radius);
    this.ctx.fill();

    this.ctx.fillStyle = '#ffffff';
    this.ctx.fillRect(x + width - 12, y + 10, 4, 4);
    this.ctx.restore();
  }

  private drawObstacles() {
    this.ctx.save();
    this.ctx.fillStyle = '#0891b2';

    for (const obstacle of this.obstacles) {
      const top = obstacle.y - obstacle.height;
      this.roundRect(obstacle.x, top, obstacle.width, obstacle.height, 6);
      this.ctx.fill();
    }

    this.ctx.restore();
  }

  private drawScore() {
    this.ctx.save();
    this.ctx.font = '600 14px system-ui, -apple-system, Segoe UI, sans-serif';
    this.ctx.fillStyle = '#1d1d1f';
    this.ctx.textAlign = 'left';
    this.ctx.fillText(`Puntos: ${Math.floor(this.score)}`, 14, 24);
    this.ctx.fillText(`Récord: ${this.bestScore}`, 14, 42);
    this.ctx.restore();
  }

  private drawOverlay(message: string) {
    this.ctx.save();
    this.ctx.fillStyle = 'rgba(15, 23, 42, 0.72)';
    this.roundRect(18, 18, this.width - 36, this.height - 36, 12);
    this.ctx.fill();

    this.ctx.fillStyle = '#ffffff';
    this.ctx.font = '600 15px system-ui, -apple-system, Segoe UI, sans-serif';
    this.ctx.textAlign = 'center';
    this.ctx.fillText(message, this.width / 2, this.height / 2);
    this.ctx.restore();
  }

  private getPlayerX() {
    return Math.max(36, this.width * 0.16);
  }

  private getPlayerWidth() {
    return this.isDucking && this.isOnGround() ? 54 : 36;
  }

  private getPlayerHeight() {
    return this.isDucking && this.isOnGround() ? 24 : 44;
  }

  private isOnGround() {
    return this.playerY >= this.groundY - 0.5;
  }

  private roundRect(x: number, y: number, width: number, height: number, radius: number) {
    this.ctx.beginPath();
    this.ctx.moveTo(x + radius, y);
    this.ctx.arcTo(x + width, y, x + width, y + height, radius);
    this.ctx.arcTo(x + width, y + height, x, y + height, radius);
    this.ctx.arcTo(x, y + height, x, y, radius);
    this.ctx.arcTo(x, y, x + width, y, radius);
    this.ctx.closePath();
  }

  private publishSnapshot(force = false) {
    if (!this.onUpdate) {
      return;
    }

    const roundedScore = Math.floor(this.score);
    if (
      !force &&
      roundedScore === this.lastPublishedScore &&
      this.status === this.lastPublishedStatus
    ) {
      return;
    }

    this.lastPublishedScore = roundedScore;
    this.lastPublishedStatus = this.status;
    this.onUpdate({
      score: roundedScore,
      bestScore: this.bestScore,
      status: this.status,
    });
  }
}
