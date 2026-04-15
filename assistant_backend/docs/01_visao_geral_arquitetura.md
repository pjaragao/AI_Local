# Visão Geral da Arquitetura

O sistema backend do **Assistente de IA Curador e Interativo** é construído utilizando uma arquitetura moderna e escalável baseada em Node.js (Backend) e React (Frontend WebUI).

## Componentes Principais

### 1. Plataforma Web (React)
A plataforma web é dividida em dois grandes módulos com controles de acesso (roles):
*   **Admin Dashboard:** Centro de controle operado pela equipe para gerenciar fontes (scrapers), campanhas de marketing, métricas de usuários e, crucialmente, os *Prompts de Sistema* da IA.
*   **Portal do Usuário:** Área logada (cliente) onde o usuário pode gerenciar sua assinatura (integração de pagamentos com Stripe/MercadoPago, etc.), editar as preferências dos resumos de leitura e ajustar suas zonas de radar (geofencing) e janelas de temporais.

### 2. Mensageria & Backend (Node.js)
Servidor robusto (utilizando Express ou Fastify) responsável por expor:
*   Endpoints da API REST/GraphQL para consumo do Frontend e do Portal do Usuário.
*   **Webhooks** configurados em tempo real para processar mensagens recebidas (Inbound) do WhatsApp Business API e Telegram API.
*   Orquestração e lógica de negócios da conta.

### 3. Scraping & Ingestion Pipeline
Job queues baseadas em background workers (ex: BullMQ sobre Redis). Este pipeline executa scripts constantes para acessar URLs de fontes, consumir APIs externas e executar web scraping (cheerio/puppeteer) sem travar a thread principal da aplicação, garantindo coleta assíncrona.

### 4. Camada de Abstração Multi-IA (AI Orchestrator)
Módulo Factory no Node.js concebido para evitar *vendor lock-in*. Ele é capaz de orquestrar a carga de textos obtidos pelos scrapers disparando-os para múltiplos modelos (OpenAI GPT-4, Google Gemini, Anthropic Claude, ou modelos locais como **Ollama**).
*   Injeta dinamicamente os **Prompts** obtidos no banco de dados. Os prompts (e instâncias do Ollama) são configurados e geridos via painel WebUI.
*   Responsável por padronizar o output da inteligência em JSON com campos exatos como: `scope_level`, `political_bias` e os 3 tamanhos de resumos predefinidos.

### 5. Motor Em Lote (Batching) e Onboarding state-machine
*   **Batching / Scheduler:** Serviço emparelhado com tarefas agendadas (Cron) que monitora continuamente se é hora de enviar noticias para determinado usuário. Faz a agregação em um "boletim" e evita a sobrecarga de mensagens push no celular do cliente.
*   **Gestor de Fluxo de Conversação (State Machine):** Garante a coleta contínua e sem falhas dos dados básicos do usuário no primeiro contato dentro do WhatsApp/Telegram (Onboarding).

### 6. Banco de Dados e Auth (Supabase)
*   **Supabase (PostgreSQL + RLS):** Centraliza todo o banco de dados relacional e a autenticação Web do ecossistema.
*   **Redis:** Armazenamento externo em memória para controle temporal das filas do BullMQ, e cache rápido.
