# Interfaces UI (React Frontend)

Como base tecnológica, será provisionada uma stack única de frontend em React (provavelmente sobre ViteJS ou Next.js se focarmos em SEO no futuro portal), para servir tanto a base administrativa (time interno) quanto o usuário final do bot.

## Administrativo e Controle Absoluto de IA (Painel Admin)

Com roles isolados logando na plataforma com contas de administrador, temos:
*   **WebUI Dashboard Geral:** KPIs brutos do negócio: número de faturas do Stripe, assinaturas pagas (arrastando a margem, ex: base *Pro* vs base *Free*), contadores de scraps passados com sucesso.
*   **Gerenciador de Fontes:** Interface gráfica com formulário: Url original para puxar conteúdo css/seletores para coletar título e corpo do link.
*   **Gestor Dinâmico de Prompts da IA:** A parte mais inteligente do portal. Pode se testar o "prompt" contra notícias base para verificar os outputs do `Gemini` em tempo real sem ir pro código vivo da infra. Tudo se salva na tabela `system_prompts`.
*   **Sistemática de Campanhas (Marketing Inbound):** Para burlar taxas absurdas, administradores formulam Pushes transacionais engajantes aqui, apontando pra listas de usuários free parados: *"Olha só esse super levantamento da sua bolsa... Digite EU QUERO para resgatar."* O momento que o usuário digita "EU QUERO", ele reabre organicamente a Customer Initiate Notification Window do WhatsApp, validando economia massiva sem ferir políticas de spam diretamente na linha vital de negócios.

## Portal do Usuário da Ponta (User/Subscriber UI)

Exposto de forma segura integrada ao **Supabase Auth** (ex: Email, Magic Links ou OAuth/Google).
O foco dessa tela é a retenção e o auto-atendimento (Self-Service) e redução do tráfego do Bot.
1.  **Aba Faturamento:** Puxa componente da Stripe/PagarMe, mostrar histórico bancário de cartão / trocas de pacotes (Plan upgrades de Free para Pro).
2.  **Aba Configurações de Radar:** Com mapa ou seletores amigáveis (Checkbox List/Sliders) para adicionar mais cidades/estados que acompanha, juntamente com o controle do array temporal de `active_days` (De Segunda a Sexta em SP; FDS quero notícias geográficas exclusivas localizadas em Floripa, SC).
3.  **Aba Tuning de Leitura:** Mudança imediata de Viés (`political_bias`) requerido pro algoritmo com Sliders. E escolha do volume final recebido no Mensageiro (`short_alert`, `long` ou fragmentos por categoria ao invés de um consolidado por vez).
