var i = 0;
var j = 0;

function loadTrack(data){
    var url = data.src

    var audio_fx = null
    audio_fx = document.createElement('audio')
    audio_fx.setAttribute('src',url)
    audio_fx.load()
    audio_fx.addEventListener('loadeddata',function(){
        //alert("cargo")
        data.callBack(audio_fx)
    })
    audio_fx.addEventListener('error',function(){
        console.log("error cargando")
        data.callBack(null)
    })
}

function loadImg(data){
    var img = new Image()
    img.onload = function(){
        img.onload = null
        img.onerror = null
        data.callBack(img)
    }
    img.onerror = function(){
        img.onload = null
        img.onerror = null
        data.callBack(null)   
    }
    img.src = data.src
}

function getE(idname){
    return document.getElementById(idname)
}

function prepareFormulario(){
    //getE('formulario-img').style.width = (window.innerWidth-200)+'px'
    getE('formulario-wrap').style.width = zooms[actual_zoom]+'%'

    for(i = 0;i<puntos.length;i++){
        var punto = document.createElement('div')
        if(puntos[i].t=='opcional'){
            punto.className = 'formulario-punto-opcional'
            getE('formulario-opcional').appendChild(punto)
        }else if(puntos[i].t=='obligatorio-si'){
            punto.className = 'formulario-punto-obligatorio-si'
            getE('formulario-obligatorio-si-causal').appendChild(punto)
        }else if(puntos[i].t=='obligatorio-no'){
            punto.className = 'formulario-punto-obligatorio-no'
            getE('formulario-obligatorio-no-causal').appendChild(punto)
        }
        //punto.innerHTML = i

        punto.style.width = puntos[i].w+'%'
        var h = punto.offsetWidth
        if(puntos[i].h!=null&&puntos[i].h!=undefined){
            if(puntos[i].h=='1/2'){
                h = (punto.offsetWidth/2)
            }else if(puntos[i].h=='1/3'){
                h = (punto.offsetWidth/3)
            }else if(puntos[i].h=='1/4'){
                h = (punto.offsetWidth/4)
            }else if(puntos[i].h=='1/5'){
                h = (punto.offsetWidth/5)
            }else if(puntos[i].h=='1/10'){
                h = (punto.offsetWidth/10)
            }
            punto.setAttribute('h',puntos[i].h)
        }else{
            punto.setAttribute('h','1/1')
        }

        if(puntos[i].m!=null&&puntos[i].m!=undefined){
            var signo = document.createElement('div')
            if(puntos[i].mp!=null&&puntos[i].mp!=undefined){
                signo.className = 'signo signo-'+puntos[i].mp
            }else{
                signo.className = 'signo signo-right'
            }
            signo.innerHTML = '<img src="assets/images/icon-signo.svg" />'
            signo.setAttribute('onclick','clickSigno('+i+',this)')
            punto.appendChild(signo)
        }
        punto.style.height = h+'px'
        punto.style.left = puntos[i].x+'%'
        punto.style.top = puntos[i].y+'%'
    }
}

function resizePuntos(){
    var h = 0;
    var hh = 0;
    var ww = 0;

    var puntos_opcionales = getE('formulario-opcional').getElementsByClassName('formulario-punto-opcional')
    for(i = 0;i<puntos_opcionales.length;i++){
        hh = puntos_opcionales[i].getAttribute('h')
        ww = puntos_opcionales[i].getBoundingClientRect().width
        h = ww;

        if(hh=='1/2'){
            h = (ww/2)
        }else if(hh=='1/3'){
            h = (ww/3)
        }else if(hh=='1/4'){
            h = (ww/4)
        }else if(hh=='1/5'){
            h = (ww/5)
        }else if(hh=='1/10'){
            h = (ww/10)
        }

        puntos_opcionales[i].style.height = h+'px'
    }
    
    var puntos_obligatorias_si = getE('formulario-obligatorio-si-causal').getElementsByClassName('formulario-punto-obligatorio-si')
    for(i = 0;i<puntos_obligatorias_si.length;i++){
        hh = puntos_obligatorias_si[i].getAttribute('h')
        ww = puntos_obligatorias_si[i].getBoundingClientRect().width
        h = ww;

        if(hh=='1/2'){
            h = (ww/2)
        }else if(hh=='1/3'){
            h = (ww/3)
        }else if(hh=='1/4'){
            h = (ww/4)
        }else if(hh=='1/5'){
            h = (ww/5)
        }else if(hh=='1/10'){
            h = (ww/10)
        }

        puntos_obligatorias_si[i].style.height = h+'px'
    }

    var puntos_obligatorias_no = getE('formulario-obligatorio-no-causal').getElementsByClassName('formulario-punto-obligatorio-no')
    for(i = 0;i<puntos_obligatorias_no.length;i++){
        hh = puntos_obligatorias_no[i].getAttribute('h')
        ww = puntos_obligatorias_no[i].getBoundingClientRect().width
        h = ww;

        if(hh=='1/2'){
            h = (ww/2)
        }else if(hh=='1/3'){
            h = (ww/3)
        }else if(hh=='1/4'){
            h = (ww/4)
        }else if(hh=='1/5'){
            h = (ww/5)
        }else if(hh=='1/10'){
            h = (ww/10)
        }

        puntos_obligatorias_no[i].style.height = h+'px'
    }
}

