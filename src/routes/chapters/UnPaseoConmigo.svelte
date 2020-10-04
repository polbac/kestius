<style>
    .chapter{
        font-family: 'Fauna One';
        color: #5a3d3d;
        font-size: 22px;
        background: #f5f2e0;
    }
    p{
        max-width: 800px;
        margin: auto;
        position: relative;
        z-index: 9999;
        line-height: 50px;
    }

    
    h2{
        text-align: center;
        padding-top: 300px;
        margin-bottom: 100px;
        text-transform: uppercase;
        font-family: "Fauna One";
    }
    
    p{
        padding-bottom: 100px;
    }

    #preambulo{
        color: black;
        font-size: 15px;
        position:fixed;
        z-index: 99999;
        right: 70px;
        top: 50px;
    }

    
    #preambulo .text{
        top: -22px;
        position: relative;
        cursor: pointer;
        
    }

    #preambulo .text span{
        font-size: 14px;
        line-height: 14px;
        background: red;
        color: white;
        position: relative;
        top: -10px;
        width: 15px;
        display: inline-block;
        height: 15px;
        border-radius: 50%;
        text-align: center;
        left: 2px;
}
    
   
.blink_me{
    animation: blinker 6s linear infinite;
}

@keyframes blinker {
  50% {
    opacity: 0;
  }
}

.floating {  
    animation-name: floating;
    animation-duration: 3s;
    animation-iteration-count: infinite;
    animation-timing-function: ease-in-out;
}

@keyframes floating {
    50% {
        margin-top: 15px;
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
    max-width: 340px;
    text-transform: uppercase;
    background: #25d560;
    padding: 5px;
    border-radius: 3px;
    position: fixed;
    top: 20px;
    right: 70px;
    color: white;
    letter-spacing: 1px;
    text-align: center;
    padding-left: 10px;
}

@media (max-width: 640px){

    .grid{
        transform: scale(0.5);
    }

    p{
        padding-left: 20px;
        padding-right: 20px;
            font-size: 20px;
    }

    .tooltip{
        max-width: 200px;
    }

    h2{
        font-size: 40px;
        letter-spacing: 22px;
    }

    #asset-2,#asset-9{
        display: none;
    }

    
}

#jarvis{
        position: fixed;
        top: 20px;
        left: 20px;
        z-index: 100;
    }
.asset{
    position: absolute;
}

#asset-11{
    top: 1%; right: 5%;
}

#asset-2{
    top: 50%; left: 1%;
    width: 200px;
}

#asset-11{
    top: 10px;
    left: 50%;
    width: 300px;
    margin-left: -150px;
}

#asset-12{
    top: 10%;
    left: 20%;
    width: 20px;
    margin-left: -150px;
}

#asset-3{
    top: 20%; right: 5%;
    width: 250px;
}

#asset-9{
    top: 310vh; right: 5%;
    width: 100px;
}
#asset-10{
    top: 490vh; left: 5%;
    width: 200px;
}

#asset-1{
    top: 20%; left: 5%;
    width: 90px;
}

.grid{
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 30px;

    padding-bottom: 150px;
}

.grid #asset-5{

}

.grid #asset-6{
    margin-top: 50px;
}

.grid #asset-7{
    margin-top: 100px;
}

.grid #asset-8{
    margin-top: 150px;
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
    document.title = "U N  P A S E O  C O N M I G O"
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

</script>

