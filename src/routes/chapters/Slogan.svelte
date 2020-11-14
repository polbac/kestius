

<script>
import { onMount, onDestroy } from 'svelte'
import { isServer } from '../../util/universal'
import { blur } from 'svelte/transition';

function getScrollPos() {
    return document.getElementById("slogan")['scrollTop']
}

let video
let inter
let hideControls = false
let showVideo = true
let scrollPos
let bodies = []
let audioPlayer

const audio = {
    showNotification: true,
    showTooltip: false,
    playing: false,
    showAudioControl: false
}

function tootleAudio() {
    audio.playing = !audio.playing

    if (audio.playing) {
        audioPlayer.play()
    } else {
        audioPlayer.pause()
    }
    
    
}

onMount(() => {
    audioPlayer = document.getElementById('audio')
    
    document.title = "S L O G A N"
    video = document.getElementById("video")
    resize()
    document.onmousemove = onmousemove
    video.onended = videoEnd
    
    window.addEventListener('resize', resize);
    inter = setInterval(checkMouse, 50)
    document.getElementById("skip-video").onclick = videoEnd
})

let lastMouseX = 0
let lastMouseY = 0
let counter = 0
let isSame = true
let isSmartphone = false

function showText() {
    document.getElementById("b-audio").style.display = 'block'
    document.getElementById("pelapapa").style.display = 'none'
    document.getElementById("texto").style.display = 'block'
    document.getElementById("imagenes").style.display = 'block'
    hideControls = true
}

function checkMouse() {
    if(isSmartphone) {
        return
    }

    if (isSame) {
        counter++;
    } else {
        counter = 0;
    }
    
    if (counter >= 10) {
        hideControls = true
    } else {
        hideControls = false
    }
    
}

function onmousemove(target) {
    const xDiff = Math.abs(target.clientX - lastMouseX)
    const yDiff = Math.abs(target.clientY - lastMouseY)
    const offset = 10

    isSame = xDiff < offset && yDiff < offset
    lastMouseX = target.clientX;
    lastMouseY = target.clientY;   
}

const resize = () => {
    const width  = window.innerWidth || document.documentElement.clientWidth || 
        document.body.clientWidth;
    const height = window.innerHeight|| document.documentElement.clientHeight|| 
        document.body.clientHeight;
    const size = width > height ? width : height;
    
    video.style.width = `${size}px`
    video.style.height = `${size}px`

    isSmartphone =  width < 700
}


const videoEnd = () => {
    showVideo = false
    document.getElementById("pelapapa").style.display = 'block'
    document.getElementById("slogan").style.display = 'block'
    document.getElementById("skip-video").style.display = 'none'
    
    document.onmousemove = null 
    hideControls = true
    onScroll()
    if(!isServer()) document.getElementById("slogan").addEventListener('scroll', onScroll)
    tootleAudio()
}

function clickNotification() {
    audio.showNotification = false
    audio.showTooltip = true
    audio.showAudioControl = true
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



function toggle(){
    
    if(!!(video.currentTime > 0 && !video.paused && !video.ended && video.readyState > 2)) {
        document.getElementById("play").style.display = "block";
        document.getElementById("pause").style.display = "none";
        video.pause();
        if (isSmartphone) {
            hideControls = false
        }
    } else {
        document.getElementById("play").style.display = "none";
        document.getElementById("pause").style.display = "block";
        video.play();
        if (isSmartphone) {
            hideControls = true
        }
    }
    
    
}



</script>

<style>
    :global(:root){
        overflow: auto;
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

.asset{
    position: absolute;
}

#asset-1{
    top: 550%; right: 5%;
}


#asset-2{
        top: 190%;
    right: 0;
}

#asset-3{
    top: 500%; right: 5%;
}

#asset-4{
        top: 20px;
    left: 50%;
    width: 120px;
    margin-left: -60px;
}

#asset-5{
    top: 500%; right: 5%;
}


#asset-6{
    top: 400%; left: 5%;
}

#asset-7{
    top: 500%; right: 5%;
}


#asset-8{
    top: 650%;
    left: 4%;
}

#asset-9{
            top: 315%;
    left: 5%;
    width: 70px;
}

#asset-10{
        top: 300%;
    right: 5%;
    width: 150px;
}

#asset-12{
    top: 50%; right: 5%;
}

