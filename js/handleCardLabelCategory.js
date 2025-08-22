function applyVacancyLabels() {
  window.courseStore = courseStore;
  const dados = window.courseStore.get();
  const courses = dados?.coursesList?.course ?? [];
  console.log("Dados: ", dados);

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
      }`;
    document.head.appendChild(labelStyle);
  }

  const cartTitle = document.querySelectorAll(
    ".allCoursesBox .coursesInfoContent"
  );
  cartTitle.forEach((title) => (title.style.order = "3"));

  console.log("courses: ", courses);
  courses.forEach((course) => {
    const id = course.id;
    const vagasStr = course?.camposPersonalizados?.["Total-de-Vagas"];
    if (!vagasStr) return;

    const vagas = parseInt(vagasStr, 10);
    if (Number.isNaN(vagas)) return;

    const card = document.getElementById(id);
    const courseCard = card?.querySelector(".coursesTextBoxes");

    // const courseCard = document.querySelector(`#${id} .coursesTextBoxes`);
    console.log("courseCard: ", courseCard);
    if (!courseCard) return;

    // Evita criar duplicado
    if (courseCard.querySelector(".numberVacancies")) return;

    const label = document.createElement("span");
    label.className = "numberVacancies";

    if (vagas <= 0) {
      label.innerHTML =
        "Vagas <span style='font-weight:bold;'>esgotadas</span>";
      label.style.backgroundColor = "#747474";
    } else if (vagas < 6) {
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
  getMoreCourseEvent();
}

function getMoreCourseEvent() {
  const moreBtn = document.querySelector(".moreBtn");
  if (moreBtn) {
    moreBtn.addEventListener("click", () => {
      console.log("Clicou");

      // Aguarda os novos cards serem renderizados (ajuste o tempo se necessário)
      setTimeout(() => {
        applyVacancyLabels();
      }, 1000); // 500ms geralmente é suficiente
    });
  }
}
applyVacancyLabels();
