function getImcStatus(imc){
    if(imc<18.5)return "Abaixo do peso";
    if(imc<25)return "Peso adequado";
    if(imc<30)return "Sobrepeso";
    if(imc<35)return "Obesidade grau I";
    if(imc<40)return "Obesidade grau II";
    return "Obesidade grau III";
}

function initImc(){
    const weight=document.querySelector("#imc-peso");
    const height=document.querySelector("#imc-altura");
    const button=document.querySelector("#calculate-imc");
    const result=document.querySelector("#imc-result");

    if(!weight||!height||!button||!result)return;

    button.addEventListener("click",()=>{
        const kg=Number(weight.value);
        const meters=Number(height.value);

        if(kg<=0||meters<=0){
            result.textContent="Informe peso e altura válidos.";
            return;
        }

        const imc=kg/(meters*meters);
        const status=getImcStatus(imc);

        result.textContent=`IMC: ${imc.toFixed(1)} — ${status}.`;
    });
}

function initCalories(){
    const age=document.querySelector("#cal-age");
    const weight=document.querySelector("#cal-weight");
    const height=document.querySelector("#cal-height");
    const sex=document.querySelector("#cal-sex");
    const activity=document.querySelector("#cal-activity");
    const button=document.querySelector("#calculate-calories");
    const result=document.querySelector("#cal-result");

    if(!age||!weight||!height||!sex||!activity||!button||!result)return;

    button.addEventListener("click",()=>{
        const years=Number(age.value);
        const kg=Number(weight.value);
        const cm=Number(height.value);
        const factor=Number(activity.value);

        if(years<=0||kg<=0||cm<=0||factor<=0){
            result.textContent="Preencha todos os campos corretamente.";
            return;
        }

        const base=sex.value==="female"
            ?10*kg+6.25*cm-5*years-161
            :10*kg+6.25*cm-5*years+5;

        const total=Math.round(base*factor);

        result.textContent=`Estimativa diária: ${total.toLocaleString("pt-BR")} kcal.`;
    });
}

export function initCalculators(){
    initImc();
    initCalories();
}