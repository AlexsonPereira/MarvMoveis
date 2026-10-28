import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";
import { projetos, linkWhats } from "../data/site";

gsap.registerPlugin(ScrollTrigger);

const $ = <T extends Element = HTMLElement>(s: string, el: ParentNode = document) => el.querySelector(s) as T;
const $$ = <T extends Element = HTMLElement>(s: string, el: ParentNode = document) => [...el.querySelectorAll(s)] as T[];
const reduz = matchMedia("(prefers-reduced-motion: reduce)").matches;

export function initSite() {
  scrollSuave();
  animacoes();
  contadores();
  filtros();
  stories();
  navScroll();
}

function scrollSuave() {
  if (reduz) return;
  const lenis = new Lenis({ lerp: 0.1 });
  lenis.on("scroll", ScrollTrigger.update);
  gsap.ticker.add((t) => lenis.raf(t * 1000));
  gsap.ticker.lagSmoothing(0);
  $$<HTMLAnchorElement>('a[href^="#"]').forEach((a) =>
    a.addEventListener("click", (e) => {
      const alvo = a.getAttribute("href")!;
      e.preventDefault();
      lenis.scrollTo(alvo === "#" ? 0 : alvo, { offset: -70 });
    }),
  );
}

function animacoes() {
  if (reduz) return;
  gsap.from(".hero-txt > *", { y: 40, opacity: 0, duration: 1.1, stagger: 0.12, ease: "power3.out" });
  gsap.from(".hero-stack img", { clipPath: "inset(100% 0 0 0)", duration: 1.4, stagger: 0.15, ease: "power4.inOut", delay: 0.2 });

  $$(".hero-stack img").forEach((img) => {
    gsap.to(img, {
      yPercent: Number(img.dataset.speed) * 100,
      ease: "none",
      scrollTrigger: { trigger: ".hero", start: "top top", end: "bottom top", scrub: true },
    });
  });

  $$(".fade-up, .sec-head, .amb-grid li").forEach((el) => {
    gsap.from(el, { y: 50, opacity: 0, duration: 1, ease: "power3.out", scrollTrigger: { trigger: el, start: "top 88%" } });
  });

  ScrollTrigger.batch(".card", {
    start: "top 92%",
    onEnter: (els) => gsap.fromTo(els, { y: 60, opacity: 0 }, { y: 0, opacity: 1, stagger: 0.08, duration: 0.9, ease: "power3.out" }),
  });
}

function contadores() {
  $$("[data-count]").forEach((el) => {
    const fim = Number(el.dataset.count);
    const obj = { v: reduz ? fim : 0 };
    el.textContent = String(obj.v);
    if (reduz) return;
    gsap.to(obj, {
      v: fim,
      duration: 2,
      ease: "power2.out",
      scrollTrigger: { trigger: el, start: "top 90%" },
      onUpdate: () => (el.textContent = String(Math.round(obj.v))),
    });
  });
}

function aplicarFiltro(f: string) {
  $$(".filtros button").forEach((b) => b.classList.toggle("ativo", b.dataset.filter === f));
  $$(".card").forEach((c) => {
    const mostra = f === "todos" || c.dataset.amb === f;
    c.style.display = mostra ? "" : "none";
    if (mostra) c.style.opacity = "1";
  });
  ScrollTrigger.refresh();
}

function filtros() {
  $$(".filtros button").forEach((b) => b.addEventListener("click", () => aplicarFiltro(b.dataset.filter!)));
  $$("[data-filter-link]").forEach((a) => a.addEventListener("click", () => aplicarFiltro(a.dataset.filterLink!)));
}

// Visualizador em formato "stories" para as fotos verticais
function stories() {
  const box = $(".stories");
  const img = $<HTMLImageElement>(".stories-img", box);
  const bars = $(".stories-bars", box);
  const DURACAO = 5000;
  let proj = 0, foto = 0, timer = 0, tween: gsap.core.Tween | null = null;

  const render = () => {
    const p = projetos[proj];
    img.src = p.fotos[foto];
    img.alt = p.titulo;
    $(".stories-t", box).textContent = p.titulo;
    $(".stories-c", box).textContent = p.cidade + " – BA";
    $<HTMLAnchorElement>(".stories-cta", box).href = linkWhats(`Olá! Vi o projeto "${p.titulo}" (${p.cidade}) no site e gostaria de um orçamento.`);
    bars.innerHTML = p.fotos.map((_, i) => `<span><i style="width:${i < foto ? 100 : 0}%"></i></span>`).join("");
    tween?.kill();
    clearTimeout(timer);
    tween = gsap.to($$("i", bars)[foto], { width: "100%", duration: DURACAO / 1000, ease: "none" });
    timer = window.setTimeout(proxima, DURACAO);
  };
  const proxima = () => {
    if (foto < projetos[proj].fotos.length - 1) foto++;
    else { proj = (proj + 1) % projetos.length; foto = 0; }
    render();
  };
  const anterior = () => {
    if (foto > 0) foto--;
    else { proj = (proj - 1 + projetos.length) % projetos.length; foto = 0; }
    render();
  };
  const fechar = () => {
    box.hidden = true;
    document.documentElement.style.overflow = "";
    tween?.kill();
    clearTimeout(timer);
  };

  $$(".card").forEach((c) =>
    c.addEventListener("click", () => {
      proj = Number(c.dataset.index);
      foto = 0;
      box.hidden = false;
      document.documentElement.style.overflow = "hidden";
      render();
    }),
  );
  $(".stories-next", box).addEventListener("click", proxima);
  $(".stories-prev", box).addEventListener("click", anterior);
  $(".stories-close", box).addEventListener("click", fechar);
  document.addEventListener("keydown", (e) => {
    if (box.hidden) return;
    if (e.key === "Escape") fechar();
    if (e.key === "ArrowRight") proxima();
    if (e.key === "ArrowLeft") anterior();
  });
}

function navScroll() {
  const nav = $(".nav");
  ScrollTrigger.create({ start: 80, onToggle: (s) => nav.classList.toggle("solid", s.isActive) });
}
