<style>
    .p5Canvas{
        display: none
    }

    :global(:root){
        overflow: auto;
    }
    .chapter-1{
        font-family: 'EXTRA Serif';
        color: white;
        font-size: 30px;
        background: #191621;
    }

    footer{
        height: 200px;
        background: rgb(38,213,97);
        background: -moz-linear-gradient(0deg, rgba(38,213,97,1) 0%, rgba(25,22,33,1) 74%);
        background: -webkit-linear-gradient(0deg, rgba(38,213,97,1) 0%, rgba(25,22,33,1) 74%);
        background: linear-gradient(0deg, rgba(38,213,97,1) 0%, rgba(25,22,33,1) 74%);
        filter: progid:DXImageTransform.Microsoft.gradient(startColorstr="#26d561",endColorstr="#191621",GradientType=1);
    }

    p{
        max-width: 800px;
        margin: auto;
        position: relative;
        z-index: 9999;
        line-height: 50px;
        text-align: justify;
    }

    .big-line{
        position:fixed;
        right: 100px;
        top: 0;
    }
    h2{
        text-align: center;
        padding-top: 100px;
        margin-bottom: 100px;
        text-transform: uppercase;
        letter-spacing: 60px;
        text-shadow: 10px 0px 30px green;
    }
    h2 span{
        display: inline-block;
    }
    p{
        padding-bottom: 100px;
    }

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
    
    .head{
        height: 70vh;
position: relative;
    }

    .rect-1{
        position: absolute;
        top: 310vh;
        left: 30px;
        width: 100px;
       box-shadow: 10px 10px 0 rgba(255,255,255,0.2);
}

    .mandibula-1{
        position: absolute;
        bottom: 1vh;
        right: 5vw;
    }

    .mandibula-2{
        position: absolute;
        top: 250vh;
        right: 10vw;
    }

    .mandibula-3{
        position: absolute;
        top: 500vh;
        left: 10vw;
    }

    .plantas,.plantas2,.plantas3,.plantas4,.plantas5{
        width: 100%;
        height: 100%;
        position: fixed;
        top: 80vh;
        background-image: url(assets/chapter-1/plantas.png);
        background-repeat: no-repeat;
        background-size: auto 100%;
        background-position: center;

    }

    .plantas{
        width: 40%;
    }

    .plantas2{
        top: 480vh;
        width: 50%;
    }

    .plantas3{
        top: 680vh;
        width: 50%;
        right: 0;
    }

    .plantas4{
        top: 780vh;
        width: 40%;
        left: 0;
    }

    .plantas5{
        top: 880vh;
        width: 50%;
        right: 0;
    }

    @keyframes changer-color-animation{
        0%{
            color: #1cd45d;
        }
        50%{
            color: #ba54e4;
        }
        100%{
            color: #1cd45d;
        }
    }

    
    .fondo{
        background-image: url(assets/chapter-1/fondo-mona.jpg);
        background-repeat: no-repeat;
        background-position: center center;
        background-size: auto 100%;
        width: 100%;
        height: 100%;
        position: fixed;
        padding-top: 150px;
    }
    .changer-color{
        
    }

    b{
        font-weight: normal;
    }

    .blink_me {
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
    width: 45px;
    position: fixed;
    top: 20px;
    right: 20px;
    cursor: pointer;
}
.tooltip{
    max-width: 500px;
    text-transform: uppercase;
    background: #25d560;
    padding: 5px;
    border-radius: 3px;
    position: fixed;
    width: 500px;
    top: 20px;
    right: 70px;
    color: black;
    letter-spacing: 1px;
    padding-left: 10px;
}

