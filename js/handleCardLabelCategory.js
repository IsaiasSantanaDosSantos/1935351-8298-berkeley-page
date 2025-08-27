function applyVacancyLabels() {
  window.courseStore = courseStore;
  const dados = window.courseStore.get();

  // Adiciona o estilo uma vez
  if (!document.querySelector("style.labelStyle")) {
    const labelStyle = document.createElement("style");
    labelStyle.className = "labelStyle";
    labelStyle.textContent = `
      .numberVacancies {
           z-index: 2;
    padding: 4px 8px;
    color: #fff;
    border-radius: 19px;
    font-size: 13px;
    line-height: 20px;
    box-shadow: 0 0 41px -16px #000;
    order: 2;
    transition: all 300ms;
      }`;
    document.head.appendChild(labelStyle);
  }

  const cartTitle = document.querySelectorAll(
    ".allCoursesBox .coursesInfoContent"
  );
  cartTitle.forEach((title) => (title.style.order = "3"));
  dados.forEach((course) => {
    const id = course.id;
    const vagasStr = course?.camposPersonalizados?.["Total-de-Vagas"];
    if (!vagasStr) return;

    const vagas = parseInt(vagasStr, 10);
    if (Number.isNaN(vagas)) return;

    const card = document.getElementById(id);
    const courseCard = card?.querySelector(".coursesTextBoxes");

    if (!courseCard) return;

    // Evita criar duplicado // 725708
    if (courseCard.querySelector(".numberVacancies")) return;

    const label = document.createElement("span");
    label.dataset.id = id;
    label.className = "numberVacancies";

    if (vagas <= 0) {
      label.innerHTML =
        "Vagas <span style='font-weight:bold;'>esgotadas</span>";
      label.style.backgroundColor = "#747474";
    } else if (vagas < 5) {
      label.innerHTML = "Últimas <span style='font-weight:bold;'>vagas</span>";
      label.style.backgroundColor = "#FF2C2C";
    } else {
      label.innerHTML =
        "Vagas <span style='font-weight:bold;'>disponíveis</span>";
      label.style.backgroundColor = "#00C063";
    }

    // Adiciona no card (posição relativa)
    courseCard.appendChild(label);
  });

  setTimeout(() => {
    getMoreCourseEvent();
  }, 500);
}

function getMoreCourseEvent() {
  const moreBtn = document.querySelector(".moreBtn");
  const temasCourses = document.querySelectorAll(".temasCourses");
  const optionsCourses = document.querySelectorAll(".optionsCourses");
  if (moreBtn) {
    moreBtn.addEventListener("click", () => {
      // Aguarda os novos cards serem renderizados (ajuste o tempo se necessário)
      setTimeout(() => {
        applyVacancyLabels();
      }, 1000); // 500ms geralmente é suficiente
    });
  }
  if (temasCourses) {
    temasCourses.forEach((btn) => {
      btn.addEventListener("click", () => {
        // Aguarda os novos cards serem renderizados (ajuste o tempo se necessário)
        setTimeout(() => {
          applyVacancyLabels();
        }, 1000); // 500ms geralmente é suficiente
      });
    });
  }
  if (optionsCourses) {
    optionsCourses.forEach((btn) => {
      btn.addEventListener("click", () => {
        // Aguarda os novos cards serem renderizados (ajuste o tempo se necessário)
        setTimeout(() => {
          applyVacancyLabels();
        }, 1000); // 500ms geralmente é suficiente
      });
    });
  }
}
applyVacancyLabels();