#asset-13{
    top: 80%; left: 5%;
    width: 120px;
}

h2{margin-top: 90px;}
#pause{
    display: none;
}
#play,#pause{
    position: fixed;
    top: 50%;
    left: 50%;
    width: 100px;
    height: 100px;
    cursor: pointer;
    margin-left: -50px;
    margin-top: -50px;
    z-index: 10;
    pointer-events: none;
}
.button-audio{
    width: 45px;
    position: fixed;
    top: 20px;
    right: 20px;
    cursor: pointer;
    
}
#b-audio{
    display: none;
}
#slogan{display: none;}
#texto{display: none;
    max-width: 600px;
    position: absolute;
    top: 90px;
    left: 50%;
    transform: translateX(-50%);
    padding: 10px;
    z-index: 100;
    font-family: "Sorts Mill Goudy";
    font-size: 20px;
        width: 90%;
        
    }
    p{line-height: 30px;}
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
   

    #video{
        background: black;
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translateX(-50%) translateY(-50%);
        cursor: pointer;

    }
    html,body,section{
        height: 100vh;
    background: black;
    background: url(assets/chapter-6/bg.jpg);
    background-size: cover;
    background-attachment: fixed;
    background-repeat: repeat;
    overflow: auto;
    position: fixed;
    width: 100%;
    }

    h1{
        position: fixed;
    top: 10px;
    width: 100%;
    text-align: center;
    padding: 10px;
    color: white;
    font-family: "Press Start 2P";
    letter-spacing: 2px;
    }

    .hide{
        transition: 0.5s all ease-in-out;
        -ms-filter: "progid:DXImageTransform.Microsoft.Alpha(Opacity=0)";

  /* IE 5-7 */
  filter: alpha(opacity=0);

  /* Netscape */
  -moz-opacity: 0;

  /* Safari 1.x */
  -khtml-opacity: 0;

  /* Good browsers */
  opacity: 0;
    }
    #pelapapa{
        display: none;
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%,-50%);
        cursor: pointer;
    }

    #imagenes{display: none; }

#preambulo{
        color: white;
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

.texto{
    text-align: justify;
}
#skip-video{
    position: fixed;
    bottom: 20px;
    right: 0;
    background: black;
    color: white;
    cursor: pointer;
    z-index: 99;
    font-family: "Sorts Mill Goudy";
    padding-left: 20px;
    padding-right: 20px;
    height: 30px;
    line-height: 35px;

}
  
</style>

<link rel="prefetch" href="/assets/chapter-6/video.mp4">


<link href="https://fonts.googleapis.com/css2?family=Sorts+Mill+Goudy&display=swap" rel="stylesheet">

<audio loop src="https://res.cloudinary.com/dhzuxqe7j/video/upload/v1600384426/6_ppzj9a.mp3" id="audio" />

<video id="video" on:click={toggle} style="display: {showVideo ? 'block' : 'none'}">
     <source src="https://res.cloudinary.com/dhzuxqe7j/video/upload/v1600384473/6_airelk.mp4" type="video/mp4">
</video>

<div id="skip-video">
    SALTAR
</div>
<div id="jarvis">
    <a href='/'><img width="50" height="50" src="assets/chapter-1/ja.png" alt=""></a>
    </div>

<section class='slogan' id="slogan">

        <div id="b-audio">
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
    </div>
    <div id="imagenes">
    
    <img src="assets/chapter-6/2.png" width="250" id="asset-2" class="asset">
    <img src="assets/chapter-6/3.png" width="250" id="asset-3" class="asset" z="-2"/>
    <img src="assets/chapter-6/4.png" width="250" id="asset-4" class="asset"/>
    <img src="assets/chapter-6/5.png" width="250" id="asset-5" class="asset"/>
    <img src="assets/chapter-6/6.png" width="250" id="asset-6" class="asset floating"/>
    <img src="assets/chapter-6/7.png" width="250" id="asset-7" class="asset " z="-4"/>
    <img src="assets/chapter-6/8.png" width="150" id="asset-8" class="asset floating"/>
    <img src="assets/chapter-6/9.png" width="250" id="asset-9" class="asset"/>
    <img src="assets/chapter-6/10.png" width="250" id="asset-10" class="asset"/>
    <img src="assets/chapter-6/12.png" width="250" id="asset-12" class="asset"/>
    <img src="assets/chapter-6/13.jpg" width="250" id="asset-13" class="asset floating"/>
    
