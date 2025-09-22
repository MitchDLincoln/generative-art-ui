import {
  Component,
  ElementRef,
  Input,
  input,
  OnChanges,
  OnDestroy,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { Creation } from '../../models/creation.model';
import p5 from 'p5';

@Component({
  selector: 'app-p5-canvas',
  imports: [],
  templateUrl: './p5-canvas.html',
  styleUrl: './p5-canvas.scss',
})
export class P5Canvas implements OnInit, OnChanges, OnDestroy {
  @Input() params!: Creation['params']; // Riceviamo i parametri dall'esterno

  private p5Instance!: p5; // Qui memorizzeremo la nostra istanza di p5

  // Chiediamo ad Angular un riferimento all'elemento HTML di questo componente
  constructor(private elementRef: ElementRef) {}

  ngOnInit(): void {
    // Quando il componente è pronto, creiamo lo sketch p5
    this.createCanvas();
  }

  ngOnChanges(changes: SimpleChanges): void {
    // Se il componente è già stato inizializzato e i parametri cambiano...
    if (this.p5Instance && changes['params']) {
      // ...facciamo ripartire l'animazione con i nuovi parametri.
      // In sketch più complessi, potremmo aggiornare le variabili senza ricreare tutto.
      this.p5Instance.remove();
      this.createCanvas();
    }
  }

  ngOnDestroy(): void {
    // Quando il componente viene distrutto, è FONDAMENTALE pulire l'istanza di p5
    // per evitare memory leak e loop di animazione fantasma.
    this.p5Instance.remove();
  }

  private createCanvas(): void {
    // La funzione 'sketch' definisce il comportamento della nostra animazione
    const sketch = (s: p5) => {
      // Estraiamo i parametri con dei valori di default
      const color = this.params?.['color'] || '#FFFFFF';

      console.log(`🤙 ~ P5Canvas ~ sketch ~ color:`, color)

      const count = this.params?.['count'] || 100;

      console.log(`🤙 ~ P5Canvas ~ sketch ~ count:`, count)

      const speed = this.params?.['speed'] || 1;

      console.log(`🤙 ~ P5Canvas ~ sketch ~ speed:`, speed)


      let particles: { x: number; y: number; vx: number; vy: number }[] = [];

      // La funzione setup() viene eseguita una sola volta all'inizio
      s.setup = () => {
        const container = this.elementRef.nativeElement;
        s.createCanvas(container.offsetWidth, container.offsetHeight).parent(container);
        s.background(0); // Sfondo nero

        // Creiamo le particelle in posizioni casuali
        for (let i = 0; i < count; i++) {
          particles.push({
            x: s.random(s.width),
            y: s.random(s.height),
            vx: s.random(-1, 1) * speed,
            vy: s.random(-1, 1) * speed,
          });
        }
      };

      // La funzione draw() viene eseguita in loop, 60 volte al secondo
      s.draw = () => {
        s.background(0, 50); // Sfondo nero con un po' di trasparenza per l'effetto scia
        s.noStroke();
        s.fill(color);

        for (const p of particles) {
          p.x += p.vx;
          p.y += p.vy;

          if (p.x < 0 || p.x > s.width) p.vx *= -1;
          if (p.y < 0 || p.y > s.height) p.vy *= -1;

          s.ellipse(p.x, p.y, 5, 5);
        }
      };
    };

    // Creiamo una nuova istanza di p5 con il nostro sketch
    this.p5Instance = new p5(sketch);
  }
}
