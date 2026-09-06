export class AuthController {
    constructor(service) {
        this.service = service;
    }

    async login(req, res, next) {
        try {
            const { username, password } = req.body;
            const token = this.service.login(username, password);
            return res.json({ token });
        } catch (error) {
            next(error);
        }
    }
}