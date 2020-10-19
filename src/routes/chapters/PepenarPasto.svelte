<style>
    :global(:root){
        overflow: auto;
    }
    .chapter-2{
        font-family: 'my_underwoodregular';
        color: #191621;
        font-size: 30px;
        background: #f1f0ca;
    }

   

    p{
        max-width: 800px;
        margin: auto;
        position: relative;
        z-index: 9999;
        line-height: 50px;
        text-align: justify;
    }

    .cura-container{
        position: fixed;
        top: 10px;
        left: 50%;
        margin-left: -20vw;
    }
    .cura{
        
        width: 30vw;
        height: 30vw;
        background-image: url(/assets/chapter-2/papa_1.png);
        background-size: contain;
        background-repeat: no-repeat;
        margin-top: 0;
        
    }

    .enter .cura{
        background-image: url(/assets/chapter-2/papa_2.png);
    }

    .enter .cuadrado{
        background-image: url(/assets/chapter-2/cuadrado_1.png);
    }

    .cuadrado-container{
        position: fixed;
        top: 80vh;
        right: 10vw;
    }
    .cuadrado{
        
        width: 15vw;
        height: 15vw;
        background-image: url(/assets/chapter-2/cuadrado_2.png);
        background-size: contain;
        background-repeat: no-repeat;
        margin-top: 0;
        
    }
    marquee{
        height: 50px;
        margin-top: 50px;
        margin-bottom: 50px;
        display: block;

    }
    h2{
        text-align: center;
        
        text-transform: uppercase;
        position: absolute;
        top: 40vh;
        width: 100%;
    }
    h2 span{
        display: inline-block;
    }
    p{
        padding-bottom: 100px;
    }

    #preambulo{
        color: #191621;
        font-size: 15px;
        position:fixed;
        z-index: 99999;
        right: 70px;
        top: 51px;
    }

    
    #preambulo .text{
        top: -22px;
        position: relative;
        cursor: pointer
    }

    #preambulo .text span{
        font-size: 14px;
        background: black;
        color: white;
        position: relative;
        top: -10px;
        width: 20px;
        display: inline-block;
        height: 20px;
        border-radius: 50%;
        text-align: center;
        left: 2px;
}
    
    .head{
        height: 70vh;
        position: relative;
    }


    .blink_me {
    animation: blinker 6s linear infinite;
    }

    .floating {  
        margin-top: 0;
        animation-name: floating;
        animation-duration: 3s;
        animation-iteration-count: infinite;
        animation-timing-function: ease-in-out;
        transition: all;
    }

    @keyframes floating {
        0% {
            margin-top: 0;
        }  
        50% {
            margin-top: 15px;
        }  
    }

@keyframes blinker {
  50% {
    opacity: 0;
  }

  
}
.button-audio{
    width: 30px;
    position: fixed;
    top: 20px;
    right: 20px;
    cursor: pointer;
}
.tooltip{
    max-width: 500px;
    text-transform: uppercase;
    background: #191621;
    padding: 5px;
    border-radius: 3px;
    position: fixed;
    width: 500px;
    top: 8px;
    right: 60px;
    color: white;
    letter-spacing: 1px;
    padding-left: 10px;
}

.asset4{
    position: fixed;
    background-image: url(assets/chapter-2/asset4.png);
    background-size: contain;
    background-repeat: no-repeat;
    width: 30vw;
    height: 30vw;
    top: 250vh;
    left: 30vw;
}

.asset3{
    position: fixed;
    background-image: url(assets/chapter-2/asset3.png);
    background-size: contain;
    background-repeat: no-repeat;
    width: 30vw;
    height: 30vw;
    top: 200vh;
    left: 10vw;
}

.asset1{
    position: absolute;
    background-image: url(assets/chapter-2/asset1.png);
    background-size: contain;
    background-repeat: no-repeat;
    width: 20vw;
    height: 20vw;
    top: 300vh;
    right: 2vw;
}

.asset2{
    position: absolute;
    background-image: url(assets/chapter-2/asset2.png);
    background-size: contain;
    background-repeat: no-repeat;
    width: 40vw;
    height: 40vw;
    top: 150vh;
    left: 0vw;
}

