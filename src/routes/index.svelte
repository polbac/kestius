<script>
import { onDestroy, onMount } from 'svelte'

let credits = false
let items = []
let itemsVector = []

const WIDTH = 400
let DIRECTION

let type
let isInHome = false

let interval

onDestroy(() => {
    clearInterval(interval)
    document.removeEventListener(type, () => {}, true)
    isInHome = false
})

onMount(() => {
    isInHome = true
    interval = setInterval(clearPoints, 100)
    type = "onwheel" in document ? "wheel" : "mousewheel"
    document.title = "K E S T I U S"
    items = document.getElementsByClassName('item')
    let i = 0
    for (let item of items) {
        itemsVector[i] = { x: 0 }
        i++
    }
    itemsVector = itemsVector.map((item, x) => ({ x: x * WIDTH, i: x, y: -100 + (Math.random() * 200) }))

    render();
    const title = document.getElementById('title')
    document.querySelectorAll('.item').forEach(element => {
        element.onmouseenter = () => {
            title.innerText = element.getAttribute('title')
            title.style.display = "block"
        }
        element.onmouseleave = () => {
            title.innerText = ""
            title.style.display = "none"
        }
    })

    document.addEventListener(type, e => {
        if (!isInHome) return

        e.preventDefault();
        
        const wheel = e.deltaX ? -e.deltaX : e.wheelDelta/40

        pos.forEach((item, index) => {
            pos[index] = {
                x: pos[index].x + wheel,
                y: pos[index].y
            }
        })

        if (wheel > 0) {
            DIRECTION = 1
        }

        if (wheel < 0) {
            DIRECTION = -1
        }

        itemsVector = itemsVector.map(item => {
            item.x = item.x + wheel
            return item
        })

        assertRestartLeft()
        assertRestartRight()

        render()
    }, true);
    
})


function getWindowWidth() {
    return window.innerWidth
    || document.documentElement.clientWidth
    || document.body.clientWidth;
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


window.setup = () => {
    createCanvas( window.innerWidth
|| document.documentElement.clientWidth
|| document.body.clientWidth, window.innerHeight
|| document.documentElement.clientHeight
|| document.body.clientHeight);
}
let pos = []

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
.credits{
    position: fixed;
    top: 20px;
    left: 20px;
    cursor: pointer;
}
.branding{
    position: fixed;
    bottom: 20px;
    right: 20px;
    cursor: pointer;
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
    <div class="branding">KESTIUS®</div>
    <div class="credits" on:click={showCredits}>CREDITOS</div>
    <div class="scroll">
        <a href='chapters/LaMona' class='item item-vertical' title="LA MONA">
         <img src="assets/chapter-1/mona-mandibula.png" width="300"/>
         </a>
        <a href='chapters/Lucifer' class='item' title="PEPENAR PASTO">
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
        <img src="assets/chapter-6/8.png"  width="200" />
        </a>
        <a href='chapters/Mandinga' class='item' title="MANDINGA MADORRA">
            <img src="paper.png"  width="300" class='normal' />
            <img src="paper_hover.png"  width="300" class='hover'/>
        </a>
    </div>

    {#if credits}
        <div class="credits-section" on:click={hideCredits}>
            <div class="contain">
                <h2>creditos</h2>
                <p>Ilustraciones<br/>   Nana Schlez</p>
                <p>Desarrollo<br/>polbac</p>
                <p>Música<br/>Heidi Giel // La Mona - h. <br/>Lucas Bunchi // Pepenar pasto - Mandinga Modorra <br/>Julian Kritzer // Slogan  </p>
                <p>Producción, mezcla y master<br/>  // h. // - Pablo Bursztyn</p>
                <p>Intérpretes<br/>Julian Eduardo Duffy // Idolo <br/>Augusto Chiappe // Un paseo conmigo <br/>Silvina Chivi Garcia // Mandinga Modorra<br/>Agustin Suarez - Heidi Giel // h.</p>
                <p>Edición de video<br/> // h. - Heidi Giel - Agustin Suarez</p>
                <p>Edición de sonido<br/>Ídolo // Un paseo conmigo // Mandinga Modorra // - Gonzalo Palmieri</p>
                <p>Colaboración de texto<br/>La Mona - Slogan // - Martin Muller</p>
                <p>Asistencia motorizada<br/>Fabio Sanchez</p>
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

