/**************************************************************************************************************************************************
/* Global Objects 
/**************************************************************************************************************************************************/

let toc = [
  {'name': 'Presentaciones de clase', 'firstElem': true, 'lastElem': false, 'attribute': 'category', 'selected': false},
  {'name': 'Resúmenes de conceptos', 'firstElem': false, 'lastElem': false, 'attribute': 'category', 'selected': false},
  {'name': 'Trabajos prácticos', 'firstElem': false, 'lastElem': false, 'attribute': 'category', 'selected': false},
  {'name': 'Calculadoras y simulaciones', 'firstElem': false, 'lastElem': false, 'attribute': 'category', 'selected': false},
  {'name': 'Datos', 'firstElem': false, 'lastElem': false, 'attribute': 'category', 'selected': false},
  {'name': 'Resueltos', 'firstElem': false, 'lastElem': false, 'attribute': 'category', 'selected': false},
  {'name': 'Libros', 'firstElem': false, 'lastElem': false, 'attribute': 'category', 'selected': false},
  {'name': 'Otros', 'firstElem': false, 'lastElem': true, 'attribute': 'category', 'selected': false},
  {'name': 'Pendiente', 'firstElem': true, 'lastElem': false, 'attribute': 'status', 'selected': false},
  {'name': 'En progreso', 'firstElem': false, 'lastElem': false, 'attribute': 'status', 'selected': false},
  {'name': 'Realizado', 'firstElem': false, 'lastElem': true, 'attribute': 'status', 'selected': false},
  {'name': 'PDF', 'firstElem': true, 'lastElem': false, 'attribute': 'type', 'selected': false},
  {'name': 'Google Doc', 'firstElem': false, 'lastElem': false, 'attribute': 'type', 'selected': false},
  {'name': 'Google Slides', 'firstElem': false, 'lastElem': false, 'attribute': 'type', 'selected': false},
  {'name': 'Microsoft Excel', 'firstElem': false, 'lastElem': false, 'attribute': 'type', 'selected': false},
  {'name': 'Google Sheets', 'firstElem': false, 'lastElem': false, 'attribute': 'type', 'selected': false},
  {'name': 'Google Colab', 'firstElem': false, 'lastElem': true, 'attribute': 'type', 'selected': false},
  {'name': '3°1°', 'firstElem': true, 'lastElem': true, 'attribute': 'division', 'selected': false},
  {'name': 'U0: General', 'firstElem': true, 'lastElem': false, 'attribute': 'units', 'selected': false},
  {'name': 'U1: Estadística descriptiva', 'firstElem': false, 'lastElem': false, 'attribute': 'units', 'selected': false},
  {'name': 'U2: Introducción a la probabilidad', 'firstElem': false, 'lastElem': false, 'attribute': 'units', 'selected': false},
  {'name': 'U3: Variables aleatorias discretas', 'firstElem': false, 'lastElem': false, 'attribute': 'units', 'selected': false},
  {'name': 'U4: Variables aleatorias continuas', 'firstElem': false, 'lastElem': false, 'attribute': 'units', 'selected': false},
  {'name': 'U5: Variables aleatorias bidimensionales', 'firstElem': false, 'lastElem': false, 'attribute': 'units', 'selected': false},
  {'name': 'U6: Estimación de parámetros', 'firstElem': false, 'lastElem': false, 'attribute': 'units', 'selected': false},
  {'name': 'U7: Prueba de hipótesis', 'firstElem': false, 'lastElem': false, 'attribute': 'units', 'selected': false},
  {'name': 'U8: Regresión lineal ', 'firstElem': false, 'lastElem': true, 'attribute': 'units', 'selected': false},
];

// DOM objects
let resourceTableDOM = document.getElementById('resources-table');
let tocTableDOM = document.getElementById('nav-pane-toc-table');


/**************************************************************************************************************************************************
/* Main function to be executed after page load 
/**************************************************************************************************************************************************/

function main() {

  // Process data
  //processData();
    
  // Updates UI
  updateUi();
}


/**************************************************************************************************************************************************
/* Data functions 
/**************************************************************************************************************************************************/

// Process data
function processData() {

  
}


/**************************************************************************************************************************************************
/* GUI functions 
/**************************************************************************************************************************************************/

// Updates UI
function updateUi() {
  
  // Update navigation pane
  //updateNavigation();

  // Updates filters pane
  updateFilters();

  // Updates contents pane
  updateContents();
};

