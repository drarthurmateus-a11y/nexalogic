export function errorHandler(
    error,
    req,
    res,
    next
){
    console.error(
        "Erro nao tratado:",
        error
    );

    if(res.headersSent){
        return next(error);
    }

    return res.status(500).json({
        success:false,
        message:"Erro interno do servidor."
    });
}