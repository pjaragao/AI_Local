# Motor de Delivery e Gateway de Mensageria

Este módulo trata diretamente da fronteira entre o seu back-end em Node.js e o aplicativo do cliente nos mensageiros (WhatsApp/Telegram).

## Gateway de Comunicação Inbound (Recebimento)

O Node.js deverá possuir endpoints REST expostos especificamente configurados no painel das provedoras oficiais:
*   `POST /api/webhooks/whatsapp`
*   `POST /api/webhooks/telegram`

Sempre que o usuário enviar uma mensagem (texto, comando de botão interativo ou resposta rápida) o Webhook processará a requisição, parseará para um formato abstrato comum (MessageEntity) e injetará na lógica de negócios para validar a origem do usuário.

## O Fluxo do Chatter: Onboarding Rigoroso Baseado em Estado (State-Machine)

Se o celular que invocou o webhook não possuir as bandeiras mínimas de perfil configuradas (`is_onboarded = false`), o sistema entra imediatamente num engajamento automatizado linear para criar o mapa base do usuário sem mandá-lo para fora do WhatsApp (Maximizando a captura de Leads).

1.  **Passo 1 (Boas Vindas):** O bot expõe sua premissa ("Curo informações focadas em você..."). Pede o formato que prefere ser chamado (Nome).
2.  **Passo 2 (Bússola Geográfica Inicial):** "Qual a cidade e o bairro base onde você mora?" Salva como `user_locations` principal.
3.  **Passo 3 (Zonas Temporais Ativas):** "Por acaso você trabalha de segunda a sexta em outro bairro/cidade e pega estrada?" O bot capta essas respostas para preencher o array `[1, 2, 3, 4, 5]` na coluna `active_days` e um novo range geográfico.
4.  **Passo 4 (Filtro de Interesses / Macro-Categorias):** "O que você não quer deixar de saber?" Seguido do alinhamento ideológico (`political_bias`) prestando o máximo de discrição, garantindo personalizar a bolha.
5.  **Passo 5 (Acesso Web):** Ao fim do percurso das configurações iniciais feitas de forma natural e guiada, ele despacha uma Magic URL temporária para o Portal do Usuário, permitindo edição gráfica.

## Matchmaking de Delivery e Batching

Para evitar spam - e reduzir drasticamente despesas com a API do WhatsApp (onde um alerta em horas avulsas causaria janelas abertas) - a regra de ouro é o **Batching (Rotina em Lotes)**.

### Em Tempo Real (Exceção)
Alerta transacional absoluto, que fura regras. Exemplo: Se existe um bloqueio de pista total por queda de árvore inferido com o scope da Vila Matilde.
1. Match com usuários com `user_locations` contendo Vila Matilde na data vigente (cruzando `active_days`).
2. Se `is_realtime_alert = true`, despacha imediatamente via Redis Queue um *Alert Push*.

### Em Batch do Boletim (Padrão)
1. A rotina cron engatilha (ex: 07:00 AM).
2. Busca os `processed_contents` das ultimas 24h criados.
3. Faz um filtro onde o `content_tags` e `political_bias` cruze com os interesses de Fulano. Verifica se a zona geográfica também coincide.
4. Acumula todos esses cards numa String final.
5. Se Fulano pediu `short_alert`: Pega apenas as 2 linhas. Se `bullets`: Usa os itens da IA.
6. Despacha 1 ÚNICA mensagem contendo um mini-jornal agregador diretamente no número. Registrando todas as chaves consumidas na tabela de LOG para não os repetir.
