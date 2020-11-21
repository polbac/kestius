

<script>
import { onMount, onDestroy } from 'svelte'
import { isServer } from '../../util/universal'
	

let video
let audio1
let audio2
let loop = 1
let interval
let words = ["","","","","","","","","","","","",]
let audio2Duration
let timeout



onMount(() => {
    document.title = "I D O L O"
    video = document.getElementById("video")
    audio1 = document.getElementById("audio1")
    audio2 = document.getElementById("audio2")
    interval = setInterval(tick, 50)
    words = [
        ...words,
        ...document.getElementById("p2-texto").innerText.split("")
    ]
    document.getElementById("p2-texto").innerText = ""

    audio1.onended = audio1End
    video.onended = audio2End
    

    window.addEventListener('resize', resize);

    

    resize()
})

const resize = () => {
    const width  = window.innerWidth || document.documentElement.clientWidth || 
        document.body.clientWidth;
    const height = window.innerHeight|| document.documentElement.clientHeight|| 
        document.body.clientHeight;
    const size = width > height ? width : height;
    
    video.style.width = `${size}px`
    video.style.height = `${size}px`
}

onDestroy(() => {

})

const tick = () => {
    const currentTime = video.currentTime
    
    if (loop === 1) {
        if (currentTime > 3.8 && !timeout) {
            video.pause()
            timeout = setTimeout(() => {
                video.play()
                video.currentTime = 3.2
                timeout = null
            }, 5000)
            
         }
        return
    }

    //if (currentTime > 6) video.currentTime = 5

    const audio2CurrentTime = audio2.currentTime
    const audio2Percent = audio2CurrentTime * 100 / audio2Duration 
    
    const sliceIndex = Math.ceil(words.length * (audio2Percent / 100))
    
    const allWords = words.slice(0, sliceIndex)
    
    document.getElementById("p2-texto").innerText = allWords.join("")
}

const audio1End = () => {

    document.getElementById("p2").style.display = "block"
    audio2Duration = audio2.duration
    audio2.currentTime = 0
    audio2.play()
    loop = 2

}

const audio2End = () => {
    document.getElementById("start").style.display = "block"
    document.getElementById("video").style.display = "none"
}


const start = () => {
    video.play()
    audio2.pause();
    audio2.currentTime = 0
    audio1.play()
    document.getElementById("video").style.display = "block"
    document.getElementById("start").style.display = "none"
    document.getElementById("p2").style.display = "none"
    document.getElementById("p1").style.display = "block"
    document.getElementById("title").style.bottom = "auto"
    document.getElementById("title").style.right = "auto"
    document.getElementById("title").style.top = "10%"
    document.getElementById("title").style.left = "80px"
}

const audio = {
    playing: true
}

function tootleAudio() {
    if (audio.playing) {
        audio2.pause();
    } else {
        audio2.play();
    }

    audio.playing = !audio.playing
}
</script>

<style>
    .p5Canvas{
        display: none
    }
    :global(:root){
        overflow: auto;
        background: #040236;
    }
#play-toggle{cursor: pointer;}
#jarvis{
        position: fixed;
        top: 20px;
        left: 20px;
        z-index: 100;
    }
   .blink_me {
    animation: blinker 2s linear infinite;
    transform-origin: center;
    }
    @keyframes blinker {
        50% {
            opacity: 0;
            
        }
        100%{
            transform: rotate(360deg);
            opacity: 1;
        }
    }
    #p1,#p2{
        display: none;
        position: absolute; 
        top: 30vh;
        width: 80%;
        left: 6%;
        color: white;
        font-family: arial;
        max-width: 540px;
        font-size: 20px;
        transform: rotate(-7deg);
        background: black;
        padding: 10px;
        box-shadow: 10px 10px 10px yellow;
        color: pink;
        line-height: 26px;
        
    }

    #p1{
        font-family: 'Roboto';
        
        line-height: 25px;
    }

    #p2{
        transform: rotate(5deg);    
        top: 90vh;;
        font-family: 'Forum';
            font-size: 20px;
        
    }

    #video{
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translateX(-50%) translateY(-50%);

    }
    html,body,section{
        background: #040236;
        height: 100vh;
    }
    
    #start{
        position: fixed;
        top: 50%;
        left: 50%;
        cursor: pointer;
    }
    h2{
        font-family: "DM Mono";
        font-weight: 500;
        
        color: yellow;
        position: fixed;
        top: 150px;
        left: 20%;
        font-size: 50px;
        text-align: center;
        font-weight: normal;
        letter-spacing: 20px;
        z-index: 4;
        transform: rotate(7deg);
        background: black;
    }
</style>

<link rel="prefetch" href="/assets/chapter-4/part1.mp3">
<link rel="prefetch" href="/assets/chapter-4/part2.mp3">
<link rel="prefetch" href="/assets/chapter-4/edificio.mp4">