var animating_signo = false;
var animacion_signo = null;
var tooltip_status = 'off'

function clickSigno(s,div){
    if(!animating_signo){
        if(tooltip_status=='off'){
            getE('tooltip-txt').innerHTML = puntos[s].m
            getE('tooltip').className = 'tooltip-on'
            setTooltipPos(s,div)
            tooltip_status = 'on'
        }else{
            animating_signo = true;
            getE('tooltip').className = 'tooltip-off'
            animacion_signo = setTimeout(function(){
                clearTimeout(animacion_signo)
                animacion_signo = null

                getE('tooltip-txt').innerHTML = puntos[s].m
                getE('tooltip').className = 'tooltip-on'
                setTooltipPos(s,div)
                tooltip_status = 'on'
                animating_signo = false;
            },250)
        }
    }
}

function cerrarTooltip(){
    getE('tooltip').className = 'tooltip-off'
    tooltip_status = 'off'
}

function setTooltipPos(s,div){
    over_mp3.play()
    var posx = div.getBoundingClientRect().left
    var posy = div.getBoundingClientRect().top

    var signo_width = (div.getBoundingClientRect().width / 2)
    getE('tooltip').style.left = (posx + signo_width)+'px'
    getE('tooltip').style.top = (posy - 10)+'px'
}

var actual_zoom = 2
var zooms = [60,80,100,120,140]
var animating_zoom = false;
var animation_zoom = null;

function zoomIn(){
    if(actual_zoom<(zooms.length-1)){
        if(!animating_zoom){
            animating_zoom = true;
            
            over_mp3.currentTime = 0
            over_mp3.play()
            actual_zoom++
            getE('formulario-wrap').style.width = zooms[actual_zoom]+'%'

            animation_zoom = setTimeout(function(){
                clearTimeout(animation_zoom)
                animation_zoom = null;

                resizePuntos()
                cerrarTooltip()
                animating_zoom = false;
            },150)
        }
    }
}

function zoomOut(){
    if(actual_zoom>0){
        if(!animating_zoom){
            animating_zoom = true;

            over_mp3.play()
            actual_zoom--
            getE('formulario-wrap').style.width = zooms[actual_zoom]+'%'
            
            animation_zoom = setTimeout(function(){
                clearTimeout(animation_zoom)
                animation_zoom = null;

                resizePuntos()
                cerrarTooltip()
                animating_zoom = false;
            },150)
        }
    }
}

///////////

function clickCheck(div,ind){
    var padre = div.parentNode
    var checks = padre.getElementsByClassName('formulario-check')
    for(i = 0;i<checks.length;i++){
        checks[i].className = 'formulario-check'
    }
    checks[ind-1].className = 'formulario-check formulario-checked'

    click_mp3.currentTime = 0
    click_mp3.play()

    if(ind==1){
        getE('formulario-opcional').className = 'formulario-on'
        getE('formulario-obligatorio-si-causal').className = 'formulario-off'
        getE('formulario-obligatorio-no-causal').className = 'formulario-off'
        opcion1_mp3.currentTime = 0
        opcion1_mp3.play()
    }else if(ind==2){
        getE('formulario-opcional').className = 'formulario-off'
        getE('formulario-obligatorio-si-causal').className = 'formulario-on'
        getE('formulario-obligatorio-no-causal').className = 'formulario-off'
        opcion2_mp3.currentTime = 0
        opcion2_mp3.play()
    }else if(ind==3){
        getE('formulario-opcional').className = 'formulario-off'
        getE('formulario-obligatorio-si-causal').className = 'formulario-off'
        getE('formulario-obligatorio-no-causal').className = 'formulario-on'
        opcion3_mp3.currentTime = 0
        opcion3_mp3.play()
    }

    cerrarTooltip()
}

function clickComenzar(){
    getE('instrucciones').className = 'instrucciones-off'
}