import './css/styles.css';
import fetchCountries from './fetchCountries';
import Notiflix from 'notiflix';

var debounce = require('lodash.debounce');

const DEBOUNCE_DELAY = 300;

const inputCountry = document.querySelector('#search-box');
const countryList = document.querySelector('.country-list');
const countryInfo = document.querySelector('.country-info');

inputCountry.addEventListener('input', debounce(inputListener, DEBOUNCE_DELAY));

function inputListener(event) {
  const countryForSearch = inputCountry.value.trim();
  if (countryForSearch !== '') {
    fetchCountries(countryForSearch).then(renderCountries);
  }
}

function renderCountries(arrayCountries) {
  const countries = arrayCountries;
  countryInfo.innerHTML = `<div class="country-info"></div>`;
  countryList.innerHTML = `<ul class="country-list"></ul>`;

  if (arrayCountries.length === 1) {
    for (const country of countries) {
      //   console.log(country.flags.svg);
      //   console.log(country.name.official);
      //   console.log(country.capital[0]);
      //   console.log(country.population);
      //   console.log(Object.values(country.languages).toString());

      countryInfo.innerHTML = `<div class="country-info">
          <img src="${
            country.flags.svg
          }" alt="" width="40"/>  <span class="fat-text">${
        country.name.official
      }</span>
          <p> Capital: ${country.capital[0]}</p>
          <p> Population: ${country.population}</p>
          <p> Languages: ${Object.values(country.languages).toString()}</p>
          </div>`;
    }
  }

  if (arrayCountries.length >= 2 && arrayCountries.length <= 10) {
    for (const country of countries) {
      countryList.insertAdjacentHTML(
        'beforeend',
        `<li>
          <img src="${country.flags.svg}" alt="" width="20"/> <span>  ${country.name.official}</span>
        </li>`
      );
    }
  }

  if (arrayCountries.length > 10) {
    Notiflix.Notify.success(
      'Too many matches found. Please enter a more specific name.'
    );
  }
}
