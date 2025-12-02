<div align="center">
  <img src="apps/frontend/public/brand/logo.jpg" alt="AXONLINE Logo" width="180" />

  <h1>PROJETO AXONLINE</h1>

  <p>
    <strong>Website e Loja Unificada.</strong>
  </p>

  <p>
    <a href="https://nextjs.org"><img src="https://img.shields.io/badge/Next.js-15-black?style=for-the-badge&logo=next.js" alt="Next.js 15" /></a>
    <a href="https://react.dev"><img src="https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react" alt="React 19" /></a>
    <a href="https://nx.dev"><img src="https://img.shields.io/badge/Nx-Monorepo-blue?style=for-the-badge&logo=nx" alt="Nx" /></a>
    <a href="https://tailwindcss.com"><img src="https://img.shields.io/badge/Tailwind-v4-38bdf8?style=for-the-badge&logo=tailwindcss" alt="Tailwind CSS 4" /></a>
    <a href="https://graphql.org"><img src="https://img.shields.io/badge/GraphQL-Shopify-E10098?style=for-the-badge&logo=graphql" alt="GraphQL" /></a>
    <a href="https://supabase.com"><img src="https://img.shields.io/badge/Supabase-Realtime-3ecf8e?style=for-the-badge&logo=supabase" alt="Supabase" /></a>
  </p>

  <h3>Infraestrutura ISP • Headless Retail • Córtex de Voz IA</h3>
</div>

---

## 🌍 A Visão

**AXONLINE** transcende o conceito de um site convencional. É uma **Operadora Digital Autônoma** forjada sob princípios de engenharia de elite. Resolvemos a fragmentação do mercado tecnológico fundindo três mundos em uma experiência fluida, segura e escalável globalmente:

1.  **Infraestrutura (ISP):** Gestão e venda de serviços recorrentes críticos (Fibra Óptica, VoIP, Hosting).
2.  **Varejo Tecnológico:** E-commerce de hardware de ponta integrado via **Shopify Headless (GraphQL)**.
3.  **Inteligência Ativa:** Um sistema de vendas e suporte impulsionado por IA (Voz E WHATSAPP) que interage proativamente para gerar leads y vendas, comunicación dual, via WebSockets.

---

## 🏗️ Arquitetura Hexagonal Soberana (Nx Monorepo)

O sistema utiliza um **Monorepo Nx** para orquestrar uma arquitetura de **Portas e Adaptadores (Hexagonal)**. Isso desacopla nossa lógica de domínio (Core Business) das ferramentas externas, garantindo longevidade e robustez.

```mermaid
graph TD
    subgraph "Presentation Layer (Edge)"
        Client[Usuário / Navegador]
        Portal[Apps/Frontend<br>(Next.js 15 + Tailwind 4)]
    end

    subgraph "Domain Layer (The Brain)"
        Rules[Regras de Negócio<br>(Pure TypeScript)]
        Entities[Entidades & Schemas Zod<br>(Product, Plan, Order)]
        Ports[Portas / Interfaces]
    end

    subgraph "Infrastructure Layer (Adapters)"
        Shopify[Adapter: Shopify GraphQL]
        Supabase[Adapter: Supabase Auth/DB]
        Stripe[Adapter: Stripe Payments]
        VoiceAI[Adapter: Voice Cortex (WS)]
    end

    Client --> Portal
    Portal --> Ports
    Ports --> Rules
    Rules --> Entities

    Shopify -.->|Implementa| Ports
    Supabase -.->|Implementa| Ports
    Stripe -.->|Implementa| Ports
    VoiceAI -.->|Implementa| Ports

    style Portal fill:#000,stroke:#fff,color:#fff
    style Rules fill:#D32F2F,stroke:#333,color:#fff
    style Infrastructure fill:#eee,stroke:#333
```

⚡ O Arsenal Tecnológico (Tech Stack)
Selecionamos bibliotecas que garantem performance extrema, segurança de tipos e escalabilidade.
Domínio	            Tecnologia/Versão       Função
Core Framework	    Next.js	v15.1+	        Renderização Híbrida (ISR/SSR) e Server Actions.
UI Engine	        Tailwind CSS v4.1	    Estilização "CSS-first", variáveis nativas e performance.
State Management	Zustand	v5.0	        Gerenciamento de estado global atômico e persistente.
Data Integrity	    Zod	v3.24	            Validação de esquemas runtime (SSoT de dados).
Commerce API	    GraphQL	                Shopify	Conexão eficiente e tipada com Storefront API.
Real-time	        WebSockets	            Native  Streaming de áudio para IA e atualizações de pedidos.
Database	        Supabase v2.0	        PostgreSQL, Auth e Row Level Security (RLS).
Icons/Assets	    Lucide React	        Latest	Iconografia vetorial leve e consistente.