</div>

<img id="pelapapa" src="assets/chapter-6/12.png" class="floating asset" width="250" on:click={showText} >




<div class="texto" id="texto">




    <h2>Pelotón de frutas. Digo papas, digo estatuas. ¿Dónde voy?</h2>
    <br/>
    <p>Nakamura traía en las manos el origen del pela papas, y en su materia prima, la
piedra filosofal de una cultura. Llegó casi de casualidad a la Argentina. Se vino
de lejos porque le advirtió un amigo del padre que el cono sur no es un mito
glacial, ni la figura poética de una publicidad noventosa. Hay latifundios
disponibles, pescados varios, cuero. Eso le gustó. Recursos amplios de comercio,
pensó.</p>
    <p>Por eso la tarea de encontrar un lugar de intercambio se implantó apenas atravesó las barreras del aeropuerto. Trajeados con los colores de su país y etiquetados con el nombre de su padre, lo esperaba una agrupación de personas de edades varias, inclusive con niños dando vueltas, que enseguida se impusieron en el traslado de sus valijas y repararon en la cantidad de horas que su cuerpo había permanecido en la misma posición. Mientras una pareja de unos sesenta años suavemente apoyaba las manos en sus omóplatos y lo escoltaba hacia la salida, otra pareja joven que parecía ser parte del mismo grupo lo observaba fijo a los ojos mientras sacudían las cabezas como perros de taxi y repetían seguido la palabra “jetlag” al unísono. Esgrimidas meras gesticulaciones de Nakamura frente a la velocidad de desplazamiento que ejecutó el bloque familiar, su atención se vio completamente atropellada. Con una tarjeta en la mano y dos direcciones desconocidas, se encontró aturdido en el asiento trasero de un taxi que lo alcanzó a la primera de ellas. Cuando llegó al hotel, nadie lo estaba esperando en particular, ni siquiera algún allegado a la familia anterior. Firmó desordenado unos papeles aceptando tres días pagos de habitación, y entonces le dieron directivas precisas de cómo proceder a su próximo destino. Nakamura se prendió al equipaje y no lo soltó hasta que sus pies alcanzaron los albores del cuarto. </p>
    <p>Una vez en la casa de visita, temprano por supuesto, un portón de alguna aleación impura del hierro se deslizó con velocidad hacia uno de los costados. Ahora de frente, un hombre canoso vestido elegante sport lo esperaba sonriendo como si intentara imitar un afiche de Clint Eastwood; y que por lo pronto decidió no emitir palabra ni soltar el rictus hasta llegar a la puerta principal. Al hacerlo pasar, el hombre apretó cálidamente uno de los hombros de Nakamura como si tanteara la consistencia de una fruta para elegirla. 

