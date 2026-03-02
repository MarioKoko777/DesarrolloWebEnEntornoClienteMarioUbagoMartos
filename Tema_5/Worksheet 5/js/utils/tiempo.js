// utils/tiempo.js
const TiempoUtils = {
    calcularTiempoTranscurrido(fechaCreacion) {
        const ahora = new Date().getTime();
        const diferenciaMs = ahora - fechaCreacion;
        
        const minutos = Math.floor(diferenciaMs / (1000 * 60));
        const horas = Math.floor(minutos / 60);
        const dias = Math.floor(horas / 24);
        
        if (minutos < 1) {
            return 'hace unos segundos';
        } else if (minutos === 1) {
            return 'hace 1 minuto';
        } else if (minutos < 60) {
            return `hace ${minutos} minutos`;
        } else if (horas === 1) {
            return 'hace 1 hora';
        } else if (horas < 24) {
            return `hace ${horas} horas`;
        } else if (dias === 1) {
            return 'hace 1 día';
        } else {
            return `hace ${dias} días`;
        }
    },
    
    formatearFechaCompleta(timestamp) {
        const fecha = new Date(timestamp);
        return fecha.toLocaleString('es-ES', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    }
};