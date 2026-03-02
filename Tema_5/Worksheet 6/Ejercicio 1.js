// Cargar Google Charts
google.charts.load('current', {
    'packages': ['corechart', 'geochart']
});

// Dibujar los gráficos cuando se cargue la librería
google.charts.setOnLoadCallback(drawCharts);

function drawCharts() {
    drawBarChart();
    drawPieChart();
    drawGeoChart();
}

// Gráfico de barras - Congreso
function drawBarChart() {
    // Crear la tabla de datos
    var data = new google.visualization.DataTable();
    data.addColumn('string', 'Partido');
    data.addColumn('number', 'Escaños');
    
    data.addRows([
        ['PP', 137],
        ['PSOE', 121],
        ['VOX', 33],
        ['Sumar', 31],
        ['ERC', 7],
        ['Junts', 7],
        ['EH Bildu', 6],
        ['PNV', 5],
        ['BNG', 1],
        ['CCa', 1],
        ['UPN', 1]
    ]);

    var options = {
        title: 'Distribución de Escaños en el Congreso',
        titleTextStyle: {
            fontSize: 16,
            bold: true,
            color: '#764ba2'
        },
        chartArea: {
            width: '65%',
            height: '70%'
        },
        colors: ['#0055A0', '#E30613', '#63BE21', '#5E227F', '#FFB232', 
                '#003366', '#FCDB05', '#008000', '#2D6AB4', '#FCE300', '#C8102E'],
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
            duration: 1000,
            easing: 'out'
        },
        bar: {
            groupWidth: '70%'
        }
    };

    var chart = new google.visualization.ColumnChart(document.getElementById('barchart'));
    chart.draw(data, options);
}

// Gráfico de sectores - Congreso
function drawPieChart() {
    // Crear la tabla de datos
    var data = new google.visualization.DataTable();
    data.addColumn('string', 'Partido');
    data.addColumn('number', 'Escaños');
    
    data.addRows([
        ['PP', 137],
        ['PSOE', 121],
        ['VOX', 33],
        ['Sumar', 31],
        ['ERC', 7],
        ['Junts', 7],
        ['EH Bildu', 6],
        ['PNV', 5],
        ['Otros', 3]  // Agrupando BNG, CCa, UPN
    ]);

    var options = {
        title: 'Distribución de Escaños por Partido',
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
            duration: 1000,
            easing: 'out'
        }
    };

    var chart = new google.visualization.PieChart(document.getElementById('piechart'));
    chart.draw(data, options);
}

// Gráfico geográfico - Países más turísticos (CORREGIDO)
function drawGeoChart() {
    // Crear la tabla de datos - SOLO 2 COLUMNAS como requiere GeoChart
    var data = new google.visualization.DataTable();
    data.addColumn('string', 'País');
    data.addColumn('number', 'Visitantes (millones)');
    
    data.addRows([
        ['Francia', 89.4],
        ['España', 83.7],
        ['Estados Unidos', 79.3],
        ['Italia', 64.5],
        ['Turquía', 51.2],
        ['México', 45.0],
        ['Tailandia', 39.8],
        ['Alemania', 38.5],
        ['Reino Unido', 37.5],
        ['Austria', 31.2],
        ['Grecia', 31.0],
        ['Portugal', 25.6],
        ['Rusia', 24.4],
        ['Canadá', 22.1],
        ['Polonia', 21.6],
        ['Países Bajos', 20.1],
        ['Arabia Saudita', 18.2],
        ['Hungría', 17.5],
        ['Croacia', 16.9],
        ['Japón', 16.8],
        ['Hong Kong', 15.9],
        ['Emiratos Árabes', 15.8],
        ['Malasia', 14.7],
        ['Suiza', 12.4],
        ['Egipto', 11.7]
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
            textStyle: {
                fontSize: 12
            },
            numberFormat: '###.## millones'
        },
        tooltip: {
            textStyle: {
                fontSize: 12
            },
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

// Redibujar gráficos cuando cambie el tamaño de la ventana
window.addEventListener('resize', function() {
    drawBarChart();
    drawPieChart();
    drawGeoChart();
});