@media (max-width: 640px){
    h2{
        top: 20vh;
        font-size: 20px;
    }
    .cuadrado-container{

    }
    .cuadrado{
        width: 40vw;
        height: 40vw;
    }
    .cura-container{left: 10vw;margin:0; }
    .cura{
        width: 80vw;
        height: 80vw;
        
    }
    .big-line{
        position: absolute;
    }

    .asset1,.asset3,.asset4{
        width: 50vw;
        height: 50vw;
    }

    .asset2{
        width: 90vw;
        height: 120vw;
    }

    p{
        padding-left: 20px;
        font-size: 19px;
        padding-right: 20px;
    }

    .tooltip{
        max-width: 200px;
    }

    h2{
        font-size: 40px;
        letter-spacing: 22px;
    }

}


.nube{
    height: 749px;
    width: 100%;
    background-image: url(assets/chapter-2/nube.png);
    background-size: 2000px 749px;
    background-position: top center;
    position: absolute;
    top: 450vh;
    animation: background-x-animation 15s infinite linear;
}

@keyframes background-x-animation{
    0% {
        background-position: 0 0;
    }
    100% {
        background-position: 2000px 0;
    }
}

#jarvis{
        position: fixed;
        top: 20px;
        left: 20px;
        z-index: 100;
    }


</style>


<script>
import { onMount, onDestroy } from 'svelte'
import { getScrollPos } from '../../util/scroll'
import { isServer } from '../../util/universal'

let scrollPos = 0
let audioPlayer
let bodies = []

const audio = {
    showNotification: true,
    showTooltip: false,
    playing: false,
    showAudioControl: false
}

function onScroll() {
    scrollPos = getScrollPos()
    bodies = document.querySelectorAll("*[z]")
    render()
}

function mapZStyle(el, z) {
    const y = scrollPos / z
    el.style.transform = `translateY(${y}px)`
    el.style.webkitTransform = `translateY(${y}px)`
    el.style.mozTransform = `translateY(${y}px)`
}

function render() {
    bodies.forEach(body => mapZStyle(body, Number(body.getAttribute('z'))))

}

onMount(() => {
    document.title = "P E P E N A R P A S T O"
    onScroll()
    audioPlayer = document.getElementById('la-mona-audio')
    if(!isServer()) window.addEventListener('scroll', onScroll)
})

onDestroy(() => {
    if(!isServer()) window.removeEventListener('scroll', onScroll)
})

function clickNotification() {
    audio.showNotification = false
    audio.showTooltip = true
    audio.showAudioControl = true
}

function tootleAudio() {
    audio.playing = !audio.playing
    audio.showNotification = false
    audio.showTooltip = false

    if (audio.playing) {
        audioPlayer.play()
    } else {
        audioPlayer.pause()
    }
}

let mouseEnter = false

setInterval(() => mouseEnter = !mouseEnter, 3000)
</script>

<link href="assets/chapter-2/font/stylesheet.css" rel="stylesheet">

<div id="jarvis">
    <a  href='/'><img width="50" height="50" src="assets/chapter-2/ja.png" alt=""></a>
    </div>