🚀 Capacidades de Elite

🌐 Motor "Global-First"
127 Idiomas: Arquitectura i18n nativa. O conteúdo não é hardcoded; é injetado dinamicamente via dicionários JSON validados por Zod.
Detecção Geo-Espacial: Adaptação automática de catálogo, moeda e preços baseada no IP do visitante (Miami vs. São Paulo).

🛒 Comércio Híbrido Federado
Unificamos a venda de Serviços (Assinaturas) e Produtos (Físicos) em um carrinho único, orquestrando múltiplos backends transparentemente.

``` Mermaid
sequenceDiagram
    participant User
    participant Cart as Carrinho Unificado (Zustand)
    participant Logic as Lógica de Domínio
    participant Shop as Shopify GraphQL (Hardware)
    participant Sub as Stripe (Assinaturas)

    User->>Cart: Adiciona Roteador (Físico)
    User->>Cart: Adiciona Plano Fibra 1GB (Serviço)
    User->>Cart: Checkout
    Cart->>Logic: Processar Ordem Mista
    Logic->>Shop: Reservar Estoque & Logística
    Logic->>Sub: Criar Assinatura Recorrente
    Logic-->>User: Confirmação Única
```

🎨 Theming Dinâmico & Multi-Tenant
Sistema de Parceiros: Revendedores possuem vistas "Whitelabel" herdando a infraestrutura da AXONLINE, mas com atribuição de vendas isolada.
Injeção CSS Runtime: Variáveis nativas do Tailwind v4 permitem mudanças radicais de marca em tempo de execução sem reconstruir a aplicação (Build once, brand everywhere).

📂 Estrutura do Monorepo (Nx)
Organização estrita para manter a escalabilidade e a sanidade mental da equipe.
Caminho	Tipo	Descrição
apps/frontend	Application	O Portal Next.js. Responsável apenas por renderização e roteamento.
libs/domain	Library	O Cérebro. Regras de Negócio, Entidades e Schemas Zod Puros.
libs/infrastructure	Library	Os Músculos. Clientes de API (Shopify GraphQL, Supabase, Stripe).
libs/features	Library	A UI Inteligente. Módulos completos (Grid de Produtos, Mapa de Cobertura).
libs/ui-kit	Library	Design System. Componentes atômicos (Botões, Inputs) usando Shadcn.
tools/	Scripts	Guardiões de Qualidade, Geradores de Código e Diagnósticos.

🏁 Getting Started
Pré-requisitos
Node.js v20+
pnpm v9+
Docker (Opcional, para emulação local de serviços)

Instalação

# 1. Clonar o repositório
git clone https://github.com/tu-org/axonline.git

# 2. Instalar dependências (Gestão estrita via pnpm)

```bash
pnpm install
```
# 3. Configurar Variáveis de Ambiente

cp .env.example .env.local
# (Solicitar credenciais ao Arquiteto de Sistema)

# 4. Iniciar o Ecossistema

```bash
pnpm dev
```
Comandos do Workspace:
```bash
pnpm nx run frontend:serve: Levanta o portal de desenvolvimento.
pnpm nx graph: Visualiza o gráfico de dependências entre as bibliotecas.
pnpm build: Compila o ecossistema completo com otimização de produção.
pnpm validate: Executa linting, checagem de tipos e validação de esquemas Zod.
```
🔮 Roadmap: O Futuro
Fase 1 (Atual): Alicerces Hexagonais, Portal ISP + Loja Shopify Headless.
Fase 2: Implementação do Córtex de Voz IA (WebSockets + LLM) para televendas autônomas.
Fase 3: Super App Móvel (React Native) para gestão de clientes e domótica.
Fase 4: Marketplace de Serviços para técnicos certificados e instaladores parceiros.

<div align="center">
<p>Built with <strong>Engineering Excellence</strong> by Raz Podestá - MetaShark Tech</p>
<p>© 2025 Raz Podestá by MetaShark Tech</p>
</div>
```
