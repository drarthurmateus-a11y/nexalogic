async function request(url,options={}){
    const response=await fetch(url,{
        headers:{
            "Content-Type":"application/json",
            ...options.headers
        },
        ...options
    });

    let data={};

    try{
        data=await response.json();
    }catch{
        data={};
    }

    if(!response.ok){
        const error=new Error(
            data.message||"Erro ao comunicar com o servidor."
        );

        error.status=response.status;
        error.data=data;

        throw error;
    }

    return data;
}

export function apiGet(url){
    return request(url);
}

export function apiPost(url,data){
    return request(url,{
        method:"POST",
        body:JSON.stringify(data)
    });
}