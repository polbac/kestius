<style>
    :global(:root){
        overflow: auto;
    }
    .chapter{
        font-family: 'DM Mono';
        color: #5a3d3d;
        font-size: 30px;
        background: #eeef9d;
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

   

    .tooltip{
        max-width: 200px;
    }



    
}

#jarvis{
        position: fixed;
        top: 20px;
        left: 20px;
        z-index: 100;
    }
.paper.first{
    margin-top: 100px;
}
.paper{
    position: relative;
    z-index: 10;
    
    max-width: 900px;
    margin: auto;
    padding-top: 20px;
    padding-bottom: 20px;

    padding-left: 20px;
    padding-right: 20px;

    color: black;
    font-size: 16px;
    text-align: justify;
    
}

.page-container{
    -ms-filter: "progid:DXImageTransform.Microsoft.Alpha(Opacity=0)";

  
  filter: alpha(opacity=0);
  -moz-opacity: 0;
  -khtml-opacity: 0;
  opacity: 0;
  transform: translateY(100vh);
  -webkit-transform: translateY(100vh);
  -moz-transform: translateY(100vh);
  transition: 2s all ease-in-out;
}

.page-container.show-page{
    filter: alpha(opacity=100);
  -moz-opacity: 1;
  -khtml-opacity: 1;
  opacity: 1;
  transform: translateY(0vh);
  -webkit-transform: translateY(0vh);
  -moz-transform: translateY(0vh);
}

.paper .center{
    max-width: 600px;
    
    margin: auto;
    margin-bottom: 100px;
}
.paper .center h4{
    text-align: center;
}
.paper .center p{
    text-align: justify;
}
.paper .left{
    margin: auto;
    margin-bottom: 100px;
    max-width: 800px;
    
}

.video{
    margin: 50px;
}
video{
    width: 100vw;
    height: 100vh;
    position: fixed;
    bottom: 0;
    right: 0;
    z-index: 0;
}

.titles{
    text-align: center;
    margin-bottom: 200px;
}
#preambulo{
    display: none;
}

.b-audio{
    width: 40px;
    height: 40px;
    vertical-align: middle;
    margin-right: 10px;
    cursor: pointer;
}
</style>


<script>
import { onMount, onDestroy } from 'svelte'
import { isServer } from '../../util/universal'

let audioPlayer
let video
let bodies = []

const audio = {
    showNotification: true,
    showTooltip: false,
    playing: false,
    showAudioControl: false
}

function resize(){
    const width  = window.innerWidth || document.documentElement.clientWidth || 
        document.body.clientWidth;
    
    const height = width * 2066 / 1890;
    
    video.style.width = `${width}px`
    video.style.height = `${height}px`
}

let show = false

onMount(() => {
    document.title = "M A N D I N G A  M O D O R R A"
    audioPlayer = document.getElementById('relato')
    video = document.getElementById("video")
    window.addEventListener('resize', resize);
    audiosPlayer = [
        document.getElementById('audio-0'),
        document.getElementById('audio-1'),
        document.getElementById('audio-2'),
        document.getElementById('audio-3'),
    ]
    setTimeout(() => {
        show = true;
    }, 3000)
    resize();
})