<section class='chapter-2'>

    <audio loop src="assets/chapter-2/audio.mp3" id="la-mona-audio" />

    <div class="head" class:enter={mouseEnter}>

        <div id="preambulo" >
            
            {#if audio.showNotification}
            <span on:click={clickNotification} class="text">
                PREÁMBULO
                <span>1</span>
            </span> 
            {/if}
            
                {#if !audio.playing}
                    <img on:click={tootleAudio} class="button-audio" src="assets/chapter-2/play-button.svg">
                {:else}
                    <img on:click={tootleAudio} class="button-audio" src="assets/chapter-2/pause.svg">
                {/if}
            
            
            {#if audio.showTooltip}
                
                <div class="tooltip">
                    En lo posible, colocarse auriculares. Iniciar la música. Dejarla correr por 22 segundos. Ahora si, empezar a leer
                </div>
            {/if}
        </div>

        <div class='cura-container'>
            <div z="-5" class="cura floating"></div>
        </div>
        <div class="cuadrado-container">
            <div z="-2"  class="cuadrado floating"></div>
        </div>
        
        <div class="asset1" z="10"></div>
        <div class="asset2 blink_me" z="-20"></div>
        <div class="asset3" z="-2"></div>
        <div class="asset4 blink_me"></div>
        <div class="nube" z="-10"></div>
    </div>
    <h2 id="title" z="-10">
    
            Pepenar pasto
    
  
    </h2>
    
    <p>Esta maldita costilla…se dijo para sí. Me cancela
movimientos escénicos. Pensó en Susana Giménez, y
enseguida en los colchones agujereados, en los vaivenes
inflacionarios del diezmo… la plata que no entra… es que
ya encontró otros escondites en el mundo. Empresario.
Si. No. Bastante.</p>

    <p>Esos días de bolsas rebalsadas, los dedos marcados por
el peso de las bolsas de tanta promoción en la segunda
unidad; dibujada apenas tenue esa película acuosa en los
ojos, pensando en los manjares aún no nacidos. Tomó un
poco de agua sacra e hizo buche para calmar el océano
interno. Con el último trago, repitió un ejercicio de
vocalización que aprendió en un campamento episcopal
en Baradero. Tragó el menjunje y casi en un acto
declamatorio miró para arriba titubeante con los ojos, de
un lado hacia el otro en tiempos cortos (él creía
ingenuamente que el acto de elevar la cabeza le otorgaba
cierta guturalidad actoral potente). Algo que, al verlo de
afuera, resultaba cuasi risible. Pero la repetición tiene
algo.</p>

    <p style='max-width: 500px;'>- Si tan solo hubiera llegado a la cuadra de casa con
todo el contenido de mis compras. Si en ese instante
interminable, tu mano sostenedora junto a la mía

robin, adjunta, plácida a tu tacto, hubiera sido fiel a la
tarea–.</p>

    <p>Mientras rememoraba como las bolsas de p.v.c
microgranulado se partían el amor ventilado en la vereda
y se sacudían a plena vista de todos; mientras
atestiguaba como todo lo demás caía rotundo como las
rodillas en el reclinatorio… Nuestras manzanas y las
plegarias. Una cohorte de frutas navegando por la vereda
ajena, caían regias en parábola derechista (siempre las
muy vagas, hacia allá, al este) y encima se alejan mucho
cuando mueren, como vos y yo, lo hacen en síncopa,
parece una molestia divina. Ajj.</p>

    <p>Huye para esconderse de sí mismo. Se persigna y trata
de cambiar de pensamiento, entonces dispone el dedo
meñique con la uña más crecida para rasquetear los
pabilos de los candelabros que tan apretados de frío
están, es así cómo debe usar técnicas nuevas de surco
en la cera. Hace carpita con la mano para que el fuego
se quede. Se arremanga la sotana porque es un gesto
que aprendió de su predecesor, se acomoda el algodón
almidonado del traje heroico, para seguir con tradiciones
que son fundamentales a esta altura. Hay que sostener,
dice con seguridad de sprayette al espejo. Compra. Sigue

con la farsa. Lord Cheselin para el pelo, así lo esparce y
así lo pide en la farmacia, sal gruesa con tomillo de huerta
para el baño de inmersión antes del rezo y la palangana
verde pensión que recibe los cayos de los fieles, nunca
son propios. Mentira, piensa. Detrás de bambalinas no
pasa nadie. Las responsabilidades ajenas, como las
palabras, mejor de otros que mías, sino el clona no
funciona y me duele el alma que perdí una madrugada en
plaza Irlanda. Pete.</p>

<p>Agarra el sobretodo protagónico donde antes podía
dibujar el holograma y hoy solo pastizales secos. Se mira
completo, está vestido de verde, en composé con toda la
vajilla que lo acompañará a posteriori, en el continuo
despliegue de fe que está por realizar. Se observa bien
pausado en el cuadro. Se da cuenta por primera vez que
el verde no es un color primario, que la esperanza está
asociada a ese color y que no siente ni un gramo de ella.
Algo en la habitación hace un ruido metálico, estridente,
fuera de sitio.</p>

    <p>Ya no hay reflejo, ya no hay universo que se dibuja en él,
como en viaje necesario para la audiencia, ya no hay
pantomima. No se puede salir croma desnudo, no es
suficiente para divulgar casete, para llevarnos con él al

cuento. Se perdió la luz o lo parejo o el diezmo o reflejo.
Silencio. Antes era Dios cuando todo se veía a través de
él. Ahora verde entero sin magia, puro yuyo.<br/>
Amen.
</p>


</section>