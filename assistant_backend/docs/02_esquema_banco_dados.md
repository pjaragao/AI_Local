# Estrutura do Banco de Dados (Supabase - PostgreSQL Schema)

O núcleo do sistema repousa em tabelas relacionais no **Supabase** otimizadas para os filtros hiperlocais e com **RLS (Row Level Security)** ativado para integração direta com a camada Auth do front-end.

## Tabelas Core (Contas de Acesso e Perfil)

*   **`users`**: 
    Tabela mestra de utilizadores (tanto os usuários do bot quando os adms).
    *   `id` (UUID), `email`, `password_hash`
    *   `phone_number` (Chave natural para o WhatsApp)
    *   `telegram_id`
    *   `name`, `status` (`active`, `frozen`, `banned`)
    *   `plan_type`: `free`, `basic`, `pro`, `premium`.
    *   `payment_customer_id`: Referência externa do Gateway de pagamento.

*   **`user_delivery_preferences`**:
    Tabela isolada para preferências de entrega. Relação 1:1 com users.
    *   `user_id` (FK)
    *   `summary_preference`: Qual o tamanho do resumo padrão a ser enviado (`short_alert`, `medium_bullet`, `detailed_reading`).
    *   `delivery_style`: `consolidated_bulletin` (manda tudo num blocão longo) ou `separated_by_category`.
    *   `preferred_delivery_times`: Array `[07:00, 18:30]` indicando os gatilhos dos envios diários.
    *   `political_bias`: Segmentação ideológica definida pelo usuário (ex: `left`, `center-left`, `center`, `right`).

*   **`user_locations` (Zonas de Radar Ativas)**:
    Permite N bairros ou cidades por usuário.
    *   `id`, `user_id` (FK)
    *   `label` (Ex: "Casa", "Chácara", "Trabalho")
    *   `location_name` (Ex: "São Paulo", "Alphaville")
    *   `scope_level`: Tipo da localização (`municipal`, `neighborhood`, `state`).
    *   `active_days`: Array ex: `[1,2,3,4,5]` definindo que esta localização só monitora os dias de semana úteis.
    *   `active_times_start` / `active_times_end`: Definição de grade (ex: buscar as crianças na escola entre 12:00 e 13:00).

## Tabelas de Prompts, Coleta e IA

*   **`system_prompts` (Gestão Dinâmica de IA)**:
    Central do motor inteligente gerível pelo Admin.
    *   `id`, `name`, `system_prompt_text`
    *   `ai_provider` (ex: `openai`, `gemini`), `ai_model` (ex: `gpt-4o-mini`)
    *   `temperature`, `version`

*   **`information_sources`**:
    *   `id`, `name`, `source_url`, `scraper_rules` (JSON com CSS selectors)
    *   `scraping_interval_minutes`, `status` (`active`, `paused`).

*   **`processed_contents` (Conteúdo Analisado)**:
    Guarda o resultado da passagem do conteúdo bruto pelo orquestrador AI.
    *   `id` (UUID), `source_id` (FK), `original_url`
    *   `category` (Definido pela IA: `Transito`, `Esporte`, etc.)
    *   `scope_level`: O bairro, cidade ou nível nacional da notícia inferida pela IA.
    *   `political_bias`: Viés detectado pela IA.
    *   `summary_short` (Tamanho 1 - Push Alert)
    *   `summary_medium` (Tamanho 2 - Bullets)
    *   `summary_long` (Tamanho 3 - Aprofundado)
    *   `is_realtime_alert`: Boolean que injeta direto na queue se fura fila.
    *   `created_at`

*   **`content_tags`**: N para N permitindo filtrar (`content_id`, `tag_name`).

## Tabelas de Delivery e Marketing

*   **`delivery_queue` (Fila de Envios)** e **`content_delivery_log`**:
    *   Gerencia o match pendente e depois marca como lido (`user_id`, `content_id`, `status`).
*   **`marketing_campaigns`**:
    *   `id`, `objective`, `target_audience` JSON de filtro.
    *   `message_template`: O Template do WhatsApp oficial.
    *   `status`.
