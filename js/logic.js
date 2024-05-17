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

  // Updates contents pane
  updateContents();
};

// Updates navigation pane
function updateNavigation() {
  
  let html = '';
  let rowClassHtml = '';
  let tocElemCount = -1;

  // Creates resources table html
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

  // Updates resources table
  tocTableDOM.tBodies[0].innerHTML = html;
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
      <div class="card h-100">
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
  });

  return html;
}


// Toggle toc element
function toggleTocElem(tocIx) {

  // Toggles element selection class
  document.getElementById(`toc-elem-${tocIx}`).classList.toggle('toc-selected');

  // Updates selection status
  toc[tocIx].selected = toc[tocIx].selected ? false : true;

  // Applies filter
  applyFilter(tocIx);
}


// Applies filter
function applyFilter() {

  let active = false;
  let activeResurces = 0;
  let tocSelected = [];

  // Shows/hides resource according to filter selection
  resources.forEach((resource, Ix) => {
    active = true;
    tocSelected = toc.filter(tocElem => tocElem.selected);
    if (tocSelected.length > 0) {
      tocSelected.forEach(tocElem => {
        if (tocElem.attribute == 'units') {
          active &= resource.units.includes(parseInt(tocElem.name[1]));
        } else {
          active &= resource[tocElem.attribute] == tocElem.name;
        }
      });
    }
    if (active) {
      document.getElementById(`resource-${Ix}`).classList.remove('d-none');
      activeResurces++;
    } else {
      document.getElementById(`resource-${Ix}`).classList.add('d-none');
    }
  });

  // Updates filter text
  document.getElementById('filter-text').innerHTML = `Mostrando ${activeResurces} de ${resources.length} recursos`;
};


/**************************************************************************************************************************************************
/* Other functions 
/**************************************************************************************************************************************************/

