//middelware de jwt que comprueba si el token es valido
Object.defineProperty(exports, "__esModule", { value: true });
class Checkauth {
    isAccessTokenValid(req, res, next) {
        var _a;
        var jwt = require('jsonwebtoken');
        const auth = req.headers?.authorization;
        const token = auth?.split(' ')[1];
        jwt.verify(token, 'Cl4vePr1vada2022*', (err, verifiedJwt) => {
            if (err) {
                if(err.name === 'TokenExpiredError'){
                    return res.status(401).json({
                        error: "Token Expirado",
                     });
                }else{
                    return res.status(400).json({
                        error: "Token invalido",
                     });
                }
            }
            else {
                next();
            }
        });
    }
}
const checkauth = new Checkauth();
exports.default = checkauth;
