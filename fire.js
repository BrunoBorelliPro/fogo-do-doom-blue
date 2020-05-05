const firePixelArray = []
const fireWidth = 40;
const fireHeigth = 40;
const fireColorsPalette = [{"r":1,"g":1,"b":20},{"r":1,"g":1,"b":35},{"r":1,"g":1,"b":45},{"r":1,"g":10,"b":55},{"r":1,"g":10,"b":50},{"r":1,"g":10,"b":60},{"r":0,"g":10,"b":70},{"r":0,"g":10,"b":75},{"r":0,"g":10,"b":90},{"r":0,"g":10,"b":100},{"r":0,"g":10,"b":110},{"r":0,"g":10,"b":120},{"r":0,"g":10,"b":130},{"r":0,"g":10,"b":140},{"r":0,"g":10,"b":150},{"r":0,"g":15,"b":165},{"r":0,"g":20,"b":175},{"r":0,"g":25,"b":185},{"r":0,"g":30,"b":190},{"r":0,"g":35,"b":200},{"r":0,"g":40,"b":230},{"r":0,"g":55,"b":240},{"r":0,"g":55,"b":255},{"r":0,"g":60,"b":250},{"r":0,"g":60,"b":200},{"r":0,"g":50,"b":200},{"r":0,"g":55,"b":210},{"r":0,"g":50,"b":220},{"r":3,"g":80,"b":230},{"r":0,"g":150,"b":245},{"r":0,"g":200,"b":240},{"r":0,"g":230,"b":255},{"r":0,"g":150,"b":255},{"r":0,"g":180,"b":255},{"r":0,"g":190,"b":241},{"r":0,"g":208,"b":248},{"r":255,"g":255,"b":255}];
function start(){
    createDataFireStructure()
    createFireSource()
    renderFire();

    setInterval(calculateFirePropagation, 50)
}

function createDataFireStructure(){
    const numberOfPixels = fireHeigth * fireWidth
    for (let i = 0; i < numberOfPixels; i++) {
        firePixelArray[i] = 0;    
    }
}

function calculateFirePropagation(){
    for (let column = 0; column < fireWidth; column++) {
        for (let row = 0; row < fireHeigth; row++) {
            const pixelIndex = column + ( fireWidth * row )

            updateFireIntensityPerPixel(pixelIndex)
        }
    }
    renderFire()
}

function updateFireIntensityPerPixel(currentPixelIndex){
    const belowPixelIndex = currentPixelIndex + fireWidth

    if (belowPixelIndex >= fireWidth * fireHeigth) {
        return
    }
    const decay = Math.floor(Math.random() * 3)
    const belowPixelFireIntensity = firePixelArray[belowPixelIndex]
    const newFireIntensity = 
    belowPixelFireIntensity - decay >=0 ? belowPixelFireIntensity - decay : 0

    firePixelArray[currentPixelIndex + decay] = newFireIntensity
}

function renderFire(){
    const debug = false
    let html = '<table cellpadding=0 cellspacing=0>'
    
    for (let row = 0; row < fireHeigth; row++) {
        html += '<tr>'
            for (let column = 0; column < fireWidth; column++) {
                const pixelIndex = column + (fireWidth * row)
                const fireIntensity = firePixelArray[pixelIndex]
                if (debug === true) {
                    html += '<td>'
                    html += `<div class="pixel-index">${pixelIndex}</div>`
                    html += fireIntensity
                    html += '</td>'
                }else{
                    const color = fireColorsPalette[fireIntensity];
                    const colorString = `${color.r},${color.g},${color.b}`
                    html += `<td class="pixel" style = "background-color: rgb(${colorString})">`
                    html += '</td>'
                }
            }
        html += '</tr>'
        
    }

    html += '</table>'

    document.querySelector('#fireCanvas').innerHTML = html
}

function createFireSource(){
    for (let column = 0; column <= fireWidth; column++) {
        const overflowPixelIndex = fireWidth * fireHeigth
        const pixelIndex = (overflowPixelIndex - fireHeigth) + column

        firePixelArray[pixelIndex] = 36
    }
}

start();