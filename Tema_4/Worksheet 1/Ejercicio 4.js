window.onload = () => {
    const miCanvas = document.getElementById('miCanvas');
    const ctx = miCanvas.getContext('2d');
    miCanvas.onmousemove = (e) => {
        let control = false;
        if (e.ctrlKey) {
            ctx.fillStyle = 'red';
            control = true;
        } else if (e.shiftKey) {
            ctx.fillStyle = 'blue';
            control = true;
        }
        if(control){
            const rect = miCanvas.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            ctx.fillRect(x, y, 2, 2);   
        }
    }
}