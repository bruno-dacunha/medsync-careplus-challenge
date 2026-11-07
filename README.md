🚀 MedSync - Powered by Care Plus (FIAP Challenge)
Visão Geral: Uma solução digital inovadora desenvolvida para reduzir o No-show (não comparecimento) em clínicas, promovendo engajamento do paciente através de gamificação e otimizando a eficiência operacional da rede de saúde.

🎯 O Desafio de Negócio (O Problema)
O no-show gera impactos críticos na cadeia de saúde, incluindo a perda de produtividade médica, aumento de custos operacionais e comprometimento da jornada de cuidado do paciente. O desafio foi criar um sistema que não apenas lembrasse o paciente, mas mudasse o seu comportamento e protegesse a receita da clínica.

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

## 🖥️ UX e Interface

A interface foi projetada focando em clareza visual, *frictionless* (zero atrito) e visão de dependentes. Abaixo, as principais telas do fluxo:

<table>
  <tr>
    <td align="center">
      <img src="assets/tela-dashboard.png" width="300px">
      <br>
      <i>Dashboard Principal</i>
    </td>
    <td align="center">
      <img src="assets/tela-checkin.png" width="300px">
      <br>
      <i>Tela de Check-in</i>
    </td>
  </tr>
  <tr>
    <td align="center">
      <img src="assets/tela-confirmar.png" width="300px">
      <br>
      <i>Confirmação de Ação</i>
    </td>
    <td align="center">
      <img src="assets/tela-reagendamento.png" width="300px">
      <br>
      <i>Reagendamento de Consultas</i>
    </td>
  </tr>
</table>

## ⚙️ Arquitetura de Dados (Modelagem)

Para sustentar a operação e a gamificação, o banco de dados relacional foi modelado contemplando o ecossistema médico:

<table>
  <tr>
    <td align="center">
      <img src="assets/mer-mod-logico.png" width="400px">
      <br>
      <i>Modelo Lógico</i>
    </td>
    <td align="center">
      <img src="assets/mer-mod-relacional.png" width="400px">
      <br>
      <i>Modelo Relacional</i>
    </td>
  </tr>
</table>

- **Tabelas Principais:** PACIENTE, MEDICO, CLINICA, CONSULTA.
- **Motor de Gamificação:** Estruturação das entidades MEDSYNC (status de nível e pontos), RECOMPENSA e RESGATE_RECOMPENSA para rastreabilidade de benefícios.

- 🛠️ Tecnologias Utilizadas
Modelagem de Dados: Oracle SQL / Relacional.

Design/Prototipação: Figma / UI Design.

Linguagens/Frameworks: (Liste aqui o que você usou de código: ex: Java Spring Boot, React, etc.)
