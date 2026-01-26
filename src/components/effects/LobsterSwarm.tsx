import { useEffect, useRef, useState } from "react";

export default function LobsterSwarm() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isIdle, setIsIdle] = useState(false);
  
  // --- CONFIGURAÇÕES FINAIS ---
  // IDLE_TIME agora é calculado dinamicamente (15s a 45s)
  const COLOR = "#fa382e";      // Lobster Red
  const MAX_LOBSTERS = 12;      // Quantidade máxima
  const LOBSTER_SIZE = 2.5;     // Raio 2.5px
  const ORBIT_RADIUS = 15;      // Distância do mouse
  const MOVE_SPEED = 0.8;       // Velocidade de cruzeiro
  const IDLE_PAUSE_MS = 60000;  // Pausa o loop após 60s sem atividade
  
  // Refs de estado
  const particles = useRef<any[]>([]);
  const mouse = useRef({ x: -1000, y: -1000 });
  const idleTimer = useRef<number | null>(null);
  const animationFrame = useRef<number>(0);
  const isRunning = useRef(false);
  const lastActivity = useRef(Date.now());
  
  // Controle de Spawn
  const lastSpawnTime = useRef<number>(0);
  const nextSpawnDelay = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    ctx.imageSmoothingEnabled = false;
    lastActivity.current = Date.now();

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", resize);
    resize();

    // --- FÁBRICA DE LAGOSTAS ---
    const spawnLobster = () => {
      const edge = Math.floor(Math.random() * 4);
      let startX = 0, startY = 0;
      const offset = 50;

      switch(edge) {
        case 0: startX = Math.random() * canvas.width; startY = -offset; break; 
        case 1: startX = canvas.width + offset; startY = Math.random() * canvas.height; break; 
        case 2: startX = Math.random() * canvas.width; startY = canvas.height + offset; break; 
        case 3: startX = -offset; startY = Math.random() * canvas.height; break; 
      }

      const angle = Math.random() * Math.PI * 2;
      const distanceBuffer = ORBIT_RADIUS + (Math.random() * 8 - 4); 

      return {
        x: startX,
        y: startY,
        vx: 0,
        vy: 0,
        
        targetOffsetX: Math.cos(angle) * distanceBuffer,
        targetOffsetY: Math.sin(angle) * distanceBuffer,
        
        freq1: Math.random() * 0.002 + 0.001,
        freq2: Math.random() * 0.003 + 0.001,
        phase: Math.random() * Math.PI * 2,

        fleeCurve: (Math.random() - 0.5) * 0.15, 
        fleeSpeed: 0, 
      };
    };

    const shouldPause = () => document.hidden || Date.now() - lastActivity.current > IDLE_PAUSE_MS;

    const stopLoop = () => {
      if (!isRunning.current) return;
      isRunning.current = false;
      if (animationFrame.current) cancelAnimationFrame(animationFrame.current);
      animationFrame.current = 0;
    };

    const draw = (time: number) => {
      if (shouldPause()) {
        stopLoop();
        return;
      }
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // --- SPAWN ---
      if (isIdle && particles.current.length < MAX_LOBSTERS) {
        if (time - lastSpawnTime.current > nextSpawnDelay.current) {
          
          const quantity = Math.random() > 0.9 ? 2 : 1; 
          const spotsLeft = MAX_LOBSTERS - particles.current.length;
          const toSpawn = Math.min(quantity, spotsLeft);

          for (let k = 0; k < toSpawn; k++) {
            particles.current.push(spawnLobster());
          }

          lastSpawnTime.current = time;
          // Intervalo de chegada: 3s a 8s (Lento)
          nextSpawnDelay.current = Math.random() * 5000 + 3000;
        }
      }

      // --- MOVIMENTO ---
      particles.current.forEach((p, i) => {
        if (isIdle) {
          // === MODO CAÇA ===
          
          const finalTargetX = mouse.current.x + p.targetOffsetX;
          const finalTargetY = mouse.current.y + p.targetOffsetY;

          const dx = finalTargetX - p.x;
          const dy = finalTargetY - p.y;
          const dist = Math.sqrt(dx*dx + dy*dy);

          const baseAngle = Math.atan2(dy, dx);

          const noise = Math.sin(time * p.freq1 + p.phase) + Math.cos(time * p.freq2);
          const swayIntensity = Math.min(0.5, dist / 300);
          
          const moveAngle = baseAngle + (noise * swayIntensity);

          const speedFactor = Math.min(MOVE_SPEED, dist * 0.05);

          p.vx = Math.cos(moveAngle) * speedFactor;
          p.vy = Math.sin(moveAngle) * speedFactor;

          p.x += p.vx;
          p.y += p.vy;

          p.fleeSpeed = 2; 

        } else {
          // === MODO FUGA ===
          let dx = p.x - mouse.current.x;
          let dy = p.y - mouse.current.y;
          
          if (dx === 0 && dy === 0) dx = 1;

          let angle = Math.atan2(dy, dx);
          angle += p.fleeCurve; 

          if (p.fleeSpeed < 14) p.fleeSpeed *= 1.05;

          p.vx = Math.cos(angle) * p.fleeSpeed;
          p.vy = Math.sin(angle) * p.fleeSpeed;
          
          p.x += p.vx;
          p.y += p.vy;
        }

        // DESENHO
        ctx.beginPath();
        ctx.arc(p.x, p.y, LOBSTER_SIZE, 0, Math.PI * 2);
        ctx.fillStyle = COLOR;
        ctx.fill();

        // REMOÇÃO
        if (!isIdle) {
          if (
            p.x < -150 || p.x > canvas.width + 150 || 
            p.y < -150 || p.y > canvas.height + 150
          ) {
            particles.current.splice(i, 1);
            lastSpawnTime.current = Date.now(); 
          }
        }
      });

      animationFrame.current = requestAnimationFrame(() => draw(Date.now()));
    };

    const startLoop = () => {
      if (isRunning.current) return;
      isRunning.current = true;
      animationFrame.current = requestAnimationFrame(() => draw(Date.now()));
    };

    const markActivity = () => {
      lastActivity.current = Date.now();
      if (!document.hidden) startLoop();
    };

    const handleVisibilityChange = () => {
      if (document.hidden) {
        stopLoop();
      } else {
        markActivity();
      }
    };

    startLoop();

    // --- DETECTOR DE ESTADO (COM RANDOM GAP) ---
    const handleMouseMove = (e: MouseEvent) => {
      mouse.current.x = e.clientX;
      mouse.current.y = e.clientY;
      markActivity();

      if (isIdle) {
        setIsIdle(false);
      }

      if (idleTimer.current) window.clearTimeout(idleTimer.current);

      // CÁLCULO DE TEMPO ALEATÓRIO
      // Mínimo: 15.000ms (15s)
      // Variação: +0 a 30.000ms (Totalizando máximo de 45s)
      const randomIdleTime = Math.random() * 30000 + 15000;

      idleTimer.current = window.setTimeout(() => {
        setIsIdle(true);
        lastSpawnTime.current = Date.now();
        nextSpawnDelay.current = 1500; 
      }, randomIdleTime);
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("scroll", markActivity, { passive: true });
    window.addEventListener("keydown", markActivity);
    window.addEventListener("touchstart", markActivity, { passive: true });
    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("scroll", markActivity);
      window.removeEventListener("keydown", markActivity);
      window.removeEventListener("touchstart", markActivity);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      stopLoop();
      if (idleTimer.current) window.clearTimeout(idleTimer.current);
    };
  }, [isIdle]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 z-50 pointer-events-none"
      style={{ mixBlendMode: "normal" }} 
    />
  );
}
