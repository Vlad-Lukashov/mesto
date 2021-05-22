
// Получаем поля профиля
const fieldName = document.querySelector(".profile__title");
const fieldJob = document.querySelector(".profile__subtitle");
// Получаем кнопку edit
const editButton = document.querySelector(".profile__edit");
// Получаем поля popup
const popupContainer = document.querySelector(".popup");
const closeButton = popupContainer.querySelector(".popup__close");
const activeClass = "popup_open";
// Получаем поля form
const form = popupContainer.querySelector(".form");
const inputName = popupContainer.querySelector(".form__input_type_name");
const inputJob = popupContainer.querySelector(".form__input_type_job");
const submitButton = form.querySelector(".form__submit");

// Функция открытия popup
function openPopup(event) {
  event.preventDefault();
  inputName.value = fieldName.textContent;
  inputJob.value = fieldJob.textContent;
  popupContainer.classList.add(activeClass);
}
// Фунция проверки полей на валидность. На вход получаем контейнеры для каждого input__text
function validate(formFields) {
  let validForm = true; // Изначально форма валидна
  // Идём по каждому полю (если будет больше полей)
  formFields.forEach((field) => {
    let inputValue = field.querySelector(".form__input").value.trim(); // Получаем value у инпута и обрезаем ненужны пробелы
    let errMessage = field.querySelector(".form__error-message"); // Получаем поле нотификации

    if (inputValue === "") {
      // Если поле пустое
      errMessage.classList.add("form__error-message_active");
      errMessage.textContent = "поле обязательно к заполнению";
      validForm = false;
    } else if (inputValue.length > 29) {
      // Если заполнено больше 30 символов
      errMessage.classList.add("form__error-message_active");
      errMessage.textContent = "введите имя отчество по-русски";
      validForm = false;
    } else {
      // Если всё хорошо
      errMessage.classList.remove("form__error-message_active");
    }
  });
  return validForm;
}
// Функция сохранения данных
function formSubmitHandler(event) {
  event.preventDefault();

  const fields = form.querySelectorAll(".form__field"); // Получаем все input для передачи на валидацию

  if (validate(fields)) {
    // Если всё хорошо - заполняем данными и закрываем форму ввода
    fieldName.textContent = inputName.value;
    fieldJob.textContent = inputJob.value;
    popupContainer.classList.remove(activeClass);
  }
}

function closePopup() {
  const errorsMsg = document.querySelectorAll(".form__error-message");
  errorsMsg.forEach((item) =>
    item.classList.remove("form__error-message_active")
  );
  popupContainer.classList.remove(activeClass);
}

editButton.addEventListener("click", openPopup);
form.addEventListener("submit", formSubmitHandler);
closeButton.addEventListener("click", closePopup);
