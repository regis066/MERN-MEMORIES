import express from 'express'
import { signIn , signUp } from '../controllers/user.js'

const routes = express.Router();

routes.post('/signIn' , signIn);
routes.post('/signUp' , signUp)

export default routes;