onDestroy(() => {
    window.removeEventListener('resize', resize);
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

const audios = [false, false, false, false]
let audiosPlayer

const DOWN_LEVEL_VOLUME = 0.5
const HIGH_LEVEL_VOLUME = 1

const isPlaying = index => audios[index]

const playAudio = index => {
    audios[index] = true
    audiosPlayer[index].play()

    if (index === 0) {
        pauseAudio(1)
        pauseAudio(2)
        pauseAudio(3)
    }

    if (index === 1) {
        pauseAudio(0)
        audiosPlayer[1].volume = HIGH_LEVEL_VOLUME
    }

    if (index === 2) {
        audiosPlayer[1].volume = DOWN_LEVEL_VOLUME
        pauseAudio(0)
        pauseAudio(3)
    }

    if (index === 3) {
        audiosPlayer[1].volume = DOWN_LEVEL_VOLUME
        pauseAudio(0)
        pauseAudio(2)
    }
}

const pauseAudio = index => {
    audios[index] = false
    audiosPlayer[index].pause()
}

</script>




<section class='chapter'>



    
    <div id="jarvis">
    <a  href='/'><img width="50" height="50" src="assets/chapter-2/ja.png" alt=""></a>
    </div>
    <div class="head">
        
        <div id="preambulo" >
            
            {#if audio.showNotification}
            <span on:click={clickNotification} class="text">
                PREÁMBULO
                <span>1</span>
            </span> 
            {/if}
            
            {#if !audio.playing}
                <img on:click={tootleAudio} class="b-audio" src="assets/chapter-1/play-button.svg">
            {:else}
                <img on:click={tootleAudio} class="b-audio" src="assets/chapter-1/pause.svg">
            {/if}
            
            
            {#if audio.showTooltip}
                
                <div class="tooltip">
                    En lo posible, colocarse auriculares.
                </div>
            {/if}
        </div>

        
        
    </div>

    

    <video id="video" src="assets/chapter-7/video.mp4" loop="loop" autoplay="true"></video>
    <div class="{show ? 'show-page' : ''} page-container">
    <div class="paper first">
        <div class="titles">
            <h2>Mandinga Modorra</h2>
            <h3>o payada corta del bajo valle entre colores agarrotada</h3>
        </div>
        
        <div class='left'>
            <h4>EXT. AL PIE DE UN VALLE - DIA </h4>
            <p>Reposo del tiempo. Así hacen de paisaje, una Llama a un lado que examina coqueando a un resto alejado.</p>
        </div>
        
        <div class="center">
            <h4>
                {#if !audios[0]}
                    <img on:click={() => playAudio(0)} class="b-audio" src="assets/chapter-1/play-button.svg">
                {:else}
                    <img on:click={() => pauseAudio(0)} class="b-audio" src="assets/chapter-1/pause.svg">
                {/if}
                VOZ (OFF) LLAMA 
            </h4>
            <p>Al levantar los ojos y ver la crina de la sombra ahumada, se me retoba la vista ante la falta de siesta, pues ni pa eso el descanso, que si me agacho me canso o pior, me acuesto y me frito mansa ante los rayos del sol. Arde tierra al horizonte, que ni el remanso de pena que llora la vida al norte de esta cordillera, aparece estanco entre las yuyeras ajenas... pero nunca ventajeras; ma‘si , ya no queda alameda que banque esta picazón. Ay de mi esta calor... Sangre sin cuerda se hace pájara en la vihuela, empanada esplotada mi mente frente a la roca calcinera, que ni el agua salada de una sirve, pa cumplirle a la sedienta sed que espera. Así voy fiera de monte, que a lo lejos veo perdido, un malón de los míos, haciendo rancho al rincón; bautizada Llama en la vida, pero baguala de corazón, por las riendas de esta canción, doy paso doble al camino, porque pa trote no me olvido, que me quedo sin pulmón. Voy arrimándome pampa medio carambola pero con facón, pa ver en que anda la yunta, que ahí mugen entreverados y con chucho, será que no queda mucho, pa que cante el carnero y se vaya el barullo, de este corralón.  
    </p>
        </div>

        <div class='left'>
            <h4>EXT. AL PIE DE UN VALLE APENAS DESPUÉS - DIA 
</h4>
            {#if !audios[1]}
                    <img on:click={() => playAudio(1)} class="b-audio" src="assets/chapter-1/play-button.svg">
                {:else}
                    <img on:click={() => pauseAudio(1)} class="b-audio" src="assets/chapter-1/pause.svg">
                {/if}
                <br/>
                <br/>
            <p>La Llama es el personaje principal. La cámara subjetiva son los ojos, y así va dando paso hacia el tumulto, uno que se asoma apenas a lo lejos. La edad es tardía y junto con los pelajes crecidos, cualquier avance continuo se vuelve un desafío. La heroína está sufrida, subyugada por las desventuras del destino, la imagen misma segismundeana cocoliche de la zona, yerma de paciencia, detonada su carne a la espesura de un ecosistema ruin. No hay una voz ajena, 

sino una guía de onomatopeyas que se oyen al final del recorrido, hay bramidos apenas audibles que responden en acuerdo entre ellos. Confabulado con la escena está Gativideo, propagandero invisible todavía, pero veremos próximamente como devendrá en una reminiscencia animada noventosa y con él, los socios animales atentos del desierto norteño. 
</p>
            <p>Ahora en un primerísimo primer plano, la Llama se detiene abruptamente. La imagen se interrumpe un momento para mostrar la bofetada calurosa en el rostro de nuestra individua. Ésta solo gira en cámara lenta, mientras su cabeza recibe lo entero del impacto, PAF!. Babea las gotas finales de saliva. Plano general. Avanza lerda, andrajosa de vientre y escuálida de pinta por el sendero univoco del huinca. Está nuestra protagonista en pleno acercamiento parsimonioso, removiendo con el cogote el viento ebullido que lanza el universo y su actualidad diurna de 13 horas 23 minutos. La cámara se acerca en un plano lateral para observar detenidamente la aventura. Los ojos apenas entreabiertos, reconocen finalmente los cuerpos amigos. Unos de su misma especie y un resto de fauna que parecen, a priori, cercanos de patria, pero lejanos de hocico. Continua el arrime a la muchedumbre, otras raquíticas parias de lumbre que amasijadas de media tarde, se quieren solo por ser parte de la misma trágica situación. Para entonces, nuestra entrañable protagonista en deceso, se ubica detrás del follaje animal tocayo y lejos de ir por lo necesario, hablo de agua y esos asuntos varios de vital composición; se absorta en epitafio de una presencia superior.</p>
        </div>

    </div>

    <div class="paper">


    <div class="left">
        <h4><center>LLAMA</center></h4>
        <h4><center>¿Que ven?</center></h4>
        <p>La dejamos ir a la susodicha un instante, para ubicarnos de lleno, en el centro de la acción. Contra plano contrapicado, feroz. En el centro de visión, mandinga o televisor, pero mas allá del rótulo, lo importante es que es actuante o 
actor y comerciante, de un lenguaje cautivador. La cámara rodea a las figuras que unidas se hacen toldo, un bálsamo esperanzador; sin soltar un diente del espectáculo que hace de vientre, para los sueños que son. 

</p>
    </div>


    <div class="center small">
        <h4>
        {#if !audios[2]}
                    <img on:click={() => playAudio(2)} class="b-audio" src="assets/chapter-1/play-button.svg">
                {:else}
                    <img on:click={() => pauseAudio(2)} class="b-audio" src="assets/chapter-1/pause.svg">
                {/if}
                VOZ (OFF) LLAMA
            </h4>
        <p>Ahora se rompe un poco la rima, 
aunque si se tranca vuelve, porque 
es fanática del canto que repite 
el dolor.

</p>
    </div>


    <div class="left">
        <h4>EXT. AL PIE DE UN VALLE - ATARDECER LERDO
</h4>
        
        <p>En un plano detalle, sale un VHS como un regurgite del aparato. Se corta el clima de cuajo (pandemonio de alaridos agrestes en dialecto invasivo). La Llama gana terreno desde el fondo y devuelve lo expulsado a las entrañas del micro infierno. Gativideo aparece ahora si en plano, dando inicio nuevamente a la fantasía. Alivio general. 

</p>
    </div>
</div>
  <audio src="/assets/chapter-7/mandi_Edit_MX.mp3" id="audio-0"></audio>  
  <audio src="/assets/chapter-7/Relato_Llama_Agus.mp3" id="audio-1"></audio>  
  <audio src="/assets/chapter-7/Rima_vuelve_EDIT.mp3" id="audio-2"></audio>  
  <audio src="/assets/chapter-7/Presentarse_EDIT1.mp3" id="audio-3"></audio>  

<div class="paper">
    <div class="center small">
        <h4>
        {#if !audios[3]}
                    <img on:click={() => playAudio(3)} class="b-audio" src="assets/chapter-1/play-button.svg">
                {:else}
                    <img on:click={() => pauseAudio(3)} class="b-audio" src="assets/chapter-1/pause.svg">
                {/if}
        VOZ (OFF) LLAMA</h4>
        <p><center>Por eso no para de presentarse... </center>
</p>
    </div>
    <div class="left">
    Es correcto. Se dedica a mirar con mas esmero aún, será que hay mensaje venidero que se esconde en semejante caparazón. 
</div>


    <div class="left">
        <h4>EXT. CERCA DEL VALLE ANTERIOR - TARDE FLASHBACK
</h4>
        
        <p>Una vez en tiempos de sombra amable pariente carnero le dio pauta sabia... 

</p>
    </div>

     <div class="center small">
        <h4>CARNERO SABIO 
</h4>
        <p>El que no mira y pausa, nunca 
entiende lo que ve. Mira mejor, 
como si el agua de los deseos 
estuviera aquí para sobrevivir este 
momento. 
</p>
    </div>


    <div class="left">
        <h4>EXT. AL PIE DEL VALLE - EPÍLOGO ERRÁTICO - DIA 
</h4>
        
        <p>Entonces entiende, que la heroína de esta historia no es ella, sino el ave que corre y casi no se deja ver. Y el coyote persigue, fracasa en acme, intenta con yunques y alambres, pero no hay caso, pues el correcaminos que da paso, no deja huella al andar. Mandinga tenia razón. </p>
<p>Y así se alejó la Llama, con templanza pero embalada, entendiendo que si no saliese así disparada, no habría ninguna escapada a esta apunada calor.</p>

    </div>

</div>

</div>
</section>

<footer></footer>

<link href="https://fonts.googleapis.com/css2?family=DM+Mono:wght@400;500" rel="stylesheet">