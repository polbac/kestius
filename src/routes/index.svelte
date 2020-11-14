<script>
import { onDestroy, onMount } from 'svelte'
import { universalDoc as d } from '../util/document'

let credits = false
let kestious = false
let items = []
let itemsVector = []

const WIDTH = 400
let DIRECTION

let type
let isInHome = false

let interval

onDestroy(() => {
    clearInterval(interval)
    d.removeEventListener(type, () => {}, true)
    d.removeEventListener('onkeydown', () => {}, true)
    d.removeEventListener('up', () => {}, true)
    isInHome = false
})

onMount(() => {
    window.setup = () => {
        createCanvas( window.innerWidth
    || d.documentElement.clientWidth
    || d.body.clientWidth, window.innerHeight
    || d.documentElement.clientHeight
    || d.body.clientHeight);
}
    window.draw = () => {
        clear()
        pos.push({
            x: mouseX,
            y: mouseY,
        })
        
        pos.forEach((item, index) => {
            if (index > 0)
            line(pos[index - 1].x, pos[index - 1].y, pos[index].x, pos[index].y);
        })
        
    }
    isInHome = true
    interval = setInterval(clearPoints, 100)
    type = "onwheel" in document ? "wheel" : "mousewheel"
    d.title = "K E S T I U S"
    items = d.getElementsByClassName('item')
    let i = 0
    for (let item of items) {
        itemsVector[i] = { x: 0 }
        i++
    }
    itemsVector = itemsVector.map((item, x) => ({ x: x * WIDTH, i: x, y: -100 + (Math.random() * 200) }))

    render();
    const title = d.getElementById('title')
    d.querySelectorAll('.item').forEach(element => {
        element.onmouseenter = () => {
            title.innerText = element.getAttribute('title')
            title.style.display = "block"
        }
        element.onmouseleave = () => {
            title.innerText = ""
            title.style.display = "none"
        }
    })

    const move = (vecX) => {
        if (!isInHome) return

        pos.forEach((item, index) => {
            pos[index] = {
                x: pos[index].x + vecX,
                y: pos[index].y
            }
        })

        if (vecX > 0) {
            DIRECTION = 1
        }

        if (vecX < 0) {
            DIRECTION = -1
        }

        itemsVector = itemsVector.map(item => {
            item.x = item.x + vecX
            return item
        })

        assertRestartLeft()
        assertRestartRight()

        render()
    }

    d.addEventListener(type, e => {
        const wheel = e.deltaX ? -e.deltaX : e.wheelDelta/40
        e.preventDefault();
        move(wheel)
    }, true);


    d.onkeydown = checkKey;
    d.onkeyup = () => { DIRECTION = 0 }

    function checkKey(e) {
        e = e || window.event;

        if (e.keyCode == '37') {
            move(1)
        }
        if (e.keyCode == '39') {
            move(-1)
        }
        
    }
        
})


function getWindowWidth() {
    return window.innerWidth
    || d.documentElement.clientWidth
    || d.body.clientWidth;
}

function getLeftVector() {
    return [...itemsVector].sort(function(a, b) {
        return a.x > b.x ? 1 : -1
    })[0]
}

function getRightVector() {
    return [...itemsVector].sort(function(a, b) {
        return a.x < b.x  ? 1 : -1
    })[0]
}

function assertRestartLeft() {
    if (DIRECTION === 1) return
    
    const leftVector = getLeftVector()
    
    if (leftVector.x + WIDTH < 0) {
        itemsVector[leftVector.i].x = getRightVector().x + WIDTH
    }

}
function assertRestartRight() {
    if (DIRECTION === -1) return
    
    const rightVector = getRightVector()

    if (rightVector.x > getWindowWidth()) {
        itemsVector[rightVector.i].x = getLeftVector().x - WIDTH
    }
}

function render() {
    let i = 0
    for (let item of items) {
        item.style.left = `${itemsVector[i].x}px`
        item.style.top = `${itemsVector[i].y}px`
        i++
    }
}

function showCredits(){
    credits = true;
}

function hideCredits(){
    credits = false;
}

function showKesitous(){
    kestious = true;
}

function hideKesitous(){
    kestious = false;
}


let pos = []


const clearPoints = () => {
    if (pos.length > 2) {
        pos.splice(0, 1)
    }
}

</script>
<style>
:global(:root){
    overflow: hidden;
    -ms-scroll-chaining: none;
    overscroll-behavior-x: none;
}

.item{
    position: absolute;
}

.item .hover{
    display: none;
}

.item:hover .hover{
    display: block;
}

.item:hover .normal{
    display: none;
}

