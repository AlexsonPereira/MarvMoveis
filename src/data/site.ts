// Dados gerais e portfólio. Para adicionar um projeto, coloque as fotos em
// public/projetos/<pasta>/ e acrescente uma entrada em `projetos`.

export const whatsapp = "557791056830";

export function linkWhats(mensagem = "Olá! Vim pelo site e gostaria de um orçamento.") {
  return `https://wa.me/${whatsapp}?text=${encodeURIComponent(mensagem)}`;
}

export const cidades = ["Guanambi", "Ibiassucê", "Caculé", "Licínio de Almeida", "Urandi"];

export const ambientes = [
  { id: "cozinha", nome: "Cozinhas" },
  { id: "dormitorio", nome: "Dormitórios" },
  { id: "closet", nome: "Closets" },
  { id: "banheiro", nome: "Banheiros" },
  { id: "sala", nome: "Salas & Home" },
  { id: "comercial", nome: "Comercial" },
];

// Foto provisória (trocar pelas fotos reais: "/projetos/cozinha-lacca/1.jpg")
const ph = (id: string) => `https://images.unsplash.com/photo-${id}?w=900&h=1200&fit=crop&q=75`;

export type Projeto = { titulo: string; ambiente: string; cidade: string; fotos: string[] };

export const projetos: Projeto[] = [
  { titulo: "Cozinha Lacca", ambiente: "cozinha", cidade: "Guanambi", fotos: [ph("1556909114-f6e7ad7d3136"), ph("1556911220-bff31c812dba")] },
  { titulo: "Suíte Nogueira", ambiente: "dormitorio", cidade: "Caculé", fotos: [ph("1615874959474-d609969a20ed"), ph("1631679706909-1844bbd07221")] },
  { titulo: "Living Integrado", ambiente: "sala", cidade: "Guanambi", fotos: [ph("1616594039964-ae9021a400a0"), ph("1586023492125-27b2c045efd7")] },
  { titulo: "Closet Fendi", ambiente: "closet", cidade: "Urandi", fotos: [ph("1595428774223-ef52624120d2")] },
  { titulo: "Banho Travertino", ambiente: "banheiro", cidade: "Ibiassucê", fotos: [ph("1584622650111-993a426fbf0a")] },
  { titulo: "Cozinha Freijó", ambiente: "cozinha", cidade: "Licínio de Almeida", fotos: [ph("1600566753190-17f0baa2a6c3"), ph("1600585154340-be6161a56a0c")] },
  { titulo: "Sala de Estar", ambiente: "sala", cidade: "Caculé", fotos: [ph("1618221195710-dd6b41faaea6")] },
  { titulo: "Recepção Clínica", ambiente: "comercial", cidade: "Guanambi", fotos: [ph("1600210492486-724fe5c67fb0")] },
];
