import multer from "multer";

const allowedTypes=[
    "image/jpeg",
    "image/png",
    "image/webp"
];

const uploader=multer({
    storage:multer.memoryStorage(),

    limits:{
        fileSize:5*1024*1024
    },

    fileFilter:(req,file,callback)=>{
        if(!allowedTypes.includes(file.mimetype)){
            return callback(
                new Error(
                    "Formato de imagem nao permitido."
                )
            );
        }

        callback(null,true);
    }
});

export function uploadImageFile(req,res,next){
    uploader.single("image")(
        req,
        res,
        error=>{
            if(!error){
                return next();
            }

            if(error.code==="LIMIT_FILE_SIZE"){
                return res.status(400).json({
                    success:false,
                    message:"A imagem deve ter no maximo 5 MB."
                });
            }

            return res.status(400).json({
                success:false,
                message:error.message
            });
        }
    );
}