// Updates navigation pane
function updateNavigation() {
  
  let html = '';
  let rowClassHtml = '';
  let tocElemCount = -1;

  // Creates filters table html
  toc.forEach((tocElem, tocIx) => {
    if (tocElem.attribute == 'units') {
      tocElemCount = resources.filter(resource => resource.units.includes(parseInt(tocElem.name[1]))).length;
    } else {
      tocElemCount = resources.filter(resource => resource[tocElem.attribute] == tocElem.name).length;
    }
    rowClassHtml = `${tocElem.firstElem ? 'toc-row-first' : ''} 
                    ${tocElem.lastElem ? 'toc-row-last' : ''} 
                    ${tocElemCount > 0 ? '' : 'd-none'}`;
    // Row html
    html += `
      <tr id="toc-elem-${tocIx}" class="${rowClassHtml}" title="Seleccionar" onclick="toggleTocElem(${tocIx})" style="cursor:pointer">
        <td>
          <span class="badge badge-toc rounded-pill" style="width:30px">${tocElemCount}</span>
          ${tocElem.name}
        </td>
      </tr>
    `; 
  });

  // Updates filters table
  tocTableDOM.tBodies[0].innerHTML = html;
};


// Updates filters pane
function updateFilters() {
  
  let html = '';
  let valuesCount = -1;

  // Creates filters html > Not Units
  ['category', 'status', 'type', 'division'].forEach(filterName => {
    filterValues = [];
    resources.forEach(resource => {
      if (!filterValues.includes(resource[filterName]) && resource[filterName] !== '') {
        filterValues.push(resource[filterName]);
      }
    });
    html = '';
    filterValues.sort().forEach((filterValue, valueIx) => {
      valuesCount = resources.filter(resource => resource[filterName] == filterValue).length;
      html += `<li id="filter-${filterName}-${valueIx}" title="Seleccionar" onclick="toggleFilter('${filterName}', ${valueIx})" data-filter="${filterValue}">
                 <a class="dropdown-item" href="#">
                  <span class="badge badge-toc rounded-pill" style="width:30px;margin-right:5px">${valuesCount}</span>${filterValue}
                 </a>
               </li>`;
    });
    document.getElementById(`btn-${filterName}`).innerHTML = html;
  });

  // Creates filters html > Units
  filterValues = [];
  ['U0', 'U1', 'U2', 'U3', 'U4', 'U5', 'U6', 'U7', 'U8'].forEach(unitName => {
    valuesCount = resources.filter(resource => resource.units.includes(parseInt(unitName[1]))).length;
    if (valuesCount > 0) {
      filterValues.push(unitName);
    }
  });
  html = '';
  filterValues.sort().forEach((unitName, valueIx) => {
    valuesCount = resources.filter(resource => resource.units.includes(parseInt(unitName[1]))).length;
    html += `<li id="filter-units-${valueIx}"  title="Seleccionar" onclick="toggleFilter('units', ${valueIx})" data-filter="${unitName}">
               <a class="dropdown-item" href="#">
                <span class="badge badge-toc rounded-pill" style="width:30px;margin-right:5px">${valuesCount}</span>${unitName}
               </a>
             </li>`;
  });
  document.getElementById('btn-units').innerHTML = html;
};


// Updates contents pane
function updateContents() {
  
  // Updates resources > table view
  //resourceTableDOM.tBodies[0].innerHTML = createHtmlTableView();

  // Updates resources > card view
  resourceTableDOM.tBodies[0].innerHTML = createHtmlCardView();

  // Updates filter text
  document.getElementById('filter-text').innerHTML = `<span>Mostrando ${resources.length} de ${resources.length} recursos &nbsp;&nbsp; | &nbsp;&nbsp;</span>`;
};


// Creates HTML for table view
function createHtmlTableView() {

  let html = '';
  let statusHtlm = '';

  // Creates resources table html
  resources.forEach((resource, Ix) => {
    // Status badge html
    switch (resource.status) {
      case 'Pendiente':
        statusHtlm = `<span class="badge rounded-pill badge-status-pending" title="Estado">${resource.status}</span>`;
        break;

        case 'En progreso':
          statusHtlm = `<span class="badge rounded-pill badge-status-doing" title="Estado">${resource.status}</span>`;
          break;
    
      default:
        statusHtlm = '';
        break;
    }
    // Row html
    html += `
      <tr id="resource-${Ix}">
        <td>
          <p style="margin-top:20px"><a class="resource-name" href="${resource.url}" target="_blank" title="Abrir recurso">${resource.name}</a></p>
          <p style="font-size:90%;margin-top:20px">
            <span class="badge rounded-pill badge-ut" title="Unidades temáticas">U: ${resource.ut}</span>
            <span class="badge rounded-pill badge-category" title="Categoría">${resource.category}</span>
            ${statusHtlm}
            <span class="badge rounded-pill badge-type" title="Tipo">${resource.type}</span>
            <span class="badge rounded-pill badge-division" title="Tipo">${resource.division}</span>
          </p>
        </td>
      </tr>
    `; 
  });

  return html;
}


