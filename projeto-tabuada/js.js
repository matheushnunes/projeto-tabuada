let num1 = document.querySelector("#num1")
let num2 = document.querySelector("#num2")
let btn_submit = document.querySelector('#btn_submit')
let html = document.querySelector('html')
let body = document.querySelector('body')
let res = document.querySelector('#res')
let NumeroAleatorio = ()=>{
    let arrNumeros = [3,4,6,7,8,9]
    let numeroAleatorio1 = Math.floor(Math.random()*(arrNumeros.length))
    let numeroAleatorio2 = Math.floor(Math.random()*(arrNumeros.length)) 
    num1.textContent = arrNumeros[numeroAleatorio1]
    num2.textContent = arrNumeros[numeroAleatorio2]
}

let Gess = (n1,n2,res)=>{
    if(n1 * n2 == res){
        let div = document.createElement('div')
        let resul = [...document.querySelectorAll('.resultado')]
        if(resul.length != 0){
            resul.forEach((e)=>{
                e.remove()
            })
        }
        //seria interessante esses códegos em uma função:
        div.textContent = 'Acertou'
        div.setAttribute('style', 'text-align:center;padding:5px; background-color: lime;width: 100px; margin: 5px auto auto auto; border-radius: 5px; transition: .9s')
        setTimeout(()=>{
            div.style.backgroundColor = 'rgb(41, 41, 41)'
            div.style.color = 'rgb(41, 41, 41)'
        },400)
        div.setAttribute('class','resultado')
        document.querySelector('body').appendChild(div)
    }
    else{
        
        let resul = [...document.querySelectorAll('.resultado')]
        let div = document.createElement('div')
        let p = document.createElement('p')
        p.textContent = `${n1} x ${n2} = ${n1*n2}`
        if(resul.length != 0){
            resul.forEach((e)=>{
                e.remove()
            })
        }
        div.textContent = 'Errou'
        div.setAttribute('style', 'text-align:center;padding:5px; background-color: red;width: 100px; margin: 5px auto auto auto; border-radius: 5px; transition: 2s')
        p.setAttribute('style','color: white; text-align:center; padding:5px; transition: 1.9s')
        setTimeout(()=>{
            div.style.backgroundColor = 'rgb(41, 41, 41)'
            div.style.color = 'rgb(41, 41, 41)'
            p.style.color = 'rgb(41, 41, 41)'
        },1900)
        div.setAttribute('class','resultado')
        p.setAttribute('class','resultado')
        body.appendChild(div)
        body.appendChild(p)
    }
} 

window.addEventListener('load',()=>{
    NumeroAleatorio()
})

btn_submit.accessKey = 'Enter'

btn_submit.addEventListener('click',(e)=>{
    res.focus()
    let num1 = document.querySelector("#num1")
    let num2 = document.querySelector("#num2")
    let Nres = Number(document.querySelector('#res').value)
    Gess(Number(num1.textContent),Number(num2.textContent),Nres)
    res.value = ''
    NumeroAleatorio()
})

//histórico de contas qeu mais errou
//opção de escolher os numeros para multiplicar

