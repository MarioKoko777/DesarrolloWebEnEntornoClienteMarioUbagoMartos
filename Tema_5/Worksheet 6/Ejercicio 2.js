// Variables globales para controlar el estado de los datos
let currentDataset = 'original'; // 'original' o 'nuevo'
let timerInterval;
let timeLeft = 10;

// Cargar Google Charts
google.charts.load('current', {
    'packages': ['corechart', 'geochart']
});

// Dibujar los gráficos cuando se cargue la librería
google.charts.setOnLoadCallback(initializeCharts);

function initializeCharts() {
    drawCharts();
    startTimer();
    
    // Event listeners para los botones
    document.getElementById('resetTimerBtn').addEventListener('click', resetTimer);
    document.getElementById('forceUpdateBtn').addEventListener('click', forceUpdate);
}

function drawCharts() {
    drawBarChart();
    drawPieChart();
    drawGeoChart();
}

// Función para obtener datos según el dataset actual
function getCongressData() {
    if (currentDataset === 'original') {
        // Datos originales (últimas elecciones)
        return {
            barData: [
                ['PP', 137, '#0055A0'],
                ['PSOE', 121, '#E30613'],
                ['VOX', 33, '#63BE21'],
                ['Sumar', 31, '#5E227F'],
                ['ERC', 7, '#FFB232'],
                ['Junts', 7, '#003366'],
                ['EH Bildu', 6, '#FCDB05'],
                ['PNV', 5, '#008000'],
                ['BNG', 1, '#2D6AB4'],
                ['CCa', 1, '#FCE300'],
                ['UPN', 1, '#C8102E']
            ],
            pieData: [
                ['PP', 137],
                ['PSOE', 121],
                ['VOX', 33],
                ['Sumar', 31],
                ['ERC', 7],
                ['Junts', 7],
                ['EH Bildu', 6],
                ['PNV', 5],
                ['Otros', 3]
            ]
        };
    } else {
        // NUEVOS DATOS - Simulando una nueva encuesta con cambios significativos
        return {
            barData: [
                ['PP', 142, '#0055A0'],      // +5
                ['PSOE', 115, '#E30613'],     // -6
                ['VOX', 35, '#63BE21'],       // +2
                ['Sumar', 28, '#5E227F'],     // -3
                ['ERC', 8, '#FFB232'],        // +1
                ['Junts', 6, '#003366'],      // -1
                ['EH Bildu', 7, '#FCDB05'],   // +1
                ['PNV', 5, '#008000'],        // = 
                ['BNG', 2, '#2D6AB4'],        // +1
                ['CCa', 1, '#FCE300'],        // =
                ['UPN', 1, '#C8102E']         // =
            ],
            pieData: [
                ['PP', 142],
                ['PSOE', 115],
                ['VOX', 35],
                ['Sumar', 28],
                ['ERC', 8],
                ['Junts', 6],
                ['EH Bildu', 7],
                ['PNV', 5],
                ['Otros', 4]  // BNG, CCa, UPN
            ]
        };
    }
}

// Gráfico de barras - Congreso con animación
function drawBarChart() {
    const data = getCongressData();
    
    var chartData = new google.visualization.DataTable();
    chartData.addColumn('string', 'Partido');
    chartData.addColumn('number', 'Escaños');
    chartData.addColumn({type: 'string', role: 'style'});
    
    chartData.addRows(data.barData);

    var options = {
        title: currentDataset === 'original' ? 
               'Distribución de Escaños en el Congreso (Actual)' : 
               'Distribución de Escaños en el Congreso (Nueva Encuesta)',
        titleTextStyle: {
            fontSize: 16,
            bold: true,
            color: '#764ba2'
        },
        chartArea: {
            width: '65%',
            height: '70%'
        },
        legend: {
            position: 'none'
        },
        vAxis: {
            title: 'Número de Escaños',
            minValue: 0,
            format: '0',
            gridlines: {
                count: 6
            }
        },
        hAxis: {
            title: 'Partidos Políticos',
            slantedText: true,
            slantedTextAngle: 45
        },
        animation: {
            startup: true,
            duration: 1500,  // Animación de 1.5 segundos
            easing: 'out'     // Efecto de salida suave
        },
        bar: {
            groupWidth: '70%'
        }
    };

    var chart = new google.visualization.ColumnChart(document.getElementById('barchart'));
    chart.draw(chartData, options);
}

// Gráfico de sectores - Congreso con animación
function drawPieChart() {
    const data = getCongressData();
    
    var chartData = new google.visualization.DataTable();
    chartData.addColumn('string', 'Partido');
    chartData.addColumn('number', 'Escaños');
    
    chartData.addRows(data.pieData);

    var options = {
        title: currentDataset === 'original' ? 
               'Distribución de Escaños por Partido (Actual)' : 
               'Distribución de Escaños por Partido (Nueva Encuesta)',
        titleTextStyle: {
            fontSize: 16,
            bold: true,
            color: '#764ba2'
        },
        pieHole: 0,
        pieSliceText: 'percentage',
        slices: {
            0: {color: '#0055A0'},   // PP
            1: {color: '#E30613'},   // PSOE
            2: {color: '#63BE21'},   // VOX
            3: {color: '#5E227F'},   // Sumar
            4: {color: '#FFB232'},   // ERC
            5: {color: '#003366'},   // Junts
            6: {color: '#FCDB05'},   // EH Bildu
            7: {color: '#008000'},   // PNV
            8: {color: '#808080'}    // Otros
        },
        legend: {
            position: 'labeled',
            textStyle: {
                fontSize: 11
            }
        },
        tooltip: {
            text: 'percentage'
        },
        chartArea: {
            width: '90%',
            height: '80%'
        },
        animation: {
            startup: true,
            duration: 1500,  // Animación de 1.5 segundos
            easing: 'out'
        }
    };

    var chart = new google.visualization.PieChart(document.getElementById('piechart'));
    chart.draw(chartData, options);
}