.home{
    cursor: crosshair;
    overflow: hidden;
    background: #f5f2e0;
    width: 100vw;
    height: 100vh;
    font-family: "Courier Prime", Arial, Helvetica, sans-serif;
    font-size: 13px;
    letter-spacing: 2px;
}
a{
    display: inline-block;
    text-align: center;
    padding-top: 100px;
    padding-bottom: 100px;
    font-family: arial;
    text-decoration: none;
    
    color: black;
    margin: 10px;
    
}

.branding{
    position: fixed;
    bottom: 20px;
    right: 20px;
    cursor: pointer;
}
.credits{
    position: fixed;
    top: 20px;
    left: 20px;
    cursor: pointer;
    z-index: 9999;
}
.credits-section{
    position: fixed;
    overflow-y: auto;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
}

.credits-section .contain{
    font-size: 26px;
    max-width: 440px;
    color: blue;
    margin-left: 200px;
    
    padding-top: 50px;
    font-family: arial;

}

.credits-section .contain a{
    display: inline;
    color: blue;
    padding: 0;
    border-bottom: 1px solid gray;
}

.kestious{
    position: fixed;
    bottom: 20px;
    right: 20px;
    cursor: pointer;
    z-index: 9999;
}
.kestious-section{
    position: fixed;
    overflow-y: auto;
    width: 100%;
    height: 100%;
    bottom: 0;
    right: 0;
}

.kestious-section .contain{
       font-size: 26px;
    max-width: 440px;
    color: red;
    margin-left: 200px;
    padding-top: 50px;
    font-family: arial;
    position: fixed;
    bottom: 40px;
    right: 21px;
    text-align: right;

}

.kestious-section .contain a{
    display: inline;
    color: red;
    padding: 0;
    border-bottom: 1px solid gray;
}
@media (max-width: 640px){
    .credits-section .contain{
        margin-left: 20px;
        margin-right: 20px;
        width: 100%;
    }
    .item{
        position: static;
        text-align: center;
        width: 100%;
        padding: 0;
    }

    :global(:root){
        overflow: auto;
        -ms-scroll-chaining: auto;
        overscroll-behavior-x: auto;
    }

    .home{
        overflow: auto;
    }

    
}
.article-title{
        position: fixed;
        top: 50%;
        font-size: 40px;
        text-align: center;
        width: 100%;
        letter-spacing: 10px;
        display: none;
        font-family: arial;
        z-index:9999;
        pointer-events: none;
    }


@keyframes floating-vertical {
    0% {
        margin-top: 0;
    }  
    50% {
        margin-top: 15px;
    }  
}

@keyframes floating-horizontal {
    0% {
        margin-left: 0;
    }  
    50% {
        margin-left: 15px;
    }  
}

.item-vertical:hover{
    animation-name: floating-vertical;
    animation-duration: 1s;
    animation-iteration-count: infinite;
    animation-timing-function: ease-in-out;
    transition: all;
}
    
.item-horizontal:hover{
    animation-name: floating-horizontal;
    animation-duration: 1s;
    animation-iteration-count: infinite;
    animation-timing-function: ease-in-out;
    transition: all;
}
    
</style>

