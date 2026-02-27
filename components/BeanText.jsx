import { useRef, useEffect } from "react";

function BeanText({ word, fontSize = 120 }) {
  const ref = useRef(null);
  useEffect(() => {
    const c = ref.current; if (!c) return;
    const ctx = c.getContext("2d");
    ctx.clearRect(0,0,c.width,c.height);
    ctx.font = `900 ${fontSize}px 'Playfair Display', Georgia, serif`;
    ctx.textAlign="center"; ctx.textBaseline="middle"; ctx.fillStyle="#fff";
    ctx.fillText(word, c.width/2, c.height/2);
    const img = ctx.getImageData(0,0,c.width,c.height);
    ctx.clearRect(0,0,c.width,c.height);
    for (let y=0; y<c.height; y+=11) {
      for (let x=0; x<c.width; x+=11) {
        if (img.data[(y*c.width+x)*4+3] > 100) {
          const l = 18 + Math.random()*18;
          ctx.save(); ctx.translate(x,y); ctx.rotate((Math.random()-0.5)*Math.PI);
          ctx.fillStyle=`hsl(22,75%,${l}%)`;
          ctx.beginPath(); ctx.ellipse(0,0,4.5,3,0,0,Math.PI*2); ctx.fill();
          ctx.fillStyle=`hsla(30,80%,${l+18}%,0.5)`;
          ctx.beginPath(); ctx.ellipse(-1.2,-1,1.5,0.9,-0.4,0,Math.PI*2); ctx.fill();
          ctx.strokeStyle=`hsl(20,65%,${l-8}%)`; ctx.lineWidth=0.7;
          ctx.beginPath(); ctx.moveTo(-3.5,0); ctx.lineTo(3.5,0); ctx.stroke();
          ctx.restore();
        }
      }
    }
  }, [word, fontSize]);
  return <canvas ref={ref} width={word.length>4?680:420} height={fontSize*1.6} style={{ width:"100%", maxWidth:560 }} />;
}

export default BeanText;
