window.onload = () => {
    const miCanvas = document.getElementById('miCanvas');
    const ctx = miCanvas.getContext('2d');
    miCanvas.onmousemove = (e) => {
        let control = false;
        if (e.ctrlKey) {
            ctx.fillStyle = 'red';
            control = true;
        }else if (e.shiftKey) {
            ctx.fillStyle = 'blue';
            control = true;
        }else if(e.altKey){
            ctx.fillStyle = 'white';
            control = true;
        }
        if(control){
            const rect = miCanvas.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            ctx.fillRect(x, y, 2, 2);   
        }
    }
    const clearBtn = document.getElementById('clearBtn');
    clearBtn.addEventListener('click', () => {
        ctx.clearRect(0, 0, miCanvas.width, miCanvas.height);
    });
    //clearRect con esta funcion limpio el lienzo
}