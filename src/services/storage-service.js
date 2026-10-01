import {randomUUID} from "node:crypto";
import {supabase} from "../config/supabase.js";

const bucket="site-media";

const folders={
    gallery:"gallery",
    professional:"professionals",
    modality:"modalities",
    testimonial:"general",
    faq:"general"
};

const extensions={
    "image/jpeg":"jpg",
    "image/png":"png",
    "image/webp":"webp"
};

export async function uploadImage(file,type){
    const folder=folders[type]||"general";
    const extension=extensions[file.mimetype];

    if(!extension){
        throw new Error(
            "Formato de imagem invalido."
        );
    }

    const filename=
        `${randomUUID()}.${extension}`;

    const path=
        `${folder}/${filename}`;

    const {error}=await supabase.storage
        .from(bucket)
        .upload(
            path,
            file.buffer,
            {
                contentType:file.mimetype,
                cacheControl:"3600",
                upsert:false
            }
        );

    if(error)throw error;

    const {data}=supabase.storage
        .from(bucket)
        .getPublicUrl(path);

    return{
        path,
        url:data.publicUrl
    };
}