// Creates HTML for card view
function createHtmlCardView() {

  let html = '';
  let htmlCard = '';
  let statusHtlm = '';
  let cardsCount = 0;

  // Creates resources table html
  resources.forEach((resource, Ix) => {
    if (resource.active === undefined) {
      resource.active = true;
    }
    if (resource.active) {
      // Status badge html
      switch (resource.status) {
        case 'Pendiente':
          statusHtlm = `<span class="badge rounded-pill badge-status-pending" title="Estado">${resource.status}</span>`;
          break;

          case 'En progreso':
            statusHtlm = `<span class="badge rounded-pill badge-status-doing" title="Estado">${resource.status}</span>`;
            break;
      
        default:
          statusHtlm = '';
          break;
      }
      // Card html
      htmlCard = `
        <div id="resource-${Ix}" class="card h-100">
          <div class="card-body">
            <p class="card-title"><a class="resource-name" href="${resource.url}" target="_blank" title="Abrir recurso">${resource.name}</a></p>
            <p class="card-text" style="margin-top:20px;font-size:90%">
              <span class="badge rounded-pill badge-ut" title="Unidades temáticas">U: ${resource.ut}</span>
              <span class="badge rounded-pill badge-category" title="Categoría">${resource.category}</span>
              ${statusHtlm}
              <span class="badge rounded-pill badge-type" title="Tipo">${resource.type}</span>
              <span class="badge rounded-pill badge-division" title="Tipo">${resource.division}</span>
            </p>
            <p class="card-text" style="margin-top:20px;font-size:90%">
              ${resource.description == undefined ? '' : resource.description}
            </p>
          </div>
        </div>
      `;
      // Cards html
      if (cardsCount == 0) {
        html += `
          <div class="row row-cols-1 row-cols-md-2 g-4">
            <div class="col">
              ${htmlCard}
            </div>`;
        cardsCount++;
      } else {
        html += `
            <div class="col">
              ${htmlCard}
            </div>
          </div>
        `;
        cardsCount = 0;
      }
    }
  });

  return html;
}


// Toggle filter element
function toggleFilter(filterName, valueIx) {

  // Toggles element selection class
  document.getElementById(`filter-${filterName}-${valueIx}`).classList.toggle('filter-selected');

  // Toggles filter selection class
  if (document.getElementById(`btn-${filterName}`).getElementsByClassName('filter-selected').length > 0) {
    document.getElementById(`btn-${filterName}-label`).classList.add('filter-selected');
  } else {
    document.getElementById(`btn-${filterName}-label`).classList.remove('filter-selected');
  }

  // Applies filter
  applyFilter();
}


// Applies filter
function applyFilter() {

  let active = false;
  let activeResurces = 0;
  let filters = [];
  let filterValues = [];

  // Finds selected filters
  ['category', 'status', 'type', 'units', 'division'].forEach(filterName => {
    filterValues = document.getElementById(`btn-${filterName}`).getElementsByTagName('li');
    for (let filterValue of filterValues) {
      if (filterValue.classList.contains('filter-selected')) {
        filters.push({'name': filterName, 'value': filterValue.getAttribute('data-filter')});
      }
    }
  });

  // Updates resource active statis according to filters
  resources.forEach((resource, Ix) => {
    active = true;
    if (filters.length > 0) {
      filters.forEach(filter => {
        if (filter.name == 'units') {
          active &= resource.units.includes(parseInt(filter.value[1]));
        } else {
          active &= resource[filter.name] == filter.value;
        }
      });
    }
    resource.active = active;
  });

  // Updates resources > card view
  resourceTableDOM.tBodies[0].innerHTML = createHtmlCardView();

  // Updates filter text
  document.getElementById('filter-text').innerHTML = `Mostrando ${resources.filter(resource => resource.active).length} de ${resources.length} recursos &nbsp;&nbsp; | &nbsp;&nbsp;`;
};


/**************************************************************************************************************************************************
/* Other functions 
/**************************************************************************************************************************************************/