</p>
    <p>Cuando algo novedoso se arrima a un grupo de asiduos, pareciera acontecer una reacción química vistosa. La mente nos engaña con el envoltorio, como si éste fuera en realidad el motor que opera en el acercamiento de los cuerpos; pero el meollo tiene su fuente en el entrenamiento del vendedor. En cómo se exhiben los hilos que agolpan los intereses que mantienen la tensión histórica de la propiedad, aparte de la inquietud innegable que provoca el ser importado. Entonces decidió entrar con cautela mientras verificó tener encima los metales para cumplir con los anfitriones. Se acercó a la sala y apenas se encontraron, la masa de personas que estaba hasta entonces ubicada en una variable amplia de sillas y sillones, se paró abruptamente. Siempre los de afuera nos hacen sentir unos tiempos tarde, comentó el hombre que estaba sentado en la cabecera de la mesa más grande y enseguida unas risas socarronas dieron inicio a la tertulia. El invitado sonrió y miró panorámico el banquete que hacía de vidriera en su arribo. Inspiró profundo para acomodar la energía de sobra fuera de su cuerpo. El cuadro que veía era frutal, cada uno de los integrantes de la familia parecía ser parte de un retrato de Arcimboldo, respetando los niveles pulcros de pigmento y barniz; ahora se estaban quietos, léase cómodos, disfrutando del encuentro. No llegó a darse asiento, que una catarata de preguntas sobre las temáticas más diversas lo acorralaron. Reflexiones ácidas sobre los verdes fosforescentes de la última Kawasaki empezaron el intercambio verbal, y enseguida otras más insólitas como la resistencia máxima de un manojo de cañas de bambú ante la contingencia de un terremoto. Estadísticas. Casi sin dejarlo contestar llegaron los álbumes de fotos con paisajes paradisíacos alrededor del mundo, él supuso que era una estrategia para no sentirse tan tercermundistas. Por eso también fueron adornando la velada con extensas congratulaciones por ser potencia, para luego continuar con otra tanda de preguntas quizás aún mas elocuentes como: ¿Cuánto cobra el empujador de las personas en el metro? </p>
    <p>Hasta entonces Nakamura convertido en una figura de cera, no había hecho a tiempo de exponer la maquinaria que se escondía entre sus dedos, no había manera en estos términos de instalar el ademán de venta; tal era la velocidad que corría en la sala, que las expresiones y tonos de los locales fabricaban un andamio de brazos y bebidas insoportable. El oasis de pausa necesario asomó existencia en un niño que ubicado en una silla considerablemente más grande que él, sostenía su cuerpo haciendo fuerza en los apoyabrazos para dejar así que las piernas abandonaran el piso y se balancearan a su gusto. En el oscilar de ese acto Nakamura se olvidó por unos momentos la admiración evidente de la familia hacia él. La expectativa por cautivar al invitado parecía estar llegando a su cresta.
 
Desde la cabecera de una de las puntas que cotizaba la charla, uno de los comensales hablaba de los picos de las montañas. De que hasta la nieve es ordenada y pareja en Japón, que el monte Fuji por ejemplo no es aquel destartale rocoso del Aconcagua… Y mientras mandaba al resto a mirar fotos en internet, tomaba con la mano entera varias de las uvas rosadas que reposaban en una bandeja de plata al límite de la mesa. Cuando llegaban a la boca, enseguida las desplazaba hacia atrás para ahorrarle trabajo a sus caninos y dejar que el fondo completara la labor. La piel de ellas se iba quebrando junto con los carozos que sonaban, pero no se oían del todo por que él era demasiado ruidoso al hablar. Su mano izquierda apoyada en la cintura y su torso cuarenta y cinco grados hacia adelante exponían todas las certezas que necesitaba compartir con el resto. No le interesaba debatir, solo enunciar un interminable derrotero de acusaciones contra el país que lo vio nacer, pero que pareciera no saber nada de desarrollo y estímulo ciudadano.  
–Escúchenme una cosa… A ver, esto es curioso. 
Hizo una pausa y movió los ojos para cerciorarse que tenía la atención del resto.
–Acá, vos tenés todos los minerales que quieras en esta manito que Dios te dio. Y con esta otra levantás el teléfono y armas el bastón presidencial del material y forma a pedido que a vos más te guste. Así como lo escuchas. 
–No te gusta bastón. Cambiemos, digamos… ¡Ya se! emprendimiento, pyme, no…Algo mas chic… Microemprendimiento. 
Guiñó un ojo. 
–¿Me vas a decir a mí como hay que arremangarse la mano? Ya no te dan mas ganas. Hablemos claro. No existen mas las mangas acá, desaparecieron el día que se inventó el mensajito de texto. O hablas o no hablas esa gramática, corta. Tasaciones al por mayor mi amor, así se va a llamar mi próximo nieto. Sino pregúntenle a nuestro colega foráneo, el sabe de lo que hablo–.  </p>
<p>Cortó la fila de palabras con una risa bacana. En simultáneo y estaqueado opuesto a la mesa donde se apoyaba uno de los codos del hombre, estaba Nakamura que por unos instantes se había librado de las miradas del resto. Sus ojos disecados frente al discurso no toleraron el cementerio frutal de la boca del tipo, pensando quizás, en esas tierras donde ya no crece nada, o en el eco que causa el empapelado vencido de las paredes junto a las carcajadas cocodrilas de todos. Rápido agarró una copa y propuso un brindis golpeándola suavemente en plegaria del postre. Apretó los labios y los estiró para sonreír en una modulación absolutamente ajena a la conocida por todos, evitando náuseas tal vez o algunas formulaciones lingüísticas demasiado belicosas para la situación. No me esperaba este recibimiento, dijo Nakamura terso. La mesa se quedó congelada, era la primera vez que emitía una palabra.</p>
<p>En esta casa las mujeres traen el postre dijo una de las señoras de pelo negro lustrado hasta los hombros por el exceso de atención, y en las manos que tambaleaban, sostenía rígida una canasta de mimbre descubierta donde yacían las mitades de unas frutillas gigantes que Nakamura jamás había visto en la vida. Para variar, habían adornado la crema chantillí de tal modo que el conjunto formaba la bandera de Japón. Era un enchastre por donde se lo viera. Por eso para rellenar el vacío, ella le aconsejó a su invitado que no probara el dulce de aquí, porque iban a correr con ventaja para el momento del negocio; a él, que justo para ese entonces parecía una flor que encontró su posición de descanso replegándose del rocío de opiniones. Fue en uno de esos momentos de ausencia de preguntas que el niño de los pies en el aire, uno de los más jóvenes y dulces, todavía con la complexión turgente por la edad, lo miró de arriba abajo como se suele hacer. Se rascó la cabeza y le dijo sin dudar: 
–Ahora todos se alegran por imaginarse un rato armando sus casas allá fuera, lejos de estas fronteras. Esto que usted trae, ¿Es para ver si encima se quedan con un suvenir que muestre la tan negada hipocresía? Entonces… ya que usted sabe escuchar… Me puede explicar por favor, ¿cómo es que se formó este carozo en mi garganta? –. 
Durante los próximos 30 segundos solo se miraron. En líneas rectas. Entendieron que el encuentro que estaban teniendo no era de países, sino ontológico. Una trastienda aparte.
</p>
<p>Lo inoxidable viene de allá. De la fricción continua del metal en la forma, del tironeo constante entre contenido y continente, entre la cáscara y el néctar. El pelador entra en la materia y va descubriendo, como se hace con el mármol, todo lo que estaba dentro por verse. Lo podrido o lo naciente. Una exploración hacia los órganos de las cosas. Es un sistema milenario. Eso dijo Nakamura varias veces, hablaba de milenios, y cuando lo repetía le gustaba llevar la mano derecha hacia atrás por encima del hombro, en un movimiento ligado y corto, y al mismo tiempo, fruncía las cejas apenas entonadas hacia las puntas, como si hablara de una ecuación intransferible para los mortales oyentes. 
</p>
<p>El niño le pidió de probar la sensación. Intentó expresar lo importante que era para él la experiencia. 