<link href="https://fonts.googleapis.com/css2?family=Roboto&display=swap" rel="stylesheet">
<link rel="preconnect" href="https://fonts.gstatic.com">
<link href="https://fonts.googleapis.com/css2?family=Forum&display=swap" rel="stylesheet">

<div id="jarvis">
    <a href='/'><img width="50" height="50" src="assets/chapter-1/ja.png" alt=""></a>
    </div>

<section class='idolo'>

<h2 id="title">ÍDOLO</h2>
<audio id="audio1" src="/assets/chapter-4/part1.mp3"></audio>
<audio id="audio2" src="/assets/chapter-4/part2.mp3"></audio>

<video id="video">
     <source src="/assets/chapter-4/edificio.mp4" type="video/mp4">
</video>
<p class="blink_me" id='start' on:click={start}><img width="80" src="/assets/chapter-4/cta.png" />></p>

<p id='p1'>Me fui del juego por amor, al fierro, por terror a tener que seguir
mintiendo. Nunca fui del barrio porque si me quedo, no se como
amar algo tan adentro, necesito verlo de lejos, como la luna.
¿Pensaste que te mentía? Pero no hay nada mas sincero que esta
data que te suelto. Yo nací chueco, como Ricardo, te lo juro, es
primicia del médico, abrió las puertas de la clínica, revoleó el
cordón umbilical junto con mi cuerpo, salió la placenta restante y
mientras tanto jadeante aparecí detrás, yo; como quien no quiere
protagonismo, como quien no entiende lo que hace en la escena.
Es jodido nacer con tanta gente cerca. Te miran como esperando
algo. ¿Cómo les explico tan pronto si no hablo? Que dejen las
palabras para luego, que traguen aire y acumulen ideas para
soltar cuando piensen en todo lo que están vociferando sin hablar.
No se sentir nada todavía. ¿Como no la vi venir desde aquel día
que nací? Estaba todo frente a mi y no puse freno al bardo.
</p>
<div id='p2'>
{#if !audio.playing}
    <img on:click={tootleAudio} width="30" class="button-audio" src="/assets/chapter-1/play-button.svg">
{:else}
    <img on:click={tootleAudio} width="30" class="button-audio" src="/assets/chapter-1/pause.svg">
{/if}

<div class="texto" id="p2-texto">
Cuando iba a la colonia juntaba estas cancionetas, las mantenía apelmazadas en un cuaderno Rivadavia y después en una lanchera Sadia que se había ganado mi vieja en una promoción en el Coto. Hay que envidia tenían las pibas, fanáticas del pastel de papa de mamá, ja, si supieran que es lo único que se cocina en casa, que macana que solo iba una sola vez a la colonia. Mamá no me dejaba salir más porque decía que hasta que no cumpla la edad suficiente, hasta que no sepa, saber, donde van las cosas, las latas; hasta que no me sepa callar la boca. Interrumpir, que mejor pensaba yo. Bicha. Se reunían las tías en la mesa y yo armaba lio, me comía las milanesas de todos ja, nah nunca había de esas; preguntaba las cosas que nadie quería charlar, bah, esas cosas que los grandes no quieren escuchar porque los niños los sobrepasan. Sobremesa, les encanta, jugamos a juegos, se pasan el tiramisú derretido, kneidalaj, un enchastre, ni en pedo como eso ¿Que me dan? Entonces me iba con mis primos a transar al cuarto, prendíamos la linterna en la oscuridad, hacíamos voces de radio, escuchábamos a Peña, le devolvíamos al frontón del oyente que no parla, no se, las pausas. Un beso en la almohada. Nos hacíamos la paja sin parar y nos tapábamos con el edredón. ¿Que haces cuando no tenés ganas de decir nada? Nos gustaba llenar de ruido la mesada cuando lavaban, los vasos, los cristales. Yo nunca aprendí a cocinar. ¿Para qué? Si la ultima vez que levanté la mesa me pidieron que me fuera, que me habían visto en la esquina afeitarme las piernas; los vecinos me botonearon. A la gente que vive cerca le gusta la idea de encontrarte enjabonado en el medio de la ochava, vértigo de coxis, imagínate... Tomando la sopa mientras te sacas las ganas de besar y te espían con los binoculares los muy playmóvil hijos de puta. ¿Que te parece? Siempre me cayeron mal los macanas. Por barrio siempre hay uno, ahí entendí la tarea. De grande podés elegir ser ese. Quiero ser lo opuesto a ese, ¿Cómo se llama? ¿Una oficina de diez pisos? Pff… ¿Donde para el tren que te lleva de paseo a ese lugar? ¿A que hay que jugar para elegir el control remoto? ¿Te convidan la gaseosa o son como los vecinos de lo anterior y recién me entero que me equivoque de profesión? ¿Qué? No quiero revisar mas las cuentas, me pican las ideas de dar vueltas por acá. Sip sap, te dejé un mensaje en el contestador allá por el 92, sisi, cuando nací yo. Léeme te lo pido, no se que haría sin vos.
</div>
</div>
</section>


