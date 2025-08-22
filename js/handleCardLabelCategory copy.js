function getCategoryInformation() {
  // pegar os dados do store
  window.courseStore = courseStore;
  const dados = window.courseStore.get();
  console.log("Dados: ", dados);
  // lista de cursos (ou array vazio se não vier)
  const courses = dados?.coursesList?.course ?? [];
  // if (!Array.isArray(courses) || courses.length === 0) return;

  // percorre e coleta as vagas (quando existirem)
  courses.forEach((course, index) => {
    const vagasStr = course?.camposPersonalizados?.["Total-de-Vagas"];
    if (vagasStr != null) {
      const vagasNum = Number.parseInt(vagasStr, 10);
      if (!Number.isNaN(vagasNum)) {
        console.log(
          `Curso #${index} (id: ${course.id}) → Total-de-Vagas:`,
          vagasNum
        );
        handleLabel(course.id);
      }
    }
  });
}

function handleLabel(card) {
  const descriptionBox = document.querySelector(".containerFirstColumn");
  const formBox = document.querySelector(".containerSecundColumn");
  const header = document.querySelector(".headerContainer");
  let labelBox = header.querySelector(".numberVacancies");
  //   Label style
  const labelStyle = document.createElement("style");
  labelStyle.className = "labelStyle";
  labelStyle.textContent = `.numberVacancies {
  position: absolute;
  bottom: -55px;
  left: 0;
  z-index: 2;
  padding: 10px 15px;
  color: #fff;
  border-radius: 19px;
  font-size: 17px;
  line-height: 20px;
  box-shadow: 0 0 41px -16px #000;
}
@media (max-width: 992px) {
  .numberVacancies {
    bottom: -76px;
  }
}
@media (max-width: 768px) {
  .numberVacancies {
    left: calc(50% - 92.5px);
  }
}
@media (max-width: 576px) {
  .numberVacancies {
    bottom: -65px;
  }
}`;

  if (!labelBox) {
    labelBox = document.createElement("span");
    labelBox.className = "numberVacancies";
    header.appendChild(labelBox);
    header.appendChild(labelStyle);
  }

  if (vagas <= 0) {
    labelBox.innerHTML =
      "Vagas <span style='font-weight:bold;'>esgotadas</span>";
    labelBox.style.backgroundColor = "#747474";
    descriptionBox.style.width = "100%";
    formBox.style.display = "none";
  } else if (vagas < 6) {
    labelBox.innerHTML = "Últimas <span style='font-weight:bold;'>vagas</span>";
    labelBox.style.backgroundColor = "#FF2C2C";
  } else {
    labelBox.innerHTML =
      "Vagas <span style='font-weight:bold;'>disponíveis</span>";
    labelBox.style.backgroundColor = "#00C063";
  }
}

getCategoryInformation();