@media (max-width: 640px){
    .big-line{
        position: absolute;
    }

    p{
        padding-left: 20px;
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
    document.title = "L A  M O N A"
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

<section class='chapter-1' >

    <audio loop src="assets/chapter-1/mona.mp3" id="la-mona-audio" />
    <div id="jarvis">
    <a  href='/'><img width="50" height="50" src="assets/chapter-1/ja.png" alt=""></a>
    </div>
    <div class="head" >
        
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
                    En lo posible, colocarse auriculares. Iniciar la música. Dejarla correr por 22 segundos. Ahora si, empezar a leer
                </div>
            {/if}
        </div>
        <div class="fondo" z="-1"></div>
        <img src="assets/chapter-1/palo.jpg" alt="" class='big-line'>
        <div class='plantas blink_me' z="-2"></div>
        <div class='plantas2 blink_me' z="-1"></div>
        <div class='plantas3 blink_me' z="-1"></div>
        <div class='plantas4 blink_me' z="-1"></div>
        <div class='plantas5 blink_me' z="-1"></div>
        
        <img src="assets/chapter-1/rec_1.png" alt="" class='rect-1 floating' z="5">
        <img src="assets/chapter-1/mona-mandibula.png" alt="" class='mandibula-1 floating' z="5">
        <img src="assets/chapter-1/mandibula-line.png" alt="" class='mandibula-2 floating' z="8">
        <img src="assets/chapter-1/mandibula-relleno.png" alt="" class='mandibula-3 floating' z="8">
        
        
        
    </div>

    <h2><span z="-2">L</span><span z="-0.5">a</span> <span z="-3">M</span><span z="-1">o</span><span z="-7">n</span><span z="-3">a</span></h2>
    <p>Don Hortensio Chuy oriundo de las profundidades precarias de una modesta familia misionera, zanjó su adultez en una furtiva corrida de ómnibus manipulada con cierta incongruencia hacia Corrientes luego de escaparse de los mandatos de su padre; Segundo Eneldo Chuy (primer petisero agrio de la zona) quien había arreglado de manera intempestiva el matrimonio de su hijo con Vilma Eduarda Narváez, hija séptima de un torrente de niños misioneros con apenas elevada clase social. Enseguida se comentó en el pueblo después de la plantada a manos del joven, que el mal aliento latente ocasionado por el empeñoso consumo de endivias (agro crecido vegetal vasto del lugar) había determinado de manera radical el humillante escape. Así que, con apenas dieciséis años y unas pastillas de menta en los bolsillos, su porvenir se volvió cosa seria. El auxilio entonces fueron las cálidas manos de Aurora Ibarra Meltós, una anarquista voraz pero mansa por años de servicio nodrizo, con quien sí contraería matrimonio sobre las costas amplias del Paraná, bien al límite entre la provincia misma y Corrientes.</p>
    <p>Marcado por una herencia de huidas y revolución, Euterio Dalilo Chuy resultaría el hijo sexto de la pareja como parte de una cepa continua de niños varones nacidos entre marzo de 1944 y abril de 1953. Euterio fue un niño prolífico en su clase, obteniendo repetidas veces MS (muy satisfactorio) en casi todas las asignaturas. Por tanto, gracias a su innegable capacidad, y en un arrebato de egoísmo y humedad, los padres se acercaron al rector de la nimia escuela rural para pedirle encarecidamente que evite el excelente, ya que consideraban un tanto disruptivo que a esta edad el niño adquiriera demasiado contacto con la inefabilidad del éxito escolar. </p>
    <p>Gracias a estos hermetismos académicos, Euterio desarrolló un terrible fanatismo por la fauna y la flora silvestre de la zona, ejercitando a diario la curiosidad por casi cualquier ser vivo que decidiese acompañarlo en este camino transitorio por el denso ecosistema. Cualquier árbol caído podía ser convertido en lanza en tan solo minutos, dominando a la perfección el arte del cincel y la caza. A su vez, se volvió un erudito de los tipos y formas de las orquídeas tropicales, y hasta llegó a fabricar un sistema dodecafónico artificial para darle a cada una de ellas la personalidad sonora correspondiente, ya que para él, resultarían irreconocibles de otro modo. </p>
    <p>Lo que también perseguía con cierto ahínco al despliegue aventurero de nuestro homenajeado, era la eterna compañía heredada de las pastillas de menta. Cada viaje que emprendía resultaba incompleto sin su presencia. Así fue como aquel verano sofocante del 68, esgrimido entre el calor franco-ferviente de su madre y su pequeña adicción, logró percudir la paciencia total de varios de sus premolares; entonces su padre no encontró otra solución para el sosiego de su hijo, que arrancarle de a portazos una cantidad considerable de estas piezas pertenecientes al maxilar superior. </p>
    <p>Apenas más adulto y con ansias desconocidas de psicoanálisis, un día Euterio se adentró en la jungla a llorar solo. Nunca había experimentado tal dolor sostenido en el tiempo, donde el único refugio que conocía era admisible entre sus amigos semi inertes. Padeciendo dolores extremos y recorriendo los recovecos más eunucos de la selva, él mismo decidió construir en tiempo récord, toda la batería dental faltante a su complexión. Ya no extrañaría a sus fieles compañeros, sino todo lo contrario, sería el primer niño vivo (a su entender) con dientes de madera.    </p>
    <p>Su vida había cambiado para siempre, nunca jamás volvería a sentir dolor alguno en su boca, tenía ante sí, la habilidad cuasi heroica de triturar sin sentir, todos los yuyos habidos y por haber que se presentaran. Inclusive, la musicalidad que detallaban cada una de sus orquídeas favoritas podía figurarse en una música hecha pura y exclusivamente por él. Se sentía un pájaro, un hijo pródigo de la pacha, quién más soberano que el ser que se sentía ahora, mitad humano, mitad bestia, suave, pero fiera al fin. Su gobierno selvático había empezado y era momento de celebrar.</p>
    <p>Fue así como entre los confines de su casa y uno de los arroyos pertenecientes a las hectáreas que perimetraban, nacía una arteria pantanosa y tenue, que venía dibujando hacía meses en él, una inquietud más que sedienta para festejar el triunfo en las nuevas elecciones dentales. Salió entonces en secuestro de una botella de aguardiente sobre la repisa de su padre y se suscitó sin más, a la maleza brava de lo desconocido. </p>
    <p>Con este envión de júbilo Euterio se abrió camino entre las matas, y así los brazos y piernas en movimientos continuos y ondulantes, descubrieron nuevos modos de empujar la tierra para emular a las aves que lo acompañaban diariamente en sus orquestas salvajes. Los tallos y troncos presenciando el despliegue se arquearon en equilibrio para que su querubín humano hiciera senda entre ellos, mientras tanto el entorno laminaba en ocres las aristas finas de las hojas dando marco cálido al concierto. Inmerso en las posibilidades infinitas de este campo, ignorando ya por completo cualquier resquemor hacia las calificaciones anteriores insuficientes, Euterio ahora masticaba música para sus oídos. Avanzada la euforia y la embriaguez, el paso del tiempo se volvió una materia ausente para el joven presidente, y así la noche se abalanzó fugaz sobre sus cantos. </p>
    <p>En un esfuerzo por apurar la vuelta, se encontró dubitativo y absorto ante la inmensidad del follaje, ante el pandemonio lúgubre de sus colegas animalitos. Ya quedose sin pastillas para calmar la electricidad ansiosa, que lentamente sus talones empezaron a temblar, como quien se acerca al precipicio y en ese instante entiende el arrepentimiento. El aire se puso grueso, como si la pausa fuera un ser vivo merodeante. Un ruido recto y unánime marcó el final de las palabras. Pero como la barbarie siempre es cura ante el final venidero, no quedó otro remedio que agotar las últimas consecuencias. Respiró hondo, tanto que el pulmón derecho ardió entero en el acto, y entonces con la mano más hábil, abrió grande la boca y se arrancó de un saque toda la dentadura falsa. El suelo mojado de rocío y sangre era imposible, pero con este mobiliario en la mano, todavía tenía chances de esperar distinto. Arrimó las plantas más secas de las ramas más tiesas desperdigadas por ahí, y a fuerza de piedras y hambre, armó un fulgor de escape. Ante las luces y el humo, el vigor de aguantar las heridas pergeñó sus sentidos hacia lo interminable del afuera. </p>
    <p>En la vorágine de la fogata, registró que desde no tan lejos, y a su suerte quizás, se balanceaban algunos árboles cercanos, y las ramas parecían crujir como si sostuvieran algo ajeno, pesado pero ágil. Hacía barullo, como si tarareara alguna musiquita para adentro. Euterio, primero sintió pánico, porque a ver, que otra cosa sino bicho grande que aprieta fuerte y ya sabemos cómo muerde… Pero es acá donde él hizo una pausa y descubrió un dato curioso que le cambió la idea de nostalgia para siempre. De las tinieblas de las copas, bajó un hombre bravo, que por miedo de que el fuego arrase, se dispuso a ver qué de todo andaba ardiendo por ahí. Se acopió calmo el hombre mono, pero amable. Hablaron ratos. Aquél, le dijo que lo había visto pasear algunas tardes por los pasos de pasto, que también (confesó sonrojándose un poco) se detuvo a ver cómo cincelaba las líneas entre sus dientes; y reveló en suma como se asustó un tanto cuando empujó profundo en su coloque. Euterio le explicó de la importancia de los dientes para poder compaginar preciso el sonido que arma sentido para sus orquídeas. Porque antes, con la inclusión de la madera, podía sectorizar mejor las notas y separar en tríos las cuartetas plantas favoritas. Cuartetas... repitió el hombre. Entonces, entre el sonido del fuego y las voces del entorno, Euterio enunció: Orquídeas epífitas, terrestres, y litófitas. El hombre sonrió, expectante. Y apenas terminada la cuenta musical, se abrió súbito desde las fauces, un flujo emanado en un sonido perenne que se vuelve armonía solo en la mezcla de humanos y bestias vegetales, que cuando así lo logran, suenan cómplices en el claroscuro de lo invisible. Cada uno de los sonidos referentes fueron ejecutados a la perfección, sin la dentadura de guía, pero con absoluta destreza. Luego de una pausa atónita, Euterio le preguntó si podía ayudarlo a salir, ya que había perdido por completo el sentido de la orientación. Entonces el hombre todavía perplejo asintió, y agregó que iba de camino a Córdoba hacia la casa de unos amigos músicos, donde las dentaduras abundan en formas y tonos, y que seguro habría de llevar novedades.  El niño agradecido, sonrió y preguntó: ¿Cómo es tu nombre, mi querido héroe anónimo? Jiménez, dijo el hombre en un rapto. Así soy para los amigos. 
</p>
</section>

<footer></footer>

