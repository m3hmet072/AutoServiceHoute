import '../../css/sections/question-section.css'

export function renderQuestionSection({svg, title, subtitle, questions = []} = {}) {
    const container = document.getElementById('question-section')
    if (!container) return

    const questionsHTML = questions.map(q => `
      <article class="question-card">
        <div class="question-card-left">
          <div class="icon">${svg}</div>
        </div>
        <div class="question-card-right">
          <h4 class="question-title">${q.title}</h4>
          <p class="question-text">${q.answer}</p>
        </div>
      </article>
    `).join('')

    container.innerHTML = `
    <section class="question-section">
      <div class="question-inner">
        <h3 class="section-subtitle">${subtitle}</h3>
        <h2 class="section-title">${title}</h2>

        <div class="questions-list">
          ${questionsHTML}
        </div>
      </div>
    </section>
  `
}