<link href="https://fonts.googleapis.com/css2?family=Courier+Prime&display=swap" rel="stylesheet">
<div class="home">
    <style>html,body{overflow:hidden;}</style>
    <div class="article-title" id="title">TITULO</div>
    <div class="branding" on:click={showKesitous}>KESTIUS®</div>
    <div class="credits" on:click={showCredits}>CREDITOS</div>
    <div class="scroll">
        <a href='chapters/LaMona' class='item item-vertical' title="LA MONA">
         <img src="assets/chapter-1/mona-mandibula.png" width="300"/>
         </a>
        <a href='chapters/PepenarPasto' class='item' title="PEPENAR PASTO">
        <img src="assets/chapter-2/asset2.png"  width="150" class='normal'/>
        <img src="assets/chapter-2/asset1.png"  width="210" class='hover'/>
        </a>
        <a href='chapters/Idolo' class='item' title="IDOLO">
        <img src="bino.png"  width="350" class='normal'/>
        <img src="bino_hover.png"  width="350" class='hover'/>
        </a>
        <a href='chapters/UnPaseoConmigo' class='item item-horizontal' title="UN PASEO CONMIGO">
        <img src="assets/chapter-5/asset_3.png"  width="300" />
        </a>
        
        <a href='chapters/Slogan' class='item item-vertical' title="SLOGAN">
        <img src="assets/chapter-6/8.png"  width="200" class='normal'/>
        
        <img src="assets/chapter-6/12.png"  width="200" class='hover'/>
        </a>
        <a href='chapters/Mandinga' class='item' title="MANDINGA MADORRA">
            <img src="paper.png"  width="300" class='normal' />
            <img src="paper_hover.png"  width="300" class='hover'/>
        </a>

        <a href='chapters/h' class='item' title="h." >
            <img src="noise.gif" class='hover'  style='    position: absolute;top: 110px;left: 20px;width: 250px;height: 160px;' width="300"/>
            <img src="tv.png" style='position: relative'  width="300"/>
            
        </a>
    </div>

    {#if credits}
        <div class="credits-section" on:click={hideCredits}>
            <div class="contain">
                <h2>créditos</h2>

                <p>Ilustraciones - Nana Schlez // <a href='https://www.instagram.com/nanaschlez' target="_blank">@nanaschlez</a> // </p>

<p>Programación - Pablo Bacchetta // <a href='https://www.instagram.com/elpolbac' target="_blank">@elpolbac</a> //</p>

<p>Asistencia motorizada - Fabio Sanchez</p>

<p>LA MONA</p>

<p>Música - Heidi Giel // <a href='https://www.instagram.com/heidigiel' target="_blank">@heidigiel</a> //</p>
<p>Colaboración de texto - Martin Müller //</p>

<p>PEPENAR PASTO</p>

<p>Música - Lucas Bunchi // <a href='https://www.instagram.com/la.buncha' target="_blank">@la.buncha</a> // </p>


<p>IDOLO</p>

<p>Intérprete - Julian Duffy // <a href='https://www.instagram.com/jvliandvffy' target="_blank">@jvliandvffy</a> //</p>
<p>Edición de sonido - Gonzalo Palmieri // <a href='https://www.instagram.com/gonzalopalmieri' target="_blank">@gonzalopalmieri</a> //</p>

<p>UN PASEO CONMIGO</p>

<p>Intérprete - Augusto Chiappe // <a href='https://www.instagram.com/colochiappe' target="_blank">@colochiappe</a> //</p>
<p>Edición de sonido - Gonzalo Palmieri // <a href='https://www.instagram.com/gonzalopalmieri' target="_blank">@gonzalopalmieri</a> //</p>


<p>MANDINGA MODORRA</p>

<p>Música - Lucas Bunchi // <a href='https://www.instagram.com/la.buncha' target="_blank">@la.buncha</a> // </p>
<p>Intérprete - Silvina Chivi García // <a href='https://www.instagram.com/chivigarcia' target="_blank">@chivigarcia</a> //</p>
<p>Edición de sonido - Gonzalo Palmieri // <a href='https://www.instagram.com/gonzalopalmieri' target="_blank">@gonzalopalmieri</a> //</p>


<p>SLOGAN</p>

<p>Música - Julian Kritzer // <a href='https://www.instagram.com/juliankritzer' target="_blank">@juliankritzer</a> // </p>
<p>Colaboración de texto - Martin Müller //</p>


<p>h.</p>

<p>Música - Heidi Giel // <a href='https://www.instagram.com/heidigiel' target="_blank">@heidigiel</a> //</p>
<p>Intérpretes - Heidi Giel - Agustin Suarez // <a href='https://www.instagram.com/heidigiel' target="_blank">@heidigiel</a> - <a href='https://www.instagram.com/agustinsuarez' target="_blank">@agustinsuarez.jpg</a> //</p>
<p>Producción, mezcla y master - Pablo Bursztyn // <a href='https://www.instagram.com/gonzalopalmieri' target="_blank">@bursz</a> //</p>
<p>Grabación de piano - Cachito Mix // <a href='https://www.instagram.com/gonzalopalmieri' target="_blank">@cachitomixstudio</a> //</p>
<p>Edición de video - Heidi Giel - Agustin Suarez // <a href='https://www.instagram.com/heidigiel' target="_blank">@heidigiel</a> - <a href='https://www.instagram.com/agustinsuarez' target="_blank">@agustinsuarez.jpg</a> //</p>

            </div>
        </div>
    {/if}

    {#if kestious}
        <div class="kestious-section" on:click={hideKesitous}>
            <div class="contain">

            <p>KESTIUS: antología digital sobre los sucesos convivientes hasta el día de la fecha. Los de después, están por verse. </p>
            <p><p>mail: kestius.kj@gmail.com</p>
            </div>
        </div>
    {/if}
    <script src="https://cdn.jsdelivr.net/npm/p5@1.1.9/lib/p5.min.js"></script>
    <style>.p5Canvas{
        position: fixed;
        top: 0;
        left: 0;
        width: 100% !important;
        height: 100% !important;
        pointer-events: none;
    }</style>
</div>

