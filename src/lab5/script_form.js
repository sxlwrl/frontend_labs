'use strict';

const btn = document.querySelector('button');

const printFields = {
    '.name': {
        label: 'ПІБ: ',
        target: '.name-print',
        regex: /^[а-щА-ЩЬьЮюЯяЇїІіЄєҐґ']+([-\s][а-щА-ЩЬьЮюЯяЇїІіЄєҐґ']+)*\s[а-щА-ЩЬьЮюЯяЇїІіЄєҐґ']+([-\s][а-щА-ЩЬьЮюЯяЇїІіЄєҐґ']+)*\s[а-щА-ЩЬьЮюЯяЇїІіЄєҐґ']+([-\s][а-щА-ЩЬьЮюЯяЇїІіЄєҐґ']+)*$/
    },
    '.group': {
        label: 'Група: ',
        target: '.group-print',
        regex: /^[а-щА-ЩЬьЮюЯяЇїІіЄєҐґ']+([-\s]\d{2})$/,
    },
    '.phone': {
        label: 'Телефон: ',
        target: '.phone-print',
        regex: /^\(\d{3}\)-\d{3}-\d{2}-\d{2}$/,
    },
    '.address': {
        label: 'Адреса: ',
        target: '.address-print',
        regex:  /^м\.\s[а-щА-ЩЬьЮюЯяЇїІіЄєҐґ']+$/,
    },
    '.email': {
        label: 'Пошта: ',
        target: '.email-print',
        regex: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.com$/,
    }
};

const getElement = function (element) {
    const inputElement = document.querySelector(element);
    const inputValue = inputElement.value;
    return [inputElement, inputValue];
}

const validateForm = function (field, regex) {
    const [inputElement, inputValue] = getElement(field);
    const isValid = regex.test(inputValue);
    inputElement.classList.toggle('error', !isValid);
    return isValid;
};

const printElement = function (field, value) {
    document.querySelector(printFields[field].target).innerHTML = `${printFields[field].label}${value}`;
};

function submitForm(e) {
    e.preventDefault();

    let hasErrors = false;

    for (const field of Object.keys(printFields)) {
        const isValid = validateForm(field, printFields[field].regex);

        if (!isValid) {
            hasErrors = true;
        }
    }

    if (!hasErrors) {
        for (const field of Object.keys(printFields)) {
            const [_, value] = getElement(field);
            printElement(field, value);
        }
    }
}

btn.addEventListener('click', submitForm);