// Gráfico geográfico (sin cambios)
function drawGeoChart() {
    var data = new google.visualization.DataTable();
    data.addColumn('string', 'País');
    data.addColumn('number', 'Visitantes (millones)');
    
    data.addRows([
        ['FR', 89.4],
        ['ES', 83.7],
        ['US', 79.3],
        ['IT', 64.5],
        ['TR', 51.2],
        ['MX', 45.0],
        ['TH', 39.8],
        ['DE', 38.5],
        ['GB', 37.5],
        ['AT', 31.2],
        ['GR', 31.0],
        ['PT', 25.6],
        ['RU', 24.4],
        ['CA', 22.1],
        ['PL', 21.6],
        ['NL', 20.1],
        ['SA', 18.2],
        ['HU', 17.5],
        ['HR', 16.9],
        ['JP', 16.8],
        ['HK', 15.9],
        ['AE', 15.8],
        ['MY', 14.7],
        ['CH', 12.4],
        ['EG', 11.7]
    ]);

    var options = {
        title: 'Top 25 Países más Visitados del Mundo (millones de turistas)',
        titleTextStyle: {
            fontSize: 16,
            bold: true,
            color: '#764ba2'
        },
        colorAxis: {
            colors: ['#FFF3E0', '#FFB74D', '#FF9800', '#F57C00', '#E65100'],
            minValue: 10,
            maxValue: 90
        },
        backgroundColor: '#fafafa',
        datalessRegionColor: '#E0E0E0',
        legend: {
            textStyle: { fontSize: 12 },
            numberFormat: '###.## millones'
        },
        tooltip: {
            textStyle: { fontSize: 12 },
            trigger: 'focus'
        },
        region: 'world',
        resolution: 'countries',
        enableRegionInteractivity: true,
        keepAspectRatio: true
    };

    var chart = new google.visualization.GeoChart(document.getElementById('geochart'));
    chart.draw(data, options);
}

// Función para cambiar los datos con animación
function toggleDataset() {
    // Cambiar el dataset
    currentDataset = currentDataset === 'original' ? 'nuevo' : 'original';
    
    // Actualizar el texto indicador
    const dataVersion = document.getElementById('dataVersion');
    const timerBadge = document.getElementById('timerBadge');
    
    if (currentDataset === 'original') {
        dataVersion.innerHTML = '📊 Datos actuales: Últimas elecciones';
        dataVersion.style.color = '#555';
    } else {
        dataVersion.innerHTML = '📊 Datos actuales: Nueva encuesta (simulada)';
        dataVersion.style.color = '#E30613';
    }
    
    // Añadir efecto visual de cambio
    dataVersion.classList.add('data-changed');
    setTimeout(() => {
        dataVersion.classList.remove('data-changed');
    }, 1000);
    
    // Redibujar solo los gráficos del Congreso con animación
    drawBarChart();
    drawPieChart();
}

// Iniciar el contador
function startTimer() {
    timeLeft = 10;
    updateTimerDisplay();
    
    timerInterval = setInterval(() => {
        timeLeft--;
        updateTimerDisplay();
        
        if (timeLeft <= 0) {
            // Cambiar los datos automáticamente
            toggleDataset();
            // Reiniciar el contador
            timeLeft = 10;
            updateTimerDisplay();
        }
    }, 1000);
}

// Actualizar la visualización del temporizador
function updateTimerDisplay() {
    const timerBadge = document.getElementById('timerBadge');
    timerBadge.innerHTML = `⏱️ Cambio de datos en: ${timeLeft}s`;
    
    // Cambiar color cuando queden pocos segundos
    if (timeLeft <= 3) {
        timerBadge.style.background = '#ff4757';
        timerBadge.style.animation = 'pulse 0.5s infinite';
    } else {
        timerBadge.style.background = '#ff6b6b';
        timerBadge.style.animation = 'pulse 2s infinite';
    }
}

// Reiniciar el temporizador
function resetTimer() {
    clearInterval(timerInterval);
    timeLeft = 10;
    updateTimerDisplay();
    startTimer();
    
    // Feedback visual
    const resetBtn = document.getElementById('resetTimerBtn');
    resetBtn.style.background = '#45b7aa';
    setTimeout(() => {
        resetBtn.style.background = '#4ecdc4';
    }, 200);
}

// Forzar actualización manual
function forceUpdate() {
    clearInterval(timerInterval);
    toggleDataset();
    resetTimer();
}

// Redibujar gráficos cuando cambie el tamaño de la ventana
window.addEventListener('resize', function() {
    drawBarChart();
    drawPieChart();
    drawGeoChart();
});