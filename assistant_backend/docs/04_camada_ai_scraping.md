# Pipeline de Camada Multi-IA e Scraping

Em Assistentes baseados em informações cruas do mundo real, a aquisição robusta e estruturada dos dados ditam o triunfo do negócio.

## Sistema de Web Scraping e Ingestion (Operários de Coleta)

A aplicação não espera a notícia chegar, ela vai buscá-la.

1.  **Orquestrador Node.js (BullMQ):** Lida com as listas da tabela de banco de dados `information_sources`. Cada fonte cadastrada possui um tempo de polling (ex: G1 Trânsito, cada 30min).
2.  **Workers (Cheerio / Puppeteer):**
    *   **Fontes Leves:** APIs ou Feeds RSS são lidos num piscar de olhos e consumidos em puro Texto/JSON utilizando `axios`.
    *   **Fontes Dinâmicas:** Sites que mascaram dados no React/Angular precisarão do uso do worker de Puppeteer executando JavaScript Headless Chromium.
3.  **Sanitização Bruta:** Retira-se menu, HTML, anúncios; sobrando apenas a string pesada de conteúdo textual da reportagem.

## AI Orchestration e Factory Patter (Abstração)

Em vez de atrelar a start-up do bot eternamente a OpenAI (GPT) e depender de seus gargalos mercadológicos ou censuras/alucinações, foi imposta as *Factories* abstratas.

O arquivo de serviço chamará a interface `AiProvider.processNews(text, systemPrompt)`. A variável ambiente dirá se aquele servidor usa:
*   `gemini-provider.ts` -> Google (Via HTTP)
*   `openai-provider.ts` -> OpenAI SDK
*   `ollama-provider.ts` -> Integração nativa com instâncias Ollama locais, configurável dinamicamente pelo Painel Administrativo.

## O Super Prompt e Edição Dinâmica (WebUI)

A "magia do bot", em si, não faz código, faz prompt. Os prompts da sua organização devem residir na tabela `system_prompts`, totalmente editáveis e testáveis pelo WebAdmin do React.

Quando um texto recém-capturado em web scraping desce pela fila, ele é agrupado ao *System Prompt* que exige *Estrito Retorno JSON (Strict Mode)*. O LLM recebe a tarefa obrigatória de:

1.  **Ler.**
2.  Inferir onde isso acontece geograficamente mapeando as *tags*.
3.  Decidir em qual classe do `scope_level` isso se enquadra (O Brasil inteiro seria afetado ou apenas um quarteirão da Lapa?).
4.  **Viés Político:** Analise vocabular do viés ("O texto tende para qual espectro político do jornalismo?").
5.  **Triple Summary:** Força estruturalmente respostas para as 3 chaves (String Curta, String de Bullets e String Parágrafos Longos).

> O Backend salva isso limpo. A leitura nunca mais consome token na mesma matéria novamente, ela usa as sub-tabelas processadas.
