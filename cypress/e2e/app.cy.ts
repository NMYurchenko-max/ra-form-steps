/// <reference types="cypress" />

describe('Учет спортивных тренировок - E2E тесты', () => {
  beforeEach(() => {
    cy.visit('/');
    cy.clearLocalStorage();
  });

  afterEach(() => {
    // Очищаем localStorage после каждого теста
    cy.clearLocalStorage();
  });

  it('Добавление новой тренировки', () => {
    cy.get('input[type="date"]').type('2023-07-20');
    cy.get('input[placeholder="Введите расстояние"]').type('5.5');
    cy.log('Ввод даты и расстояния завершен');
    cy.screenshot('before-add-training');
    cy.contains('Добавить').click();

    cy.get('table').contains('td', '20.07.2023');
    cy.get('table').contains('td', '5.5 км');
    cy.log('Запись успешно добавлена');
    cy.screenshot('after-add-training');
  });

  it('Редактирование тренировки', () => {
    // Добавляем запись
    cy.get('input[type="date"]').type('2023-07-21');
    cy.get('input[placeholder="Введите расстояние"]').type('3.0');
    cy.log('Добавлена запись для редактирования');
    cy.contains('Добавить').click();
    cy.screenshot('before-edit-training');

    // Нажимаем редактировать
    cy.get('table').contains('td', '21.07.2023').parent('tr').within(() => {
      cy.get('span[title="Редактировать"]').click();
    });
    cy.log('Вошли в режим редактирования');
    cy.screenshot('editing-mode');

    // Изменяем расстояние
    cy.get('input[placeholder="Введите расстояние"]').clear().type('4.0');
    cy.contains('Сохранить').click();

    cy.get('table').contains('td', '4.0 км');
    cy.log('Редактирование завершено');
    cy.screenshot('after-edit-training');
  });

  it('Удаление тренировки', () => {
    // Добавляем запись
    cy.get('input[type="date"]').type('2023-07-22');
    cy.get('input[placeholder="Введите расстояние"]').type('2.0');
    cy.log('Добавлена запись для удаления');
    cy.contains('Добавить').click();
    cy.screenshot('before-delete-training');

    // Удаляем запись
    cy.get('table').contains('td', '22.07.2023').parent('tr').within(() => {
      cy.get('span[title="Удалить"]').click();
    });

    cy.get('table').should('not.contain', '22.07.2023');
    cy.log('Запись успешно удалена');
    cy.screenshot('after-delete-training');
  });

  it('Валидация формы', () => {
    cy.contains('Добавить').click();
    cy.get('input[type="date"]').should('have.attr', 'required');
    cy.get('input[placeholder="Введите расстояние"]').should('have.attr', 'required');
    cy.log('Проверка валидации формы');
    cy.screenshot('form-validation');
  });
});
