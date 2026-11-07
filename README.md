# 🚀 MedSync - Powered by Care Plus (FIAP Challenge)

Uma solução digital inovadora desenvolvida para reduzir o **No-show (não comparecimento)** em clínicas, promovendo o engajamento do paciente através de gamificação e otimizando a eficiência operacional da rede de saúde.



## 🎯 O Desafio de Negócio (O Problema)
O *no-show* gera impactos críticos na cadeia de saúde. O desafio foi criar um sistema que não apenas lembrasse o paciente da consulta, mas que **mudasse o seu comportamento** e protegesse a receita da clínica, combatendo:
*   📉 Perda de produtividade médica e ociosidade de agenda.
*   💸 Aumento de custos operacionais sem retorno financeiro.
*   ⚠️ Comprometimento da eficácia na jornada de cuidado do paciente.



## 💡 A Solução e Arquitetura do Produto
O **MedSync** foi estruturado em dois eixos de atuação interligados, desenhados para garantir a saúde do negócio e o bem-estar contínuo dos pacientes:

### 👤 Camada 1: Core da Experiência (Centrada no Paciente)
Focada em engajamento, retenção e na jornada de cuidado.
*   🏆 **Gamificação Premium:** Sistema de pontos progressivo (Níveis Bronze, Prata e Ouro) com recompensas reais para pacientes assíduos.
*   ⏰ **Lembretes Inteligentes Multicanal:** Sistema de confirmação ativa com gatilhos de urgência (via *Countdown timer*) para reduzir o esquecimento.

### ⚙️ Camada 2: Estratégia de Negócio (Centrada na Operação)
Focada em eficiência, previsibilidade e proteção da receita.
*   🔄 **Waitlist Automation:** Preenchimento automático e inteligente de vagas ociosas em casos de cancelamentos de última hora.
*   🧠 **Saúde Preditiva (AI Insights):** Motor de cruzamento de dados para sugerir check-ups preventivos, gerando novas oportunidades de atendimento.
*   📋 **Pre-visit Intake Form:** Formulários de check-in antecipado 100% online, reduzindo filas e otimizando o fluxo de recepção da clínica.



## 📱 UX e Interface
A interface foi projetada com foco em clareza visual, *frictionless* (zero atrito) e com visão simplificada também para dependentes.

*(Adicione os links das imagens nos espaços abaixo)*

| Dashboard Principal | Tela de Check-in |
| :---: | :---: |
| <img src="caminho/para/imagem1.png" width="300"> | <img src="caminho/para/imagem2.png" width="300"> |
| **Confirmação de Ação** | **Reagendamento de Consultas** |
| <img src="caminho/para/imagem3.png" width="300"> | <img src="caminho/para/imagem4.png" width="300"> |



## 🗄️ Arquitetura de Dados (Modelagem)
Para sustentar a operação clínica e o motor de gamificação, o banco de dados relacional foi modelado de forma escalável:

*   📄 **Entidades Clínicas Core:** `PACIENTE`, `MEDICO`, `CLINICA`, `CONSULTA`.
*   🎮 **Motor de Gamificação:** `MEDSYNC` (rastreio de status de nível e pontos), `RECOMPENSA` e `RESGATE_RECOMPENSA` (rastreabilidade de benefícios).

*(Substitua os links abaixo pelas imagens dos seus diagramas)*
*   [🔗 Visualizar Modelo Lógico](link-para-a-imagem-ou-pdf)
*   [🔗 Visualizar Modelo Relacional](link-para-a-imagem-ou-pdf)



## 🛠️ Tecnologias Utilizadas
A arquitetura técnica do projeto foi construída utilizando as seguintes ferramentas e frameworks:

*   **Backend:** Java, Spring Boot, Spring Data JPA, Spring Security (JWT)
*   **Banco de Dados:** Oracle SQL (Relacional), Flyway (Migrations)
*   **Frontend / Mobile:** *(Ex: Jetpack Compose / React / Vue)*
*   **Design & Prototipação:** Figma
*   **Gerenciamento de Dependências:** Maven



## 🚀 Como Executar o Projeto
*(Instruções essenciais para o CTO ou avaliador técnico rodar a sua aplicação na máquina dele)*

1. Clone este repositório:
```bash
git clone [https://github.com/bruno-dacunha/medsync-careplus-challenge.git](https://github.com/bruno-dacunha/medsync-careplus-challenge.git)