<section class='chapter'>

    <audio loop src="assets/chapter-5/audio.mp3" id="la-mona-audio" />
    <div id="jarvis">
    <a  href='/'><img width="50" height="50" src="assets/chapter-2/ja.png" alt=""></a>
    </div>
    <img src="assets/chapter-5/asset_1.png" width="50" id="asset-1" class="asset blink_me" />
    <img src="assets/chapter-5/asset_2.png" width="50" id="asset-2" class="asset floating" />
    <img src="assets/chapter-5/asset_3.png" width="50" id="asset-3" class="asset" z="6"/>
    
    
    <img src="assets/chapter-5/asset_9.png" width="50" id="asset-9" class="asset" />
    <img src="assets/chapter-5/asset_10.png" width="50" id="asset-10" class="asset" z="10" />
    <img src="assets/chapter-5/asset_11.png" width="350" id="asset-11" class="asset" />
    <img src="assets/chapter-5/asset_12.png" width="50" id="asset-12" class="asset" />
    <div class="head">
        
        <div id="preambulo" >
            
            {#if audio.showNotification}
            <span on:click={clickNotification} class="text">
                PREÁMBULO
                <span>1</span>
            </span> 
            {/if}
            
            {#if !audio.playing}
                <img on:click={tootleAudio} class="button-audio" src="assets/chapter-1/play-button.svg">
            {:else}
                <img on:click={tootleAudio} class="button-audio" src="assets/chapter-1/pause.svg">
            {/if}
            
            
            {#if audio.showTooltip}
                
                <div class="tooltip">
                    En lo posible, colocarse auriculares.
                </div>
            {/if}
        </div>

        
        
    </div>

    <h2>UN PASEO CONMIGO</h2>
    <p>Un día estaba tan pero tan despabilada que salí de la calle con los bolsillos
repletos, en puro simulacro necesario de lucidez, para así poder entrar
impávida en las veredas favoritas de mi ciudad, esas que tienen forma de
harmónica y papel glasé. Estaba caminando tan recta, tan pegada a la línea
de la baldosa opaca pesimamente adoquinada, que pude evitar los baches
de mi carrocería, tan línea estaba… por fortuna; que mi ropa parecía no
dejarse acariciar por el aire que solfeaba sus costados. Trazos finos, caros.
Fue bello entonces y llore y grite como quiero hacer siempre, como pasa en
los montajes de mis asambleas mentales pero que nunca puedo compartir
con los transeúntes. Me duele acá (miro a unx sin que me registre, sigo) el
plexo, la tierra roja que se vuelve mi sangre cuando acumula labia que no
puedo exfoliar. Por eso salgo. Entonces se arma la garganta del diablo en mi
paso. Ése es el secreto, es así, lo juro, no fue un movimiento tectónico como
dicen. ¿Como le explico esto a un geólogo? ¿Como le cuento de esta vuelta
casera entre pantuflas en la vereda del barrio que me sale así?</p>
<center>
    <img src="assets/chapter-5/asset_4.png" width="250" id="asset-4"/>
    <br/>
    <br/>
    <br/>
    <br/>
    <br/>
    <br/>
    
</center>
<p>Me paro un momento… para espectar el ecosistema, eso solo. Un vistazo
corto. A continuación. Un pato (vomito). Ahí al costado, oculto, ahí, en la
alcantarilla, sino ¿Donde? Nadie me tira una silaba. Sigo parada, aunque
usted no lo crea, ando, me mantengo adjunta recta distante del cielo que me
aprieta contra el suelo. Una papa en la montaña, así me siento, de a
montones, tubércula y apelmazada por los hectopascales de la presión
atmosférica de ahí arriba. La conquista de mi existencia sufrida. Ay… En la
montaña y en los agujeros que esquivo para mantenerme en pie. Y encima
me ven con desprecio, ¿Que se piensan? ¿Que no los veo reírse de mí,
intentando de hacer equilibrio mientras zafo de la embriaguez ni muy muy ni
tan tan? No. Alto.
¿Que? Si, las traje, puntual.
Me meto la mano en la parte, ahí, en el bolsillo repleto de adentro del saco
que sostiene la jauría de canicas que ladran mientras caen, mientras cinturean conmigo para mantenerse a salvo entre el piso que me espera para
arder en caída y mi impaciencia caminante. Ruedan… Ay como se van lejos
de mi... me marcan el camino de transacción con todo el resto que no
soporto. Transamos en la calle, eso hacemos, los movimientos centrípetos,
un quilombo en la vía pública. ¿Por qué? ¿Quien puede darse un beso y no
caer? Con la fauna ajena digo. No servirse rendido al desmayo, ¿Quien
puede ser tan lombriz fría de la tierra? Giramos, eso, giramos mientras
viajamos por las pelotitas danzantes, viajamos de la mano como siempre
quise hacer y no me animé porque opiné muchas cosas feas de mi; y así nos
olvidamos de la dignidad berreta, de la patita levantada… Cosas chotas, que
me hacen abandonar lo que quiero. Entonces rodé, besé y no padecí el
recorrido, por primera vez en lo que va del tiempo que me acuerdo.
Bravo. Y así llegamos cansados de sostener los cuerpos de toda esta
asamblea; la mía sola… bah que digo, una fantasía cotidiana. ¿Qué cuesta?
Es que apenas pude salir de casa hoy y volver entera.
</p>

<div class="grid">
    <img src="assets/chapter-5/asset_5.png" width="150" id="asset-5" />
    <img src="assets/chapter-5/asset_6.png" width="130" id="asset-6" />
    <img src="assets/chapter-5/asset_8.png" width="100" id="asset-7" />
    <img src="assets/chapter-5/asset_7.png" width="90" id="asset-8" />
    
</div>
</section>

<footer></footer>

<link href="https://fonts.googleapis.com/css2?family=Fauna+One&display=swap" rel="stylesheet">