Mientras se acercaba, Nakamura no le sacó los ojos de encima. Sonrió apenas, en réplica tenue a la pregunta anterior. Le agarró la mano cálidamente, y juntos completaron el movimiento sobre una manzana. La franja se dibujó a lo largo de la fruta en segundos. Se cayó al piso y dejó al descubierto las entrañas de la cosa. Ahí mismo, sin perder tiempo, le pidió que se recostara en el suelo, e invitó a todos a atestiguar el poder del instrumento. La audiencia dio un paso hacia adelante. Con ojos cerrados estiró los brazos en tabla por sobre el ombligo del pequeño, apoyó la mano izquierda en el centro del estómago y marcó la mitad exacta deslizándola hacia arriba y hacia abajo con mucha calma; mientras que la otra mano sostenía el objeto solo de sus costados, con la pinza que forman el índice y el pulgar. El frío en el metatarso. El fuego de los párpados. Solo cuatro movimientos bastaron para rebanarle las pieles del frente. Silencio. El niño, estático. Los de allá, verdes. Y Nakamura balbuceó algo en japonés, como si llegara al final de un canto triste. Recogió el pedazo de manzana que habían pelado anteriormente y se lo colocó en la boca, que parecía ser la única parte de su cuerpo que no estaba desmantelada. Les explicó a todos que éste ejemplar era el último del mercado, que gracias por la cena, pero que no estaban listos para el descuento. El niño se desmayó y el resto con él. 
</p>

<center>
<img src="assets/chapter-6/1.png" width="250" />
</center>

</div>

</section>

<div class="{hideControls ? 'hide' : ''}">
    <div id="controls" >
        <img src="/assets/chapter-6/play.svg" alt="" id="play" >
        <img src="/assets/chapter-6/pause.svg" alt="" id="pause">
    </div>
</div>